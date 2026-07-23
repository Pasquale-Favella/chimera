import { db } from "../db";
import { ConnectionPosition, LlmProvider, Prisma, ProjectRole } from "../../../generated/prisma";
import { generateDesigns, generateDesignFlow, modifyDesigns } from "./ai.service";
import { sanitizeGeneratedHtml } from "../lib/sanitize-html";
import { calculateNextPosition } from "../api/features/designs/layout.utils";
import { AiFeature } from "@/types/settings";
import type { DesignSystemContext } from "@/types/shared";

const EDITOR_ACCESS: readonly ProjectRole[] = [
    ProjectRole.EDITOR,
    ProjectRole.OWNER,
] as const;

/**
 * Mirrors `assertProjectAccess` from the tRPC `permissions.ts` helper, but
 * takes a bare `userId` instead of a tRPC `ProtectedContext` since MCP tools
 * only have the API-key-resolved userId, not a full request context.
 */
async function assertMcpProjectAccess(
    userId: string,
    projectId: string,
    allowedRoles: readonly ProjectRole[] = EDITOR_ACCESS,
) {
    const project = await db.project.findUnique({
        where: { id: projectId },
        select: { id: true },
    });

    if (!project) {
        throw new Error("Project not found.");
    }

    const membership = await db.projectMembership.findUnique({
        where: {
            projectId_userId: {
                projectId,
                userId,
            },
        },
    });

    if (!membership || !allowedRoles.includes(membership.role)) {
        throw new Error("You do not have access to this project.");
    }

    return membership;
}

/**
 * Mirrors `getLlmConfig` from `design.router.ts`, resolving the caller's
 * preferred provider/model/API-key for a given AI feature.
 */
async function getMcpLlmConfig(userId: string, feature: AiFeature) {
    const user = await db.user.findUnique({
        where: { id: userId },
        select: { llmApiKeys: true, llmPreferences: true },
    });

    if (!user) return undefined;

    const prefs = user.llmPreferences as Record<
        string,
        { provider: LlmProvider; model: string }
    > | null;
    const featurePrefs = prefs?.[feature];
    const provider = featurePrefs?.provider ?? LlmProvider.GOOGLE;
    const apiKeyRecord = user.llmApiKeys.find((k) => k.provider === provider);

    return {
        provider,
        apiKey: apiKeyRecord?.apiKey,
        model: featurePrefs?.model,
    };
}

function toConnectionPosition(
    pos: "top" | "right" | "bottom" | "left",
): ConnectionPosition {
    switch (pos) {
        case "top":
            return ConnectionPosition.TOP;
        case "right":
            return ConnectionPosition.RIGHT;
        case "bottom":
            return ConnectionPosition.BOTTOM;
        case "left":
            return ConnectionPosition.LEFT;
    }
}

function normalizeHistory(history: unknown): string[] {
    if (Array.isArray(history)) {
        return history.filter((item): item is string => typeof item === "string");
    }
    return [];
}

function toJsonInput(value: unknown): Prisma.InputJsonValue {
    return value as Prisma.InputJsonValue;
}

export const McpService = {
    findUserByApiKey: async (apiKey: string) => {
        const user = await db.user.findFirst({
            where: {
                apiKeys: {
                    some: {
                        key: apiKey,
                    },
                },
            },
        });

        return user;
    },
    getUserProjectsByQuery: async (userId: string, query: string) => {
        const projects = await db.project.findMany({
            where: {
                name: { contains: query },
                OR: [
                    {
                        memberships: {
                            some: {
                                userId,
                            },
                        },
                    },
                    {
                        createdBy: {
                            id: userId,
                        },
                    },
                ],
            },
        });

        return projects;
    },
    listUserProjects: async (userId: string) => {
        const projects = await db.project.findMany({
            where: {
                OR: [
                    {
                        memberships: {
                            some: {
                                userId,
                            },
                        },
                    },
                    {
                        createdBy: {
                            id: userId,
                        },
                    },
                ],
            },
        });

        return projects;
    },

    getUserProjectById: async (projectId: string) => {
        const project = await db.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                designs: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        viewMode: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        });

        return project;
    },

    getDesignById: async (designId: string) => {
        const design = await db.design.findUnique({
            where: {
                id: designId,
            },
            include: {
                connectionsFrom: true,
                connectionsTo: true,
            },
        });

        return design;
    },

    getProjectConnections: async (projectId: string) => {
        const connections = await db.designConnection.findMany({
            where: {
                projectId,
            },
        });

        // Build adjacency list for graph traversal
        const adjacencyList = new Map<string, Set<string>>();
        const allDesignIds = new Set<string>();

        connections.forEach((conn) => {
            if (!adjacencyList.has(conn.fromDesignId)) {
                adjacencyList.set(conn.fromDesignId, new Set());
            }
            if (!adjacencyList.has(conn.toDesignId)) {
                adjacencyList.set(conn.toDesignId, new Set());
            }

            adjacencyList.get(conn.fromDesignId)!.add(conn.toDesignId);
            adjacencyList.get(conn.toDesignId)!.add(conn.fromDesignId); // Treat as undirected for grouping

            allDesignIds.add(conn.fromDesignId);
            allDesignIds.add(conn.toDesignId);
        });

        const visited = new Set<string>();
        const flows: { flowId: string; designIds: string[]; connections: typeof connections }[] = [];

        for (const designId of allDesignIds) {
            if (visited.has(designId)) continue;

            // Start BFS to find connected component
            const componentDesignIds: string[] = [];
            const queue = [designId];
            visited.add(designId);

            while (queue.length > 0) {
                const currentId = queue.shift()!;
                componentDesignIds.push(currentId);

                const neighbors = adjacencyList.get(currentId);
                if (neighbors) {
                    for (const neighbor of neighbors) {
                        if (!visited.has(neighbor)) {
                            visited.add(neighbor);
                            queue.push(neighbor);
                        }
                    }
                }
            }

            // Filter connections that belong to this component
            const componentConnections = connections.filter(
                (conn) =>
                    componentDesignIds.includes(conn.fromDesignId) &&
                    componentDesignIds.includes(conn.toDesignId)
            );

            flows.push({
                flowId: crypto.randomUUID(),
                designIds: componentDesignIds,
                connections: componentConnections,
            });
        }

        return flows;
    },

    /**
     * MCP mutation tool: generate one or more new AI designs directly into a
     * project. Mirrors `designsRouter.aiGenerate` but authorizes via the
     * MCP-resolved userId instead of a tRPC session.
     */
    generateDesign: async (
        userId: string,
        projectId: string,
        prompt: string,
        count = 1,
        namePrefix?: string,
    ) => {
        await assertMcpProjectAccess(userId, projectId);

        const existingDesigns = await db.design.findMany({
            where: { projectId },
            select: { position: true, size: true },
        });

        const components = await db.component.findMany({
            where: { projectId },
            select: { name: true, html: true },
        });

        let promptWithContext = prompt;
        if (components.length > 0) {
            const componentContext = components
                .map((c) => `Component "${c.name}":\n${c.html}`)
                .join("\n\n");
            promptWithContext += `\n\nAvailable Reusable Components (Use these if relevant):\n${componentContext}`;
        }

        const designSystem = await db.designSystem.findUnique({
            where: { projectId },
        });

        const config = await getMcpLlmConfig(userId, AiFeature.GENERATE_DESIGNS);

        const designs = await generateDesigns(
            promptWithContext,
            count,
            null,
            config,
            designSystem as unknown as DesignSystemContext,
        );

        const created = [];
        const currentExisting = [...existingDesigns];

        for (const [index, design] of designs.entries()) {
            const name =
                namePrefix && namePrefix.trim().length
                    ? namePrefix.trim()
                    : `AI Concept ${index + 1}`;

            const position = calculateNextPosition(currentExisting);
            const size = { width: 1200, height: 800 };
            currentExisting.push({ position: position as any, size: size as any });

            const html = sanitizeGeneratedHtml(design.html);

            const newDesign = await db.design.create({
                data: {
                    projectId,
                    name,
                    description: design.description,
                    html,
                    history: [html],
                    createdById: userId,
                    position: toJsonInput(position),
                    size: toJsonInput(size),
                },
            });
            created.push(newDesign);
        }

        return created;
    },

    /**
     * MCP mutation tool: modify one or more existing designs in a project via
     * an AI prompt. Mirrors `designsRouter.aiModify`.
     */
    modifyDesign: async (
        userId: string,
        projectId: string,
        designIds: string[],
        prompt: string,
        selector?: string,
    ) => {
        await assertMcpProjectAccess(userId, projectId);

        const designs = await db.design.findMany({
            where: { id: { in: designIds }, projectId },
            select: { id: true, html: true, history: true },
        });

        if (!designs.length) {
            throw new Error("No matching designs were found for this project.");
        }

        const config = await getMcpLlmConfig(userId, AiFeature.MODIFY_DESIGNS);

        const aiResult = await modifyDesigns(
            designs.map((design) => ({ id: design.id, html: design.html ?? "" })),
            prompt,
            null,
            selector,
            config,
        );

        const designMap = new Map(designs.map((design) => [design.id, design]));
        const updated = [];

        for (const modified of aiResult) {
            const current = designMap.get(modified.id);
            if (!current) continue;

            const html = sanitizeGeneratedHtml(modified.html);
            const nextHistory = normalizeHistory(current.history);
            nextHistory.push(html);

            const updatedDesign = await db.design.update({
                where: { id: modified.id },
                data: {
                    html,
                    history: nextHistory,
                    version: { increment: 1 },
                },
            });
            updated.push(updatedDesign);
        }

        return updated;
    },

    /**
     * MCP mutation tool: generate a full connected multi-screen user flow
     * (designs + connections) into a project. Mirrors
     * `designsRouter.aiGenerateFlow`.
     */
    createFlow: async (
        userId: string,
        projectId: string,
        prompt: string,
        namePrefix?: string,
    ) => {
        await assertMcpProjectAccess(userId, projectId);

        const existingDesigns = await db.design.findMany({
            where: { projectId },
            select: { position: true, size: true },
        });

        const components = await db.component.findMany({
            where: { projectId },
            select: { name: true, html: true },
        });

        let promptWithContext = prompt;
        if (components.length > 0) {
            const componentContext = components
                .map((c) => `Component "${c.name}":\n${c.html}`)
                .join("\n\n");
            promptWithContext += `\n\nAvailable Reusable Components (Use these if relevant):\n${componentContext}`;
        }

        const designSystem = await db.designSystem.findUnique({
            where: { projectId },
        });

        const config = await getMcpLlmConfig(userId, AiFeature.GENERATE_DESIGN_FLOW);

        const flow = await generateDesignFlow(
            promptWithContext,
            null,
            config,
            designSystem as unknown as DesignSystemContext,
        );

        const tempToReal = new Map<string, string>();
        const createdDesigns = [];
        const currentExisting = [...existingDesigns];

        for (const [index, design] of flow.designs.entries()) {
            const name =
                namePrefix && namePrefix.trim().length
                    ? namePrefix.trim()
                    : `Flow Concept ${index + 1}`;

            const position = calculateNextPosition(currentExisting);
            const size = { width: 1200, height: 800 };
            currentExisting.push({ position: position as any, size: size as any });

            const html = sanitizeGeneratedHtml(design.html);

            const created = await db.design.create({
                data: {
                    projectId,
                    name,
                    description: design.description,
                    html,
                    history: [html],
                    createdById: userId,
                    position: toJsonInput(position),
                    size: toJsonInput(size),
                },
            });
            tempToReal.set(design.id, created.id);
            createdDesigns.push(created);
        }

        const createdConnections = [];
        for (const connection of flow.connections) {
            const fromId = tempToReal.get(connection.from);
            const toId = tempToReal.get(connection.to);
            if (!fromId || !toId || fromId === toId) continue;

            const created = await db.designConnection.create({
                data: {
                    projectId,
                    fromDesignId: fromId,
                    toDesignId: toId,
                    fromPosition: toConnectionPosition(connection.fromPosition),
                    toPosition: toConnectionPosition(connection.toPosition),
                },
            });
            createdConnections.push(created);
        }

        return { designs: createdDesigns, connections: createdConnections };
    },
}
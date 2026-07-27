import { AiFeature } from "@/types/settings";
import type { DesignSystemContext } from "@/types/shared";
import {
	type Prisma,
	ProjectRole,
} from "../../../generated/prisma/client";
import { calculateNextPosition } from "../api/features/designs/layout.utils";
import { db } from "../db";
import { sanitizeGeneratedHtml } from "../lib/sanitize-html";
import { getUserLlmConfig } from "@/server/lib/llm/user-llm-config";
import {
	findProjectOrThrow,
	findProjectMembershipOrThrow,
} from "@/server/lib/project-access";
import {
	toConnectionPosition,
	toJsonInput,
	normalizeHistory,
} from "../api/features/designs/design.dto";
import {
	generateDesignFlow,
	generateDesigns,
	modifyDesigns,
} from "./ai.service";

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
					},
				},
			},
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

			const fromNeighbors = adjacencyList.get(conn.fromDesignId);
			const toNeighbors = adjacencyList.get(conn.toDesignId);
			fromNeighbors?.add(conn.toDesignId);
			toNeighbors?.add(conn.fromDesignId); // Treat as undirected for grouping

			allDesignIds.add(conn.fromDesignId);
			allDesignIds.add(conn.toDesignId);
		});

		const visited = new Set<string>();
		const flows: {
			flowId: string;
			designIds: string[];
			connections: typeof connections;
		}[] = [];

		for (const designId of allDesignIds) {
			if (visited.has(designId)) continue;

			// Start BFS to find connected component
			const componentDesignIds: string[] = [];
			const queue = [designId];
			visited.add(designId);

			while (queue.length > 0) {
				const currentId = queue.shift();
				if (!currentId) {
					continue;
				}
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
					componentDesignIds.includes(conn.toDesignId),
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
		await findProjectOrThrow(projectId);
		await findProjectMembershipOrThrow(projectId, userId, [
			ProjectRole.EDITOR,
			ProjectRole.OWNER,
		]);

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

		const config = await getUserLlmConfig(userId, AiFeature.GENERATE_DESIGNS);

		const designs = await generateDesigns(
			promptWithContext,
			count,
			null,
			config ? { ...config, userId, projectId } : { userId, projectId },
			designSystem as unknown as DesignSystemContext,
		);

		const created = [];
		const currentExisting = [...existingDesigns];

		for (const [index, design] of designs.entries()) {
			const name = namePrefix?.trim().length
				? namePrefix.trim()
				: `AI Concept ${index + 1}`;

			const position = calculateNextPosition(currentExisting);
			const size = { width: 1200, height: 800 };
			currentExisting.push({
				position: position as unknown as Prisma.JsonObject,
				size: size as unknown as Prisma.JsonObject,
			});

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
		await findProjectOrThrow(projectId);
		await findProjectMembershipOrThrow(projectId, userId, [
			ProjectRole.EDITOR,
			ProjectRole.OWNER,
		]);

		const designs = await db.design.findMany({
			where: { id: { in: designIds }, projectId },
			select: { id: true, html: true, history: true },
		});

		if (!designs.length) {
			throw new Error("No matching designs were found for this project.");
		}

		const config = await getUserLlmConfig(userId, AiFeature.MODIFY_DESIGNS);

		const aiResult = await modifyDesigns(
			designs.map((design) => ({ id: design.id, html: design.html ?? "" })),
			prompt,
			null,
			selector,
			config ? { ...config, userId, projectId } : { userId, projectId },
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
		await findProjectOrThrow(projectId);
		await findProjectMembershipOrThrow(projectId, userId, [
			ProjectRole.EDITOR,
			ProjectRole.OWNER,
		]);

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

		const config = await getUserLlmConfig(
			userId,
			AiFeature.GENERATE_DESIGN_FLOW,
		);

		const flow = await generateDesignFlow(
			promptWithContext,
			null,
			config ? { ...config, userId, projectId } : { userId, projectId },
			designSystem as unknown as DesignSystemContext,
		);

		const tempToReal = new Map<string, string>();
		const createdDesigns = [];
		const currentExisting = [...existingDesigns];

		for (const [index, design] of flow.designs.entries()) {
			const name = namePrefix?.trim().length
				? namePrefix.trim()
				: `Flow Concept ${index + 1}`;

			const position = calculateNextPosition(currentExisting);
			const size = { width: 1200, height: 800 };
			currentExisting.push({
				position: position as unknown as Prisma.JsonObject,
				size: size as unknown as Prisma.JsonObject,
			});

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
};


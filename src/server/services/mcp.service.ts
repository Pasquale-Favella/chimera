import {
	findProjectMembershipOrThrow,
	findProjectOrThrow,
} from "@/server/lib/project-access";
import {
	gatherProjectContext,
	readProjectStyleMemory,
} from "@/server/mastra/workflows";
import { ProjectRole } from "../../../generated/prisma/client";
import { db } from "../db";
import {
	critiqueDesignQuality,
	generateDesignFlow,
	generateDesigns,
	modifyDesigns,
	planProductFlow,
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

		return generateDesigns({
			userId,
			projectId,
			prompt,
			count,
			namePrefix,
		});
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

		return modifyDesigns({
			userId,
			projectId,
			designIds,
			prompt,
			selector,
		});
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

		return generateDesignFlow({
			userId,
			projectId,
			prompt,
			namePrefix,
		});
	},

	/**
	 * MCP analysis tool: run the design critic over an existing design.
	 * Mirrors `designsRouter.aiCritique`.
	 */
	critiqueDesign: async (
		userId: string,
		designId: string,
		viewMode: "DESKTOP" | "TABLET" | "MOBILE" = "DESKTOP",
		goal?: string,
	) => {
		const design = await db.design.findUnique({
			where: { id: designId },
			select: { id: true, projectId: true, html: true },
		});

		if (!design) {
			throw new Error("Design not found.");
		}

		await findProjectMembershipOrThrow(design.projectId, userId, [
			ProjectRole.EDITOR,
			ProjectRole.OWNER,
		]);

		const context = await gatherProjectContext(design.projectId);

		return critiqueDesignQuality({
			userId,
			html: design.html ?? "",
			viewMode,
			goal,
			projectMemoryContext: context.styleMemory,
			designSystem: context.designSystem,
		});
	},

	/**
	 * MCP analysis tool: plan a multi-screen product flow before generating
	 * screens. Mirrors `designsRouter.aiPlanFlow`.
	 */
	planFlow: async (
		userId: string,
		projectId: string,
		prompt: string,
		maxScreens = 8,
	) => {
		await findProjectOrThrow(projectId);
		await findProjectMembershipOrThrow(projectId, userId, [
			ProjectRole.EDITOR,
			ProjectRole.OWNER,
		]);

		const context = await gatherProjectContext(projectId);

		return planProductFlow({
			userId,
			prompt,
			maxScreens,
			existingScreens: context.existingDesigns.map((design) => ({
				id: design.id,
				name: design.name,
				description: design.description,
			})),
			projectMemoryContext: context.styleMemory,
			designSystem: context.designSystem,
			components: context.components,
		});
	},

	/**
	 * MCP read tool: return the project's persisted style memory, if any.
	 */
	getStyleMemory: async (projectId: string) => {
		return readProjectStyleMemory(projectId);
	},
};

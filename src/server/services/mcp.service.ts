import { db } from "../db";

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
}
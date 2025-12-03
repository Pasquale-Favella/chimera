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
        });

        return design;
    },
}
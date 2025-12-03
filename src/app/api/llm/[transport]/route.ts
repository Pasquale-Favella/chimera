import {
    createMcpHandler,
    withMcpAuth,
} from "mcp-handler";
import { McpService } from "@/server/services/mcp.service";
import z from "zod";

const handler = createMcpHandler(
    async (server) => {
        server.registerTool(
            "get_projects_by_query",
            {
                description: "Find user projects by query",
                inputSchema: z.object({
                    query: z.string(),
                }),
            },
            async ({ query }, extra) => {
                const userId = extra.authInfo?.clientId!;
                const projects = await McpService.getUserProjectsByQuery(userId, query);
                return {
                    content: [{ type: "text", text: JSON.stringify(projects) }],
                };
            }
        ),
            server.registerTool(
                "get_user_projects",
                {
                    description: "Gets the list of user design projects",
                },
                async (extra) => {
                    const userId = extra.authInfo?.clientId!;
                    const projects = await McpService.listUserProjects(userId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(projects) }],
                    };
                }
            ),
            server.registerTool(
                "get_user_project_by_id",
                {
                    description: "Gets the user design project by id, including a summary of all designs in the project",
                    inputSchema: z.object({
                        projectId: z.string(),
                    }),
                },
                async ({ projectId }) => {
                    const project = await McpService.getUserProjectById(projectId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(project) }],
                    };
                }
            ),
            server.registerTool(
                "get_design_by_id",
                {
                    description: "Gets the full details of a specific design, including HTML content and tokens",
                    inputSchema: z.object({
                        designId: z.string(),
                    }),
                },
                async ({ designId }) => {
                    const design = await McpService.getDesignById(designId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(design) }],
                    };
                }
            )
    },
    {},
    {
        basePath: "/api/llm",
    }
);

const withAuth = withMcpAuth(
    handler,
    async (_, bearer) => {
        if (!bearer) {
            throw new Error("No API key provided.");
        }

        const user = await McpService.findUserByApiKey(bearer);

        if (!user) {
            throw new Error("Invalid API key");
        }

        return {
            token: bearer,
            clientId: user.id,
            scopes: [],
        };
    },
    {
        required: true,
    }
);

export { withAuth as GET, withAuth as POST, withAuth as DELETE };
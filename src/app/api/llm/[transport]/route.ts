import {
    createMcpHandler,
    withMcpAuth,
} from "mcp-handler";
import { McpService } from "@/server/services/mcp.service";
import z from "zod";

const handler = createMcpHandler(
    async (server) => {
        server.registerTool(
            "chimera_get_projects_by_query",
            {
                description: "Search for projects belonging to the authenticated user based on a search query. Returns a list of projects that match the name or membership criteria.",
                inputSchema: z.object({
                    query: z.string().describe("The search query to filter projects by name"),
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
                "chimera_get_user_projects",
                {
                    description: "Retrieve a list of all design projects associated with the authenticated user. This includes projects created by the user and projects where the user is a member.",
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
                "chimera_get_user_project_by_id",
                {
                    description: "Retrieve detailed information about a specific design project using its ID. The response includes project metadata and a summary of all designs contained within the project (id, name, description, viewMode, timestamps).",
                    inputSchema: z.object({
                        projectId: z.string().describe("The ID of the project to retrieve"),
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
                "chimera_get_design_by_id",
                {
                    description: "Retrieve the full details of a specific design using its ID. The response includes the complete design data, including HTML content, design tokens, connections, and other associated metadata.",
                    inputSchema: z.object({
                        designId: z.string().describe("The ID of the design to retrieve"),
                    }),
                },
                async ({ designId }) => {
                    const design = await McpService.getDesignById(designId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(design) }],
                    };
                }
            ),
            server.registerTool(
                "chimera_get_project_connections",
                {
                    description: "Retrieve all design connections for a specific project, grouped by distinct flows (connected components). This helps understand the independent user journeys within the project.",
                    inputSchema: z.object({
                        projectId: z.string().describe("The ID of the project to retrieve connections for"),
                    }),
                },
                async ({ projectId }) => {
                    const flows = await McpService.getProjectConnections(projectId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(flows) }],
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
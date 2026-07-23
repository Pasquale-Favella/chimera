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
            ),
            server.registerTool(
                "chimera_generate_design",
                {
                    description: "Generate one or more new AI design variations directly into a project, based on a text prompt. Requires editor or owner access to the project. Returns the newly created design records.",
                    inputSchema: z.object({
                        projectId: z.string().describe("The ID of the project to generate the design(s) into"),
                        prompt: z.string().describe("A description of the design to generate"),
                        count: z.number().int().min(1).max(4).optional().describe("How many design variations to generate (default 1, max 4)"),
                        namePrefix: z.string().optional().describe("Optional name to use for the generated design(s) instead of the default 'AI Concept N'"),
                    }),
                },
                async ({ projectId, prompt, count, namePrefix }, extra) => {
                    const userId = extra.authInfo?.clientId!;
                    const designs = await McpService.generateDesign(userId, projectId, prompt, count ?? 1, namePrefix);
                    return {
                        content: [{ type: "text", text: JSON.stringify(designs) }],
                    };
                }
            ),
            server.registerTool(
                "chimera_modify_design",
                {
                    description: "Modify one or more existing designs in a project using an AI prompt, optionally scoped to a specific CSS selector. Requires editor or owner access to the project. Returns the updated design records.",
                    inputSchema: z.object({
                        projectId: z.string().describe("The ID of the project the designs belong to"),
                        designIds: z.array(z.string()).min(1).describe("The IDs of the designs to modify"),
                        prompt: z.string().describe("The instruction describing how to modify the design(s)"),
                        selector: z.string().optional().describe("An optional CSS selector to scope the modification to a specific element"),
                    }),
                },
                async ({ projectId, designIds, prompt, selector }, extra) => {
                    const userId = extra.authInfo?.clientId!;
                    const designs = await McpService.modifyDesign(userId, projectId, designIds, prompt, selector);
                    return {
                        content: [{ type: "text", text: JSON.stringify(designs) }],
                    };
                }
            ),
            server.registerTool(
                "chimera_create_flow",
                {
                    description: "Generate a complete connected multi-screen user flow (several designs plus the connections between them) directly into a project, based on a text prompt. Requires editor or owner access to the project. Returns the newly created designs and connections.",
                    inputSchema: z.object({
                        projectId: z.string().describe("The ID of the project to generate the flow into"),
                        prompt: z.string().describe("A description of the user flow to generate"),
                        namePrefix: z.string().optional().describe("Optional name prefix to use for the generated screens instead of the default 'Flow Concept N'"),
                    }),
                },
                async ({ projectId, prompt, namePrefix }, extra) => {
                    const userId = extra.authInfo?.clientId!;
                    const flow = await McpService.createFlow(userId, projectId, prompt, namePrefix);
                    return {
                        content: [{ type: "text", text: JSON.stringify(flow) }],
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
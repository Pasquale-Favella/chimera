/**
 * Mastra tools
 * Reusable context/sanitization tools shared by the Mastra agents and
 * workflows. These wrap existing application utilities and Prisma queries so
 * agents can gather project context and sanitize HTML at the tool boundary.
 */

import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import {
	loadProjectComponents,
	loadProjectDesignSamples,
	loadProjectDesignSystem,
} from "@/server/mastra/project-context";

const MAX_COMPONENT_HTML = 2000;
const MAX_DESIGN_HTML = 2500;

/** Bounds HTML fragments so tool outputs stay token-friendly for the model. */
function truncateHtml(html: string, maxChars: number): string {
	if (html.length <= maxChars) return html;
	return `${html.slice(0, maxChars)}\n\n... [HTML truncated]`;
}

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const designSystemSchema = z
	.object({
		name: z.string(),
		colors: z.unknown(),
		typography: z.unknown(),
		spacing: z.unknown(),
		radius: z.unknown(),
	})
	.nullable();

const componentSummarySchema = z.object({
	id: z.string(),
	name: z.string(),
	html: z.string(),
});

const designSummarySchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	html: z.string(),
	viewMode: z.string(),
	updatedAt: z.string(),
});

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

/** Sanitizes AI-generated HTML, stripping scripts and XSS vectors. */
export const sanitizeGeneratedHtmlTool = createTool({
	id: "sanitize-generated-html",
	description:
		"Sanitize AI-generated HTML, stripping scripts and event handler attributes while preserving structural/Tailwind markup.",
	inputSchema: z.object({
		html: z.string().describe("Raw AI-generated HTML to sanitize."),
	}),
	outputSchema: z.object({
		html: z.string().describe("Sanitized HTML."),
	}),
	execute: async ({ html }) => ({ html: sanitizeGeneratedHtml(html) }),
});

/**
 * Fetches the design system, reusable components, and recent designs for a
 * project so agents can ground their output in the current design language.
 */
export const getProjectContextTool = createTool({
	id: "get-project-context",
	description:
		"Fetch the project's design system tokens, reusable components, and recent designs. Call this before generating or modifying designs to stay consistent with the existing style.",
	inputSchema: z.object({
		projectId: z.string().describe("The project ID."),
	}),
	outputSchema: z.object({
		projectId: z.string(),
		designSystem: designSystemSchema,
		components: z.array(componentSummarySchema),
		recentDesigns: z.array(designSummarySchema),
	}),
	execute: async ({ projectId }) => {
		const [designSystem, components, recentDesigns] = await Promise.all([
			loadProjectDesignSystem(projectId),
			loadProjectComponents(projectId, 50),
			loadProjectDesignSamples(projectId, 8),
		]);

		return {
			projectId,
			designSystem: designSystem
				? {
						name: designSystem.name,
						colors: designSystem.colors,
						typography: designSystem.typography,
						spacing: designSystem.spacing,
						radius: designSystem.radius,
					}
				: null,
			components: components.map((component) => ({
				...component,
				html: truncateHtml(component.html, MAX_COMPONENT_HTML),
			})),
			recentDesigns: recentDesigns.map((design) => ({
				id: design.id,
				name: design.name,
				description: design.description,
				html: truncateHtml(design.html, MAX_DESIGN_HTML),
				viewMode: design.viewMode,
				updatedAt: design.updatedAt.toISOString(),
			})),
		};
	},
});

/**
 * Keyword retrieval over the project's reusable component library, matching
 * against both component names and their HTML markup.
 */
export const searchProjectComponentsTool = createTool({
	id: "search-project-components",
	description:
		"Search the project's reusable component library by keyword. Returns matching components with their HTML so they can be reused in new designs.",
	inputSchema: z.object({
		projectId: z.string().describe("The project ID."),
		query: z
			.string()
			.describe("Keyword to match against component names and markup."),
		limit: z
			.number()
			.int()
			.min(1)
			.max(50)
			.default(10)
			.describe("Maximum number of matches to return."),
	}),
	outputSchema: z.object({
		query: z.string(),
		matches: z.array(componentSummarySchema),
	}),
	execute: async ({ projectId, query, limit }) => {
		const components = await loadProjectComponents(projectId);

		const needle = query.trim().toLowerCase();
		const filtered = needle
			? components.filter(
					(component) =>
						component.name.toLowerCase().includes(needle) ||
						component.html.toLowerCase().includes(needle),
				)
			: components;

		return {
			query,
			matches: filtered.slice(0, limit).map((component) => ({
				...component,
				html: truncateHtml(component.html, MAX_COMPONENT_HTML),
			})),
		};
	},
});

// ---------------------------------------------------------------------------
// Tool registry
// ---------------------------------------------------------------------------

export const tools = {
	sanitizeGeneratedHtmlTool,
	getProjectContextTool,
	searchProjectComponentsTool,
} as const;

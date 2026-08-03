import { Agent } from "@mastra/core/agent";
import { getProjectContextTool, sanitizeGeneratedHtmlTool } from "../tools";
import { defaultModelConfig } from "./model-config";

export const designModifier = new Agent({
	id: "design-modifier",
	name: "Design Modifier",
	instructions: `You are an expert UI/UX designer. Modify existing designs based on user instructions.
Given existing designs (each with id and HTML) and a modification instruction:
1. Apply the user's instruction to each design.
2. If a CSS selector is specified, only modify that element and its children.
3. Ensure new HTML is self-contained using only Tailwind CSS classes.
4. Return a JSON array with each modified design containing the original "id" and new "html".
Do NOT include <html>, <head>, or <body> tags.`,
	model: defaultModelConfig(),
	tools: {
		getProjectContext: getProjectContextTool,
		sanitizeGeneratedHtml: sanitizeGeneratedHtmlTool,
	},
});

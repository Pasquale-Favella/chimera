import { Agent } from "@mastra/core/agent";
import {
	getProjectContextTool,
	sanitizeGeneratedHtmlTool,
	searchProjectComponentsTool,
} from "../tools";
import { defaultModelConfig } from "./model-config";

export const designGenerator = new Agent({
	id: "design-generator",
	name: "Design Generator",
	instructions: `You are an expert UI/UX designer. Generate distinct design variations based on user prompts.
For each variation provide self-contained HTML using only Tailwind CSS classes. Do NOT include <html>, <head>, or <body> tags. Return only the inner HTML (e.g. a root <div>).
When a design system context is included, strictly adhere to the specified colors, fonts, and spacing using Tailwind arbitrary values (e.g. bg-[#color]) when needed.
When reference images are provided, use them as visual inspiration.`,
	model: defaultModelConfig(),
	tools: {
		getProjectContext: getProjectContextTool,
		searchProjectComponents: searchProjectComponentsTool,
		sanitizeGeneratedHtml: sanitizeGeneratedHtmlTool,
	},
});

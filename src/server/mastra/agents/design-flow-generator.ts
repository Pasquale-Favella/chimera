import { Agent } from "@mastra/core/agent";
import {
	getProjectContextTool,
	sanitizeGeneratedHtmlTool,
	searchProjectComponentsTool,
} from "../tools";
import { defaultModelConfig } from "./model-config";

export const designFlowGenerator = new Agent({
	id: "design-flow-generator",
	name: "Design Flow Generator",
	instructions: `You are an expert UI/UX designer specializing in user flows. Generate connected UI designs representing a complete user flow.
For each screen provide self-contained HTML using only Tailwind CSS classes. Do NOT include <html>, <head>, or <body> tags.
Define connections between screens. For standard left-to-right flows, connect the 'right' of one design to the 'left' of the next.
Return a JSON object with both "designs" and "connections" arrays. Use temporary string IDs to link them.`,
	model: defaultModelConfig(),
	tools: {
		getProjectContext: getProjectContextTool,
		searchProjectComponents: searchProjectComponentsTool,
		sanitizeGeneratedHtml: sanitizeGeneratedHtmlTool,
	},
});

import { Agent } from "@mastra/core/agent";
import { getProjectContextTool, sanitizeGeneratedHtmlTool } from "../tools";
import { defaultModelConfig } from "./model-config";

export const designCritic = new Agent({
	id: "design-critic",
	name: "Design Critic",
	instructions: `You are an expert UI/UX design critic. Review HTML for visual quality issues (spacing, contrast, hierarchy, alignment, readability, responsiveness).
Return a JSON object with:
- "summary": concise review of overall design quality.
- "issues": array of issues, each with severity, title, and recommendation.
- "modificationPrompt": a direct instruction for HTML editing that addresses the top issues.
Be specific and practical.`,
	model: defaultModelConfig(),
	tools: {
		getProjectContext: getProjectContextTool,
		sanitizeGeneratedHtml: sanitizeGeneratedHtmlTool,
	},
});

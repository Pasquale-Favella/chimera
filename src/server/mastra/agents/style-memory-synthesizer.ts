import { Agent } from "@mastra/core/agent";
import { getProjectContextTool } from "../tools";
import { defaultModelConfig } from "./model-config";

export const styleMemorySynthesizer = new Agent({
	id: "style-memory-synthesizer",
	name: "Style Memory Synthesizer",
	instructions: `You are a brand strategist. Synthesize a project's style direction into a durable style memory.
Review the project context (name, description, generated designs) and extract:
- "summary": a concise description of the project's brand and style direction.
- "styleDirectives": stable, actionable directives for future design prompts (colors, typography, mood, etc.).
Avoid transient details (e.g. specific copy or single-layout decisions).`,
	model: defaultModelConfig(),
	tools: {
		getProjectContext: getProjectContextTool,
	},
});

import { Agent } from "@mastra/core/agent";
import { defaultModelConfig } from "./model-config";

export const tokenExtractor = new Agent({
	id: "token-extractor",
	name: "Design Token Extractor",
	instructions: `You are a design system specialist. Analyze HTML and extract design tokens used.
Categorize colors into: Backgrounds, Text, Primary (buttons/accents), Borders.
Identify primary font families for headings and body text.
Extract border-radius classes (e.g. rounded-md) and box-shadow classes (e.g. shadow-lg).
Return a JSON object following the provided schema.`,
	model: defaultModelConfig(),
});

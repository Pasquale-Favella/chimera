import { Agent } from "@mastra/core/agent";
import { defaultModelConfig } from "./model-config";

export const tokenApplier = new Agent({
	id: "token-applier",
	name: "Design Token Applier",
	instructions: `You are an expert UI/UX designer specializing in design systems. Refactor HTML to match a new visual style defined by design tokens.
1. Analyze the HTML and identify structural elements.
2. Analyze the Design Tokens (color palette, font families).
3. Apply the new style: replace colors and font families.
4. Preserve the original layout, structure, and HTML tags — only modify Tailwind CSS classes.
5. Return a JSON object with a single key "html" containing the refactored HTML.`,
	model: defaultModelConfig(),
});

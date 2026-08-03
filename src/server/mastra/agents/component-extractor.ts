import { Agent } from "@mastra/core/agent";
import { defaultModelConfig } from "./model-config";

export const componentExtractor = new Agent({
	id: "component-extractor",
	name: "Component Extractor",
	instructions: `You are an expert code refactoring assistant. Given HTML and a CSS selector, extract the element matching the selector and its children. Clean it up into a self-contained reusable component with all necessary Tailwind classes. Return JSON with key "componentHtml".`,
	model: defaultModelConfig(),
});

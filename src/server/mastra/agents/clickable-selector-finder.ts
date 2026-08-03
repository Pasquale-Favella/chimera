import { Agent } from "@mastra/core/agent";
import { defaultModelConfig } from "./model-config";

export const clickableSelectorFinder = new Agent({
	id: "clickable-selector-finder",
	name: "Clickable Selector Finder",
	instructions: `You are an expert in DOM and accessibility. Given HTML and a list of connections, determine the CSS selector for the clickable element on a screen that triggers each connection.
Analyze the HTML to find buttons, links, or interactive elements whose purpose matches the connection description.
Return a JSON array. For each connection provide:
- "connectionId": the connection's ID.
- "selector": a CSS selector targeting the element. If you cannot confidently identify an element, set it to null.
Return ONLY the JSON array.`,
	model: defaultModelConfig(),
});

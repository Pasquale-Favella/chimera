import { Agent } from "@mastra/core/agent";
import { getProjectContextTool, searchProjectComponentsTool } from "../tools";
import { defaultModelConfig } from "./model-config";

export const productFlowPlanner = new Agent({
	id: "product-flow-planner",
	name: "Product Flow Planner",
	instructions: `You are an expert UX architect and product planner. Plan an information architecture and user journey for the given product.
Return a JSON object with:
- "planningSummary": explanation of the IA and user journey.
- "screens": ordered screens (2-12), each with id, name, description, userGoal.
- "connections": directed transitions between screens with from/to (screen ids), fromPosition/toPosition, and a rationale.
Keep flows focused and minimal.`,
	model: defaultModelConfig(),
	tools: {
		getProjectContext: getProjectContextTool,
		searchProjectComponents: searchProjectComponentsTool,
	},
});

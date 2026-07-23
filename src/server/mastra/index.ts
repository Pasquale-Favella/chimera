import { Mastra } from "@mastra/core";
import { designQualityWorkflow } from "./workflows/design-quality.workflow";
import { memoryWorkflow } from "./workflows/memory.workflow";
import { productFlowWorkflow } from "./workflows/product-flow.workflow";

export const mastraWorkflows = {
	designQualityWorkflow,
	memoryWorkflow,
	productFlowWorkflow,
} as const;

/**
 * Central Mastra registry for Wave 2 workflow scaffolds.
 */
export const mastra = new Mastra({
	workflows: mastraWorkflows,
});


/**
 * Workflow registry
 * Barrel exports for the Mastra workflow pipeline and shared helpers.
 */

import { designGenerationWorkflow } from "./design-generation.workflow";
import { designModificationWorkflow } from "./design-modification.workflow";
import { flowGenerationWorkflow } from "./flow-generation.workflow";

export { designGenerationWorkflow };
export { flowGenerationWorkflow };
export { designModificationWorkflow };
export { DesignsNotFoundError } from "./errors";
export {
	aiConfigSchema,
	attachedImageSchema,
	gatherProjectContext,
	readProjectStyleMemory,
	updateProjectStyleMemory,
} from "./shared";

export const workflows = {
	designGeneration: designGenerationWorkflow,
	flowGeneration: flowGenerationWorkflow,
	designModification: designModificationWorkflow,
} as const;

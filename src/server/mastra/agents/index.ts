/**
 * Agent registry
 * Single public entrypoint for the Mastra design agents. Keeps the
 * `@/server/mastra/agents` import path stable while each agent lives in its
 * own file. Re-exports the shared output schemas, model-config helpers, and
 * the generic `generate` runner.
 */

export { generate } from "../agent-utils";
export * from "./model-config";
export * from "./schemas";

import { clickableSelectorFinder } from "./clickable-selector-finder";
import { componentExtractor } from "./component-extractor";
import { designCritic } from "./design-critic";
import { designFlowGenerator } from "./design-flow-generator";
import { designGenerator } from "./design-generator";
import { designModifier } from "./design-modifier";
import { productFlowPlanner } from "./product-flow-planner";
import { styleMemorySynthesizer } from "./style-memory-synthesizer";
import { tokenApplier } from "./token-applier";
import { tokenExtractor } from "./token-extractor";

export {
	designGenerator,
	designFlowGenerator,
	designModifier,
	tokenExtractor,
	tokenApplier,
	componentExtractor,
	clickableSelectorFinder,
	designCritic,
	styleMemorySynthesizer,
	productFlowPlanner,
};

export const agents = {
	designGenerator,
	designFlowGenerator,
	designModifier,
	tokenExtractor,
	tokenApplier,
	componentExtractor,
	clickableSelectorFinder,
	designCritic,
	styleMemorySynthesizer,
	productFlowPlanner,
} as const;

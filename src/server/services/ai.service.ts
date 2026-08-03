/**
 * AI Service
 * Public facade for AI-powered design operations.
 *
 * Owns the application-facing API surface and orchestrates the Mastra agents
 * and workflows. The three generative entry points (`generateDesigns`,
 * `generateDesignFlow`, `modifyDesigns`) delegate to the Mastra workflows so
 * context gathering, sanitization, critique/refine, persistence, and style
 * memory all run in the pipeline. The remaining functions call their agents
 * directly. Every function resolves the per-user LLM config through
 * `getUserLlmConfig`, and prompt assembly lives in `@/server/mastra/prompts`.
 */

import type { Step, WorkflowResult } from "@mastra/core/workflows";
import { getUserLlmConfig } from "@/server/lib/llm/user-llm-config";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import {
	agents,
	clickableSelectorsSchema,
	componentExtractionSchema,
	type DesignQualityCritique,
	designQualityCritiqueSchema,
	designTokenSchema,
	generate,
	type ProductFlowPlan,
	type ProjectStyleMemorySynthesis,
	productFlowPlanSchema,
	projectStyleMemorySchema,
	singleModificationSchema,
} from "@/server/mastra/agents";
import {
	buildClickableSelectorsPrompt,
	buildComponentExtractionPrompt,
	buildCritiquePrompt,
	buildFlowPlanPrompt,
	buildStyleMemoryPrompt,
	buildTokenExtractionPrompt,
	buildTokenRefactorPrompt,
} from "@/server/mastra/prompts";
import {
	designGenerationWorkflow,
	designModificationWorkflow,
	flowGenerationWorkflow,
} from "@/server/mastra/workflows";
import type {
	PersistedConnection,
	PersistedDesign,
} from "@/server/mastra/workflows/persistence";
import type { AiConfig } from "@/types/llm";
import { AiFeature } from "@/types/settings";
import type {
	AttachedImage,
	DesignSystemContext,
	DesignTokens,
} from "@/types/shared";

export type { AiConfig };

export type {
	DesignQualityCritique,
	ProductFlowPlan,
	ProjectStyleMemorySynthesis,
};

export interface GenerateDesignsOptions {
	userId: string;
	projectId: string;
	prompt: string;
	count?: number;
	namePrefix?: string;
	images?: AttachedImage[] | null;
}

export interface GenerateDesignFlowOptions {
	userId: string;
	projectId: string;
	prompt: string;
	namePrefix?: string;
	images?: AttachedImage[] | null;
}

export interface ModifyDesignsOptions {
	userId: string;
	projectId: string;
	designIds: string[];
	prompt: string;
	images?: AttachedImage[] | null;
	selector?: string | null;
}

/**
 * Narrows a workflow outcome to the success variant, throwing on any other
 * terminal status. Keeps callers' `result` access type-safe across the
 * discriminated `WorkflowResult` union.
 */
function assertWorkflowSuccess<
	TState,
	TInput,
	TOutput,
	TSteps extends Step<string, unknown, unknown, unknown, unknown, unknown>[],
>(
	outcome: WorkflowResult<TState, TInput, TOutput, TSteps>,
): asserts outcome is Extract<
	WorkflowResult<TState, TInput, TOutput, TSteps>,
	{ status: "success" }
> {
	if (outcome.status !== "success") {
		if (outcome.status === "failed") throw outcome.error;
		throw new Error(`Workflow ended with status "${outcome.status}".`);
	}
}

/**
 * Generates and persists new design variations through the
 * `designGeneration` workflow (context gathering, generation, critique/refine,
 * persistence, style-memory update).
 */
export async function generateDesigns(
	options: GenerateDesignsOptions,
): Promise<PersistedDesign[]> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.GENERATE_DESIGNS,
	);
	const run = await designGenerationWorkflow.createRun();
	const outcome = await run.start({
		inputData: {
			projectId: options.projectId,
			userId: options.userId,
			config,
			prompt: options.prompt,
			count: options.count ?? 1,
			namePrefix: options.namePrefix,
			images: options.images ?? undefined,
		},
	});
	assertWorkflowSuccess(outcome);
	return outcome.result.designs;
}

/**
 * Generates and persists a connected multi-screen flow through the
 * `flowGeneration` workflow (planning, screen generation, persistence of
 * designs and connections, style-memory update).
 */
export async function generateDesignFlow(
	options: GenerateDesignFlowOptions,
): Promise<{
	designs: PersistedDesign[];
	connections: PersistedConnection[];
}> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.GENERATE_DESIGN_FLOW,
	);
	const run = await flowGenerationWorkflow.createRun();
	const outcome = await run.start({
		inputData: {
			projectId: options.projectId,
			userId: options.userId,
			config,
			prompt: options.prompt,
			namePrefix: options.namePrefix,
			images: options.images ?? undefined,
		},
	});
	assertWorkflowSuccess(outcome);
	return {
		designs: outcome.result.designs,
		connections: outcome.result.connections,
	};
}

/**
 * Modifies and persists existing designs through the `designModification`
 * workflow (fetch, modify, sanitize, persist with history, style-memory
 * update).
 */
export async function modifyDesigns(
	options: ModifyDesignsOptions,
): Promise<PersistedDesign[]> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.MODIFY_DESIGNS,
	);
	const run = await designModificationWorkflow.createRun();
	const outcome = await run.start({
		inputData: {
			projectId: options.projectId,
			userId: options.userId,
			config,
			prompt: options.prompt,
			designIds: options.designIds,
			images: options.images ?? undefined,
			selector: options.selector,
		},
	});
	assertWorkflowSuccess(outcome);
	return outcome.result.designs;
}

export async function applyDesignTokens(options: {
	userId: string;
	html: string;
	tokens: DesignTokens;
}): Promise<{ html: string }> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.APPLY_DESIGN_TOKENS,
	);
	const fullPrompt = buildTokenRefactorPrompt({
		html: options.html,
		tokens: options.tokens,
	});
	const output = await generate(
		agents.tokenApplier,
		fullPrompt,
		singleModificationSchema,
		config,
	);
	return { html: sanitizeGeneratedHtml(output.html) };
}

export async function extractDesignTokens(options: {
	userId: string;
	html: string;
}): Promise<DesignTokens> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.EXTRACT_DESIGN_TOKENS,
	);
	const fullPrompt = buildTokenExtractionPrompt({ html: options.html });
	const output = await generate(
		agents.tokenExtractor,
		fullPrompt,
		designTokenSchema,
		config,
	);
	output.colors.background = [...new Set(output.colors.background)];
	output.colors.text = [...new Set(output.colors.text)];
	output.colors.primary = [...new Set(output.colors.primary)];
	output.colors.border = [...new Set(output.colors.border)];
	output.borderRadius = [...new Set(output.borderRadius)];
	output.boxShadow = [...new Set(output.boxShadow)];
	return output;
}

export async function findClickableSelectorsForConnections(options: {
	userId: string;
	sourceHtml: string;
	targets: { connectionId: string; targetDescription: string }[];
}): Promise<{ connectionId: string; selector: string | null }[]> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.FIND_CLICKABLE_SELECTORS,
	);
	const fullPrompt = buildClickableSelectorsPrompt({
		sourceHtml: options.sourceHtml,
		targets: options.targets,
	});
	return generate(
		agents.clickableSelectorFinder,
		fullPrompt,
		clickableSelectorsSchema,
		config,
	);
}

export async function extractComponent(options: {
	userId: string;
	html: string;
	selector: string;
}): Promise<{ componentHtml: string }> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.EXTRACT_COMPONENT,
	);
	const fullPrompt = buildComponentExtractionPrompt({
		html: options.html,
		selector: options.selector,
	});
	const output = await generate(
		agents.componentExtractor,
		fullPrompt,
		componentExtractionSchema,
		config,
	);
	return { componentHtml: sanitizeGeneratedHtml(output.componentHtml) };
}

export async function critiqueDesignQuality(options: {
	userId: string;
	html: string;
	viewMode: "DESKTOP" | "TABLET" | "MOBILE";
	goal?: string | null;
	projectMemoryContext?: string | null;
	designSystem?: DesignSystemContext | null;
}): Promise<DesignQualityCritique> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.CRITIQUE_DESIGN,
	);
	const fullPrompt = buildCritiquePrompt({
		html: options.html,
		viewMode: options.viewMode,
		goal: options.goal,
		styleMemory: options.projectMemoryContext,
		designSystem: options.designSystem,
	});
	return generate(
		agents.designCritic,
		fullPrompt,
		designQualityCritiqueSchema,
		config,
	);
}

export async function synthesizeProjectStyleMemory(options: {
	userId: string;
	projectName?: string | null;
	normalizedSignals: string[];
	existingSummary?: string | null;
	existingDirectives?: string[];
	designTokens?: DesignTokens | null;
}): Promise<ProjectStyleMemorySynthesis> {
	const config = await getUserLlmConfig(options.userId, AiFeature.STYLE_MEMORY);
	const fullPrompt = buildStyleMemoryPrompt({
		projectName: options.projectName,
		existingSummary: options.existingSummary,
		existingDirectives: options.existingDirectives,
		signals: options.normalizedSignals,
		designTokens: options.designTokens,
	});
	return generate(
		agents.styleMemorySynthesizer,
		fullPrompt,
		projectStyleMemorySchema,
		config,
	);
}

export async function planProductFlow(options: {
	userId: string;
	prompt: string;
	maxScreens: number;
	existingScreens?: { id: string; name: string; description?: string | null }[];
	projectMemoryContext?: string | null;
	designSystem?: DesignSystemContext | null;
	components?: { id: string; name: string; html: string }[];
}): Promise<ProductFlowPlan> {
	const config = await getUserLlmConfig(
		options.userId,
		AiFeature.PLAN_PRODUCT_FLOW,
	);
	const fullPrompt = buildFlowPlanPrompt({
		prompt: options.prompt,
		maxScreens: options.maxScreens,
		existingScreens: options.existingScreens?.map((screen) => ({
			id: screen.id,
			name: screen.name,
			description: screen.description ?? undefined,
		})),
		styleMemory: options.projectMemoryContext,
		designSystem: options.designSystem,
		components: options.components,
	});
	return generate(
		agents.productFlowPlanner,
		fullPrompt,
		productFlowPlanSchema,
		config,
	);
}

export function parseTokens(tokens: unknown): DesignTokens | undefined {
	if (!tokens || typeof tokens !== "object") return undefined;
	const result = designTokenSchema.safeParse(tokens);
	return result.success ? result.data : undefined;
}

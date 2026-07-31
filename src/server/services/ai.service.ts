/**
 * AI Service
 * Public facade for AI-powered design operations.
 *
 * Owns the application-facing API surface and orchestrates the Mastra agents
 * defined in `@/server/mastra/agents`. All prompts are assembled here; the
 * agents + shared output schemas live in the agents module.
 */

import type { LlmProvider } from "generated/prisma/enums";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import {
	agents,
	buildDesignSystemContext,
	buildImageMessages,
	clickableSelectorsSchema,
	componentExtractionSchema,
	type DesignQualityCritique,
	designQualityCritiqueSchema,
	designTokenSchema,
	flowGenerationSchema,
	generate,
	generationSchema,
	modificationSchema,
	type ProductFlowPlan,
	type ProjectStyleMemorySynthesis,
	productFlowPlanSchema,
	projectStyleMemorySchema,
	singleModificationSchema,
} from "@/server/mastra/agents";
import type {
	AttachedImage,
	DesignSystemContext,
	DesignTokens,
	GeneratedDesign,
	GeneratedFlow,
	ModifiedDesign,
} from "@/types/shared";

export type AiConfig = {
	provider: LlmProvider;
	apiKey: string;
	model: string;
};

export async function generateDesigns(
	prompt: string,
	count: number,
	config: AiConfig,
	images?: AttachedImage[] | null,
	designSystem?: DesignSystemContext | null,
): Promise<GeneratedDesign[]> {
	const dsContext = buildDesignSystemContext(designSystem);
	const fullPrompt = `Generate ${count} distinct design variation(s). The user's prompt is: "${prompt}".${dsContext}`;
	const output = await generate(
		agents.designGenerator,
		buildImageMessages(fullPrompt, images),
		generationSchema,
		config,
	);
	return output.map((item) => ({
		...item,
		html: sanitizeGeneratedHtml(item.html),
	}));
}

export async function generateDesignFlow(
	prompt: string,
	config: AiConfig,
	images?: AttachedImage[] | null,
	designSystem?: DesignSystemContext | null,
): Promise<GeneratedFlow> {
	const dsContext = buildDesignSystemContext(designSystem);
	const fullPrompt = `Generate a multi-screen flow for: "${prompt}".${dsContext}`;
	const output = await generate(
		agents.designFlowGenerator,
		buildImageMessages(fullPrompt, images),
		flowGenerationSchema,
		config,
	);
	return {
		...output,
		designs: output.designs.map((design) => ({
			...design,
			html: sanitizeGeneratedHtml(design.html),
		})),
	};
}

export async function modifyDesigns(
	designsToModify: ModifiedDesign[],
	modificationPrompt: string,
	config: AiConfig,
	images?: AttachedImage[] | null,
	selector?: string | null,
): Promise<ModifiedDesign[]> {
	const promptContext = selector
		? `The user's instruction is: "${modificationPrompt}". Apply to the element matching CSS selector: "${selector}". Preserve the rest of the structure.`
		: `The user's instruction is: "${modificationPrompt}". Apply to the entire component.`;
	const fullPrompt = `${promptContext}\n\nDesigns to modify: ${JSON.stringify(designsToModify)}`;
	const output = await generate(
		agents.designModifier,
		buildImageMessages(fullPrompt, images),
		modificationSchema,
		config,
	);
	return output.map((item) => ({
		...item,
		html: sanitizeGeneratedHtml(item.html),
	}));
}

export async function applyDesignTokens(
	html: string,
	tokens: DesignTokens,
	config: AiConfig,
): Promise<{ html: string }> {
	const fullPrompt = `Refactor the following HTML to match the provided design tokens.

Design Tokens:
${JSON.stringify(tokens)}

Original HTML:
${html}`;
	const output = await generate(
		agents.tokenApplier,
		fullPrompt,
		singleModificationSchema,
		config,
	);
	return { html: sanitizeGeneratedHtml(output.html) };
}

export async function extractDesignTokens(
	html: string,
	config: AiConfig,
): Promise<DesignTokens> {
	const fullPrompt = `Extract design tokens from the following HTML.

HTML:
${html}`;
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

export async function findClickableSelectorsForConnections(
	sourceHtml: string,
	targets: { connectionId: string; targetDescription: string }[],
	config: AiConfig,
): Promise<{ connectionId: string; selector: string | null }[]> {
	const fullPrompt = `Find clickable elements in the source HTML for the following targets.

Source HTML:
${sourceHtml}

Navigation Targets:
${JSON.stringify(targets)}`;
	return generate(
		agents.clickableSelectorFinder,
		fullPrompt,
		clickableSelectorsSchema,
		config,
	);
}

export async function extractComponent(
	html: string,
	selector: string,
	config: AiConfig,
): Promise<{ componentHtml: string }> {
	const fullPrompt = `Extract the component matching selector "${selector}" from the following HTML.

Full HTML:
${html}

CSS Selector:
${selector}`;
	const output = await generate(
		agents.componentExtractor,
		fullPrompt,
		componentExtractionSchema,
		config,
	);
	return { componentHtml: sanitizeGeneratedHtml(output.componentHtml) };
}

export async function critiqueDesignQuality(options: {
	html: string;
	viewMode: "DESKTOP" | "TABLET" | "MOBILE";
	goal?: string | null;
	projectMemoryContext?: string | null;
	designSystem?: DesignSystemContext | null;
	config: AiConfig;
}): Promise<DesignQualityCritique> {
	const viewports: Record<string, string> = {
		DESKTOP: "desktop-1440x900",
		TABLET: "tablet-834x1112",
		MOBILE: "mobile-390x844",
	};
	const goalContext = options.goal
		? `Primary UX goal: ${options.goal}.`
		: "No UX goal supplied; critique against common expectations.";
	const memoryContext = options.projectMemoryContext ?? "";
	const dsContext = options.designSystem
		? `\n${JSON.stringify(options.designSystem)}`
		: "";
	const fullPrompt = `You are a senior UI reviewer. Review this HTML:

Viewport: ${viewports[options.viewMode] ?? options.viewMode}
${goalContext}${dsContext}${memoryContext}

HTML to review:
${options.html}`;
	return generate(
		agents.designCritic,
		fullPrompt,
		designQualityCritiqueSchema,
		options.config,
	);
}

export async function synthesizeProjectStyleMemory(options: {
	projectName?: string | null;
	normalizedSignals: string[];
	existingSummary?: string | null;
	existingDirectives?: string[];
	designTokens?: DesignTokens | null;
	config: AiConfig;
}): Promise<ProjectStyleMemorySynthesis> {
	const fullPrompt = `Synthesize style memory for project: ${options.projectName ?? "Unknown"}

Existing summary: ${options.existingSummary ?? "None"}
Existing style directives: ${(options.existingDirectives ?? []).join(", ") || "None"}

New normalized signals: ${options.normalizedSignals.join(", ") || "None"}
Design tokens: ${options.designTokens ? JSON.stringify(options.designTokens) : "None"}`;
	return generate(
		agents.styleMemorySynthesizer,
		fullPrompt,
		projectStyleMemorySchema,
		options.config,
	);
}

export async function planProductFlow(options: {
	prompt: string;
	maxScreens: number;
	existingScreens?: { id: string; name: string; description?: string }[];
	projectMemoryContext?: string | null;
	componentLibraryContext?: string | null;
	designSystem?: DesignSystemContext | null;
	config: AiConfig;
}): Promise<ProductFlowPlan> {
	const existingScreens = options.existingScreens?.length
		? JSON.stringify(options.existingScreens)
		: "[]";
	const memoryContext = options.projectMemoryContext ?? "";
	const componentContext = options.componentLibraryContext ?? "";
	const dsContext = options.designSystem
		? JSON.stringify(options.designSystem)
		: "";
	const fullPrompt = `Plan a product flow for: ${options.prompt}

Max screens: ${options.maxScreens}
Existing screens: ${existingScreens}
${dsContext ? `Design System: ${dsContext}` : ""}
${memoryContext ? `Memory: ${memoryContext}` : ""}
${componentContext ? `Components: ${componentContext}` : ""}`;
	return generate(
		agents.productFlowPlanner,
		fullPrompt,
		productFlowPlanSchema,
		options.config,
	);
}

export function parseTokens(tokens: unknown): DesignTokens | undefined {
	if (!tokens || typeof tokens !== "object") return undefined;
	const result = designTokenSchema.safeParse(tokens);
	return result.success ? result.data : undefined;
}

export type {
	DesignQualityCritique,
	ProductFlowPlan,
	ProjectStyleMemorySynthesis,
};

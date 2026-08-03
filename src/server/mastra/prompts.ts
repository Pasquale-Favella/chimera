/**
 * Prompt builders
 * Single home for all prompt assembly in the AI pipeline. Both the Mastra
 * workflows and `services/ai.service.ts` build their prompts here so the
 * agent-facing instructions never drift between the two entry points.
 *
 * This module is intentionally dependency-light (only shared types) so it can
 * be imported by agents, workflows, tools, and services without cycles.
 */

import type {
	AttachedImage,
	DesignSystemContext,
	DesignTokens,
} from "@/types/shared";
import type { AgentContent, AgentContentPart } from "./agent-utils";

export type ComponentRef = { name: string; html: string };

const critiqueViewports: Record<string, string> = {
	DESKTOP: "desktop-1440x900",
	TABLET: "tablet-834x1112",
	MOBILE: "mobile-390x844",
};

// ---------------------------------------------------------------------------
// Shared context fragments
// ---------------------------------------------------------------------------

/** Builds the design-system prompt fragment used across the pipeline. */
export function buildDesignSystemContext(
	designSystem?: DesignSystemContext | null,
): string {
	if (!designSystem) return "";
	return `
IMPORTANT: Strictly adhere to this Design System:
- Colors: Primary=${designSystem.colors.primary}, Secondary=${designSystem.colors.secondary}, Background=${designSystem.colors.background}, Foreground=${designSystem.colors.foreground}, Muted=${designSystem.colors.muted}, Border=${designSystem.colors.border}
- Typography: Font Family=${designSystem.typography.fontFamily}, Heading Font=${designSystem.typography.headingFont || designSystem.typography.fontFamily}, Base Size=${designSystem.typography.baseSize}
- Radius: Small=${designSystem.radius.small}, Medium=${designSystem.radius.medium}, Large=${designSystem.radius.large}

Use Tailwind arbitrary values (e.g. bg-[${designSystem.colors.background}]) for non-standard colors.`;
}

/** Builds the reusable-components prompt fragment used by the AI pipeline. */
export function buildComponentContext(components: ComponentRef[]): string {
	if (!components.length) return "";
	const componentContext = components
		.map((component) => `Component "${component.name}":\n${component.html}`)
		.join("\n\n");
	return `\n\nAvailable Reusable Components (Use these if relevant):\n${componentContext}`;
}

/** Builds a text + optional image message payload for an agent call. */
export function buildImageMessages(
	prompt: string,
	images?: AttachedImage[] | null,
): AgentContent {
	if (!images?.length) return prompt;
	const parts: AgentContentPart[] = [{ type: "text", text: prompt }];
	for (const image of images) {
		parts.push({
			type: "image",
			image: image.dataUrl,
			mediaType: image.mimeType,
		});
	}
	return parts;
}

function buildProjectIdHint(projectId?: string | null): string {
	return projectId
		? `\n\nProject ID (available via the project context tools): ${projectId}`
		: "";
}

function buildStyleMemoryContext(styleMemory?: string | null): string {
	return styleMemory ? `\n\nPersisted Style Memory:\n${styleMemory}` : "";
}

// ---------------------------------------------------------------------------
// Generation prompts
// ---------------------------------------------------------------------------

/** Design variation generation (used by the workflow and `generateDesigns`). */
export function buildDesignGenerationPrompt(options: {
	prompt: string;
	count: number;
	designSystem?: DesignSystemContext | null;
	styleMemory?: string | null;
	components?: ComponentRef[];
	projectId?: string | null;
}): string {
	return `Generate ${options.count} distinct design variation(s). The user's prompt is: "${options.prompt}".${buildDesignSystemContext(
		options.designSystem,
	)}${buildStyleMemoryContext(options.styleMemory)}${buildComponentContext(
		options.components ?? [],
	)}${buildProjectIdHint(options.projectId)}`;
}

/** Product-flow planning (used by the workflow and `planProductFlow`). */
export function buildFlowPlanPrompt(options: {
	prompt: string;
	maxScreens: number;
	existingScreens?: { id: string; name: string; description?: string }[];
	designSystem?: DesignSystemContext | null;
	styleMemory?: string | null;
	components?: ComponentRef[];
	projectId?: string | null;
}): string {
	const existingScreens = options.existingScreens?.length
		? JSON.stringify(options.existingScreens)
		: "[]";
	const memoryContext = options.styleMemory
		? `Memory: ${options.styleMemory}`
		: "";
	const dsContext = options.designSystem
		? JSON.stringify(options.designSystem)
		: "";
	const componentContext = buildComponentContext(options.components ?? []);

	return `Plan a product flow for: ${options.prompt}

Max screens: ${options.maxScreens}
Existing screens: ${existingScreens}
${dsContext ? `Design System: ${dsContext}` : ""}
${memoryContext ? `${memoryContext}` : ""}
${componentContext ? `Components: ${componentContext}` : ""}${buildProjectIdHint(
	options.projectId,
)}`;
}

/** Screen generation from a flow plan (workflow `generateScreens` step). */
export function buildFlowGenerationPrompt(options: {
	prompt: string;
	plan: unknown;
	designSystem?: DesignSystemContext | null;
	styleMemory?: string | null;
	components?: ComponentRef[];
	projectId?: string | null;
}): string {
	return `Generate the screens for the following plan.

Plan:
${JSON.stringify(options.plan)}

User prompt: "${options.prompt}".${buildDesignSystemContext(
		options.designSystem,
	)}${buildStyleMemoryContext(options.styleMemory)}${buildComponentContext(
		options.components ?? [],
	)}${buildProjectIdHint(options.projectId)}`;
}

/** Direct multi-screen flow generation without a planning step. */
export function buildDirectFlowGenerationPrompt(options: {
	prompt: string;
	designSystem?: DesignSystemContext | null;
	styleMemory?: string | null;
	components?: ComponentRef[];
	projectId?: string | null;
}): string {
	return `Generate a multi-screen flow for: "${options.prompt}".${buildDesignSystemContext(
		options.designSystem,
	)}${buildStyleMemoryContext(options.styleMemory)}${buildComponentContext(
		options.components ?? [],
	)}${buildProjectIdHint(options.projectId)}`;
}

// ---------------------------------------------------------------------------
// Modification prompts
// ---------------------------------------------------------------------------

/** Design modification (used by the workflow, `modifyDesigns`, and refining). */
export function buildModificationPrompt(options: {
	instruction: string;
	selector?: string | null;
	designs: { id: string; html: string }[];
}): string {
	const promptContext = options.selector
		? `The user's instruction is: "${options.instruction}". Apply to the element matching CSS selector: "${options.selector}". Preserve the rest of the structure.`
		: `The user's instruction is: "${options.instruction}". Apply to the entire component.`;
	return `${promptContext}\n\nDesigns to modify: ${JSON.stringify(options.designs)}`;
}

// ---------------------------------------------------------------------------
// Critique prompts
// ---------------------------------------------------------------------------

/** UI quality critique (used by the workflow and `critiqueDesignQuality`). */
export function buildCritiquePrompt(options: {
	html: string;
	viewMode?: "DESKTOP" | "TABLET" | "MOBILE";
	goal?: string | null;
	designSystem?: DesignSystemContext | null;
	styleMemory?: string | null;
}): string {
	const viewport = critiqueViewports[options.viewMode ?? "DESKTOP"];
	const goalContext = options.goal
		? `Primary UX goal: ${options.goal}.`
		: "No UX goal supplied; critique against common expectations.";
	const dsContext = options.designSystem
		? `\n${JSON.stringify(options.designSystem)}`
		: "";
	const memoryContext = options.styleMemory
		? `\nProject style memory:\n${options.styleMemory}`
		: "";
	return `You are a senior UI reviewer. Review this HTML:

Viewport: ${viewport}
${goalContext}${dsContext}${memoryContext}

HTML to review:
${options.html}`;
}

// ---------------------------------------------------------------------------
// Style memory prompt
// ---------------------------------------------------------------------------

/** Style-memory synthesis (used by the workflow and `synthesizeProjectStyleMemory`). */
export function buildStyleMemoryPrompt(options: {
	projectName?: string | null;
	existingSummary?: string | null;
	existingDirectives?: string[];
	signals?: string[];
	designTokens?: DesignTokens | null;
}): string {
	return `Synthesize style memory for project: ${options.projectName ?? "Unknown"}

Existing summary: ${options.existingSummary ?? "None"}
Existing style directives: ${(options.existingDirectives ?? []).join(", ") || "None"}

New normalized signals: ${(options.signals ?? []).join(", ") || "None"}
Design tokens: ${
		options.designTokens ? JSON.stringify(options.designTokens) : "None"
	}`;
}

// ---------------------------------------------------------------------------
// Token / extraction prompts (ai.service only)
// ---------------------------------------------------------------------------

/** Design-token refactor (used by `applyDesignTokens`). */
export function buildTokenRefactorPrompt(options: {
	html: string;
	tokens: DesignTokens;
}): string {
	return `Refactor the following HTML to match the provided design tokens.

Design Tokens:
${JSON.stringify(options.tokens)}

Original HTML:
${options.html}`;
}

/** Design-token extraction (used by `extractDesignTokens`). */
export function buildTokenExtractionPrompt(options: { html: string }): string {
	return `Extract design tokens from the following HTML.

HTML:
${options.html}`;
}

/** Clickable-selector finding (used by `findClickableSelectorsForConnections`). */
export function buildClickableSelectorsPrompt(options: {
	sourceHtml: string;
	targets: { connectionId: string; targetDescription: string }[];
}): string {
	return `Find clickable elements in the source HTML for the following targets.

Source HTML:
${options.sourceHtml}

Navigation Targets:
${JSON.stringify(options.targets)}`;
}

/** Component extraction (used by `extractComponent`). */
export function buildComponentExtractionPrompt(options: {
	html: string;
	selector: string;
}): string {
	return `Extract the component matching selector "${options.selector}" from the following HTML.

Full HTML:
${options.html}

CSS Selector:
${options.selector}`;
}

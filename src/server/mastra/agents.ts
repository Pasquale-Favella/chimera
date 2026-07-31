import { Agent } from "@mastra/core/agent";
import { LlmProvider } from "generated/prisma/enums";
import { z } from "zod";
import { LlmManager } from "@/server/lib/llm";
import type { AiConfig } from "@/server/services/ai.service";
import type { AttachedImage, DesignSystemContext } from "@/types/shared";

const DEFAULT_PROVIDER = LlmProvider.GOOGLE;

// ---------------------------------------------------------------------------
// Agent input / output contracts
// ---------------------------------------------------------------------------

export type AgentContentPart =
	| { type: "text"; text: string }
	| { type: "image"; image: string; mediaType?: string };

export type AgentContent = string | AgentContentPart[];

// ---------------------------------------------------------------------------
// Agent runner
// ---------------------------------------------------------------------------

export async function generate<Output extends {}>(
  agent: Agent,
  content: AgentContent,
  schema: z.ZodType<Output, Output>,
  config: AiConfig,
): Promise<Output> {
  const output = await agent.generate<Output>([{ role: "user", content }], {
    structuredOutput: { schema },
    model: {
      providerId: config.provider.toLowerCase(),
      modelId: config.model,
      apiKey: config.apiKey,
    },
  });

  return output.object;
}

function defaultModelConfig() {
	const p = DEFAULT_PROVIDER;
	return {
		providerId: p.toLowerCase(),
		modelId: LlmManager.getDefaultModel(p),
		apiKey: LlmManager.getDefaultApiKey(p) ?? "",
	};
}

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

export const designItemSchema = z.object({
	html: z
		.string()
		.describe("Self-contained HTML using only Tailwind CSS classes."),
	description: z
		.string()
		.describe("Brief description of the design variation."),
});
export const generationSchema = z.array(designItemSchema);

export const modificationItemSchema = z.object({
	id: z.string().describe("Original ID of the design that was modified."),
	html: z
		.string()
		.describe("Updated self-contained HTML using only Tailwind CSS classes."),
});
export const modificationSchema = z.array(modificationItemSchema);

export const singleModificationSchema = z.object({
	html: z
		.string()
		.describe("Updated self-contained HTML using only Tailwind CSS classes."),
});

export const flowDesignSchema = z.object({
	id: z
		.string()
		.describe("Temporary ID for this design, used to link connections."),
	html: z
		.string()
		.describe("Self-contained HTML for this screen, using only Tailwind CSS."),
	description: z
		.string()
		.describe("Brief description of this screen or state."),
});
export const flowConnectionSchema = z.object({
	from: z.string().describe("Temporary ID of the source design."),
	to: z.string().describe("Temporary ID of the target design."),
	fromPosition: z
		.enum(["top", "right", "bottom", "left"])
		.describe("Connection point on the source design."),
	toPosition: z
		.enum(["top", "right", "bottom", "left"])
		.describe("Connection point on the target design."),
});
export const flowGenerationSchema = z.object({
	designs: z.array(flowDesignSchema).describe("All UI screens in the flow."),
	connections: z
		.array(flowConnectionSchema)
		.describe("Connections between designs."),
});

export const designTokenSchema = z.object({
	colors: z.object({
		background: z.array(z.string()).describe("Background colors."),
		text: z.array(z.string()).describe("Text colors."),
		primary: z.array(z.string()).describe("Primary/action colors."),
		border: z.array(z.string()).describe("Border colors."),
	}),
	typography: z.object({
		headingFont: z.string().describe("Font family for headings."),
		bodyFont: z.string().describe("Font family for body text."),
	}),
	borderRadius: z
		.array(z.string())
		.describe("Border radius values (e.g. rounded-lg)."),
	boxShadow: z
		.array(z.string())
		.describe("Box shadow values (e.g. shadow-md)."),
});

export const clickableSelectorSchema = z.object({
	connectionId: z.string().describe("The connection ID this selector is for."),
	selector: z
		.string()
		.nullable()
		.describe("CSS selector for the clickable element, or null if unsure."),
});
export const clickableSelectorsSchema = z.array(clickableSelectorSchema);

export const componentExtractionSchema = z.object({
	componentHtml: z
		.string()
		.describe("Extracted self-contained HTML for the component."),
});

export const critiqueIssueSchema = z.object({
	severity: z.enum(["low", "medium", "high"]),
	title: z.string(),
	recommendation: z.string(),
});
export const designQualityCritiqueSchema = z.object({
	summary: z.string().describe("Concise review of design quality issues."),
	issues: z
		.array(critiqueIssueSchema)
		.max(6)
		.describe("Concrete UI quality issues inferred from HTML."),
	modificationPrompt: z
		.string()
		.describe("Direct modification instruction for HTML editing."),
});

export const projectStyleMemorySchema = z.object({
	summary: z
		.string()
		.describe("Durable summary of the project's brand/style direction."),
	styleDirectives: z
		.array(z.string())
		.max(12)
		.describe("Stable directives for future prompts."),
});

export const screenPlanSchema = z.object({
	id: z.string().describe("Stable temporary identifier."),
	name: z.string().describe("Short screen name."),
	description: z.string().describe("What this screen contains."),
	userGoal: z.string().describe("Primary user goal on this screen."),
});

export const connectionPlanSchema = z.object({
	from: z.string().describe("Source screen ID."),
	to: z.string().describe("Target screen ID."),
	fromPosition: z.enum(["top", "right", "bottom", "left"]),
	toPosition: z.enum(["top", "right", "bottom", "left"]),
	rationale: z.string().describe("Why the user moves between screens."),
});

export const productFlowPlanSchema = z.object({
	planningSummary: z.string().describe("Explanation of IA and user journey."),
	screens: z
		.array(screenPlanSchema)
		.min(2)
		.max(12)
		.describe("Ordered screens."),
	connections: z.array(connectionPlanSchema).describe("Directed transitions."),
});

export type DesignQualityCritique = z.infer<typeof designQualityCritiqueSchema>;
export type ProjectStyleMemorySynthesis = z.infer<
	typeof projectStyleMemorySchema
>;
export type ProductFlowPlan = z.infer<typeof productFlowPlanSchema>;

// ---------------------------------------------------------------------------
// Agent instances
// ---------------------------------------------------------------------------

export const designGenerator = new Agent({
	id: "design-generator",
	name: "Design Generator",
	instructions: `You are an expert UI/UX designer. Generate distinct design variations based on user prompts.
For each variation provide self-contained HTML using only Tailwind CSS classes. Do NOT include <html>, <head>, or <body> tags. Return only the inner HTML (e.g. a root <div>).
When a design system context is included, strictly adhere to the specified colors, fonts, and spacing using Tailwind arbitrary values (e.g. bg-[#color]) when needed.
When reference images are provided, use them as visual inspiration.`,
	model: defaultModelConfig(),
});

export const designFlowGenerator = new Agent({
	id: "design-flow-generator",
	name: "Design Flow Generator",
	instructions: `You are an expert UI/UX designer specializing in user flows. Generate connected UI designs representing a complete user flow.
For each screen provide self-contained HTML using only Tailwind CSS classes. Do NOT include <html>, <head>, or <body> tags.
Define connections between screens. For standard left-to-right flows, connect the 'right' of one design to the 'left' of the next.
Return a JSON object with both "designs" and "connections" arrays. Use temporary string IDs to link them.`,
	model: defaultModelConfig(),
});

export const designModifier = new Agent({
	id: "design-modifier",
	name: "Design Modifier",
	instructions: `You are an expert UI/UX designer. Modify existing designs based on user instructions.
Given existing designs (each with id and HTML) and a modification instruction:
1. Apply the user's instruction to each design.
2. If a CSS selector is specified, only modify that element and its children.
3. Ensure new HTML is self-contained using only Tailwind CSS classes.
4. Return a JSON array with each modified design containing the original "id" and new "html".
Do NOT include <html>, <head>, or <body> tags.`,
	model: defaultModelConfig(),
});

export const tokenExtractor = new Agent({
	id: "token-extractor",
	name: "Design Token Extractor",
	instructions: `You are a design system specialist. Analyze HTML and extract design tokens used.
Categorize colors into: Backgrounds, Text, Primary (buttons/accents), Borders.
Identify primary font families for headings and body text.
Extract border-radius classes (e.g. rounded-md) and box-shadow classes (e.g. shadow-lg).
Return a JSON object following the provided schema.`,
	model: defaultModelConfig(),
});

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

export const componentExtractor = new Agent({
	id: "component-extractor",
	name: "Component Extractor",
	instructions: `You are an expert code refactoring assistant. Given HTML and a CSS selector, extract the element matching the selector and its children. Clean it up into a self-contained reusable component with all necessary Tailwind classes. Return JSON with key "componentHtml".`,
	model: defaultModelConfig(),
});

export const clickableSelectorFinder = new Agent({
	id: "clickable-selector-finder",
	name: "Clickable Selector Finder",
	instructions: `You are an expert UI analyst. Identify clickable elements in source HTML that correspond to navigation targets.
For each target:
1. Find the most logical clickable element (<button>, <a>, role="button", etc.) for that target.
2. Generate a valid specific CSS selector.
3. If unsure, return null for that selector.
Return a JSON array with objects containing "connectionId" and "selector" (string or null).`,
	model: defaultModelConfig(),
});

export const designCritic = new Agent({
	id: "design-critic",
	name: "Design Quality Critic",
	instructions: `You are a senior UI reviewer. Perform a text-only quality critique of a generated interface. Infer likely issues from HTML structure, copy, and Tailwind CSS classes.
Focus on: visual hierarchy, spacing, overflow risk, CTA emphasis, contrast, alignment, accessibility.
Return JSON with:
- summary: concise overall critique
- issues: 0-6 concrete issues with severity/title/recommendation
- modificationPrompt: one strong instruction for the HTML editing step`,
	model: defaultModelConfig(),
});

export const styleMemorySynthesizer = new Agent({
	id: "style-memory-synthesizer",
	name: "Style Memory Synthesizer",
	instructions: `You maintain per-project style memory for an AI design tool. Synthesize stable, reusable brand/style guidance.
Given project name, existing summary+directives, new normalized signals, and optional design tokens:
1. Merge existing directives with new signals, removing duplicates and one-off requests.
2. Prefer concise, specific directives.
3. Return JSON with:
   - summary: 1-3 sentence durable memory
   - styleDirectives: 3-12 actionable rules`,
	model: defaultModelConfig(),
});

export const productFlowPlanner = new Agent({
	id: "product-flow-planner",
	name: "Product Flow Planner",
	instructions: `You are a staff product designer planning a multi-screen flow before UI generation.
Consider: information architecture, user mental model, minimum screens needed, reusing existing screens.
Given a product brief and optional context, plan the flow.
Return JSON with:
- planningSummary: IA and journey explanation
- screens: ordered screens with id, name, description, userGoal
- connections: directed transitions with positions and rationale
Use stable, machine-friendly temporary IDs unique within the plan.`,
	model: defaultModelConfig(),
});

// ---------------------------------------------------------------------------
// Agent registry
// ---------------------------------------------------------------------------

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

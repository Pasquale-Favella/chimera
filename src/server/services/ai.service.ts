/**
 * AI Service
 * Generic AI service that uses the LlmManager for provider-agnostic generation.
 */

import { createHash } from "node:crypto";
import {
	type DeepPartial,
	generateText,
	type LanguageModelUsage,
	type ModelMessage,
	type ObjectStreamPart,
	Output,
	streamObject,
	type UserModelMessage,
} from "ai";
import { Effect, Stream, TSemaphore } from "effect";
import { z } from "zod";
import { db } from "@/server/db";
import {
	AiNonRetryableError,
	type AiReliabilityError,
	classifyAiError,
	executeAiOperation,
	getAiRateLimitSemaphore,
} from "@/server/lib/effect/ai-reliability";
import { LlmManager } from "@/server/lib/llm";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import { renderUINodeToHtml } from "@/server/lib/schema/render-ui-node";
import { uiNodeSchema } from "@/server/lib/schema/ui-node.schema";
import type {
	AttachedImage,
	DesignSystemContext,
	DesignTokens,
	GeneratedDesign,
	GeneratedFlow,
	ModifiedDesign,
} from "@/types/shared";
import { LlmProvider } from "generated/prisma/enums";

const AI_REQUEST_TIMEOUT = "45 seconds";
const MAX_LOG_ERROR_MESSAGE_LENGTH = 1_000;

export class StructuredAiCallError extends Error {
	public readonly classifiedError: AiReliabilityError;

	constructor(message: string, classifiedError: AiReliabilityError) {
		super(message, { cause: classifiedError });
		this.name = "StructuredAiCallError";
		this.classifiedError = classifiedError;
	}
}

export type AiConfig = {
	provider?: LlmProvider;
	apiKey?: string | null;
	model?: string | null;
	userId?: string | null;
	projectId?: string | null;
	rateLimitKey?: string | null;
};

export const aiConfigSchema = z.custom<AiConfig>();

type ResolvedAiConfig = {
	provider: LlmProvider;
	apiKey: string;
	modelId: string;
	model: ReturnType<typeof LlmManager.createModel>;
	userId: string | null;
	projectId: string | null;
	rateLimitKey: string;
};

export type StructuredAiCallOptions<T> = {
	operation: string;
	schema: z.ZodType<T>;
	messages: ModelMessage[];
	config?: AiConfig;
	failureMessage: string;
	logLabel: string;
};

type AiUsageLogInput = {
	resolvedConfig: ResolvedAiConfig;
	operation: string;
	usage?: LanguageModelUsage;
	latencyMs: number;
	success: boolean;
	errorMessage?: string;
};

const createClient = (config?: AiConfig): ResolvedAiConfig | null => {
	const provider = config?.provider ?? LlmProvider.GOOGLE;
	const apiKey = config?.apiKey ?? LlmManager.getDefaultApiKey(provider);
	if (!apiKey) return null;

	const modelId = config?.model ?? LlmManager.getDefaultModel(provider);

	return {
		provider,
		apiKey,
		modelId,
		model: LlmManager.createModel({
			provider,
			apiKey,
			model: modelId,
		}),
		userId: config?.userId ?? null,
		projectId: config?.projectId ?? null,
		rateLimitKey:
			config?.rateLimitKey ??
			createRateLimitScopeKey(provider, apiKey, config?.userId),
	};
};

function createRateLimitScopeKey(
	provider: LlmProvider,
	apiKey: string,
	userId?: string | null,
) {
	if (userId) {
		return `user:${userId}`;
	}

	const apiKeyHash = createHash("sha256")
		.update(`${provider}:${apiKey}`)
		.digest("hex")
		.slice(0, 16);
	return `api-key:${apiKeyHash}`;
}

function toLogErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message.slice(0, MAX_LOG_ERROR_MESSAGE_LENGTH);
	}

	if (typeof error === "string") {
		return error.slice(0, MAX_LOG_ERROR_MESSAGE_LENGTH);
	}

	return "Unknown AI service failure.";
}

export async function logAiUsage({
	resolvedConfig,
	operation,
	usage,
	latencyMs,
	success,
	errorMessage,
}: AiUsageLogInput) {
	try {
		await db.aiUsageLog.create({
			data: {
				userId: resolvedConfig.userId,
				projectId: resolvedConfig.projectId,
				operation,
				provider: resolvedConfig.provider,
				model: resolvedConfig.modelId,
				promptTokens: usage?.inputTokens ?? null,
				completionTokens: usage?.outputTokens ?? null,
				totalTokens: usage?.totalTokens ?? null,
				latencyMs,
				success,
				errorMessage:
					errorMessage?.slice(0, MAX_LOG_ERROR_MESSAGE_LENGTH) ?? null,
			},
		});
	} catch (logError) {
		console.error("Failed to write AI usage log:", logError);
	}
}

export async function runStructuredAiCall<T>({
	operation,
	schema,
	messages,
	config,
	failureMessage,
	logLabel,
}: StructuredAiCallOptions<T>): Promise<T> {
	const resolvedConfig = createClient(config);
	if (!resolvedConfig) {
		throw new Error("No API key configured for the selected provider");
	}

	const startedAt = Date.now();

	try {
		const { result, usage } = await Effect.runPromise(
			executeAiOperation(
				{
					operation,
					provider: resolvedConfig.provider,
					model: resolvedConfig.modelId,
					scopeKey: resolvedConfig.rateLimitKey,
					timeout: AI_REQUEST_TIMEOUT,
				},
				async () => {
					const { output, usage } = await generateText({
						model: resolvedConfig.model,
						output: Output.object({ schema }),
						messages,
						maxRetries: 0,
					});

					return { result: output, usage };
				},
			),
		);

		await logAiUsage({
			resolvedConfig,
			operation,
			usage,
			latencyMs: Date.now() - startedAt,
			success: true,
		});

		return result;
	} catch (error) {
		const classifiedError = classifyAiError(error, {
			operation,
			provider: resolvedConfig.provider,
			model: resolvedConfig.modelId,
		});

		await logAiUsage({
			resolvedConfig,
			operation,
			latencyMs: Date.now() - startedAt,
			success: false,
			errorMessage: toLogErrorMessage(classifiedError),
		});

		console.error(logLabel, classifiedError);
		throw new StructuredAiCallError(failureMessage, classifiedError);
	}
}

function buildDesignSystemContext(designSystem?: DesignSystemContext | null) {
	if (!designSystem) {
		return "";
	}

	return `
IMPORTANT: You MUST STRICTLY adhere to the following Design System. Do not use arbitrary colors or fonts.
- Colors:
  - Primary: ${designSystem.colors.primary}
  - Secondary: ${designSystem.colors.secondary}
  - Background: ${designSystem.colors.background}
  - Foreground: ${designSystem.colors.foreground}
  - Muted: ${designSystem.colors.muted}
  - Border: ${designSystem.colors.border}
- Typography:
  - Font Family: ${designSystem.typography.fontFamily}
  - Heading Font: ${designSystem.typography.headingFont || designSystem.typography.fontFamily}
  - Base Size: ${designSystem.typography.baseSize}
- Radius:
  - Small: ${designSystem.radius.small}
  - Medium: ${designSystem.radius.medium}
  - Large: ${designSystem.radius.large}

Use Tailwind arbitrary values (e.g. bg-[${designSystem.colors.background}]) if the design system colors do not map directly to standard Tailwind colors.
`;
}

// Zod schemas for structured outputs
const designItemSchema = z.object({
	html: z
		.string()
		.describe(
			"The self-contained HTML code for the design, using only Tailwind CSS classes for styling.",
		),
	description: z
		.string()
		.describe("A brief description of the generated design variation."),
});

const generationSchema = z.array(designItemSchema);

const structuredDesignItemSchema = z.object({
	schema: uiNodeSchema.describe(
		"A single-root, recursive UI node tree that describes the design structure and styling.",
	),
	description: z
		.string()
		.describe("A brief description of the generated design variation."),
});

const structuredGenerationSchema = z.array(structuredDesignItemSchema);

const modificationItemSchema = z.object({
	id: z.string().describe("The original ID of the design that was modified."),
	html: z
		.string()
		.describe(
			"The updated, self-contained HTML code for the design, using only Tailwind CSS classes for styling.",
		),
});

const modificationSchema = z.array(modificationItemSchema);

const singleModificationSchema = z.object({
	html: z
		.string()
		.describe(
			"The updated, self-contained HTML code for the design, using only Tailwind CSS classes for styling.",
		),
});

const flowDesignSchema = z.object({
	id: z
		.string()
		.describe(
			"A unique temporary ID for this design, used to link connections.",
		),
	schema: uiNodeSchema.describe(
		"A single-root, recursive UI node tree that describes this screen.",
	),
	description: z
		.string()
		.describe("A brief description of this specific screen or state."),
});

const flowConnectionSchema = z.object({
	from: z.string().describe("The temporary ID of the source design."),
	to: z.string().describe("The temporary ID of the target design."),
	fromPosition: z
		.enum(["top", "right", "bottom", "left"])
		.describe(
			"The connection point on the source design. MUST be one of 'top', 'right', 'bottom', or 'left'.",
		),
	toPosition: z
		.enum(["top", "right", "bottom", "left"])
		.describe(
			"The connection point on the target design. MUST be one of 'top', 'right', 'bottom', or 'left'.",
		),
});

const flowGenerationSchema = z.object({
	designs: z
		.array(flowDesignSchema)
		.describe("An array of all the UI screens (designs) in the flow."),
	connections: z
		.array(flowConnectionSchema)
		.describe("An array defining the connections between the designs."),
});

const designTokenSchema = z.object({
	colors: z.object({
		background: z
			.array(z.string())
			.describe("Background colors found in the design."),
		text: z.array(z.string()).describe("Text colors found in the design."),
		primary: z.array(z.string()).describe("Primary brand or action colors."),
		border: z.array(z.string()).describe("Border colors."),
	}),
	typography: z.object({
		headingFont: z
			.string()
			.describe("The primary font family used for headings."),
		bodyFont: z
			.string()
			.describe("The primary font family used for body text."),
	}),
	borderRadius: z
		.array(z.string())
		.describe("Border radius values (e.g., 'rounded-lg')."),
	boxShadow: z
		.array(z.string())
		.describe("Box shadow values (e.g., 'shadow-md')."),
});

const clickableSelectorSchema = z.object({
	connectionId: z
		.string()
		.describe("The ID of the connection this selector is for."),
	selector: z
		.string()
		.nullable()
		.describe(
			"The CSS selector for the most likely clickable element (button, link, etc.) that corresponds to this connection. If no clear element is found, this can be null.",
		),
});

const clickableSelectorsSchema = z.array(clickableSelectorSchema);

const componentExtractionSchema = z.object({
	componentHtml: z
		.string()
		.describe(
			"The extracted, self-contained HTML code for the requested component.",
		),
});

const designQualityCritiqueSchema = z.object({
	summary: z.string().describe("A concise review of the design quality issues found."),
	issues: z
		.array(
			z.object({
				severity: z.enum(["low", "medium", "high"]),
				title: z.string(),
				recommendation: z.string(),
			}),
		)
		.max(6)
		.describe("Concrete UI quality issues inferred from the HTML and Tailwind classes."),
	modificationPrompt: z
		.string()
		.describe("A direct modification instruction that can be fed into the HTML editing step."),
});

const projectStyleMemorySchema = z.object({
	summary: z.string().describe("A durable summary of the project's approved brand/style direction."),
	styleDirectives: z
		.array(z.string())
		.max(12)
		.describe("Stable style directives to inject into future prompts for this project."),
});

const productFlowPlanScreenSchema = z.object({
	id: z.string().describe("A stable temporary identifier for the planned screen."),
	name: z.string().describe("Short screen name."),
	description: z.string().describe("What this screen contains and why it exists."),
	userGoal: z.string().describe("Primary user goal achieved on this screen."),
});

const productFlowPlanConnectionSchema = z.object({
	from: z.string().describe("The temporary ID of the source screen."),
	to: z.string().describe("The temporary ID of the target screen."),
	fromPosition: z.enum(["top", "right", "bottom", "left"]),
	toPosition: z.enum(["top", "right", "bottom", "left"]),
	rationale: z.string().describe("Why the user moves from the source screen to the target screen."),
});

const productFlowPlanSchema = z.object({
	planningSummary: z.string().describe("A concise explanation of the planned IA and user journey."),
	screens: z
		.array(productFlowPlanScreenSchema)
		.min(2)
		.max(12)
		.describe("Ordered screen plan for the product flow."),
	connections: z
		.array(productFlowPlanConnectionSchema)
		.describe("Directed transitions between the planned screens."),
});

export type DesignQualityCritique = z.infer<typeof designQualityCritiqueSchema>;
export type ProjectStyleMemorySynthesis = z.infer<typeof projectStyleMemorySchema>;
export type ProductFlowPlan = z.infer<typeof productFlowPlanSchema>;

function buildMessages(
	prompt: string,
	images?: AttachedImage[] | null,
): ModelMessage[] {
	if (!images || images.length === 0) {
		return [{ role: "user", content: prompt }];
	}

	const content: UserModelMessage["content"] = [{ type: "text", text: prompt }];

	images.forEach((image) => {
		content.push({
			type: "file",
			data: image.dataUrl,
			mediaType: image.mimeType,
		});
	});

	return [{ role: "user", content }];
}

export type DesignGenerationStreamChunk = ObjectStreamPart<
	DeepPartial<z.infer<typeof generationSchema>>
>;

function buildStructuredDesignPrompt(
	prompt: string,
	count: number,
	designSystemContext: string,
) {
	return `You are an expert UI/UX designer. Based on the user's prompt (and the provided image(s), if any), generate ${count} distinct design variation(s).

The user's prompt is: "${prompt}".

Return a JSON array where each item contains:
- "schema": a single-root recursive UINode tree
- "description": a brief description of the variation

UINode guidance:
- Each node MUST have a unique "id" and a "type".
- Use semantic types such as "div", "section", "header", "button", "input", "text", "image", "nav", "form", or "container".
- Use "layout" for Figma-like auto-layout hints: display, flexDirection, gap, padding, margin, justifyContent, alignItems, width, height, position, etc.
- Use "style" for visual choices: backgroundColor, textColor, borderColor, borderRadius, shadow, fontFamily, fontSize, fontWeight, textAlign, objectFit, plus "classes" when you need raw Tailwind utilities.
- Use "props" only for serializable attributes/content such as text, src, alt, href, placeholder, aria-label, type, className, and as.
- Use "children" recursively for nested content.
- Prefer design system token keys in "style" when relevant (for example "primary", "background", "foreground", "border", "small", "medium", "large"), and fall back to raw Tailwind classes in style.classes or props.className when needed.
- The rendered result must become a visually complete Tailwind-styled component when converted to HTML.
- Do NOT include HTML strings, markdown fences, or explanations.

${designSystemContext}`;
}

export function streamDesignGeneration(
	prompt: string,
	count: number,
	images?: AttachedImage[] | null,
	config?: AiConfig,
	designSystem?: DesignSystemContext | null,
): Stream.Stream<DesignGenerationStreamChunk, AiReliabilityError> {
	const resolvedConfig = createClient(config);
	if (!resolvedConfig) {
		return Stream.fail(
			new AiNonRetryableError({
				operation: "stream-design-generation",
				provider: config?.provider ?? LlmProvider.GOOGLE,
				model:
					config?.model ??
					LlmManager.getDefaultModel(config?.provider ?? LlmProvider.GOOGLE),
				message: "No API key configured for the selected provider",
			}),
		);
	}

	const designSystemContext = buildDesignSystemContext(designSystem);
	const fullPrompt = `You are an expert UI/UX designer. Based on the user's prompt (and the provided image(s), if any), generate ${count} distinct design variation(s). The user's prompt is: "${prompt}". For each variation, provide self-contained HTML using only Tailwind CSS classes for styling. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags. Return only the inner HTML structure (e.g., a root \`<div>\`). Do not include any external stylesheets or script tags. The designs should be visually complete components. ${designSystemContext}`;

	return Stream.unwrapScoped(
		Effect.gen(function* () {
			yield* TSemaphore.withPermitScoped(
				getAiRateLimitSemaphore(resolvedConfig.rateLimitKey),
			);

			const startedAt = Date.now();
			const streamResult = yield* Effect.try({
				try: () =>
					streamObject({
						model: resolvedConfig.model,
						schema: generationSchema,
						messages: buildMessages(fullPrompt, images),
						maxRetries: 0,
					}),
				catch: (error) =>
					classifyAiError(error, {
						operation: "stream-design-generation",
						provider: resolvedConfig.provider,
						model: resolvedConfig.modelId,
					}),
			});

			void streamResult.object
				.then(async () => {
					const usage = await streamResult.usage;
					await logAiUsage({
						resolvedConfig,
						operation: "stream-design-generation",
						usage,
						latencyMs: Date.now() - startedAt,
						success: true,
					});
				})
				.catch(async (error) => {
					const classifiedError = classifyAiError(error, {
						operation: "stream-design-generation",
						provider: resolvedConfig.provider,
						model: resolvedConfig.modelId,
					});

					await logAiUsage({
						resolvedConfig,
						operation: "stream-design-generation",
						latencyMs: Date.now() - startedAt,
						success: false,
						errorMessage: toLogErrorMessage(classifiedError),
					});
				});

			return Stream.fromAsyncIterable(streamResult.fullStream, (error) =>
				classifyAiError(error, {
					operation: "stream-design-generation",
					provider: resolvedConfig.provider,
					model: resolvedConfig.modelId,
				}),
			);
		}),
	);
}

export async function generateDesigns(
	prompt: string,
	count: number,
	images?: AttachedImage[] | null,
	config?: AiConfig,
	designSystem?: DesignSystemContext | null,
): Promise<GeneratedDesign[]> {
	const designSystemContext = buildDesignSystemContext(designSystem);
	const fullPrompt = `You are an expert UI/UX designer. Based on the user's prompt (and the provided image(s), if any), generate ${count} distinct design variation(s). The user's prompt is: "${prompt}". For each variation, provide self-contained HTML using only Tailwind CSS classes for styling. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags. Return only the inner HTML structure (e.g., a root \`<div>\`). Do not include any external stylesheets or script tags. The designs should be visually complete components. ${designSystemContext}`;

	try {
		const structuredOutput = await runStructuredAiCall({
			operation: "generate-designs-structured",
			schema: structuredGenerationSchema,
			messages: buildMessages(
				buildStructuredDesignPrompt(prompt, count, designSystemContext),
				images,
			),
			config,
			failureMessage:
				"Failed to generate structured designs. Please check the prompt and try again.",
			logLabel: "Error generating structured designs:",
		});

		return structuredOutput.map((item) => {
			const html = sanitizeGeneratedHtml(
				renderUINodeToHtml(item.schema, designSystem ?? undefined),
			);

			return {
				description: item.description,
				html,
				schema: item.schema,
			};
		});
	} catch (error) {
		console.warn(
			"Structured UI schema generation failed, falling back to HTML generation.",
			error,
		);

		const output = await runStructuredAiCall({
			operation: "generate-designs",
			schema: generationSchema,
			messages: buildMessages(fullPrompt, images),
			config,
			failureMessage:
				"Failed to generate designs. Please check the prompt and try again.",
			logLabel: "Error generating designs:",
		});

		return output.map((item) => ({
			...item,
			html: sanitizeGeneratedHtml(item.html),
			schema: null,
		}));
	}
}

export async function generateDesignFlow(
	prompt: string,
	images?: AttachedImage[] | null,
	config?: AiConfig,
	designSystem?: DesignSystemContext | null,
): Promise<GeneratedFlow> {
	const designSystemContext = buildDesignSystemContext(designSystem);
	const fullPrompt = `You are an expert UI/UX designer specializing in user flows. Based on the user's prompt (and the provided image(s), if any), generate a series of connected UI designs that represent a complete user flow. The user's prompt is: "${prompt}".

Your task is to:
1.  Identify the key screens or states in the described flow.
2.  Generate the HTML for each screen using only Tailwind CSS classes.
3.  Define the connections between these screens. For a standard left-to-right flow, connect the 'right' side of one component to the 'left' side of the next.
4.  Return a single JSON object that conforms to the provided schema, containing both the designs and their connections. Use temporary string IDs to link them. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags. ${designSystemContext}`;

	const structuredFlowPrompt = `You are an expert UI/UX designer specializing in user flows. Based on the user's prompt (and the provided image(s), if any), generate a series of connected UI designs that represent a complete user flow. The user's prompt is: "${prompt}".

Your task is to:
1. Identify the key screens or states in the described flow.
2. Generate a recursive UINode schema for each screen instead of HTML.
3. Define the connections between these screens. For a standard left-to-right flow, connect the "right" side of one component to the "left" side of the next.
4. Return a single JSON object that conforms to the provided schema, containing both the designs and their connections. Use temporary string IDs to link them.
5. Each design item must include:
   - "id": temporary string ID
   - "schema": a single-root UINode tree
   - "description": a brief explanation of the screen
6. Follow this UINode guidance:
   - unique node ids
   - semantic node types
   - layout for flex/grid/spacing/sizing/position
   - style for visual tokens and raw Tailwind utilities via style.classes
   - props for serializable content and attributes
   - children for nested structure
7. Do NOT include HTML strings, markdown fences, or explanations.

${designSystemContext}`;

	try {
		const output = await runStructuredAiCall({
			operation: "generate-design-flow-structured",
			schema: flowGenerationSchema,
			messages: buildMessages(structuredFlowPrompt, images),
			config,
			failureMessage:
				"Failed to generate structured design flow. Please check the prompt and try again.",
			logLabel: "Error generating structured design flow:",
		});

		return {
			...output,
			designs: output.designs.map((design) => ({
				...design,
				html: sanitizeGeneratedHtml(
					renderUINodeToHtml(design.schema, designSystem ?? undefined),
				),
				schema: design.schema,
			})),
		} as GeneratedFlow;
	} catch (error) {
		console.warn(
			"Structured UI flow generation failed, falling back to HTML generation.",
			error,
		);

		const output = await runStructuredAiCall({
			operation: "generate-design-flow",
			schema: z.object({
				designs: z
					.array(
						z.object({
							id: z.string(),
							html: z.string(),
							description: z.string(),
						}),
					)
					.describe("An array of all the UI screens (designs) in the flow."),
				connections: flowConnectionSchema
					.array()
					.describe("An array defining the connections between the designs."),
			}),
			messages: buildMessages(fullPrompt, images),
			config,
			failureMessage:
				"Failed to generate design flow. Please check the prompt and try again.",
			logLabel: "Error generating design flow:",
		});

		return {
			...output,
			designs: output.designs.map((design) => ({
				...design,
				html: sanitizeGeneratedHtml(design.html),
				schema: null,
			})),
		} as GeneratedFlow;
	}
}

export async function modifyDesigns(
	designsToModify: ModifiedDesign[],
	modificationPrompt: string,
	images?: AttachedImage[] | null,
	selector?: string | null,
	config?: AiConfig,
): Promise<ModifiedDesign[]> {
	const promptContext = selector
		? `The user's instruction is: "${modificationPrompt}". This change should be applied specifically to the element identified by the CSS selector: "${selector}". Be precise and only modify that element and its children if necessary, preserving the rest of the structure.`
		: `The user's instruction is: "${modificationPrompt}". Apply this change to the entire component.`;

	const fullPrompt = `You are an expert UI/UX designer. The user wants to modify some existing designs, possibly using an image or images as a reference. ${promptContext} The designs to modify are provided below as a JSON array of objects, each with an "id" and its current "html". Apply the user's instruction to each of the provided designs. Return a JSON array containing objects for EACH of the modified designs. Each object must have the original "id" and the new "html". Ensure the new HTML is self-contained and uses only Tailwind CSS classes. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags. \n\nDesigns to modify: ${JSON.stringify(designsToModify)}`;

	const output = await runStructuredAiCall({
		operation: "modify-designs",
		schema: modificationSchema,
		messages: buildMessages(fullPrompt, images),
		config,
		failureMessage:
			"Failed to modify designs. The model may not have been able to apply the changes.",
		logLabel: "Error modifying designs:",
	});

	return output.map((item) => ({
		...item,
		html: sanitizeGeneratedHtml(item.html),
	}));
}

export async function applyDesignTokens(
	html: string,
	tokens: DesignTokens,
	config?: AiConfig,
): Promise<{ html: string }> {
	const fullPrompt = `You are an expert UI/UX designer specializing in design systems. Your task is to refactor an HTML component to match a new visual style defined by a set of design tokens.

**Instructions:**
1. Analyze the provided HTML and identify its structural elements (buttons, text, containers, etc.).
2. Analyze the provided Design Tokens, which include a color palette and font families.
3. Intelligently apply the new style:
    * Replace existing background colors, text colors, and border colors with appropriate colors from the token palette. For example, use a prominent color for primary actions (buttons) and neutral colors for backgrounds and text.
    * Update font families to match those specified in the tokens.
4. **Crucially, preserve the original layout, structure, and HTML tags of the component.** Only modify the Tailwind CSS classes to change the styling.
5. Return a JSON object with a single key "html" containing the full, refactored HTML code.

**Design Tokens:**
${JSON.stringify(tokens)}

**Original HTML:**
${html}`;

	const output = await runStructuredAiCall({
		operation: "apply-design-tokens",
		schema: singleModificationSchema,
		messages: [{ role: "user", content: fullPrompt }],
		config,
		failureMessage: "Failed to apply the design style.",
		logLabel: "Error applying design tokens:",
	});

	return { html: sanitizeGeneratedHtml(output.html) };
}

export async function extractDesignTokens(
	html: string,
	config?: AiConfig,
): Promise<DesignTokens> {
	const fullPrompt = `You are a design system specialist. Analyze the provided HTML and extract the design tokens used.
        
        Categorize colors into:
        - Backgrounds
        - Text
        - Primary (buttons, accents)
        - Borders
        
        Identify the primary font families for headings and body text.
        Extract border-radius classes (e.g., rounded-md) and box-shadow classes (e.g., shadow-lg).

        Return a JSON object that follows the provided schema. \n\nHTML:\n${html}`;

	const output = await runStructuredAiCall({
		operation: "extract-design-tokens",
		schema: designTokenSchema,
		messages: [{ role: "user", content: fullPrompt }],
		config,
		failureMessage: "Failed to extract design tokens.",
		logLabel: "Error extracting design tokens:",
	});

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
	config?: AiConfig,
): Promise<{ connectionId: string; selector: string | null }[]> {
	const fullPrompt = `You are an expert UI analyst. Your task is to identify the clickable elements in a source HTML document that are most likely intended to navigate to specific target screens.

**Source HTML:**
\`\`\`html
${sourceHtml}
\`\`\`

**Navigation Targets:**
You need to find the best clickable element for each of the following connections:
${JSON.stringify(targets, null, 2)}

**Instructions:**
1.  For each target, analyze the source HTML to find the most logical clickable element (e.g., \`<button>\`, \`<a>\`, an element with \`role="button"\`, or a div with click-related classes) that would lead to that target. Consider the element's text content, class names, and attributes. For example, a button with "Login" text should link to a "Dashboard" target.
2.  Generate a valid and specific CSS selector for each identified element.
3.  Return a JSON array where each object contains the original \`connectionId\` and the corresponding CSS \`selector\`.
4.  If you cannot confidently determine a clickable element for a specific connection, return \`null\` for its \`selector\`.

Your response must be a JSON array that conforms to the provided schema.`;

	return runStructuredAiCall({
		operation: "find-clickable-selectors",
		schema: clickableSelectorsSchema,
		messages: [{ role: "user", content: fullPrompt }],
		config,
		failureMessage:
			"AI failed to identify interactive elements for the prototype.",
		logLabel: "Error finding clickable selectors:",
	});
}

export async function extractComponent(
	html: string,
	selector: string,
	config?: AiConfig,
): Promise<{ componentHtml: string }> {
	const fullPrompt = `You are an expert code refactoring assistant. Given the following HTML and a CSS selector, extract the HTML for the element matching the selector and its children. Clean it up to be a self-contained, reusable component, ensuring all necessary Tailwind classes are present. Return a JSON object with the key "componentHtml".\n\nFull HTML:\n${html}\n\nCSS Selector:\n${selector}`;

	const output = await runStructuredAiCall({
		operation: "extract-component",
		schema: componentExtractionSchema,
		messages: [{ role: "user", content: fullPrompt }],
		config,
		failureMessage: "Failed to extract the component.",
		logLabel: "Error extracting component:",
	});

	return { componentHtml: sanitizeGeneratedHtml(output.componentHtml) };
}

export async function critiqueDesignQuality(options: {
	html: string;
	viewMode: "DESKTOP" | "TABLET" | "MOBILE";
	goal?: string | null;
	projectMemoryContext?: string | null;
	designSystem?: DesignSystemContext | null;
	config?: AiConfig;
}): Promise<DesignQualityCritique> {
	const designSystemContext = buildDesignSystemContext(options.designSystem);
	const goalContext = options.goal
		? `Primary UX goal for this screen: ${options.goal}.`
		: "No additional UX goal was supplied; critique against common product design expectations.";
	const memoryContext = options.projectMemoryContext
		? `\n${options.projectMemoryContext}`
		: "";
	const fullPrompt = `You are a senior UI reviewer performing a text-only quality critique of a generated interface. You do not have a rendered screenshot, so infer likely issues from the HTML structure, copy, and Tailwind CSS classes. Focus on high-signal issues such as weak visual hierarchy, spacing imbalance, overflow risk, poor CTA emphasis, contrast risk, alignment inconsistencies, and accessibility concerns that can be improved without changing the product intent.

Viewport: ${options.viewMode}
${goalContext}
${designSystemContext}${memoryContext}

HTML to review:
\`\`\`html
${options.html}
\`\`\`

Return JSON with:
- summary: concise overall critique
- issues: 0-6 concrete issues, each with severity/title/recommendation
- modificationPrompt: one strong instruction that tells a downstream HTML editing model exactly how to improve the screen while preserving its product intent and Tailwind-only HTML structure.`;

	return runStructuredAiCall({
		operation: "critique-design-quality",
		schema: designQualityCritiqueSchema,
		messages: [{ role: "user", content: fullPrompt }],
		config: options.config,
		failureMessage: "Failed to critique design quality.",
		logLabel: "Error critiquing design quality:",
	});
}

export async function synthesizeProjectStyleMemory(options: {
	projectName?: string | null;
	normalizedSignals: string[];
	existingSummary?: string | null;
	existingDirectives?: string[];
	designTokens?: DesignTokens | null;
	config?: AiConfig;
}): Promise<ProjectStyleMemorySynthesis> {
	const fullPrompt = `You maintain durable per-project style memory for an AI design tool. Synthesize only stable, reusable brand/style guidance that should persist across future prompts. Prefer concise, specific directives and remove duplicates or one-off requests.

Project name: ${options.projectName ?? "Unknown project"}
Existing summary: ${options.existingSummary ?? "None"}
Existing style directives:
${(options.existingDirectives ?? []).length > 0 ? (options.existingDirectives ?? []).map((directive) => `- ${directive}`).join("\n") : "- None"}

New normalized signals:
${options.normalizedSignals.length > 0 ? options.normalizedSignals.map((signal) => `- ${signal}`).join("\n") : "- None"}

Latest design tokens (if any):
${options.designTokens ? JSON.stringify(options.designTokens, null, 2) : "None"}

Return JSON with:
- summary: 1-3 sentence durable memory summary
- styleDirectives: 3-12 actionable rules to inject into future prompts`;

	return runStructuredAiCall({
		operation: "synthesize-project-style-memory",
		schema: projectStyleMemorySchema,
		messages: [{ role: "user", content: fullPrompt }],
		config: options.config,
		failureMessage: "Failed to synthesize project style memory.",
		logLabel: "Error synthesizing project style memory:",
	});
}

export async function planProductFlow(options: {
	prompt: string;
	maxScreens: number;
	existingScreens?: { id: string; name: string; description?: string }[];
	projectMemoryContext?: string | null;
	componentLibraryContext?: string | null;
	designSystem?: DesignSystemContext | null;
	config?: AiConfig;
}): Promise<ProductFlowPlan> {
	const designSystemContext = buildDesignSystemContext(options.designSystem);
	const memoryContext = options.projectMemoryContext
		? `\n${options.projectMemoryContext}`
		: "";
	const componentContext = options.componentLibraryContext
		? `\nAvailable reusable components:\n${options.componentLibraryContext}`
		: "";
	const existingScreens = options.existingScreens?.length
		? JSON.stringify(options.existingScreens, null, 2)
		: "[]";
	const fullPrompt = `You are a staff product designer planning a multi-screen product flow before any UI is generated. Think about information architecture, the user's mental model, and the minimum set of screens needed to satisfy the brief. Reuse or extend existing screens where it makes sense, and keep the flow within ${options.maxScreens} screens.

Product brief:
${options.prompt}

Existing screens:
${existingScreens}
${designSystemContext}${memoryContext}${componentContext}

Return JSON with:
- planningSummary: explain the IA and journey
- screens: ordered screens with id, name, description, and userGoal
- connections: directed transitions with positions and rationale

Use temporary IDs that are stable, machine-friendly, and unique within the plan.`;

	return runStructuredAiCall({
		operation: "plan-product-flow",
		schema: productFlowPlanSchema,
		messages: [{ role: "user", content: fullPrompt }],
		config: options.config,
		failureMessage: "Failed to plan the product flow.",
		logLabel: "Error planning product flow:",
	});
}

export function parseTokens(tokens: unknown): DesignTokens | undefined {
	if (!tokens || typeof tokens !== "object") return undefined;

	const result = designTokenSchema.safeParse(tokens);
	if (result.success) {
		return result.data;
	}
	return undefined;
}

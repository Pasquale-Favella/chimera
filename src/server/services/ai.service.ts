/**
 * AI Service
 * Generic AI service that uses the LlmManager for provider-agnostic generation.
 */

import {
	generateText,
	type ModelMessage,
	Output,
	type UserModelMessage,
} from "ai";
import { z } from "zod";
import { LlmManager } from "@/server/lib/llm";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import type {
	AttachedImage,
	DesignSystemContext,
	DesignTokens,
	GeneratedDesign,
	GeneratedFlow,
	ModifiedDesign,
} from "@/types/shared";
import { LlmProvider } from "../../../generated/prisma";

export type AiConfig = {
	provider?: LlmProvider;
	apiKey?: string | null;
	model?: string | null;
};

const createClient = (config?: AiConfig) => {
	const provider = config?.provider || LlmProvider.GOOGLE;
	const apiKey = config?.apiKey || LlmManager.getDefaultApiKey(provider);
	if (!apiKey) return null;

	return LlmManager.createModel({
		provider,
		apiKey,
		model: config?.model || LlmManager.getDefaultModel(provider),
	});
};

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
	html: z
		.string()
		.describe(
			"The self-contained HTML code for the design, using only Tailwind CSS classes for styling.",
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

export async function generateDesigns(
	prompt: string,
	count: number,
	images?: AttachedImage[] | null,
	config?: AiConfig,
	designSystem?: DesignSystemContext | null,
): Promise<GeneratedDesign[]> {
	const model = createClient(config);
	if (!model) {
		throw new Error("No API key configured for the selected provider");
	}

	try {
		const designSystemContext = designSystem
			? `
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
`
			: "";

		const fullPrompt = `You are an expert UI/UX designer. Based on the user's prompt (and the provided image(s), if any), generate ${count} distinct design variation(s). The user's prompt is: "${prompt}". For each variation, provide self-contained HTML using only Tailwind CSS classes for styling. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags. Return only the inner HTML structure (e.g., a root \`<div>\`). Do not include any external stylesheets or script tags. The designs should be visually complete components. ${designSystemContext}`;

		const { output } = await generateText({
			model,
			output: Output.object({ schema: generationSchema }),
			messages: buildMessages(fullPrompt, images),
		});

		return output.map((item) => ({
			...item,
			html: sanitizeGeneratedHtml(item.html),
		}));
	} catch (error) {
		console.error("Error generating designs:", error);
		throw new Error(
			"Failed to generate designs. Please check the prompt and try again.",
		);
	}
}

export async function generateDesignFlow(
	prompt: string,
	images?: AttachedImage[] | null,
	config?: AiConfig,
	designSystem?: DesignSystemContext | null,
): Promise<GeneratedFlow> {
	const model = createClient(config);
	if (!model) {
		throw new Error("No API key configured for the selected provider");
	}

	try {
		const designSystemContext = designSystem
			? `
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
`
			: "";

		const fullPrompt = `You are an expert UI/UX designer specializing in user flows. Based on the user's prompt (and the provided image(s), if any), generate a series of connected UI designs that represent a complete user flow. The user's prompt is: "${prompt}".

Your task is to:
1.  Identify the key screens or states in the described flow.
2.  Generate the HTML for each screen using only Tailwind CSS classes.
3.  Define the connections between these screens. For a standard left-to-right flow, connect the 'right' side of one component to the 'left' side of the next.
4.  Return a single JSON object that conforms to the provided schema, containing both the designs and their connections. Use temporary string IDs to link them. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags. ${designSystemContext}`;

		const { output } = await generateText({
			model,
			output: Output.object({ schema: flowGenerationSchema }),
			messages: buildMessages(fullPrompt, images),
		});

		return {
			...output,
			designs: output.designs.map((d) => ({
				...d,
				html: sanitizeGeneratedHtml(d.html),
			})),
		} as GeneratedFlow;
	} catch (error) {
		console.error("Error generating design flow:", error);
		throw new Error(
			"Failed to generate design flow. Please check the prompt and try again.",
		);
	}
}

export async function modifyDesigns(
	designsToModify: ModifiedDesign[],
	modificationPrompt: string,
	images?: AttachedImage[] | null,
	selector?: string | null,
	config?: AiConfig,
): Promise<ModifiedDesign[]> {
	const model = createClient(config);
	if (!model) {
		throw new Error("No API key configured for the selected provider");
	}

	try {
		const promptContext = selector
			? `The user's instruction is: "${modificationPrompt}". This change should be applied specifically to the element identified by the CSS selector: "${selector}". Be precise and only modify that element and its children if necessary, preserving the rest of the structure.`
			: `The user's instruction is: "${modificationPrompt}". Apply this change to the entire component.`;

		const fullPrompt = `You are an expert UI/UX designer. The user wants to modify some existing designs, possibly using an image or images as a reference. ${promptContext} The designs to modify are provided below as a JSON array of objects, each with an "id" and its current "html". Apply the user's instruction to each of the provided designs. Return a JSON array containing objects for EACH of the modified designs. Each object must have the original "id" and the new "html". Ensure the new HTML is self-contained and uses only Tailwind CSS classes. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags. \n\nDesigns to modify: ${JSON.stringify(designsToModify)}`;

		const { output } = await generateText({
			model,
			output: Output.object({ schema: modificationSchema }),
			messages: buildMessages(fullPrompt, images),
		});

		return output.map((item) => ({
			...item,
			html: sanitizeGeneratedHtml(item.html),
		}));
	} catch (error) {
		console.error("Error modifying designs:", error);
		throw new Error(
			"Failed to modify designs. The model may not have been able to apply the changes.",
		);
	}
}

export async function applyDesignTokens(
	html: string,
	tokens: DesignTokens,
	config?: AiConfig,
): Promise<{ html: string }> {
	const model = createClient(config);
	if (!model) {
		throw new Error("No API key configured for the selected provider");
	}

	try {
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

		const { output } = await generateText({
			model,
			output: Output.object({ schema: singleModificationSchema }),
			messages: [{ role: "user", content: fullPrompt }],
		});

		return { html: sanitizeGeneratedHtml(output.html) };
	} catch (error) {
		console.error("Error applying design tokens:", error);
		throw new Error("Failed to apply the design style.");
	}
}

export async function extractDesignTokens(
	html: string,
	config?: AiConfig,
): Promise<DesignTokens> {
	const model = createClient(config);
	if (!model) {
		throw new Error("No API key configured for the selected provider");
	}

	try {
		const fullPrompt = `You are a design system specialist. Analyze the provided HTML and extract the design tokens used.
        
        Categorize colors into:
        - Backgrounds
        - Text
        - Primary (buttons, accents)
        - Borders
        
        Identify the primary font families for headings and body text.
        Extract border-radius classes (e.g., rounded-md) and box-shadow classes (e.g., shadow-lg).

        Return a JSON object that follows the provided schema. \n\nHTML:\n${html}`;

		const { output } = await generateText({
			model,
			output: Output.object({ schema: designTokenSchema }),
			messages: [{ role: "user", content: fullPrompt }],
		});

		// Post-process to ensure uniqueness
		output.colors.background = [...new Set(output.colors.background)];
		output.colors.text = [...new Set(output.colors.text)];
		output.colors.primary = [...new Set(output.colors.primary)];
		output.colors.border = [...new Set(output.colors.border)];
		output.borderRadius = [...new Set(output.borderRadius)];
		output.boxShadow = [...new Set(output.boxShadow)];

		return output;
	} catch (error) {
		console.error("Error extracting design tokens:", error);
		throw new Error("Failed to extract design tokens.");
	}
}

export async function findClickableSelectorsForConnections(
	sourceHtml: string,
	targets: { connectionId: string; targetDescription: string }[],
	config?: AiConfig,
): Promise<{ connectionId: string; selector: string | null }[]> {
	const model = createClient(config);
	if (!model) {
		throw new Error("No API key configured for the selected provider");
	}

	try {
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

		const { output } = await generateText({
			model,
			output: Output.object({ schema: clickableSelectorsSchema }),
			messages: [{ role: "user", content: fullPrompt }],
		});

		return output;
	} catch (error) {
		console.error("Error finding clickable selectors:", error);
		throw new Error(
			"AI failed to identify interactive elements for the prototype.",
		);
	}
}

const componentExtractionSchema = z.object({
	componentHtml: z
		.string()
		.describe(
			"The extracted, self-contained HTML code for the requested component.",
		),
});

export async function extractComponent(
	html: string,
	selector: string,
	config?: AiConfig,
): Promise<{ componentHtml: string }> {
	const model = createClient(config);
	if (!model) {
		throw new Error("No API key configured for the selected provider");
	}

	try {
		const fullPrompt = `You are an expert code refactoring assistant. Given the following HTML and a CSS selector, extract the HTML for the element matching the selector and its children. Clean it up to be a self-contained, reusable component, ensuring all necessary Tailwind classes are present. Return a JSON object with the key "componentHtml".\n\nFull HTML:\n${html}\n\nCSS Selector:\n${selector}`;

		const { output } = await generateText({
			model,
			output: Output.object({ schema: componentExtractionSchema }),
			messages: [{ role: "user", content: fullPrompt }],
		});

		return { componentHtml: sanitizeGeneratedHtml(output.componentHtml) };
	} catch (error) {
		console.error("Error extracting component:", error);
		throw new Error("Failed to extract the component.");
	}
}

export function parseTokens(tokens: unknown): DesignTokens | undefined {
	if (!tokens || typeof tokens !== "object") return undefined;

	const result = designTokenSchema.safeParse(tokens);
	if (result.success) {
		return result.data;
	}
	return undefined;
}

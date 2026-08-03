/**
 * Agent output schemas
 * The structured-output contracts for every Mastra design agent. These are the
 * shared, framework-agnostic shapes used across the agent instances, the
 * workflow pipeline, and `ai.service` — kept here so agents stay declarative
 * and prompts/workflows never re-declare them.
 */

import { z } from "zod";

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

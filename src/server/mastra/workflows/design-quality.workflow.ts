import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

const viewModeSchema = z.enum(["DESKTOP", "TABLET", "MOBILE"]);

const designQualityInputSchema = z.object({
	projectId: z.string().min(1),
	designId: z.string().min(1).optional(),
	html: z.string().min(1),
	viewMode: viewModeSchema.default("DESKTOP"),
	goal: z.string().min(1).optional(),
});

const renderArtifactSchema = z.object({
	screenshotRef: z.string(),
	viewportLabel: z.string(),
	htmlLength: z.number().int().nonnegative(),
});

const critiqueIssueSchema = z.object({
	severity: z.enum(["low", "medium", "high"]),
	title: z.string(),
	recommendation: z.string(),
});

const renderStepOutputSchema = z.object({
	projectId: z.string(),
	designId: z.string().optional(),
	goal: z.string().optional(),
	originalHtml: z.string(),
	viewMode: viewModeSchema,
	renderArtifact: renderArtifactSchema,
});

const critiqueStepOutputSchema = renderStepOutputSchema.extend({
	critique: z.object({
		summary: z.string(),
		issues: z.array(critiqueIssueSchema),
	}),
});

const designQualityOutputSchema = critiqueStepOutputSchema.extend({
	status: z.literal("placeholder"),
	fixSummary: z.string(),
	fixedHtml: z.string(),
});

type DesignQualityInput = z.infer<typeof designQualityInputSchema>;

function getViewportLabel(viewMode: DesignQualityInput["viewMode"]): string {
	switch (viewMode) {
		case "MOBILE":
			return "mobile-390x844";
		case "TABLET":
			return "tablet-834x1112";
		case "DESKTOP":
		default:
			return "desktop-1440x900";
	}
}

const renderStep = createStep({
	id: "design-quality-render",
	description:
		"Builds a placeholder render artifact for the future render-to-vision pipeline.",
	inputSchema: designQualityInputSchema,
	outputSchema: renderStepOutputSchema,
	execute: async ({ inputData }) => {
		const designKey = inputData.designId ?? "ad-hoc-design";

		return {
			projectId: inputData.projectId,
			designId: inputData.designId,
			goal: inputData.goal,
			originalHtml: inputData.html,
			viewMode: inputData.viewMode,
			renderArtifact: {
				screenshotRef: `wave-2-placeholder://${inputData.projectId}/${designKey}/${inputData.viewMode.toLowerCase()}`,
				viewportLabel: getViewportLabel(inputData.viewMode),
				htmlLength: inputData.html.length,
			},
		};
	},
});

const critiqueStep = createStep({
	id: "design-quality-critique",
	description:
		"Produces a deterministic critique payload until Wave 3 enables vision-backed review.",
	inputSchema: renderStepOutputSchema,
	outputSchema: critiqueStepOutputSchema,
	execute: async ({ inputData }) =>
		critiqueStepOutputSchema.parse({
			...inputData,
			critique: {
				summary:
					"Placeholder critique only. Real render-to-vision analysis is deferred to Wave 3: mastra-integration-live.",
				issues: [
					{
						severity: "medium",
						title: "Vision critique not yet wired",
						recommendation:
							"Replace this deterministic stub with a renderer + critique call through ai.service once the reliability layer lands in Wave 3: mastra-integration-live.",
					},
				],
			},
		}),
});

const autoFixStep = createStep({
	id: "design-quality-autofix",
	description:
		"Returns the original HTML unchanged while preserving the final workflow contract.",
	inputSchema: critiqueStepOutputSchema,
	outputSchema: designQualityOutputSchema,
	execute: async ({ inputData }) =>
		designQualityOutputSchema.parse({
			...inputData,
			status: "placeholder",
			fixSummary:
				"No automatic HTML patching was applied in Wave 2. Wire the real auto-fix path in Wave 3: mastra-integration-live.",
			fixedHtml: inputData.originalHtml,
		}),
});

/**
 * Wave 2 shell for render -> vision critique -> auto-fix orchestration.
 */
export const designQualityWorkflow = createWorkflow({
	id: "design-quality-workflow",
	description:
		"Placeholder workflow for render, critique, and auto-fix orchestration.",
	inputSchema: designQualityInputSchema,
	outputSchema: designQualityOutputSchema,
})
	.then(renderStep)
	.then(critiqueStep)
	.then(autoFixStep)
	.commit();

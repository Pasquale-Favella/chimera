import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

const connectionPositionSchema = z.enum(["top", "right", "bottom", "left"]);

const existingScreenSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	description: z.string().min(1).optional(),
});

const screenPlanSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	userGoal: z.string(),
});

const flowConnectionPlanSchema = z.object({
	from: z.string(),
	to: z.string(),
	fromPosition: connectionPositionSchema,
	toPosition: connectionPositionSchema,
	rationale: z.string(),
});

const productFlowInputSchema = z.object({
	projectId: z.string().min(1),
	prompt: z.string().min(1),
	maxScreens: z.number().int().min(1).max(12).default(4),
	existingScreens: z.array(existingScreenSchema).default([]),
});

const outlinedFlowSchema = z.object({
	projectId: z.string(),
	prompt: z.string(),
	screens: z.array(screenPlanSchema),
});

const connectedFlowSchema = outlinedFlowSchema.extend({
	connections: z.array(flowConnectionPlanSchema),
});

const productFlowOutputSchema = connectedFlowSchema.extend({
	status: z.literal("placeholder"),
	nextAction: z.string(),
});

const outlineScreensStep = createStep({
	id: "product-flow-outline-screens",
	description:
		"Creates a deterministic multi-screen plan shell from the supplied prompt.",
	inputSchema: productFlowInputSchema,
	outputSchema: outlinedFlowSchema,
	execute: async ({ inputData }) => {
		const desiredScreenCount = Math.max(
			2,
			Math.min(inputData.maxScreens, inputData.existingScreens.length || 3),
		);

		const existingScreens =
			inputData.existingScreens.length > 0
				? inputData.existingScreens.slice(0, desiredScreenCount).map((screen) => ({
						id: screen.id,
						name: screen.name,
						description:
							screen.description ??
							`Existing screen reused for product-flow planning: ${screen.name}.`,
						userGoal: `Continue the flow through ${screen.name}.`,
					}))
				: Array.from({ length: desiredScreenCount }, (_, index) => ({
						id: `screen-${index + 1}`,
						name: `Planned Screen ${index + 1}`,
						description: `Placeholder screen ${index + 1} for: ${inputData.prompt}`,
						userGoal:
							index === 0
								? "Introduce the flow entry point."
								: `Advance the user journey to step ${index + 1}.`,
					}));

		return {
			projectId: inputData.projectId,
			prompt: inputData.prompt,
			screens: existingScreens,
		};
	},
});

const mapConnectionsStep = createStep({
	id: "product-flow-map-connections",
	description:
		"Builds a simple left-to-right connection plan for the placeholder flow.",
	inputSchema: outlinedFlowSchema,
	outputSchema: connectedFlowSchema,
	execute: async ({ inputData }) =>
		connectedFlowSchema.parse({
			...inputData,
			connections: inputData.screens.slice(0, -1).map((screen, index) => ({
				from: screen.id,
				to: inputData.screens[index + 1]?.id ?? screen.id,
				fromPosition: "right",
				toPosition: "left",
				rationale: `Placeholder transition from ${screen.name} to ${inputData.screens[index + 1]?.name ?? screen.name}.`,
			})),
		}),
});

const packageFlowPlanStep = createStep({
	id: "product-flow-package-plan",
	description:
		"Packages the placeholder product-flow plan for future live agent wiring.",
	inputSchema: connectedFlowSchema,
	outputSchema: productFlowOutputSchema,
	execute: async ({ inputData }) =>
		productFlowOutputSchema.parse({
			...inputData,
			status: "placeholder",
			nextAction:
				"Replace placeholder planning with live multi-screen reasoning in Wave 3: mastra-integration-live.",
		}),
});

/**
 * Wave 2 shell for multi-screen product-flow planning.
 */
export const productFlowWorkflow = createWorkflow({
	id: "product-flow-workflow",
	description:
		"Placeholder workflow for multi-screen product-flow planning.",
	inputSchema: productFlowInputSchema,
	outputSchema: productFlowOutputSchema,
})
	.then(outlineScreensStep)
	.then(mapConnectionsStep)
	.then(packageFlowPlanStep)
	.commit();

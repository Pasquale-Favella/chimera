/**
 * Flow Generation Workflow
 *
 * Wire the `productFlowPlanner`, `designFlowGenerator`, and
 * `styleMemorySynthesizer` agents into a single pipeline:
 *
 *   gatherContext → planFlow → generateScreens → sanitize
 *   → persistFlow → updateStyleMemory
 */

import { createStep, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { generate } from "@/server/mastra/agent-utils";
import {
	agents,
	flowGenerationSchema,
	productFlowPlanSchema,
	projectStyleMemorySchema,
} from "@/server/mastra/agents";
import {
	buildFlowGenerationPrompt,
	buildFlowPlanPrompt,
	buildImageMessages,
} from "@/server/mastra/prompts";
import type { PersistedConnection } from "./persistence";
import {
	aiConfigSchema,
	attachedImageSchema,
	EMPTY_CONTEXT,
	persistedDesignSchema,
	workflowContextSchema,
} from "./shared";
import {
	makeGatherContextStep,
	makePersistFlowStep,
	makeSanitizeFlowStep,
	makeUpdateStyleMemoryStep,
	type TypedStep,
} from "./steps";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const workflowInputSchema = z.object({
	projectId: z.string(),
	userId: z.string(),
	config: aiConfigSchema,
	prompt: z.string(),
	maxScreens: z.number().int().min(2).max(12).default(8),
	namePrefix: z.string().nullish(),
	images: z.array(attachedImageSchema).max(4).optional(),
});

const connectionSummarySchema = z.object({
	id: z.custom<PersistedConnection["id"]>(),
	fromDesignId: z.custom<PersistedConnection["fromDesignId"]>(),
	toDesignId: z.custom<PersistedConnection["toDesignId"]>(),
	fromPosition: z.custom<PersistedConnection["fromPosition"]>(),
	toPosition: z.custom<PersistedConnection["toPosition"]>(),
});

const carrierSchema = z.object({
	projectId: z.string(),
	userId: z.string(),
	config: aiConfigSchema,
	prompt: z.string(),
	maxScreens: z.number().optional(),
	namePrefix: z.string().nullish(),
	images: z.array(attachedImageSchema).max(4).optional(),
	context: workflowContextSchema.optional(),
	plan: productFlowPlanSchema.optional(),
	flow: flowGenerationSchema.optional(),
	createdDesigns: z.array(persistedDesignSchema).optional(),
	createdConnections: z.array(connectionSummarySchema).optional(),
});

const workflowOutputSchema = z.object({
	designs: z.array(persistedDesignSchema),
	connections: z.array(connectionSummarySchema),
	plan: productFlowPlanSchema.nullable(),
	styleMemorySynthesis: projectStyleMemorySchema,
});

type Carrier = z.infer<typeof carrierSchema>;

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

const gatherContext = makeGatherContextStep(carrierSchema) as TypedStep<
	"gatherContext",
	Carrier
>;

const planFlow = createStep({
	id: "planFlow",
	description: "Plan the multi-screen product flow with the flow planner.",
	inputSchema: carrierSchema,
	outputSchema: carrierSchema,
	execute: async ({ inputData }) => {
		const { prompt, config, context } = inputData;
		const maxScreens = inputData.maxScreens ?? 8;
		const gathered = context ?? EMPTY_CONTEXT;

		const existingScreens = gathered.existingDesigns.map((design) => ({
			id: design.id,
			name: design.name,
			description: design.description ?? undefined,
		}));

		const fullPrompt = buildFlowPlanPrompt({
			prompt,
			maxScreens,
			existingScreens,
			designSystem: gathered.designSystem,
			styleMemory: gathered.styleMemory,
			components: gathered.components,
			projectId: inputData.projectId,
		});

		const plan = await generate(
			agents.productFlowPlanner,
			fullPrompt,
			productFlowPlanSchema,
			config,
		);

		return { ...inputData, plan };
	},
});

const generateScreens = createStep({
	id: "generateScreens",
	description: "Generate the flow screens from the plan.",
	inputSchema: carrierSchema,
	outputSchema: carrierSchema,
	execute: async ({ inputData }) => {
		const { prompt, images, config, context } = inputData;
		const gathered = context ?? EMPTY_CONTEXT;

		const fullPrompt = buildFlowGenerationPrompt({
			prompt,
			plan: inputData.plan,
			designSystem: gathered.designSystem,
			styleMemory: gathered.styleMemory,
			components: gathered.components,
			projectId: inputData.projectId,
		});

		const output = await generate(
			agents.designFlowGenerator,
			buildImageMessages(fullPrompt, images),
			flowGenerationSchema,
			config,
		);

		return { ...inputData, flow: output };
	},
});

const sanitize = makeSanitizeFlowStep(carrierSchema) as TypedStep<
	"sanitize",
	Carrier
>;

const persistFlow = makePersistFlowStep(carrierSchema) as TypedStep<
	"persistFlow",
	Carrier
>;

const updateStyleMemory = makeUpdateStyleMemoryStep<Carrier>({
	carrierSchema,
	outputSchema: workflowOutputSchema,
	buildSignals: (carrier) =>
		[
			`User request: ${carrier.prompt}`,
			carrier.plan?.planningSummary
				? `Planned flow: ${carrier.plan.planningSummary}`
				: "",
			...(carrier.flow?.designs ?? [])
				.map((design) => `Screen: ${design.description}`)
				.filter(Boolean),
		].filter(Boolean),
	buildOutput: (carrier, synthesis) => ({
		designs: carrier.createdDesigns ?? [],
		connections: carrier.createdConnections ?? [],
		plan: carrier.plan ?? null,
		styleMemorySynthesis: synthesis,
	}),
});

// ---------------------------------------------------------------------------
// Workflow
// ---------------------------------------------------------------------------

export const flowGenerationWorkflow = new Workflow({
	id: "flow-generation",
	inputSchema: workflowInputSchema,
	outputSchema: workflowOutputSchema,
})
	.then(gatherContext)
	.then(planFlow)
	.then(generateScreens)
	.then(sanitize)
	.then(persistFlow)
	.then(updateStyleMemory)
	.commit();

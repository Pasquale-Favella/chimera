/**
 * Design Generation Workflow
 *
 * Wire the `designGenerator`, `designCritic`, `designModifier`, and
 * `styleMemorySynthesizer` agents into a single pipeline:
 *
 *   gatherContext → generateVariations → sanitize → critiqueAndRefine
 *   → persistDesigns → updateStyleMemory
 */

import { createStep, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import { generate } from "@/server/mastra/agent-utils";
import {
	agents,
	type DesignQualityCritique,
	designItemSchema,
	designQualityCritiqueSchema,
	generationSchema,
	modificationSchema,
	projectStyleMemorySchema,
} from "@/server/mastra/agents";
import {
	buildCritiquePrompt,
	buildDesignGenerationPrompt,
	buildImageMessages,
	buildModificationPrompt,
} from "@/server/mastra/prompts";
import type { GeneratedDesign } from "@/types/shared";
import {
	aiConfigSchema,
	attachedImageSchema,
	EMPTY_CONTEXT,
	MAX_REFINE_PASSES,
	persistedDesignSchema,
	workflowContextSchema,
} from "./shared";
import {
	makeGatherContextStep,
	makePersistDesignsStep,
	makeSanitizeDesignsStep,
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
	count: z.number().int().min(1).max(4).default(1),
	namePrefix: z.string().nullish(),
	images: z.array(attachedImageSchema).max(4).optional(),
});

const carrierSchema = z.object({
	projectId: z.string(),
	userId: z.string(),
	config: aiConfigSchema,
	prompt: z.string(),
	count: z.number().optional(),
	namePrefix: z.string().nullish(),
	images: z.array(attachedImageSchema).max(4).optional(),
	context: workflowContextSchema.optional(),
	designs: z.array(designItemSchema).optional(),
	critiques: z.array(designQualityCritiqueSchema).optional(),
	createdDesigns: z.array(persistedDesignSchema).optional(),
});

const workflowOutputSchema = z.object({
	designs: z.array(persistedDesignSchema),
	critiques: z.array(designQualityCritiqueSchema),
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

const generateVariations = createStep({
	id: "generateVariations",
	description: "Generate design variations with the design generator.",
	inputSchema: carrierSchema,
	outputSchema: carrierSchema,
	execute: async ({ inputData }) => {
		const { prompt, images, config, context } = inputData;
		const count = inputData.count ?? 1;
		const gathered = context ?? EMPTY_CONTEXT;

		const fullPrompt = buildDesignGenerationPrompt({
			prompt,
			count,
			designSystem: gathered.designSystem,
			styleMemory: gathered.styleMemory,
			components: gathered.components,
			projectId: inputData.projectId,
		});

		const output = await generate(
			agents.designGenerator,
			buildImageMessages(fullPrompt, images),
			generationSchema,
			config,
		);

		return { ...inputData, designs: output };
	},
});

const sanitize = makeSanitizeDesignsStep(carrierSchema) as TypedStep<
	"sanitize",
	Carrier
>;

const critiqueAndRefine = createStep({
	id: "critiqueAndRefine",
	description:
		"Critique each design and auto-fix high-severity issues with the design modifier.",
	inputSchema: carrierSchema,
	outputSchema: carrierSchema,
	execute: async ({ inputData }) => {
		const { prompt, config, context } = inputData;
		const gathered = context ?? EMPTY_CONTEXT;

		const refined: GeneratedDesign[] = [];
		const critiques: DesignQualityCritique[] = [];

		for (const design of inputData.designs ?? []) {
			let current = design;

			for (let pass = 0; pass < MAX_REFINE_PASSES; pass++) {
				const critiquePrompt = buildCritiquePrompt({
					html: current.html,
					viewMode: "DESKTOP",
					goal: prompt,
					designSystem: gathered.designSystem,
					styleMemory: gathered.styleMemory,
				});

				const critique = await generate(
					agents.designCritic,
					critiquePrompt,
					designQualityCritiqueSchema,
					config,
				);
				if (pass === 0) critiques.push(critique);

				const hasHighIssues = critique.issues.some(
					(issue) => issue.severity === "high",
				);
				const isLastPass = pass === MAX_REFINE_PASSES - 1;

				if (!hasHighIssues || isLastPass) {
					current = {
						...current,
						html: sanitizeGeneratedHtml(current.html),
					};
					break;
				}

				const modificationPrompt = buildModificationPrompt({
					instruction: critique.modificationPrompt,
					designs: [{ id: "refine", html: current.html }],
				});
				const [fixed] = await generate(
					agents.designModifier,
					modificationPrompt,
					modificationSchema,
					config,
				);
				if (!fixed) break;
				current = {
					...current,
					html: sanitizeGeneratedHtml(fixed.html),
				};
			}

			refined.push(current);
		}

		return { ...inputData, designs: refined, critiques };
	},
});

const persistDesigns = makePersistDesignsStep(
	carrierSchema,
	"AI Concept",
) as TypedStep<"persistDesigns", Carrier>;

const updateStyleMemory = makeUpdateStyleMemoryStep<Carrier>({
	carrierSchema,
	outputSchema: workflowOutputSchema,
	buildSignals: (carrier) => [
		`User request: ${carrier.prompt}`,
		...(carrier.designs ?? [])
			.map((design) => design.description)
			.filter(Boolean),
	],
	buildOutput: (carrier, synthesis) => ({
		designs: carrier.createdDesigns ?? [],
		critiques: carrier.critiques ?? [],
		styleMemorySynthesis: synthesis,
	}),
});

// ---------------------------------------------------------------------------
// Workflow
// ---------------------------------------------------------------------------

export const designGenerationWorkflow = new Workflow({
	id: "design-generation",
	inputSchema: workflowInputSchema,
	outputSchema: workflowOutputSchema,
})
	.then(gatherContext)
	.then(generateVariations)
	.then(sanitize)
	.then(critiqueAndRefine)
	.then(persistDesigns)
	.then(updateStyleMemory)
	.commit();

export type DesignGenerationCarrier = Carrier;

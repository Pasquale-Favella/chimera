/**
 * Design Modification Workflow
 *
 * Wire the `designModifier` and `styleMemorySynthesizer` agents into a single
 * pipeline for editing existing designs:
 *
 *   gatherDesigns → modify → sanitize → persistChanges → updateStyleMemory
 */

import { createStep, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { db } from "@/server/db";
import { generate } from "@/server/mastra/agent-utils";
import {
	agents,
	modificationSchema,
	projectStyleMemorySchema,
} from "@/server/mastra/agents";
import {
	buildImageMessages,
	buildModificationPrompt,
} from "@/server/mastra/prompts";
import { DesignsNotFoundError } from "./errors";
import { persistModifiedDesigns } from "./persistence";
import {
	aiConfigSchema,
	attachedImageSchema,
	persistedDesignSchema,
} from "./shared";
import {
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
	designIds: z.array(z.string()).min(1),
	images: z.array(attachedImageSchema).max(4).optional(),
	selector: z.string().nullish(),
});

const sourceDesignSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	html: z.string(),
	history: z.unknown(),
});

const carrierSchema = z.object({
	projectId: z.string(),
	userId: z.string(),
	config: aiConfigSchema,
	prompt: z.string(),
	designIds: z.array(z.string()),
	images: z.array(attachedImageSchema).max(4).optional(),
	selector: z.string().nullish(),
	projectName: z.string().nullish(),
	designs: z.array(sourceDesignSchema).optional(),
	modifiedDesigns: z
		.array(z.object({ id: z.string(), html: z.string() }))
		.optional(),
	updatedDesigns: z.array(persistedDesignSchema).optional(),
});

const workflowOutputSchema = z.object({
	designs: z.array(persistedDesignSchema),
	styleMemorySynthesis: projectStyleMemorySchema,
});

type Carrier = z.infer<typeof carrierSchema>;

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

const gatherDesigns = createStep({
	id: "gatherDesigns",
	description: "Fetch the designs to modify.",
	inputSchema: carrierSchema,
	outputSchema: carrierSchema,
	execute: async ({ inputData }) => {
		const designs = await db.design.findMany({
			where: {
				id: { in: inputData.designIds },
				projectId: inputData.projectId,
			},
			select: {
				id: true,
				name: true,
				description: true,
				html: true,
				history: true,
			},
		});

		if (!designs.length) {
			throw new DesignsNotFoundError();
		}

		const project = await db.project.findUnique({
			where: { id: inputData.projectId },
			select: { name: true },
		});

		return {
			...inputData,
			projectName: project?.name ?? null,
			designs: designs.map((design) => ({
				id: design.id,
				name: design.name,
				description: design.description,
				html: design.html,
				history: design.history,
			})),
		};
	},
});

const modify = createStep({
	id: "modify",
	description: "Apply the modification instruction with the design modifier.",
	inputSchema: carrierSchema,
	outputSchema: carrierSchema,
	execute: async ({ inputData }) => {
		const fullPrompt = buildModificationPrompt({
			instruction: inputData.prompt,
			selector: inputData.selector,
			designs: (inputData.designs ?? []).map((design) => ({
				id: design.id,
				html: design.html,
			})),
		});

		const output = await generate(
			agents.designModifier,
			buildImageMessages(fullPrompt, inputData.images),
			modificationSchema,
			inputData.config,
		);

		return { ...inputData, modifiedDesigns: output };
	},
});

const sanitize = makeSanitizeDesignsStep(
	carrierSchema,
	"modifiedDesigns",
) as TypedStep<"sanitize", Carrier>;

const persistChanges = createStep({
	id: "persistChanges",
	description: "Persist the modified designs (html, history, version).",
	inputSchema: carrierSchema,
	outputSchema: carrierSchema,
	execute: async ({ inputData }) => {
		const sourceHistoryById = new Map(
			(inputData.designs ?? []).map((design) => [design.id, design.history]),
		);
		const updatedDesigns = await persistModifiedDesigns({
			modified: inputData.modifiedDesigns ?? [],
			sourceHistoryById,
		});

		return { ...inputData, updatedDesigns };
	},
});

const updateStyleMemory = makeUpdateStyleMemoryStep<Carrier>({
	carrierSchema,
	outputSchema: workflowOutputSchema,
	buildSignals: (carrier) => [
		`Modification request: ${carrier.prompt}`,
		...(carrier.updatedDesigns ?? [])
			.map((design) => `Modified: ${design.name}`)
			.filter(Boolean),
	],
	buildOutput: (carrier, synthesis) => ({
		designs: carrier.updatedDesigns ?? [],
		styleMemorySynthesis: synthesis,
	}),
});

// ---------------------------------------------------------------------------
// Workflow
// ---------------------------------------------------------------------------

export const designModificationWorkflow = new Workflow({
	id: "design-modification",
	inputSchema: workflowInputSchema,
	outputSchema: workflowOutputSchema,
})
	.then(gatherDesigns)
	.then(modify)
	.then(sanitize)
	.then(persistChanges)
	.then(updateStyleMemory)
	.commit();

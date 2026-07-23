import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { designTokensSchema } from "@/server/api/features/designs/design.dto";

const memorySignalSchema = z.object({
	source: z.enum(["prompt", "design", "manual"]),
	content: z.string().min(1),
	weight: z.number().min(0).max(1).default(0.5),
});

const memoryWorkflowInputSchema = z.object({
	projectId: z.string().min(1),
	projectName: z.string().min(1).optional(),
	notes: z.array(z.string().min(1)).default([]),
	signals: z.array(memorySignalSchema).default([]),
	designTokens: designTokensSchema.optional(),
});

const normalizedMemorySchema = z.object({
	projectId: z.string(),
	projectName: z.string().optional(),
	normalizedSignals: z.array(z.string()),
	designTokens: designTokensSchema.nullable(),
});

const draftedMemorySchema = normalizedMemorySchema.extend({
	memoryDraft: z.object({
		summary: z.string(),
		styleDirectives: z.array(z.string()),
	}),
});

const memoryWorkflowOutputSchema = draftedMemorySchema.extend({
	status: z.literal("placeholder"),
	memoryRecord: z.object({
		key: z.string(),
		scope: z.literal("project"),
		projectId: z.string(),
		summary: z.string(),
		styleDirectives: z.array(z.string()),
	}),
});

const normalizeSignalsStep = createStep({
	id: "memory-normalize-signals",
	description:
		"Normalizes project style inputs into a stable placeholder structure.",
	inputSchema: memoryWorkflowInputSchema,
	outputSchema: normalizedMemorySchema,
	execute: async ({ inputData }) => {
		const normalizedSignals = [
			...inputData.notes.map((note) => `note:${note}`),
			...inputData.signals.map(
				(signal) =>
					`${signal.source}:${signal.content} (weight=${signal.weight.toFixed(2)})`,
			),
		];

		return {
			projectId: inputData.projectId,
			projectName: inputData.projectName,
			normalizedSignals,
			designTokens: inputData.designTokens ?? null,
		};
	},
});

const draftMemoryStep = createStep({
	id: "memory-draft-profile",
	description:
		"Builds a placeholder brand/style memory draft for future persistence wiring.",
	inputSchema: normalizedMemorySchema,
	outputSchema: draftedMemorySchema,
	execute: async ({ inputData }) => ({
		...inputData,
		memoryDraft: {
			summary:
				inputData.normalizedSignals.length > 0
					? `Captured ${inputData.normalizedSignals.length} style signals for project memory.`
					: "No explicit style signals were provided; memory draft remains generic.",
			styleDirectives: [
				"Preserve reusable project-level style guidance.",
				"Keep tone, brand, and visual constraints scoped per project.",
				"Replace this draft synthesizer in Wave 3: mastra-integration-live.",
			],
		},
	}),
});

const persistMemoryPlanStep = createStep({
	id: "memory-persist-plan",
	description:
		"Returns a placeholder persistence contract without touching live storage.",
	inputSchema: draftedMemorySchema,
	outputSchema: memoryWorkflowOutputSchema,
	execute: async ({ inputData }) =>
		memoryWorkflowOutputSchema.parse({
			...inputData,
			status: "placeholder",
			memoryRecord: {
				key: `project:${inputData.projectId}:brand-style`,
				scope: "project",
				projectId: inputData.projectId,
				summary:
					"Placeholder project memory record. Persist to the real Mastra memory layer in Wave 3: mastra-integration-live.",
				styleDirectives: inputData.memoryDraft.styleDirectives,
			},
		}),
});

/**
 * Wave 2 shell for per-project brand/style memory orchestration.
 */
export const memoryWorkflow = createWorkflow({
	id: "memory-workflow",
	description:
		"Placeholder workflow for per-project brand/style memory synthesis.",
	inputSchema: memoryWorkflowInputSchema,
	outputSchema: memoryWorkflowOutputSchema,
})
	.then(normalizeSignalsStep)
	.then(draftMemoryStep)
	.then(persistMemoryPlanStep)
	.commit();

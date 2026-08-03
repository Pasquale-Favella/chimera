/**
 * Workflow step factories
 * Shared `createStep` factories for the deterministic pipeline steps the
 * design, flow, and modification workflows have in common: context gathering,
 * HTML sanitization, persistence, and style-memory updates.
 *
 * The AI steps (variation/screen generation, planning, critique, modify)
 * stay in their workflows because each wires a different agent + schema, but
 * they all assemble prompts through `@/server/mastra/prompts`.
 */

import { createStep, type Step } from "@mastra/core/workflows";
import type { z } from "zod";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import type { ProjectStyleMemorySynthesis } from "@/server/mastra/agents";
import type { AiConfig } from "@/types/llm";
import type { ConnectionToCreate, DesignToCreate } from "./persistence";
import { persistConnections, persistGeneratedDesigns } from "./persistence";
import { gatherProjectContext, updateProjectStyleMemory } from "./shared";

/** Minimal carrier shape the style-memory step relies on. */
export interface StyleMemoryCarrier {
	projectId: string;
	config: AiConfig;
	projectName?: string | null;
	context?: { projectName?: string | null } | null;
}

interface GatherContextCarrier {
	projectId: string;
	context?: unknown;
}

interface SanitizeFlowCarrier {
	flow?: { designs: { html: string }[] };
}

interface PersistDesignsCarrier {
	projectId: string;
	userId: string;
	namePrefix?: string | null;
	designs?: DesignToCreate[];
	context?: { existingDesigns?: { position: unknown; size: unknown }[] } | null;
}

interface PersistFlowCarrier extends PersistDesignsCarrier {
	flow?: {
		designs: (DesignToCreate & { id: string })[];
		connections: ConnectionToCreate[];
	};
}

/**
 * Compile-time view of a factory step with a concrete carrier shape. The
 * factories type their schema params as `z.ZodTypeAny`, which collapses the
 * step's inferred input/output to `unknown`; workflows cast each factory step
 * to `TypedStep` so the `then` chain keeps the full carrier types.
 */
export type TypedStep<TStepId extends string, TCarrier> = Step<
	TStepId,
	unknown,
	TCarrier,
	TCarrier
>;

/**
 * Loads deterministic project context (design system, components, existing
 * layout, style memory, project name) into the shared carrier.
 */
export function makeGatherContextStep(carrierSchema: z.ZodTypeAny) {
	return createStep({
		id: "gatherContext",
		description:
			"Fetch design system, components, existing layout, and style memory.",
		inputSchema: carrierSchema,
		outputSchema: carrierSchema,
		execute: async ({ inputData }) => {
			const carrier = inputData as GatherContextCarrier;
			const context = await gatherProjectContext(carrier.projectId);
			return { ...(inputData as Record<string, unknown>), context };
		},
	});
}

/** Sanitizes generated design HTML before persistence. */
export function makeSanitizeDesignsStep(
	carrierSchema: z.ZodTypeAny,
	field: "designs" | "modifiedDesigns" = "designs",
) {
	return createStep({
		id: "sanitize",
		description: "Sanitize generated HTML before persistence.",
		inputSchema: carrierSchema,
		outputSchema: carrierSchema,
		execute: async ({ inputData }) => {
			const carrier = inputData as Record<string, unknown>;
			const designs = (
				(carrier[field] as { html: string }[] | undefined) ?? []
			).map((design) => ({
				...design,
				html: sanitizeGeneratedHtml(design.html),
			}));
			return { ...carrier, [field]: designs };
		},
	});
}

/** Sanitizes generated flow-screen HTML before persistence. */
export function makeSanitizeFlowStep(carrierSchema: z.ZodTypeAny) {
	return createStep({
		id: "sanitize",
		description: "Sanitize generated screen HTML.",
		inputSchema: carrierSchema,
		outputSchema: carrierSchema,
		execute: async ({ inputData }) => {
			const carrier = inputData as SanitizeFlowCarrier;
			const flow = carrier.flow
				? {
						...carrier.flow,
						designs: carrier.flow.designs.map((design) => ({
							...design,
							html: sanitizeGeneratedHtml(design.html),
						})),
					}
				: undefined;
			return { ...(inputData as Record<string, unknown>), flow };
		},
	});
}

/** Persists generated designs into the project with auto-layout positioning. */
export function makePersistDesignsStep(
	carrierSchema: z.ZodTypeAny,
	label: string,
) {
	return createStep({
		id: "persistDesigns",
		description: `Persist ${label.toLowerCase()} designs to the project.`,
		inputSchema: carrierSchema,
		outputSchema: carrierSchema,
		execute: async ({ inputData }) => {
			const carrier = inputData as PersistDesignsCarrier;
			const { created } = await persistGeneratedDesigns({
				projectId: carrier.projectId,
				createdById: carrier.userId,
				designs: carrier.designs ?? [],
				existingDesigns: carrier.context?.existingDesigns ?? [],
				namePrefix: carrier.namePrefix,
				label,
			});
			return {
				...(inputData as Record<string, unknown>),
				createdDesigns: created,
			};
		},
	});
}

/** Persists flow screens and their connections. */
export function makePersistFlowStep(carrierSchema: z.ZodTypeAny) {
	return createStep({
		id: "persistFlow",
		description: "Persist flow screens and their connections.",
		inputSchema: carrierSchema,
		outputSchema: carrierSchema,
		execute: async ({ inputData }) => {
			const carrier = inputData as PersistFlowCarrier;
			const { created, idMap } = await persistGeneratedDesigns({
				projectId: carrier.projectId,
				createdById: carrier.userId,
				designs: carrier.flow?.designs ?? [],
				existingDesigns: carrier.context?.existingDesigns ?? [],
				namePrefix: carrier.namePrefix,
				label: "Flow Concept",
			});
			const createdConnections = await persistConnections({
				projectId: carrier.projectId,
				connections: carrier.flow?.connections ?? [],
				idMap,
			});
			return {
				...(inputData as Record<string, unknown>),
				createdDesigns: created,
				createdConnections,
			};
		},
	});
}

/**
 * Synthesizes and persists project style memory from the workflow result. The
 * caller supplies how to derive the memory signals and the final output.
 */
export function makeUpdateStyleMemoryStep<
	TCarrier extends StyleMemoryCarrier,
>(options: {
	carrierSchema: z.ZodTypeAny;
	outputSchema: z.ZodTypeAny;
	buildSignals: (carrier: TCarrier) => string[];
	buildOutput: (
		carrier: TCarrier,
		synthesis: ProjectStyleMemorySynthesis,
	) => unknown;
}) {
	return createStep({
		id: "updateStyleMemory",
		description: "Synthesize and persist project style memory from the result.",
		inputSchema: options.carrierSchema,
		outputSchema: options.outputSchema,
		execute: async ({ inputData }) => {
			const carrier = inputData as TCarrier;
			const projectName =
				carrier.projectName ??
				carrier.context?.projectName ??
				carrier.projectId;

			const synthesis = await updateProjectStyleMemory({
				projectId: carrier.projectId,
				projectName,
				signals: options.buildSignals(carrier),
				designTokens: null,
				config: carrier.config,
			});

			return options.buildOutput(carrier, synthesis);
		},
	});
}

/**
 * Workflow shared helpers
 * Schemas and deterministic utilities shared by the Mastra workflows: project
 * context gathering (Prisma + style memory) and style-memory synthesis.
 */

import { LlmProvider } from "generated/prisma/enums";
import { z } from "zod";
import { attachedImageSchema } from "@/server/api/features/designs/design.dto";
import { generate } from "@/server/mastra/agent-utils";
import {
	agents,
	type ProjectStyleMemorySynthesis,
	projectStyleMemorySchema,
} from "@/server/mastra/agents";
import { styleMemory } from "@/server/mastra/memory";
import {
	loadProjectComponents,
	loadProjectDesignLayouts,
	loadProjectDesignSystem,
	loadProjectName,
} from "@/server/mastra/project-context";
import { buildStyleMemoryPrompt } from "@/server/mastra/prompts";
import type { AiConfig } from "@/types/llm";
import type { DesignSystemContext, DesignTokens } from "@/types/shared";
import type { PersistedDesign } from "./persistence";

export { attachedImageSchema };

export const aiConfigSchema = z.object({
	provider: z.nativeEnum(LlmProvider),
	apiKey: z.string(),
	model: z.string(),
});

export const MAX_REFINE_PASSES = 2;

export interface WorkflowExistingDesign {
	id: string;
	name: string;
	description: string | null;
	position: unknown;
	size: unknown;
}

/** Shared context shape produced by `gatherProjectContext` and carried through the generation workflows. */
export interface WorkflowContext {
	designSystem: DesignSystemContext | null;
	components: { id: string; name: string; html: string }[];
	existingDesigns: WorkflowExistingDesign[];
	styleMemory: string | null;
	projectName: string | null;
}

/** Fallback context used when no project context has been gathered yet. */
export const EMPTY_CONTEXT: WorkflowContext = {
	designSystem: null,
	components: [],
	existingDesigns: [],
	styleMemory: null,
	projectName: null,
};

/**
 * Shared context shape produced by `gatherProjectContext` and carried through
 * the generation workflows (design + flow).
 */
export const workflowContextSchema = z.object({
	designSystem: z.custom<DesignSystemContext | null>(),
	components: z.array(
		z.object({ id: z.string(), name: z.string(), html: z.string() }),
	),
	existingDesigns: z.custom<WorkflowExistingDesign[]>(),
	styleMemory: z.string().nullable(),
	projectName: z.string().nullish(),
});

/**
 * Shared persisted-design schema returned by the generation workflows. Typed
 * to the full `designSelect` Prisma payload so workflow results carry the real
 * record shape without casting at the call site. JSON fields are left as
 * `z.custom` (opaque at the schema boundary).
 */
export const persistedDesignSchema = z.object({
	id: z.custom<PersistedDesign["id"]>(),
	projectId: z.custom<PersistedDesign["projectId"]>(),
	name: z.custom<PersistedDesign["name"]>(),
	description: z.custom<PersistedDesign["description"]>(),
	data: z.custom<PersistedDesign["data"]>(),
	html: z.custom<PersistedDesign["html"]>(),
	position: z.custom<PersistedDesign["position"]>(),
	size: z.custom<PersistedDesign["size"]>(),
	viewMode: z.custom<PersistedDesign["viewMode"]>(),
	createdAt: z.custom<PersistedDesign["createdAt"]>(),
	updatedAt: z.custom<PersistedDesign["updatedAt"]>(),
	createdById: z.custom<PersistedDesign["createdById"]>(),
	history: z.custom<PersistedDesign["history"]>(),
	version: z.custom<PersistedDesign["version"]>(),
	tokens: z.custom<PersistedDesign["tokens"]>(),
});

export const projectThreadId = (projectId: string) => `project:${projectId}`;

/**
 * Best-effort creation of the per-project memory thread so working memory has
 * a thread to attach to. Safe to call repeatedly.
 */
export async function ensureProjectThread(projectId: string): Promise<void> {
	const threadId = projectThreadId(projectId);
	const existing = await styleMemory
		.getThreadById({ threadId })
		.catch(() => null);
	if (!existing) {
		await styleMemory
			.createThread({
				threadId,
				resourceId: projectId,
				title: `Project ${projectId}`,
			})
			.catch(() => undefined);
	}
}

/** Reads the project's persisted style memory (working memory), if any. */
export async function readProjectStyleMemory(
	projectId: string,
): Promise<string | null> {
	return styleMemory.getWorkingMemory({
		threadId: projectThreadId(projectId),
		resourceId: projectId,
	});
}

/**
 * Gathers deterministic project context: design system, reusable components,
 * existing design layout, persisted style memory, and the project name.
 */
export async function gatherProjectContext(
	projectId: string,
): Promise<WorkflowContext> {
	const [
		designSystem,
		components,
		existingDesigns,
		styleMemoryContext,
		project,
	] = await Promise.all([
		loadProjectDesignSystem(projectId),
		loadProjectComponents(projectId),
		loadProjectDesignLayouts(projectId),
		ensureProjectThread(projectId).then(() =>
			readProjectStyleMemory(projectId),
		),
		loadProjectName(projectId),
	]);

	return {
		designSystem: designSystem as unknown as DesignSystemContext | null,
		components: components.map((component) => ({
			id: component.id,
			name: component.name,
			html: component.html,
		})),
		existingDesigns,
		styleMemory: styleMemoryContext,
		projectName: project?.name ?? null,
	};
}

/** Extracts markdown bullet directives from persisted style memory. */
export function parseStyleDirectives(memory: string): string[] {
	return memory
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.startsWith("- "))
		.map((line) => line.slice(2).trim())
		.filter(Boolean);
}

/** Serializes a style-memory synthesis into the working-memory template shape. */
export function serializeStyleMemory(
	synthesis: ProjectStyleMemorySynthesis,
): string {
	return `# Style Memory

## Brand Summary
${synthesis.summary}

## Style Directives
${synthesis.styleDirectives.map((directive) => `- ${directive}`).join("\n")}
`;
}

/**
 * Runs the `styleMemorySynthesizer` over the given normalized signals and
 * persists the resulting synthesis as the project's working memory.
 */
export async function updateProjectStyleMemory(options: {
	projectId: string;
	projectName?: string | null;
	signals: string[];
	designTokens?: DesignTokens | null;
	config: AiConfig;
}): Promise<ProjectStyleMemorySynthesis> {
	await ensureProjectThread(options.projectId);
	const existing = await readProjectStyleMemory(options.projectId);
	const directives = existing ? parseStyleDirectives(existing) : [];

	const fullPrompt = buildStyleMemoryPrompt({
		projectName: options.projectName,
		existingSummary: existing,
		existingDirectives: directives,
		signals: options.signals,
		designTokens: options.designTokens,
	});

	const synthesis = await generate(
		agents.styleMemorySynthesizer,
		fullPrompt,
		projectStyleMemorySchema,
		options.config,
	);

	await styleMemory.updateWorkingMemory({
		threadId: projectThreadId(options.projectId),
		resourceId: options.projectId,
		workingMemory: serializeStyleMemory(synthesis),
	});

	return synthesis;
}

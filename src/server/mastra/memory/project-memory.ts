/**
 * Project memory accessor
 * Read-side facade over Mastra memory for the client. Exposes the project's
 * persisted style memory (working memory), its thread(s), and the recent
 * conversation history, plus a raw write path for manually tweaking the
 * working memory from the canvas UI.
 */

import { ensureProjectThread, projectThreadId } from "../workflows/shared";
import { styleMemory } from "./memory";

export interface ProjectThreadInfo {
	id: string;
	title: string | undefined;
	resourceId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProjectMessageInfo {
	id: string;
	role: string;
	text: string;
	createdAt: Date;
}

export interface ProjectMemoryState {
	workingMemory: string | null;
	threads: ProjectThreadInfo[];
	messages: ProjectMessageInfo[];
	/** Most recent thread activity (proxy for when the project memory was last touched). */
	lastActivityAt: Date | null;
}

/** Extracts a flat text representation from a Mastra message's content parts. */
function messageText(content: unknown): string {
	if (typeof content === "string") {
		return content;
	}
	if (Array.isArray(content)) {
		return content
			.map((part) => {
				const p = part as { type?: string; text?: string };
				return p?.type === "text" ? (p.text ?? "") : "";
			})
			.filter(Boolean)
			.join(" ");
	}
	return "";
}

/**
 * Loads the full memory state for a project: working/style memory string, its
 * Mastra thread(s), and the most recent conversation messages.
 */
export async function getProjectMemoryState(
	projectId: string,
): Promise<ProjectMemoryState> {
	await ensureProjectThread(projectId);

	const threadId = projectThreadId(projectId);

	const [workingMemory, threadPage, recalled] = await Promise.all([
		styleMemory.getWorkingMemory({
			threadId,
			resourceId: projectId,
		}),
		styleMemory.listThreads({
			filter: { resourceId: projectId },
			perPage: false,
		}),
		styleMemory.recall({
			threadId,
			resourceId: projectId,
			perPage: false,
			includeSystemReminders: false,
		}),
	]);

	const threads = (threadPage?.threads ?? []).map((thread) => ({
		id: thread.id,
		title: thread.title,
		resourceId: thread.resourceId,
		createdAt: thread.createdAt,
		updatedAt: thread.updatedAt,
	}));

	return {
		workingMemory,
		threads,
		messages: (recalled?.messages ?? []).map((message) => ({
			id: message.id,
			role: message.role ?? "user",
			text: messageText(message.content),
			createdAt: message.createdAt,
		})),
		lastActivityAt: latestActivityAt(threads),
	};
}

/** Returns the most recent thread timestamp, if any threads exist. */
function latestActivityAt(threads: { updatedAt: Date }[]): Date | null {
	let latest: Date | null = null;
	for (const thread of threads) {
		if (!latest || thread.updatedAt.getTime() > latest.getTime()) {
			latest = new Date(thread.updatedAt);
		}
	}
	return latest;
}
/**
 * Lightweight memory status for the canvas: whether the project has any
 * persisted style memory and when it was last touched. Avoids loading the full
 * conversation history on every canvas render.
 */
export interface ProjectMemoryStatus {
	hasMemory: boolean;
	lastActivityAt: Date | null;
}

export async function getProjectMemoryStatus(
	projectId: string,
): Promise<ProjectMemoryStatus> {
	await ensureProjectThread(projectId);

	const [workingMemory, threads] = await Promise.all([
		styleMemory.getWorkingMemory({
			threadId: projectThreadId(projectId),
			resourceId: projectId,
		}),
		styleMemory.listThreads({
			filter: { resourceId: projectId },
			perPage: false,
		}),
	]);

	return {
		hasMemory: Boolean(workingMemory?.trim()),
		lastActivityAt: latestActivityAt(threads?.threads ?? []),
	};
}

/**
 * Overwrites the project's style memory (working memory) with the given raw
 * markdown. This is intentionally manual — use with care since it bypasses the
 * `styleMemorySynthesizer` agent and directly controls what future design
 * generations use as context.
 */
export async function setProjectStyleMemory(
	projectId: string,
	workingMemory: string,
): Promise<void> {
	await ensureProjectThread(projectId);
	await styleMemory.updateWorkingMemory({
		threadId: projectThreadId(projectId),
		resourceId: projectId,
		workingMemory,
	});
}

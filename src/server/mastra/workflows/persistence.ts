/**
 * Persistence helpers
 * Deterministic database writes shared by the Mastra workflows and the
 * legacy `ai.service` entry points (tRPC router + MCP). Centralizing these
 * guarantees every generation/modification path persists designs, connections,
 * and history in exactly the same way.
 */

import type { Prisma } from "generated/prisma/client";
import {
	connectionSelect,
	designSelect,
	normalizeHistory,
	toConnectionPosition,
	toJsonInput,
} from "@/server/api/features/designs/design.dto";
import {
	calculateNextPosition,
	DEFAULT_HEIGHT,
	DEFAULT_WIDTH,
} from "@/server/api/features/designs/layout.utils";
import { db } from "@/server/db";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import type { PointPosition } from "@/types/shared";

export type PersistedDesign = Prisma.DesignGetPayload<{
	select: typeof designSelect;
}>;

export type PersistedConnection = Prisma.DesignConnectionGetPayload<{
	select: typeof connectionSelect;
}>;

export interface DesignToCreate {
	/** Temporary ID used to link connections (flow screens only). */
	id?: string;
	description?: string | null;
	html: string;
}

export interface ExistingLayout {
	position: unknown;
	size: unknown;
}

export interface ConnectionToCreate {
	from: string;
	to: string;
	fromPosition: PointPosition;
	toPosition: PointPosition;
}

/**
 * Creates designs in the project with auto-layout positioning and a
 * sanitized HTML history. Returns the created designs plus a temporary-ID to
 * real-ID map (populated only for designs that carried a temporary ID).
 */
export async function persistGeneratedDesigns(options: {
	projectId: string;
	createdById: string;
	designs: DesignToCreate[];
	existingDesigns: ExistingLayout[];
	namePrefix?: string | null;
	label: string;
}): Promise<{ created: PersistedDesign[]; idMap: Map<string, string> }> {
	const idMap = new Map<string, string>();
	const created: PersistedDesign[] = [];
	const currentExisting = [...options.existingDesigns];

	for (const [index, design] of options.designs.entries()) {
		const prefix = options.namePrefix?.trim();
		const name = prefix ? prefix : `${options.label} ${index + 1}`;
		const position = calculateNextPosition(currentExisting);
		const size = { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
		currentExisting.push({ position, size });

		const html = sanitizeGeneratedHtml(design.html);
		const newDesign = await db.design.create({
			data: {
				projectId: options.projectId,
				name,
				description: design.description,
				html,
				history: toJsonInput([html]),
				createdById: options.createdById,
				position: toJsonInput(position),
				size: toJsonInput(size),
			},
			select: designSelect,
		});

		created.push(newDesign);
		if (design.id) idMap.set(design.id, newDesign.id);
	}

	return { created, idMap };
}

/**
 * Creates design connections, resolving temporary design IDs and skipping
 * self-referencing or unresolvable edges.
 */
export async function persistConnections(options: {
	projectId: string;
	connections: ConnectionToCreate[];
	idMap: Map<string, string>;
}): Promise<PersistedConnection[]> {
	const created: PersistedConnection[] = [];

	for (const connection of options.connections) {
		const fromId = options.idMap.get(connection.from);
		const toId = options.idMap.get(connection.to);
		if (!fromId || !toId || fromId === toId) continue;

		const createdConnection = await db.designConnection.create({
			data: {
				projectId: options.projectId,
				fromDesignId: fromId,
				toDesignId: toId,
				fromPosition: toConnectionPosition(connection.fromPosition),
				toPosition: toConnectionPosition(connection.toPosition),
			},
			select: connectionSelect,
		});

		created.push(createdConnection);
	}

	return created;
}

/**
 * Persists modified designs: sanitized HTML, appended history, and an
 * incremented version. Designs without a matching source record are skipped.
 */
export async function persistModifiedDesigns(options: {
	modified: { id: string; html: string }[];
	sourceHistoryById: Map<string, unknown>;
}): Promise<PersistedDesign[]> {
	const updated: PersistedDesign[] = [];

	for (const item of options.modified) {
		const history = options.sourceHistoryById.get(item.id);
		if (history === undefined) continue;

		const html = sanitizeGeneratedHtml(item.html);
		const nextHistory = normalizeHistory(history);
		nextHistory.push(html);

		const updatedDesign = await db.design.update({
			where: { id: item.id },
			data: {
				html,
				history: toJsonInput(nextHistory),
				version: { increment: 1 },
			},
			select: designSelect,
		});

		updated.push(updatedDesign);
	}

	return updated;
}

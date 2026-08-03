/**
 * Project context loaders
 * Raw Prisma reads shared by the agent tool (`getProjectContextTool`) and the
 * workflow context gatherer, so the DB-queryshape never drifts between them.
 */

import type { Prisma } from "generated/prisma/client";
import { db } from "@/server/db";

export type ProjectComponents = Prisma.ComponentGetPayload<{
	select: { id: true; name: true; html: true };
}>;

export type ProjectDesignLayout = {
	id: string;
	name: string;
	description: string | null;
	position: Prisma.JsonValue | null;
	size: Prisma.JsonValue | null;
};

export async function loadProjectDesignSystem(projectId: string) {
	return db.designSystem.findUnique({ where: { projectId } });
}

export async function loadProjectComponents(
	projectId: string,
	take?: number,
): Promise<ProjectComponents[]> {
	return db.component.findMany({
		where: { projectId },
		select: { id: true, name: true, html: true },
		orderBy: { updatedAt: "desc" },
		...(take != null ? { take } : {}),
	});
}

export async function loadProjectName(projectId: string) {
	return db.project.findUnique({
		where: { id: projectId },
		select: { name: true },
	});
}

/** Existing design layout only (positions/sizes for auto-placement). */
export async function loadProjectDesignLayouts(
	projectId: string,
): Promise<ProjectDesignLayout[]> {
	return db.design.findMany({
		where: { projectId },
		select: {
			id: true,
			name: true,
			description: true,
			position: true,
			size: true,
		},
		orderBy: { createdAt: "asc" },
	});
}

/** Recent design samples with markup (for grounding generation). */
export async function loadProjectDesignSamples(
	projectId: string,
	take = 8,
): Promise<
	Prisma.DesignGetPayload<{
		select: {
			id: true;
			name: true;
			description: true;
			html: true;
			viewMode: true;
			updatedAt: true;
		};
	}>[]
> {
	return db.design.findMany({
		where: { projectId },
		select: {
			id: true,
			name: true,
			description: true,
			html: true,
			viewMode: true,
			updatedAt: true,
		},
		orderBy: { updatedAt: "desc" },
		take,
	});
}

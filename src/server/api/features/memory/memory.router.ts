/**
 * Memory router
 * Exposes the project's Mastra memory to the canvas UI: the persisted style
 * memory (working memory), its thread(s), and recent conversation history.
 * The write endpoint allows manually overriding the style memory.
 */

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
	getProjectMemoryState,
	getProjectMemoryStatus,
	setProjectStyleMemory,
} from "@/server/mastra/memory/project-memory";
import {
	assertProjectAccess,
	EDITOR_ACCESS,
	VIEWER_ACCESS,
} from "../projects/permissions";

export const memoryRouter = createTRPCRouter({
	getProjectState: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, VIEWER_ACCESS);
			return getProjectMemoryState(input.projectId);
		}),

	getStatus: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, VIEWER_ACCESS);
			return getProjectMemoryStatus(input.projectId);
		}),

	updateStyleMemory: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
				workingMemory: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);
			await setProjectStyleMemory(input.projectId, input.workingMemory);
			return { success: true };
		}),

	clearStyleMemory: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);
			await setProjectStyleMemory(input.projectId, "");
			return { success: true };
		}),
});

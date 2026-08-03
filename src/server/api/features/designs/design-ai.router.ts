import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
	DesignsNotFoundError,
	gatherProjectContext,
} from "@/server/mastra/workflows";
import {
	applyDesignTokens,
	critiqueDesignQuality,
	extractComponent,
	extractDesignTokens,
	findClickableSelectorsForConnections,
	generateDesignFlow,
	generateDesigns,
	modifyDesigns,
	parseTokens,
	planProductFlow,
	synthesizeProjectStyleMemory,
} from "@/server/services/ai.service";
import {
	assertProjectAccess,
	EDITOR_ACCESS,
	VIEWER_ACCESS,
} from "../projects/permissions";

import {
	attachedImageSchema,
	designSelect,
	designTokensSchema,
	normalizeHistory,
	promptSchema,
	toJsonInput,
	viewModeSchema,
} from "./design.dto";

export const designAiRouter = createTRPCRouter({
	aiGenerate: protectedProcedure
		.input(promptSchema)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			return generateDesigns({
				userId: ctx.session.user.id,
				projectId: input.projectId,
				prompt: input.prompt,
				count: input.count ?? 1,
				namePrefix: input.namePrefix,
				images: input.images,
			});
		}),

	aiGenerateFlow: protectedProcedure
		.input(promptSchema)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			return generateDesignFlow({
				userId: ctx.session.user.id,
				projectId: input.projectId,
				prompt: input.prompt,
				namePrefix: input.namePrefix,
				images: input.images,
			});
		}),

	aiModify: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
				prompt: z.string().default(""),
				designIds: z.array(z.string().cuid()).min(1),
				images: z.array(attachedImageSchema).max(4).optional(),
				selector: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			try {
				return await modifyDesigns({
					userId: ctx.session.user.id,
					projectId: input.projectId,
					designIds: input.designIds,
					prompt: input.prompt,
					images: input.images,
					selector: input.selector,
				});
			} catch (error) {
				if (error instanceof DesignsNotFoundError) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: error.message,
					});
				}
				throw error;
			}
		}),

	aiExtractTokens: protectedProcedure
		.input(
			z.object({
				designId: z.string().cuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const design = await ctx.db.design.findUnique({
				where: { id: input.designId },
				select: {
					id: true,
					projectId: true,
					html: true,
				},
			});

			if (!design) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Design not found.",
				});
			}

			await assertProjectAccess(ctx, design.projectId, EDITOR_ACCESS);

			const tokens = await extractDesignTokens({
				userId: ctx.session.user.id,
				html: design.html ?? "",
			});

			await ctx.db.design.update({
				where: { id: input.designId },
				data: {
					tokens: toJsonInput(tokens),
				},
			});

			return tokens;
		}),

	aiApplyTokens: protectedProcedure
		.input(
			z.object({
				designId: z.string().cuid(),
				tokens: designTokensSchema.optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const design = await ctx.db.design.findUnique({
				where: { id: input.designId },
				select: {
					id: true,
					projectId: true,
					html: true,
					history: true,
					tokens: true,
				},
			});

			if (!design) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Design not found.",
				});
			}

			await assertProjectAccess(ctx, design.projectId, EDITOR_ACCESS);

			const tokens = input.tokens ?? parseTokens(design.tokens);

			if (
				!tokens ||
				(tokens.colors.background.length === 0 &&
					tokens.colors.text.length === 0 &&
					tokens.colors.primary.length === 0 &&
					tokens.colors.border.length === 0)
			) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message:
						"No design tokens available. Please extract tokens before applying them.",
				});
			}

			const updatedHtml = await applyDesignTokens({
				userId: ctx.session.user.id,
				html: design.html ?? "",
				tokens,
			});

			const nextHistory = normalizeHistory(design.history);
			nextHistory.push(updatedHtml.html);

			const updatedDesign = await ctx.db.design.update({
				where: { id: input.designId },
				data: {
					html: updatedHtml.html,
					history: toJsonInput(nextHistory),
					tokens: toJsonInput(tokens),
					version: { increment: 1 },
				},
				select: designSelect,
			});

			return updatedDesign;
		}),

	aiExtractComponent: protectedProcedure
		.input(
			z.object({
				designId: z.string().cuid(),
				selector: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const design = await ctx.db.design.findUnique({
				where: { id: input.designId },
				select: {
					id: true,
					projectId: true,
					html: true,
				},
			});

			if (!design) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Design not found.",
				});
			}

			await assertProjectAccess(ctx, design.projectId, EDITOR_ACCESS);

			return extractComponent({
				userId: ctx.session.user.id,
				html: design.html ?? "",
				selector: input.selector,
			});
		}),

	aiFindClickableSelectors: protectedProcedure
		.input(
			z.object({
				designId: z.string().cuid(),
				targets: z.array(
					z.object({
						connectionId: z.string(),
						targetDescription: z.string(),
					}),
				),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const design = await ctx.db.design.findUnique({
				where: { id: input.designId },
				select: {
					id: true,
					projectId: true,
					html: true,
				},
			});

			if (!design) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Design not found.",
				});
			}

			await assertProjectAccess(ctx, design.projectId, VIEWER_ACCESS);

			return findClickableSelectorsForConnections({
				userId: ctx.session.user.id,
				sourceHtml: design.html ?? "",
				targets: input.targets,
			});
		}),

	aiCritique: protectedProcedure
		.input(
			z.object({
				designId: z.string().cuid(),
				viewMode: viewModeSchema.optional(),
				goal: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const design = await ctx.db.design.findUnique({
				where: { id: input.designId },
				select: {
					id: true,
					projectId: true,
					html: true,
				},
			});

			if (!design) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Design not found.",
				});
			}

			await assertProjectAccess(ctx, design.projectId, VIEWER_ACCESS);

			const context = await gatherProjectContext(design.projectId);

			return critiqueDesignQuality({
				userId: ctx.session.user.id,
				html: design.html ?? "",
				viewMode: input.viewMode ?? "DESKTOP",
				goal: input.goal,
				projectMemoryContext: context.styleMemory,
				designSystem: context.designSystem,
			});
		}),

	aiPlanFlow: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
				prompt: z.string().min(1),
				maxScreens: z.number().int().min(2).max(12).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, VIEWER_ACCESS);

			const context = await gatherProjectContext(input.projectId);

			return planProductFlow({
				userId: ctx.session.user.id,
				prompt: input.prompt,
				maxScreens: input.maxScreens ?? 8,
				existingScreens: context.existingDesigns.map((design) => ({
					id: design.id,
					name: design.name,
					description: design.description,
				})),
				projectMemoryContext: context.styleMemory,
				designSystem: context.designSystem,
				components: context.components,
			});
		}),

	aiStyleMemory: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
				prompt: z.string().default(""),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			const context = await gatherProjectContext(input.projectId);

			const signals = [
				`User request: ${input.prompt}`,
				...context.existingDesigns
					.slice(0, 5)
					.map((design) => `${design.name}: ${design.description ?? ""}`),
			].filter(Boolean);

			return synthesizeProjectStyleMemory({
				userId: ctx.session.user.id,
				projectName: context.projectName,
				normalizedSignals: signals,
				existingSummary: context.styleMemory,
				designTokens: null,
			});
		}),
});

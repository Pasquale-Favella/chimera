import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	createTRPCRouter,
	type ProtectedContext,
	protectedProcedure,
} from "@/server/api/trpc";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import {
	applyDesignTokens,
	extractComponent,
	extractDesignTokens,
	findClickableSelectorsForConnections,
	generateDesignFlow,
	generateDesigns,
	modifyDesigns,
	parseTokens,
} from "@/server/services/ai.service";
import { AiFeature } from "@/types/settings";
import type { DesignSystemContext } from "@/types/shared";
import {
	ConnectionPosition,
	type DesignViewMode,
	LlmProvider,
	Prisma,
} from "../../../../../generated/prisma/client";
import {
	assertProjectAccess,
	EDITOR_ACCESS,
	OWNER_ACCESS,
	VIEWER_ACCESS,
} from "../projects/permissions";

import {
	attachedImageSchema,
	designIdSchema,
	designTokensSchema,
	positionSchema,
	promptSchema,
	sizeSchema,
	viewModeSchema,
} from "./design.dto";
import { calculateNextPosition } from "./layout.utils";

const designSelect = {
	id: true,
	projectId: true,
	name: true,
	description: true,
	data: true,
	html: true,
	position: true,
	size: true,
	viewMode: true,
	createdAt: true,
	updatedAt: true,
	createdById: true,
	history: true,
	version: true,
	tokens: true,
};

const connectionSelect = {
	id: true,
	fromDesignId: true,
	toDesignId: true,
	fromPosition: true,
	toPosition: true,
};

function toJsonInput(
	value: unknown,
): typeof Prisma.JsonNull | Prisma.InputJsonValue {
	if (value === undefined || value === null) {
		return Prisma.JsonNull;
	}

	return value as Prisma.InputJsonValue;
}

function toDesignViewMode(
	mode: "DESKTOP" | "TABLET" | "MOBILE" | undefined,
): DesignViewMode | undefined {
	if (!mode) return undefined;
	return mode as DesignViewMode;
}

function normalizeHistory(history: unknown): string[] {
	if (Array.isArray(history)) {
		return history.filter((item): item is string => typeof item === "string");
	}
	return [];
}

async function getDesignOrThrow(ctx: ProtectedContext, designId: string) {
	const design = await ctx.db.design.findUnique({
		where: { id: designId },
		select: { projectId: true },
	});

	if (!design) {
		throw new TRPCError({ code: "NOT_FOUND", message: "Design not found." });
	}

	return design;
}

async function getLlmConfig(ctx: ProtectedContext, feature: string) {
	const user = await ctx.db.user.findUnique({
		where: { id: ctx.session.user.id },
		select: { llmApiKeys: true, llmPreferences: true },
	});

	if (!user) return undefined;

	const prefs = user.llmPreferences as Record<
		string,
		{ provider: LlmProvider; model: string }
	> | null;
	const featurePrefs = prefs?.[feature];
	const provider = featurePrefs?.provider ?? LlmProvider.GOOGLE;

	// Find API key for provider
	const apiKeyRecord = user.llmApiKeys.find((k) => k.provider === provider);

	return {
		provider,
		apiKey: apiKeyRecord?.apiKey,
		model: featurePrefs?.model,
	};
}

function toConnectionPosition(
	pos: "top" | "right" | "bottom" | "left",
): ConnectionPosition {
	switch (pos) {
		case "top":
			return ConnectionPosition.TOP;
		case "right":
			return ConnectionPosition.RIGHT;
		case "bottom":
			return ConnectionPosition.BOTTOM;
		case "left":
			return ConnectionPosition.LEFT;
	}
}

export const designsRouter = createTRPCRouter({
	listByProject: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, VIEWER_ACCESS);

			return ctx.db.design.findMany({
				where: { projectId: input.projectId },
				select: designSelect,
				orderBy: { updatedAt: "desc" },
			});
		}),

	listRecent: protectedProcedure
		.input(
			z.object({
				limit: z.number().int().min(1).max(20).default(8),
			}),
		)
		.query(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			return ctx.db.design.findMany({
				where: {
					OR: [
						{ project: { createdById: userId } },
						{
							project: {
								memberships: {
									some: { userId },
								},
							},
						},
					],
				},
				include: {
					project: true,
				},
				orderBy: { updatedAt: "desc" },
				take: input.limit,
			});
		}),

	getById: protectedProcedure
		.input(designIdSchema)
		.query(async ({ ctx, input }) => {
			const design = await ctx.db.design.findUnique({
				where: { id: input.designId },
				select: designSelect,
			});

			if (!design) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Design not found.",
				});
			}

			await assertProjectAccess(ctx, design.projectId, VIEWER_ACCESS);

			return design;
		}),

	create: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
				name: z.string().trim().min(1).max(120),
				description: z.string().trim().max(500).nullable().optional(),
				data: z.unknown().optional(),
				html: z.string().optional(),
				position: positionSchema.optional(),
				size: sizeSchema.optional(),
				viewMode: viewModeSchema.optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			const payloadData = toJsonInput(input.data);

			let position = input.position;
			if (!position) {
				const existingDesigns = await ctx.db.design.findMany({
					where: { projectId: input.projectId },
					select: { position: true, size: true },
				});
				position = calculateNextPosition(existingDesigns);
			}

			// Default size if not provided
			const size = input.size ?? { width: 1200, height: 800 };

			return ctx.db.design.create({
				data: {
					projectId: input.projectId,
					name: input.name,
					description: input.description ?? null,
					data: payloadData,
					createdById: ctx.session.user.id,
					html: sanitizeGeneratedHtml(input.html ?? ""),
					position: toJsonInput(position),
					size: toJsonInput(size),
					viewMode: input.viewMode
						? toDesignViewMode(input.viewMode)
						: undefined,
				},
				select: designSelect,
			});
		}),

	update: protectedProcedure
		.input(
			designIdSchema.extend({
				name: z.string().trim().min(1).max(120).optional(),
				description: z.string().trim().max(500).nullable().optional(),
				data: z.unknown().optional(),
				position: positionSchema.optional(),
				size: sizeSchema.optional(),
				viewMode: viewModeSchema.optional(),
				incrementVersion: z.boolean().optional(),
				html: z.string().optional(),
				history: z.array(z.string()).optional(),
				tokens: designTokensSchema.optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const design = await getDesignOrThrow(ctx, input.designId);
			await assertProjectAccess(ctx, design.projectId, EDITOR_ACCESS);

			const data: Prisma.DesignUpdateInput = {};

			if (input.name !== undefined) {
				data.name = input.name;
			}

			if (input.description !== undefined) {
				data.description = input.description;
			}

			if (input.data !== undefined) {
				data.data = toJsonInput(input.data);
			}

			if (input.position !== undefined) {
				data.position = toJsonInput(input.position);
			}

			if (input.size !== undefined) {
				data.size = toJsonInput(input.size);
			}

			if (input.viewMode !== undefined) {
				data.viewMode = toDesignViewMode(input.viewMode);
			}

			if (input.html !== undefined) {
				data.html = sanitizeGeneratedHtml(input.html);
			}

			if (input.history !== undefined) {
				data.history = toJsonInput(input.history.map(sanitizeGeneratedHtml));
			}

			if (input.tokens !== undefined) {
				data.tokens = toJsonInput(input.tokens);
			}

			if (input.incrementVersion) {
				data.version = { increment: 1 };
			}

			return ctx.db.design.update({
				where: { id: input.designId },
				data,
				select: designSelect,
			});
		}),

	delete: protectedProcedure
		.input(designIdSchema)
		.mutation(async ({ ctx, input }) => {
			const design = await getDesignOrThrow(ctx, input.designId);
			await assertProjectAccess(ctx, design.projectId, OWNER_ACCESS);

			await ctx.db.design.delete({
				where: { id: input.designId },
			});

			return { success: true };
		}),

	aiGenerate: protectedProcedure
		.input(promptSchema)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			const existingDesigns = await ctx.db.design.findMany({
				where: { projectId: input.projectId },
				select: { position: true, size: true },
			});

			const components = await ctx.db.component.findMany({
				where: { projectId: input.projectId },
				select: { name: true, html: true },
			});

			let promptWithContext = input.prompt;
			if (components.length > 0) {
				const componentContext = components
					.map((c) => `Component "${c.name}":\n${c.html}`)
					.join("\n\n");
				promptWithContext += `\n\nAvailable Reusable Components (Use these if relevant):\n${componentContext}`;
			}

			const designSystem = await ctx.db.designSystem.findUnique({
				where: { projectId: input.projectId },
			});

			const config = await getLlmConfig(ctx, AiFeature.GENERATE_DESIGNS);

			const designs = await generateDesigns(
				promptWithContext,
				input.count ?? 1,
				input.images,
				config
					? {
							...config,
							userId: ctx.session.user.id,
							projectId: input.projectId,
						}
					: { userId: ctx.session.user.id, projectId: input.projectId },
				designSystem as unknown as DesignSystemContext,
			);

			const created: Prisma.DesignGetPayload<{
				select: typeof designSelect;
			}>[] = [];
			const currentExisting = [...existingDesigns];

			for (const [index, design] of designs.entries()) {
				const fallbackName = `AI Concept ${index + 1}`;
				const name = input.namePrefix?.trim().length
					? input.namePrefix.trim()
					: fallbackName;

				const position = calculateNextPosition(currentExisting);
				const size = { width: 1200, height: 800 };

				currentExisting.push({
					position: position as unknown as Prisma.JsonObject,
					size: size as unknown as Prisma.JsonObject,
				});

				const newDesign = await ctx.db.design.create({
					data: {
						projectId: input.projectId,
						name,
						description: design.description,
						html: design.html,
						history: toJsonInput([design.html]),
						createdById: ctx.session.user.id,
						position: toJsonInput(position),
						size: toJsonInput(size),
					},
					select: designSelect,
				});
				created.push(newDesign);
			}

			return created;
		}),

	aiGenerateFlow: protectedProcedure
		.input(promptSchema)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			const existingDesigns = await ctx.db.design.findMany({
				where: { projectId: input.projectId },
				select: { position: true, size: true },
			});

			const components = await ctx.db.component.findMany({
				where: { projectId: input.projectId },
				select: { name: true, html: true },
			});

			let promptWithContext = input.prompt;
			if (components.length > 0) {
				const componentContext = components
					.map((c) => `Component "${c.name}":\n${c.html}`)
					.join("\n\n");
				promptWithContext += `\n\nAvailable Reusable Components (Use these if relevant):\n${componentContext}`;
			}

			const designSystem = await ctx.db.designSystem.findUnique({
				where: { projectId: input.projectId },
			});

			const config = await getLlmConfig(ctx, AiFeature.GENERATE_DESIGN_FLOW);

			const flow = await generateDesignFlow(
				promptWithContext,
				input.images,
				config
					? {
							...config,
							userId: ctx.session.user.id,
							projectId: input.projectId,
						}
					: { userId: ctx.session.user.id, projectId: input.projectId },
				designSystem as unknown as DesignSystemContext,
			);

			const tempToReal = new Map<string, string>();
			const createdDesigns: Prisma.DesignGetPayload<{
				select: typeof designSelect;
			}>[] = [];
			const currentExisting = [...existingDesigns];

			for (const [index, design] of flow.designs.entries()) {
				const fallbackName = `Flow Concept ${index + 1}`;
				const name = input.namePrefix?.trim().length
					? input.namePrefix.trim()
					: fallbackName;

				const position = calculateNextPosition(currentExisting);
				const size = { width: 1200, height: 800 };

				currentExisting.push({
					position: position as unknown as Prisma.JsonObject,
					size: size as unknown as Prisma.JsonObject,
				});

				const created = await ctx.db.design.create({
					data: {
						projectId: input.projectId,
						name,
						description: design.description,
						html: design.html,
						history: toJsonInput([design.html]),
						createdById: ctx.session.user.id,
						position: toJsonInput(position),
						size: toJsonInput(size),
					},
					select: designSelect,
				});
				tempToReal.set(design.id, created.id);
				createdDesigns.push(created);
			}

			const createdConnections: Prisma.DesignConnectionGetPayload<{
				select: typeof connectionSelect;
			}>[] = [];
			for (const connection of flow.connections) {
				const fromId = tempToReal.get(connection.from);
				const toId = tempToReal.get(connection.to);
				if (!fromId || !toId || fromId === toId) continue;

				const created = await ctx.db.designConnection.create({
					data: {
						projectId: input.projectId,
						fromDesignId: fromId,
						toDesignId: toId,
						fromPosition: toConnectionPosition(connection.fromPosition),
						toPosition: toConnectionPosition(connection.toPosition),
					},
					select: connectionSelect,
				});
				createdConnections.push(created);
			}

			return { designs: createdDesigns, connections: createdConnections };
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

			const designs = await ctx.db.design.findMany({
				where: {
					id: { in: input.designIds },
					projectId: input.projectId,
				},
				select: { id: true, html: true, history: true },
			});

			if (!designs.length) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "No matching designs were found for this project.",
				});
			}

			const config = await getLlmConfig(ctx, AiFeature.MODIFY_DESIGNS);

			const aiResult = await modifyDesigns(
				designs.map((design) => ({
					id: design.id,
					html: design.html ?? "",
				})),
				input.prompt,
				input.images,
				input.selector,
				config
					? {
							...config,
							userId: ctx.session.user.id,
							projectId: input.projectId,
						}
					: { userId: ctx.session.user.id, projectId: input.projectId },
			);

			const designMap = new Map(designs.map((design) => [design.id, design]));
			const updated = [] as Array<
				Prisma.DesignGetPayload<{ select: typeof designSelect }>
			>;

			for (const modified of aiResult) {
				const current = designMap.get(modified.id);
				if (!current) continue;

				const nextHistory = normalizeHistory(current.history);
				nextHistory.push(modified.html);

				const updatedDesign = await ctx.db.design.update({
					where: { id: modified.id },
					data: {
						html: modified.html,
						history: toJsonInput(nextHistory),

						version: { increment: 1 },
					},
					select: designSelect,
				});

				updated.push(updatedDesign);
			}

			return updated;
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

			const config = await getLlmConfig(ctx, AiFeature.EXTRACT_DESIGN_TOKENS);
			const tokens = await extractDesignTokens(
				design.html ?? "",
				config
					? {
							...config,
							userId: ctx.session.user.id,
							projectId: design.projectId,
						}
					: { userId: ctx.session.user.id, projectId: design.projectId },
			);

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

			const config = await getLlmConfig(ctx, AiFeature.APPLY_DESIGN_TOKENS);
			const updatedHtml = await applyDesignTokens(
				design.html ?? "",
				tokens,
				config
					? {
							...config,
							userId: ctx.session.user.id,
							projectId: design.projectId,
						}
					: { userId: ctx.session.user.id, projectId: design.projectId },
			);

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

			const config = await getLlmConfig(ctx, AiFeature.EXTRACT_COMPONENT);
			const extracted = await extractComponent(
				design.html ?? "",
				input.selector,
				config
					? {
							...config,
							userId: ctx.session.user.id,
							projectId: design.projectId,
						}
					: { userId: ctx.session.user.id, projectId: design.projectId },
			);

			return extracted;
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

			const config = await getLlmConfig(
				ctx,
				AiFeature.FIND_CLICKABLE_SELECTORS,
			);
			const selectors = await findClickableSelectorsForConnections(
				design.html ?? "",
				input.targets,
				config
					? {
							...config,
							userId: ctx.session.user.id,
							projectId: design.projectId,
						}
					: { userId: ctx.session.user.id, projectId: design.projectId },
			);

			return selectors;
		}),
});

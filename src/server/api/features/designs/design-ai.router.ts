import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  type ProtectedContext,
  protectedProcedure,
} from "@/server/api/trpc";
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
import { Prisma } from "../../../../../generated/prisma/client";
import { getUserLlmConfig } from "@/server/lib/llm/user-llm-config";
import {
  assertProjectAccess,
  EDITOR_ACCESS,
  VIEWER_ACCESS,
} from "../projects/permissions";

import {
  attachedImageSchema,
  designTokensSchema,
  promptSchema,
  designSelect,
  connectionSelect,
  toJsonInput,
  normalizeHistory,
  toConnectionPosition,
} from "./design.dto";
import { calculateNextPosition } from "./layout.utils";

async function getLlmConfig(ctx: ProtectedContext, feature: AiFeature) {
  return getUserLlmConfig(ctx.session.user.id, feature);
}

export const designAiRouter = createTRPCRouter({
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

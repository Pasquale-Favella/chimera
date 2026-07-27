import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  type ProtectedContext,
  protectedProcedure,
} from "@/server/api/trpc";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import { type DesignViewMode, Prisma } from "../../../../../generated/prisma/client";
import {
  assertProjectAccess,
  EDITOR_ACCESS,
  OWNER_ACCESS,
  VIEWER_ACCESS,
} from "../projects/permissions";
import {
  designIdSchema,
  designTokensSchema,
  positionSchema,
  sizeSchema,
  viewModeSchema,
  designSelect,
  toJsonInput,
} from "./design.dto";
import { calculateNextPosition } from "./layout.utils";

function toDesignViewMode(
  mode: "DESKTOP" | "TABLET" | "MOBILE" | undefined,
): DesignViewMode | undefined {
  if (!mode) return undefined;
  return mode as DesignViewMode;
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
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";
import {
    EDITOR_ACCESS,
    OWNER_ACCESS,
    VIEWER_ACCESS,
    assertProjectAccess,
} from "../projects/permissions";

const componentIdSchema = z.object({
    componentId: z.string().cuid(),
});

export const componentsRouter = createTRPCRouter({
    listByProject: protectedProcedure
        .input(
            z.object({
                projectId: z.string().cuid(),
            }),
        )
        .query(async ({ ctx, input }) => {
            await assertProjectAccess(ctx, input.projectId, VIEWER_ACCESS);

            return ctx.db.component.findMany({
                where: { projectId: input.projectId },
                orderBy: { createdAt: "desc" },
                include: {
                    createdBy: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                projectId: z.string().cuid(),
                name: z.string().trim().min(1).max(50),
                html: z.string().min(1),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

            return ctx.db.component.create({
                data: {
                    projectId: input.projectId,
                    name: input.name,
                    html: sanitizeGeneratedHtml(input.html),
                    createdById: ctx.session.user.id,
                },
            });
        }),

    update: protectedProcedure
        .input(
            z.object({
                componentId: z.string().cuid(),
                name: z.string().trim().min(1).max(50),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const component = await ctx.db.component.findUnique({
                where: { id: input.componentId },
                select: { projectId: true },
            });

            if (!component) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Component not found." });
            }

            await assertProjectAccess(ctx, component.projectId, EDITOR_ACCESS);

            return ctx.db.component.update({
                where: { id: input.componentId },
                data: { name: input.name },
            });
        }),

    delete: protectedProcedure
        .input(componentIdSchema)
        .mutation(async ({ ctx, input }) => {
            const component = await ctx.db.component.findUnique({
                where: { id: input.componentId },
                select: { projectId: true },
            });

            if (!component) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Component not found." });
            }

            await assertProjectAccess(ctx, component.projectId, EDITOR_ACCESS);

            await ctx.db.component.delete({
                where: { id: input.componentId },
            });

            return { success: true };
        }),
});

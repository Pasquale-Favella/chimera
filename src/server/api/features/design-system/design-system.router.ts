
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const designSystemSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    colors: z.object({
        primary: z.string(),
        secondary: z.string(),
        background: z.string(),
        foreground: z.string(),
        muted: z.string(),
        mutedForeground: z.string(),
        border: z.string(),
        input: z.string(),
        ring: z.string(),
    }).passthrough(), // Allow other keys for flexibility
    typography: z.object({
        fontFamily: z.string(),
        headingFont: z.string().optional(),
        bodyFont: z.string().optional(),
        baseSize: z.string().optional(), // e.g. "16px"
        scale: z.number().optional(), // e.g. 1.25
    }).passthrough(),
    spacing: z.object({
        base: z.number().default(4), // e.g. 4px
        scale: z.number().default(1),
    }).passthrough(),
    radius: z.object({
        small: z.string().default("0.25rem"),
        medium: z.string().default("0.5rem"),
        large: z.string().default("0.75rem"),
    }).passthrough(),
    type: z.string().default("custom"),
    presetName: z.string().optional(),
});

export const designSystemRouter = createTRPCRouter({
    get: protectedProcedure
        .input(z.object({ projectId: z.string() }))
        .query(async ({ ctx, input }) => {
            const designSystem = await ctx.db.designSystem.findFirst({
                where: { projectId: input.projectId },
            });

            if (!designSystem) {
                return null;
            }

            return designSystem;
        }),

    upsert: protectedProcedure
        .input(z.object({
            projectId: z.string(),
            data: designSystemSchema,
        }))
        .mutation(async ({ ctx, input }) => {
            // Verify project access
            const project = await ctx.db.project.findUnique({
                where: { id: input.projectId },
                include: { memberships: true },
            });

            if (!project) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
            }

            const isMember = project.createdById === ctx.session.user.id ||
                project.memberships.some(m => m.userId === ctx.session.user.id);

            if (!isMember) {
                throw new TRPCError({ code: "FORBIDDEN", message: "Not a member of this project" });
            }

            const designSystem = await ctx.db.designSystem.upsert({
                where: { projectId: input.projectId },
                create: {
                    projectId: input.projectId,
                    ...(input.data as any),
                },
                update: {
                    ...(input.data as any),
                },
            });

            return designSystem;
        }),
});

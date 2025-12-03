import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Prisma } from "../../../../../generated/prisma";

const geminiPreferencesSchema = z.record(
    z.string(),
    z.object({
        model: z.string(),
        provider: z.string(),
    }),
);

export const userRouter = createTRPCRouter({
    getSettings: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
            select: {
                geminiApiKey: true,
                geminiPreferences: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return {
            geminiApiKey: user.geminiApiKey,
            geminiPreferences: user.geminiPreferences as Record<
                string,
                { model: string; provider: string }
            > | null,
        };
    }),

    updateSettings: protectedProcedure
        .input(
            z.object({
                geminiApiKey: z.string().optional(),
                geminiPreferences: geminiPreferencesSchema.optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const data: Prisma.UserUpdateInput = {};

            if (input.geminiApiKey !== undefined) {
                data.geminiApiKey = input.geminiApiKey;
            }

            if (input.geminiPreferences !== undefined) {
                data.geminiPreferences = input.geminiPreferences;
            }

            return ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data,
                select: {
                    geminiApiKey: true,
                    geminiPreferences: true,
                },
            });
        }),

    search: protectedProcedure
        .input(z.object({ query: z.string().min(2) }))
        .query(async ({ ctx, input }) => {
            const users = await ctx.db.user.findMany({
                where: {
                    OR: [
                        { name: { contains: input.query } },
                        { email: { contains: input.query } },
                    ],
                },
                take: 5,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            });
            return users;
        }),

    getApiKeys: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.apiKey.findMany({
            where: { userId: ctx.session.user.id },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                key: true,
                lastUsedAt: true,
                createdAt: true,
            },
        });
    }),

    createApiKey: protectedProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.apiKey.create({
                data: {
                    name: input.name,
                    userId: ctx.session.user.id,
                },
            });
        }),

    deleteApiKey: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.apiKey.delete({
                where: {
                    id: input.id,
                    userId: ctx.session.user.id,
                },
            });
        }),
});

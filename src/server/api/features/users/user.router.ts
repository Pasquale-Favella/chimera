import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Prisma, LlmProvider } from "../../../../../generated/prisma/client";
import { LlmManager } from "@/server/lib/llm";

const llmPreferencesSchema = z.record(
    z.string(),
    z.object({
        provider: z.nativeEnum(LlmProvider),
        model: z.string(),
    }),
);

const llmProviderSchema = z.nativeEnum(LlmProvider);

export const userRouter = createTRPCRouter({
    getSettings: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
            select: {
                llmApiKeys: true,
                llmPreferences: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Transform llmApiKeys to a provider -> apiKey map
        const apiKeys: Record<string, string> = {};
        for (const key of user.llmApiKeys) {
            apiKeys[key.provider] = key.apiKey;
        }

        return {
            llmApiKeys: apiKeys,
            llmPreferences: user.llmPreferences as Record<
                string,
                { provider: LlmProvider; model: string }
            > | null,
        };
    }),

    updateSettings: protectedProcedure
        .input(
            z.object({
                llmPreferences: llmPreferencesSchema.optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const data: Prisma.UserUpdateInput = {};

            if (input.llmPreferences !== undefined) {
                data.llmPreferences = input.llmPreferences as Prisma.InputJsonValue;
            }

            return ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data,
                select: {
                    llmPreferences: true,
                },
            });
        }),

    // LLM API Keys management
    getLlmApiKeys: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.llmApiKey.findMany({
            where: { userId: ctx.session.user.id },
            select: {
                id: true,
                provider: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }),

    setLlmApiKey: protectedProcedure
        .input(
            z.object({
                provider: llmProviderSchema,
                apiKey: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.llmApiKey.upsert({
                where: {
                    userId_provider: {
                        userId: ctx.session.user.id,
                        provider: input.provider,
                    },
                },
                create: {
                    userId: ctx.session.user.id,
                    provider: input.provider,
                    apiKey: input.apiKey,
                },
                update: {
                    apiKey: input.apiKey,
                },
            });
        }),

    deleteLlmApiKey: protectedProcedure
        .input(
            z.object({
                provider: llmProviderSchema,
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.llmApiKey.delete({
                where: {
                    userId_provider: {
                        userId: ctx.session.user.id,
                        provider: input.provider,
                    },
                },
            });
        }),

    // Fetch available models for a provider
    getAvailableModels: protectedProcedure
        .input(
            z.object({
                provider: llmProviderSchema,
            }),
        )
        .query(async ({ ctx, input }) => {
            // Try to get API key from user settings first, then fallback to environment
            const userApiKey = await ctx.db.llmApiKey.findUnique({
                where: {
                    userId_provider: {
                        userId: ctx.session.user.id,
                        provider: input.provider,
                    },
                },
            });

            const apiKey = userApiKey?.apiKey || LlmManager.getDefaultApiKey(input.provider);

            if (!apiKey) {
                // Return static models if no API key is available
                const provider = LlmManager.getProvider(input.provider);
                return provider.fetchAvailableModels("");
            }

            return LlmManager.fetchModels(input.provider, apiKey);
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


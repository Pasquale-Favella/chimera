/**
 * OpenRouter Provider
 * Implementation of the BaseLlmProvider for OpenRouter's models.
 */

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { BaseLlmProvider, type ProviderConfig } from "../types";
import { LlmProvider } from "../../../../../generated/prisma/client";
import type { LlmModelInfo } from "@/types/llm";

/** Static fallback models for when API fetch fails */
const STATIC_MODELS: LlmModelInfo[] = [
    { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: LlmProvider.OPENROUTER },
    { id: "openai/gpt-4o", name: "GPT-4o", provider: LlmProvider.OPENROUTER },
    { id: "google/gemini-pro-1.5", name: "Gemini Pro 1.5", provider: LlmProvider.OPENROUTER },
];

export class OpenRouterProvider extends BaseLlmProvider {
    readonly provider = LlmProvider.OPENROUTER;
    readonly defaultModel = "anthropic/claude-3.5-sonnet";

    createModel(config: ProviderConfig) {
        const openrouter = createOpenRouter({ apiKey: config.apiKey });
        return openrouter(config.model ?? this.defaultModel);
    }

    async fetchAvailableModels(apiKey: string): Promise<LlmModelInfo[]> {
        try {
            const response = await fetch("https://openrouter.ai/api/v1/models", {
                headers: { Authorization: `Bearer ${apiKey}` },
            });
            const data = await response.json();
            const dynamicModels = data.data?.map((m: { id: string; name?: string }) => ({
                id: m.id,
                name: m.name ?? m.id,
                provider: this.provider,
            })) ?? [];

            // Merge static + dynamic, dedupe by id
            const allModels = [...STATIC_MODELS, ...dynamicModels];
            return [...new Map(allModels.map(m => [m.id, m])).values()];
        } catch {
            return STATIC_MODELS;
        }
    }
}


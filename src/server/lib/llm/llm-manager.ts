/**
 * LLM Manager
 * Central manager for creating and managing LLM provider instances.
 */

import type { LanguageModel } from "ai";
import { LlmProvider } from "generated/prisma/enums";
import type { LlmConfig, LlmModelInfo } from "@/types/llm";
import { GoogleProvider } from "./providers/google.provider";
import { OpenRouterProvider } from "./providers/openrouter.provider";
import type { BaseLlmProvider } from "./types";
import { env } from "@/env";

/** Provider registry - maps provider identifiers to their implementations */
const providers = new Map<LlmProvider, BaseLlmProvider>([
    [LlmProvider.GOOGLE, new GoogleProvider()],
    [LlmProvider.OPENROUTER, new OpenRouterProvider()],
]);

export class LlmManager {
    /**
     * Gets a provider implementation by its identifier.
     * @throws Error if the provider is not registered
     */
    static getProvider(provider: LlmProvider): BaseLlmProvider {
        const p = providers.get(provider);
        if (!p) {
            throw new Error(`Unknown LLM provider: ${provider}`);
        }
        return p;
    }

    /**
     * Creates a language model instance with the given configuration.
     * @param config - Full configuration including provider, API key, and model
     * @returns A LanguageModel instance ready for use with the AI SDK
     */
    static createModel(config: LlmConfig): LanguageModel {
        const provider = this.getProvider(config.provider);
        return provider.createModel({ apiKey: config.apiKey, model: config.model });
    }

    /**
     * Fetches available models for a provider.
     * @param provider - The provider to fetch models for
     * @param apiKey - The API key to authenticate with
     * @returns A promise that resolves to an array of available models
     */
    static async fetchModels(provider: LlmProvider, apiKey: string): Promise<LlmModelInfo[]> {
        const p = this.getProvider(provider);
        return p.fetchAvailableModels(apiKey);
    }

    /**
     * Gets the default API key for a provider from environment variables.
     * @param provider - The provider to get the default key for
     * @returns The API key if set, undefined otherwise
     */
    static getDefaultApiKey(provider: LlmProvider): string | undefined {
        switch (provider) {
            case LlmProvider.GOOGLE:
                return env.GEMINI_API_KEY;
            case LlmProvider.OPENROUTER:
                return env.OPENROUTER_API_KEY;
            default:
                return undefined;
        }
    }

    /**
     * Gets the default model for a provider.
     * @param provider - The provider to get the default model for
     * @returns The default model identifier
     */
    static getDefaultModel(provider: LlmProvider): string {
        return this.getProvider(provider).defaultModel;
    }
}


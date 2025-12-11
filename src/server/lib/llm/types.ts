/**
 * LLM Provider Types
 * Internal types for the LLM abstraction layer.
 */

import type { LanguageModel } from "ai";
import type { LlmProvider, LlmModelInfo } from "@/types/llm";

export interface ProviderConfig {
    apiKey: string;
    model?: string;
}

/**
 * Abstract base class for LLM providers.
 * All provider implementations must extend this class.
 */
export abstract class BaseLlmProvider {
    /** The provider identifier */
    abstract readonly provider: LlmProvider;

    /** The default model to use when none is specified */
    abstract readonly defaultModel: string;

    /**
     * Creates a language model instance with the given configuration.
     * @param config - The provider configuration including API key and optional model
     * @returns A LanguageModel instance ready for use with the AI SDK
     */
    abstract createModel(config: ProviderConfig): LanguageModel;

    /**
     * Fetches available models from the provider's API.
     * @param apiKey - The API key to authenticate with the provider
     * @returns A promise that resolves to an array of available models
     */
    abstract fetchAvailableModels(apiKey: string): Promise<LlmModelInfo[]>;
}

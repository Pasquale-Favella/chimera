/**
 * LLM Provider Types
 * Shared types for multi-provider LLM support.
 * 
 * Note: LlmProvider enum is imported from Prisma generated client.
 */

import type { LlmProvider } from "../../generated/prisma/client";

// Re-export from Prisma for convenience
export type { LlmProvider } from "../../generated/prisma/client";

export interface LlmConfig {
    provider: LlmProvider;
    apiKey: string;
    model: string;
}

/**
 * Alias kept for compatibility with the Mastra agent pipeline. Neutral home so
 * `mastra/` modules never need to type-import from `services/ai.service`.
 */
export type AiConfig = LlmConfig;

export interface LlmModelInfo {
    id: string;
    name: string;
    provider: LlmProvider;
}


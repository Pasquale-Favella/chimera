/**
 * LLM Provider Types
 * Shared types for multi-provider LLM support.
 * 
 * Note: LlmProvider enum is imported from Prisma generated client.
 */

import type { LlmProvider } from "../../generated/prisma";

// Re-export from Prisma for convenience
export type { LlmProvider } from "../../generated/prisma";

export interface LlmConfig {
    provider: LlmProvider;
    apiKey: string;
    model: string;
}

export interface LlmModelInfo {
    id: string;
    name: string;
    provider: LlmProvider;
}

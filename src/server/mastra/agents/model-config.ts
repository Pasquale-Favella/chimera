/**
 * Agent model config
 * Single source of truth for mapping a per-user AI config (provider/model/key)
 * into Mastra's model shape, plus the default used at construction time.
 */

import { LlmProvider } from "generated/prisma/enums";
import { LlmManager } from "@/server/lib/llm";

export const DEFAULT_PROVIDER = LlmProvider.GOOGLE;

/** Converts a per-user AI config into Mastra's `model` object. */
export function toMastraModel(config: {
	provider: string;
	model: string;
	apiKey: string;
}) {
	return {
		providerId: config.provider.toLowerCase(),
		modelId: config.model,
		apiKey: config.apiKey,
	};
}

/**
 * Default model used when agents are constructed. The real per-user model is
 * resolved per request and overrides this via `toMastraModel`.
 */
export function defaultModelConfig() {
	const provider = DEFAULT_PROVIDER;
	return toMastraModel({
		provider,
		model: LlmManager.getDefaultModel(provider),
		apiKey: LlmManager.getDefaultApiKey(provider) ?? "",
	});
}

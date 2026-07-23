/**
 * Google Gemini Provider
 * Implementation of the BaseLlmProvider for Google's Gemini models.
 */

import { createGoogle } from "@ai-sdk/google";
import type { LlmModelInfo } from "@/types/llm";
import { LlmProvider } from "../../../../../generated/prisma/client";
import { BaseLlmProvider, type ProviderConfig } from "../types";

/** Static fallback models for when API fetch fails */
const STATIC_MODELS: LlmModelInfo[] = [
	{
		id: "gemini-2.5-flash-lite",
		name: "Gemini 2.5 Flash Lite",
		provider: LlmProvider.GOOGLE,
	},
	{
		id: "gemini-2.5-flash",
		name: "Gemini 2.5 Flash",
		provider: LlmProvider.GOOGLE,
	},
	{
		id: "gemini-2.5-pro",
		name: "Gemini 2.5 Pro",
		provider: LlmProvider.GOOGLE,
	},
];

export class GoogleProvider extends BaseLlmProvider {
	readonly provider = LlmProvider.GOOGLE;
	readonly defaultModel = "gemini-2.5-flash";

	createModel(config: ProviderConfig) {
		const google = createGoogle({ apiKey: config.apiKey });
		return google(config.model ?? this.defaultModel);
	}

	async fetchAvailableModels(apiKey: string): Promise<LlmModelInfo[]> {
		try {
			// Fetch from Google API and merge with static models
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
			);
			const data = await response.json();
			const dynamicModels =
				data.models
					?.filter((m: { supportedGenerationMethods?: string[] }) =>
						m.supportedGenerationMethods?.includes("generateContent"),
					)
					.map((m: { name: string; displayName?: string }) => ({
						id: m.name.replace("models/", ""),
						name: m.displayName ?? m.name,
						provider: this.provider,
					})) ?? [];

			// Merge static + dynamic, dedupe by id
			const allModels = [...STATIC_MODELS, ...dynamicModels];
			return [...new Map(allModels.map((m) => [m.id, m])).values()];
		} catch {
			return STATIC_MODELS;
		}
	}
}


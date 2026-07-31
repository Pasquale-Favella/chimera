import { db } from "@/server/db";
import type { AiConfig } from "@/server/services/ai.service";
import { LlmProvider } from "../../../../generated/prisma/client";
import { LlmManager } from "./llm-manager";

export async function getUserLlmConfig(
	userId: string,
	feature: string,
): Promise<AiConfig> {
	const user = await db.user.findUnique({
		where: { id: userId },
		select: { llmApiKeys: true, llmPreferences: true },
	});

	const prefs = user?.llmPreferences as Record<
		string,
		{ provider: LlmProvider; model: string }
	> | null;
	const featurePrefs = prefs?.[feature];
	const provider = featurePrefs?.provider ?? LlmProvider.GOOGLE;

	const apiKeyRecord = user?.llmApiKeys.find((k) => k.provider === provider);

	return {
		provider,
		apiKey: apiKeyRecord?.apiKey ?? LlmManager.getDefaultApiKey(provider) ?? "",
		model: featurePrefs?.model ?? LlmManager.getDefaultModel(provider),
	};
}

import { db } from "@/server/db";
import { LlmProvider } from "../../../../generated/prisma/client";

export async function getUserLlmConfig(userId: string, feature: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { llmApiKeys: true, llmPreferences: true },
  });

  if (!user) return undefined;

  const prefs = user.llmPreferences as Record<
    string,
    { provider: LlmProvider; model: string }
  > | null;
  const featurePrefs = prefs?.[feature];
  const provider = featurePrefs?.provider ?? LlmProvider.GOOGLE;

  const apiKeyRecord = user.llmApiKeys.find((k) => k.provider === provider);

  return {
    provider,
    apiKey: apiKeyRecord?.apiKey,
    model: featurePrefs?.model,
  };
}

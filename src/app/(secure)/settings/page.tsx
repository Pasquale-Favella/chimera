import { SettingsForm } from "@/features/settings/settings-form";
import { withSession } from "@/lib/session-check.utils";
import { api, HydrateClient } from "@/trpc/server";
import { LlmProvider } from "generated/prisma/enums";

export default async function SettingsPage() {
    await withSession();

    await Promise.all([
        api.user.getSettings.prefetch(),
        api.user.getApiKeys.prefetch(),
        api.user.getAvailableModels.prefetch({ provider: LlmProvider.GOOGLE }),
        api.user.getAvailableModels.prefetch({ provider: LlmProvider.OPENROUTER }),
    ]);

    return (
        <HydrateClient>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm />
            </div>
        </HydrateClient>
    );
}


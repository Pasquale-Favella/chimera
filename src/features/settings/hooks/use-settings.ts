"use client";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import { LlmProvider } from "../../../../generated/prisma";

export function useSettings() {
    const utils = api.useUtils();

    // Queries
    const { data: settings, isLoading: isSettingsLoading } = api.user.getSettings.useQuery(undefined, {
        staleTime: Infinity, // Settings don't change often from other sources
    });

    const { data: apiKeys, isLoading: isApiKeysLoading } = api.user.getApiKeys.useQuery(undefined, {
        staleTime: Infinity, // API keys don't change often from other sources
    });

    const { data: googleModels } = api.user.getAvailableModels.useQuery(
        { provider: LlmProvider.GOOGLE },
        { staleTime: Infinity } // Models don't change often from other sources
    );

    const { data: openrouterModels } = api.user.getAvailableModels.useQuery(
        { provider: LlmProvider.OPENROUTER },
        { staleTime: Infinity }
    );

    // Mutations
    const setLlmApiKey = api.user.setLlmApiKey.useMutation({
        onSuccess: async () => {
            toast.success("API key saved successfully");
            await Promise.all([
                utils.user.getSettings.invalidate(),
                utils.user.getAvailableModels.invalidate(),
            ]);
        },
        onError: (error) => {
            toast.error(`Failed to save API key: ${error.message}`);
        },
    });

    const updateSettings = api.user.updateSettings.useMutation({
        onSuccess: async () => {
            toast.success("Preferences saved successfully");
            await utils.user.getSettings.invalidate();
        },
        onError: (error) => {
            toast.error(`Failed to save settings: ${error.message}`);
        },
    });

    const createApiKey = api.user.createApiKey.useMutation({
        onSuccess: async () => {
            toast.success("API key created successfully");
            await utils.user.getApiKeys.invalidate();
        },
        onError: (error) => {
            toast.error(`Failed to create API key: ${error.message}`);
        },
    });

    const deleteApiKey = api.user.deleteApiKey.useMutation({
        onSuccess: async () => {
            toast.success("API key deleted successfully");
            await utils.user.getApiKeys.invalidate();
        },
        onError: (error) => {
            toast.error(`Failed to delete API key: ${error.message}`);
        },
    });

    return {
        // Data
        settings,
        apiKeys,
        googleModels: googleModels || [],
        openrouterModels: openrouterModels || [],
        isLoading: isSettingsLoading || isApiKeysLoading,

        // Actions
        setLlmApiKey,
        updateSettings,
        createApiKey,
        deleteApiKey,
    };
}

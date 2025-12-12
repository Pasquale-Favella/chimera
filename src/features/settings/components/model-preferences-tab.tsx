"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Save, ChevronsUpDown, Check } from "lucide-react";
import { toast } from "sonner";
import { AiFeature } from "@/types/settings";
import { LlmProvider } from "../../../../generated/prisma";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LlmManager } from "@/server/lib/llm";

const FEATURES = [
    { id: AiFeature.GENERATE_DESIGNS, name: "Generate Designs" },
    { id: AiFeature.GENERATE_DESIGN_FLOW, name: "Generate Design Flow" },
    { id: AiFeature.MODIFY_DESIGNS, name: "Modify Designs" },
    { id: AiFeature.EXTRACT_DESIGN_TOKENS, name: "Extract Design Tokens" },
    { id: AiFeature.APPLY_DESIGN_TOKENS, name: "Apply Design Tokens" },
    { id: AiFeature.EXTRACT_COMPONENT, name: "Extract Component" },
    { id: AiFeature.FIND_CLICKABLE_SELECTORS, name: "Find Clickable Selectors" },
];

const PROVIDERS = [
    { id: LlmProvider.GOOGLE, name: "Google Gemini" },
    { id: LlmProvider.OPENROUTER, name: "OpenRouter" },
];

const DEFAULT_MODELS: Record<LlmProvider, string> = {
    [LlmProvider.GOOGLE]: LlmManager.getProvider(LlmProvider.GOOGLE).defaultModel,
    [LlmProvider.OPENROUTER]: LlmManager.getProvider(LlmProvider.OPENROUTER).defaultModel,
};

function ModelPreferencesSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-36" />
            </CardHeader>
            <CardContent className="grid gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                        <Skeleton className="h-5 w-32" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export function ModelPreferencesTab() {
    const [preferences, setPreferences] = useState<Record<string, { provider: LlmProvider; model: string }>>({});
    const [openModelPopovers, setOpenModelPopovers] = useState<Record<string, boolean>>({});

    const { data: settings, isLoading } = api.user.getSettings.useQuery();
    const { data: googleModels } = api.user.getAvailableModels.useQuery({ provider: LlmProvider.GOOGLE });
    const { data: openrouterModels } = api.user.getAvailableModels.useQuery({ provider: LlmProvider.OPENROUTER });

    const updateSettings = api.user.updateSettings.useMutation({
        onSuccess: () => {
            toast.success("Preferences saved successfully");
        },
        onError: (error) => {
            toast.error(`Failed to save settings: ${error.message}`);
        },
    });

    useEffect(() => {
        if (settings?.llmPreferences) {
            setPreferences(settings.llmPreferences);
        }
    }, [settings]);

    const handlePreferenceChange = (featureId: string, field: "model" | "provider", value: string) => {
        setPreferences((prev) => {
            const current = prev[featureId] || { provider: LlmProvider.GOOGLE, model: "" };
            if (field === "provider") {
                const newProvider = value as LlmProvider;
                return {
                    ...prev,
                    [featureId]: {
                        provider: newProvider,
                        model: DEFAULT_MODELS[newProvider],
                    },
                };
            }
            return {
                ...prev,
                [featureId]: {
                    ...current,
                    [field]: value,
                },
            };
        });
    };

    const handleSavePreferences = () => {
        updateSettings.mutate({ llmPreferences: preferences });
    };

    const getModelsForProvider = (provider: LlmProvider) => {
        if (provider === LlmProvider.OPENROUTER) {
            return openrouterModels || [];
        }
        return googleModels || [];
    };

    const getModelDisplayName = (provider: LlmProvider, modelId: string) => {
        const models = getModelsForProvider(provider);
        const model = models.find(m => m.id === modelId);
        return model?.name || modelId || `Default (${DEFAULT_MODELS[provider]})`;
    };

    if (isLoading) {
        return <ModelPreferencesSkeleton />;
    }

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <CardTitle>Feature Configuration</CardTitle>
                    <CardDescription>
                        Select the provider and model to use for each AI feature.
                    </CardDescription>
                </div>
                <Button onClick={handleSavePreferences} disabled={updateSettings.isPending}>
                    {updateSettings.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Preferences
                </Button>
            </CardHeader>
            <CardContent className="grid gap-6">
                {FEATURES.map((feature) => {
                    const currentProvider = preferences[feature.id]?.provider || LlmProvider.GOOGLE;
                    const currentModel = preferences[feature.id]?.model || DEFAULT_MODELS[currentProvider];
                    const models = getModelsForProvider(currentProvider);
                    const isOpen = openModelPopovers[feature.id] || false;

                    return (
                        <div key={feature.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                            <div className="space-y-1">
                                <Label className="text-base">{feature.name}</Label>
                            </div>
                            <div className="space-y-2">
                                <Label>Provider</Label>
                                <Select
                                    value={currentProvider}
                                    onValueChange={(value) => handlePreferenceChange(feature.id, "provider", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PROVIDERS.map((provider) => (
                                            <SelectItem key={provider.id} value={provider.id}>
                                                {provider.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Model</Label>
                                <Popover
                                    open={isOpen}
                                    onOpenChange={(open) => setOpenModelPopovers(prev => ({ ...prev, [feature.id]: open }))}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={isOpen}
                                            className="w-full justify-between font-normal"
                                        >
                                            <span className="truncate">
                                                {getModelDisplayName(currentProvider, currentModel)}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search models..." />
                                            <CommandList>
                                                <CommandEmpty>No models found.</CommandEmpty>
                                                <CommandGroup>
                                                    {models.map((model) => (
                                                        <CommandItem
                                                            key={model.id}
                                                            value={model.id}
                                                            onSelect={(value) => {
                                                                handlePreferenceChange(feature.id, "model", value);
                                                                setOpenModelPopovers(prev => ({ ...prev, [feature.id]: false }));
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    currentModel === model.id ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            <span className="truncate">{model.name}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}

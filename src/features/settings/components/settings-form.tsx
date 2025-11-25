"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { AiFeature, AiModel } from "@/types/settings";

const FEATURES = [
    { id: AiFeature.GENERATE_DESIGNS, name: "Generate Designs" },
    { id: AiFeature.GENERATE_DESIGN_FLOW, name: "Generate Design Flow" },
    { id: AiFeature.MODIFY_DESIGNS, name: "Modify Designs" },
    { id: AiFeature.EXTRACT_DESIGN_TOKENS, name: "Extract Design Tokens" },
    { id: AiFeature.APPLY_DESIGN_TOKENS, name: "Apply Design Tokens" },
    { id: AiFeature.EXTRACT_COMPONENT, name: "Extract Component" },
    { id: AiFeature.FIND_CLICKABLE_SELECTORS, name: "Find Clickable Selectors" },
];

const MODELS = [
    { id: AiModel.GEMINI_2_5_FLASH_LITE, name: "Gemini 2.5 Flash Lite" },
    { id: AiModel.GEMINI_2_5_FLASH, name: "Gemini 2.5 Flash" },
    { id: AiModel.GEMINI_2_5_PRO, name: "Gemini 2.5 Pro" },
];

export function SettingsForm() {
    const [apiKey, setApiKey] = useState("");
    const [preferences, setPreferences] = useState<Record<string, { model: string; provider: string }>>({});

    const { data: settings, isLoading } = api.user.getSettings.useQuery();
    const updateSettings = api.user.updateSettings.useMutation({
        onSuccess: () => {
            toast.success("Settings saved successfully");
        },
        onError: (error) => {
            toast.error(`Failed to save settings: ${error.message}`);
        },
    });

    useEffect(() => {
        if (settings) {
            setApiKey(settings.geminiApiKey || "");
            setPreferences(settings.geminiPreferences || {});
        }
    }, [settings]);

    const handlePreferenceChange = (featureId: string, field: "model" | "provider", value: string) => {
        setPreferences((prev) => ({
            ...prev,
            [featureId]: {
                ...prev[featureId],
                model: field === "model" ? value : (prev[featureId]?.model || AiModel.GEMINI_2_5_FLASH),
                provider: field === "provider" ? value : (prev[featureId]?.provider || "google"),
            },
        }));
    };

    const handleSave = () => {
        updateSettings.mutate({
            geminiApiKey: apiKey,
            geminiPreferences: preferences,
        });
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your AI provider settings and preferences.
                    </p>
                </div>
                <Button onClick={handleSave} disabled={updateSettings.isPending}>
                    {updateSettings.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="models">Model Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gemini Configuration</CardTitle>
                            <CardDescription>
                                Configure your Google Gemini API key. This key will be used for all AI operations unless overridden by environment variables.
                                <br />
                                You can get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="apiKey">API Key</Label>
                                <Input
                                    id="apiKey"
                                    type="password"
                                    placeholder="Enter your Gemini API Key"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Leave empty to use the system default key (if configured).
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="models" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Feature Configuration</CardTitle>
                            <CardDescription>
                                Select the specific model to use for each AI feature.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            {FEATURES.map((feature) => (
                                <div key={feature.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border-b pb-4 last:border-0 last:pb-0">
                                    <div className="space-y-1">
                                        <Label className="text-base">{feature.name}</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Provider: Google (Default)
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Model</Label>
                                        <Select
                                            value={preferences[feature.id]?.model || AiModel.GEMINI_2_5_FLASH}
                                            onValueChange={(value) => handlePreferenceChange(feature.id, "model", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MODELS.map((model) => (
                                                    <SelectItem key={model.id} value={model.id}>
                                                        {model.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

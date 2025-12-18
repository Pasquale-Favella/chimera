"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Save } from "lucide-react";
import { LlmProvider } from "../../../../generated/prisma";
import { useSettings } from "../hooks/use-settings";

function ProviderKeysSkeleton() {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-10" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-4 w-72 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-10" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function ProviderKeysTab() {
    const { settings, isLoading, setLlmApiKey } = useSettings();
    const [googleApiKey, setGoogleApiKey] = useState("");
    const [openrouterApiKey, setOpenrouterApiKey] = useState("");

    useEffect(() => {
        if (settings) {
            setGoogleApiKey(settings.llmApiKeys?.[LlmProvider.GOOGLE] || "");
            setOpenrouterApiKey(settings.llmApiKeys?.[LlmProvider.OPENROUTER] || "");
        }
    }, [settings]);

    const handleSaveGoogleKey = () => {
        setLlmApiKey.mutate({ provider: LlmProvider.GOOGLE, apiKey: googleApiKey });
    };

    const handleSaveOpenrouterKey = () => {
        setLlmApiKey.mutate({ provider: LlmProvider.OPENROUTER, apiKey: openrouterApiKey });
    };

    if (isLoading) {
        return <ProviderKeysSkeleton />;
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Google Gemini</CardTitle>
                    <CardDescription>
                        Configure your Google Gemini API key.
                        Get your key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            type="password"
                            placeholder="Enter your Gemini API Key"
                            value={googleApiKey}
                            onChange={(e) => setGoogleApiKey(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={handleSaveGoogleKey} disabled={setLlmApiKey.isPending}>
                            {setLlmApiKey.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>OpenRouter</CardTitle>
                    <CardDescription>
                        Configure your OpenRouter API key for access to multiple AI models.
                        Get your key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenRouter</a>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            type="password"
                            placeholder="Enter your OpenRouter API Key"
                            value={openrouterApiKey}
                            onChange={(e) => setOpenrouterApiKey(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={handleSaveOpenrouterKey} disabled={setLlmApiKey.isPending}>
                            {setLlmApiKey.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

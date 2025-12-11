"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderKeysTab } from "./components/provider-keys-tab";
import { ModelPreferencesTab } from "./components/model-preferences-tab";
import { ApiKeysTab } from "./components/api-keys-tab";

export function SettingsForm() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your AI provider settings and preferences.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">Provider Keys</TabsTrigger>
                    <TabsTrigger value="models">Model Preferences</TabsTrigger>
                    <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-4">
                    <ProviderKeysTab />
                </TabsContent>

                <TabsContent value="models" className="space-y-4 mt-4">
                    <ModelPreferencesTab />
                </TabsContent>

                <TabsContent value="api-keys" className="space-y-4 mt-4">
                    <ApiKeysTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}

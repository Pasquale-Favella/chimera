"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderKeysTab } from "./components/provider-keys-tab";
import { ModelPreferencesTab } from "./components/model-preferences-tab";
import { ApiKeysTab } from "./components/api-keys-tab";

export function SettingsForm() {
    return (
        <Tabs defaultValue="provider-keys" className="space-y-4">
            <TabsList>
                <TabsTrigger value="provider-keys">Provider Keys</TabsTrigger>
                <TabsTrigger value="model-preferences">Model Preferences</TabsTrigger>
                <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            </TabsList>
            <TabsContent value="provider-keys">
                <ProviderKeysTab />
            </TabsContent>
            <TabsContent value="model-preferences">
                <ModelPreferencesTab />
            </TabsContent>
            <TabsContent value="api-keys">
                <ApiKeysTab />
            </TabsContent>
        </Tabs>
    );
}

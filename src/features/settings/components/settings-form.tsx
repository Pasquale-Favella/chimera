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

import { Copy, Plus, Trash2, Eye, EyeOff, Check, ServerCrash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

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
    const [newKeyName, setNewKeyName] = useState("");
    const [createdKey, setCreatedKey] = useState<string | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { data: settings, isLoading } = api.user.getSettings.useQuery();
    const { data: apiKeys, refetch: refetchApiKeys } = api.user.getApiKeys.useQuery();

    const updateSettings = api.user.updateSettings.useMutation({
        onSuccess: () => {
            toast.success("Settings saved successfully");
        },
        onError: (error) => {
            toast.error(`Failed to save settings: ${error.message}`);
        },
    });

    const createApiKey = api.user.createApiKey.useMutation({
        onSuccess: (data) => {
            setCreatedKey(data.key);
            setNewKeyName("");
            refetchApiKeys();
            toast.success("API key created successfully");
        },
        onError: (error) => {
            toast.error(`Failed to create API key: ${error.message}`);
        },
    });

    const deleteApiKey = api.user.deleteApiKey.useMutation({
        onSuccess: () => {
            refetchApiKeys();
            toast.success("API key deleted successfully");
        },
        onError: (error) => {
            toast.error(`Failed to delete API key: ${error.message}`);
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

    const handleCreateKey = () => {
        if (!newKeyName.trim()) return;
        createApiKey.mutate({ name: newKeyName });
    };

    const handleCopyKey = () => {
        if (createdKey) {
            navigator.clipboard.writeText(createdKey);
            toast.success("API key copied to clipboard");
        }
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
                    <TabsTrigger value="api-keys">API Keys</TabsTrigger>
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

                <TabsContent value="api-keys" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>API Keys</CardTitle>
                                <CardDescription>
                                    Manage API keys for accessing the Chimera API and MCP server.
                                </CardDescription>
                            </div>
                            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create New Key
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create New API Key</DialogTitle>
                                        <DialogDescription>
                                            Enter a name for your new API key to identify it later.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {!createdKey ? (
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="keyName">Key Name</Label>
                                                <Input
                                                    id="keyName"
                                                    placeholder="e.g. My Laptop"
                                                    value={newKeyName}
                                                    onChange={(e) => setNewKeyName(e.target.value)}
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={handleCreateKey} disabled={createApiKey.isPending || !newKeyName.trim()}>
                                                    {createApiKey.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    Create Key
                                                </Button>
                                            </DialogFooter>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>Your API Key</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input value={createdKey} readOnly />
                                                    <Button size="icon" variant="outline" onClick={handleCopyKey}>
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <p className="text-sm text-muted-foreground text-yellow-600">
                                                    Please copy this key now.
                                                </p>
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={() => {
                                                    setIsCreateDialogOpen(false);
                                                    setCreatedKey(null);
                                                }}>
                                                    Done
                                                </Button>
                                            </DialogFooter>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Key</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Last Used</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {apiKeys?.map((key) => (
                                        <ApiKeyRow key={key.id} apiKey={key} onDelete={() => deleteApiKey.mutate({ id: key.id })} isDeleting={deleteApiKey.isPending} />
                                    ))}
                                    {apiKeys?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                                No API keys found. Create one to get started.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function ApiKeyRow({ apiKey, onDelete, isDeleting }: { apiKey: { id: string; name: string | null; key: string; createdAt: Date; lastUsedAt: Date | null }; onDelete: () => void; isDeleting: boolean }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey.key);
        setIsCopied(true);
        toast.success("API key copied to clipboard");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const mcpConfig = {
        mcpServers: {
            chimera: {
                httpUrl: `${origin}/api/llm/mcp`,
                headers: {
                    Authorization: `Bearer ${apiKey.key}`
                },
                timeout: 5000
            }
        }
    };

    const handleCopyConfig = () => {
        navigator.clipboard.writeText(JSON.stringify(mcpConfig, null, 4));
        toast.success("MCP config copied to clipboard");
    };

    const cursorConfig = {
        mcpServers: {
            chimera: {
                url: `${origin}/api/llm/mcp`,
                headers: {
                    Authorization: `Bearer ${apiKey.key}`
                },
                timeout: 5000
            }
        }
    };

    const handleCopyCursorConfig = () => {
        navigator.clipboard.writeText(JSON.stringify(cursorConfig, null, 4));
        toast.success("Cursor config copied to clipboard");
    };

    const claudeConfig = `claude mcp add --transport http chimera ${origin}/api/llm/mcp --header "Authorization: Bearer ${apiKey.key}"`;

    const handleCopyClaudeConfig = () => {
        navigator.clipboard.writeText(claudeConfig);
        toast.success("Claude config copied to clipboard");
    };

    const vscodeConfig = {
        mcp: {
            servers: {
                chimera: {
                    type: "http",
                    url: `${origin}/api/llm/mcp`,
                    headers: {
                        Authorization: `Bearer ${apiKey.key}`
                    }
                }
            }
        }
    };

    const handleCopyVscodeConfig = () => {
        navigator.clipboard.writeText(JSON.stringify(vscodeConfig, null, 4));
        toast.success("VS Code config copied to clipboard");
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{apiKey.name}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                    <span>
                        {isVisible ? apiKey.key : `${apiKey.key.substring(0, 8)}...`}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                        {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                </div>
            </TableCell>
            <TableCell>{format(new Date(apiKey.createdAt), "PP")}</TableCell>
            <TableCell>
                {apiKey.lastUsedAt ? format(new Date(apiKey.lastUsedAt), "PP") : "Never"}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" title="View MCP Config">
                                <ServerCrash className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl md:max-w-4xl max-h-[85vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>MCP Configuration</DialogTitle>
                                <DialogDescription>
                                    Use this configuration to connect to the Chimera MCP server.
                                </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="gemini-cli" className="w-full mt-4">
                                <TabsList>
                                    <TabsTrigger value="gemini-cli">Gemini CLI</TabsTrigger>
                                    <TabsTrigger value="cursor">Cursor</TabsTrigger>
                                    <TabsTrigger value="vscode">VS Code</TabsTrigger>
                                    <TabsTrigger value="claude">Claude Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="gemini-cli">
                                    <div className="relative mt-2 rounded-md bg-muted">
                                        <div className="max-h-[350px] md:max-h-[600px] overflow-auto p-4">
                                            <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                                                {JSON.stringify(mcpConfig, null, 4)}
                                            </pre>
                                        </div>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-2 top-2"
                                            onClick={handleCopyConfig}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="cursor">
                                    <div className="relative mt-2 rounded-md bg-muted">
                                        <div className="max-h-[350px] md:max-h-[600px] overflow-auto p-4">
                                            <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                                                {JSON.stringify(cursorConfig, null, 4)}
                                            </pre>
                                        </div>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-2 top-2"
                                            onClick={handleCopyCursorConfig}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="vscode">
                                    <div className="relative mt-2 rounded-md bg-muted">
                                        <div className="max-h-[350px] md:max-h-[600px] overflow-auto p-4">
                                            <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                                                {JSON.stringify(vscodeConfig, null, 4)}
                                            </pre>
                                        </div>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-2 top-2"
                                            onClick={handleCopyVscodeConfig}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="claude">
                                    <div className="relative mt-2 rounded-md bg-muted">
                                        <div className="max-h-[350px] md:max-h-[600px] overflow-auto p-4">
                                            <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                                                {claudeConfig}
                                            </pre>
                                        </div>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-2 top-2"
                                            onClick={handleCopyClaudeConfig}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={onDelete}
                        disabled={isDeleting}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow >
    );
}

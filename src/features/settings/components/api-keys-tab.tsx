"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Copy, Plus, Trash2, Eye, EyeOff, Check, ServerCrash } from "lucide-react";
import { toast } from "sonner";
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

function ApiKeysSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Table header skeleton */}
                    <div className="grid grid-cols-5 gap-4 border-b pb-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16 ml-auto" />
                    </div>
                    {/* Table rows skeleton */}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 items-center py-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                            <div className="flex justify-end gap-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export function ApiKeysTab() {
    const [newKeyName, setNewKeyName] = useState("");
    const [createdKey, setCreatedKey] = useState<string | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { data: apiKeys, isLoading, refetch: refetchApiKeys } = api.user.getApiKeys.useQuery();

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
        return <ApiKeysSkeleton />;
    }

    return (
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
                headers: { Authorization: `Bearer ${apiKey.key}` },
                timeout: 5000
            }
        }
    };

    const cursorConfig = {
        mcpServers: {
            chimera: {
                url: `${origin}/api/llm/mcp`,
                headers: { Authorization: `Bearer ${apiKey.key}` },
                timeout: 5000
            }
        }
    };

    const claudeConfig = `claude mcp add --transport http chimera ${origin}/api/llm/mcp --header "Authorization: Bearer ${apiKey.key}"`;

    const vscodeConfig = {
        mcp: {
            servers: {
                chimera: {
                    type: "http",
                    url: `${origin}/api/llm/mcp`,
                    headers: { Authorization: `Bearer ${apiKey.key}` }
                }
            }
        }
    };

    const copyToClipboard = (text: string, message: string) => {
        navigator.clipboard.writeText(text);
        toast.success(message);
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{apiKey.name}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                    <span>{isVisible ? apiKey.key : `${apiKey.key.substring(0, 8)}...`}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                        {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                </div>
            </TableCell>
            <TableCell>{format(new Date(apiKey.createdAt), "PP")}</TableCell>
            <TableCell>{apiKey.lastUsedAt ? format(new Date(apiKey.lastUsedAt), "PP") : "Never"}</TableCell>
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
                                    <ConfigBlock
                                        content={JSON.stringify(mcpConfig, null, 4)}
                                        onCopy={() => copyToClipboard(JSON.stringify(mcpConfig, null, 4), "MCP config copied")}
                                    />
                                </TabsContent>
                                <TabsContent value="cursor">
                                    <ConfigBlock
                                        content={JSON.stringify(cursorConfig, null, 4)}
                                        onCopy={() => copyToClipboard(JSON.stringify(cursorConfig, null, 4), "Cursor config copied")}
                                    />
                                </TabsContent>
                                <TabsContent value="vscode">
                                    <ConfigBlock
                                        content={JSON.stringify(vscodeConfig, null, 4)}
                                        onCopy={() => copyToClipboard(JSON.stringify(vscodeConfig, null, 4), "VS Code config copied")}
                                    />
                                </TabsContent>
                                <TabsContent value="claude">
                                    <ConfigBlock
                                        content={claudeConfig}
                                        onCopy={() => copyToClipboard(claudeConfig, "Claude config copied")}
                                    />
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
        </TableRow>
    );
}

function ConfigBlock({ content, onCopy }: { content: string; onCopy: () => void }) {
    return (
        <div className="relative mt-2 rounded-md bg-muted">
            <div className="max-h-[350px] md:max-h-[600px] overflow-auto p-4">
                <pre className="text-sm font-mono whitespace-pre-wrap break-all">{content}</pre>
            </div>
            <Button size="icon" variant="ghost" className="absolute right-2 top-2" onClick={onCopy}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    );
}

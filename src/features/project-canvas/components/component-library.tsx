
import React, { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Book, Code, Info, X, Palette, LayoutGrid, PanelLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DesignSystemEditor } from "./design-system-editor";
import { DesignSystemShowcase } from "./design-system-showcase";
import { defaultDesignSystem } from "../stores/design-system-store";
import { useDesignSystem } from "../hooks/use-design-system";
import { ComponentCard } from "./component-card";
import { ComponentCardSkeleton } from "./component-card-skeleton";

interface ComponentLibraryProps {
    projectId: string;
}

export function ComponentLibrary({ projectId }: ComponentLibraryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"library" | "design-system">("library");
    const { designSystem, setDesignSystem } = useDesignSystem(projectId);

    const utils = api.useUtils();

    // Components Query
    const { data: components, isLoading: isLoadingComponents } = api.components.listByProject.useQuery(
        { projectId },
        { enabled: isOpen && activeTab === "library" }
    );

    // Design System Query
    const { data: fetchedDesignSystem, isLoading: isLoadingDS } = api.designSystem.get.useQuery(
        { projectId },
        { enabled: isOpen }
    );

    // Reset styling when switching projects to avoid stale state from previous project
    useEffect(() => {
        setDesignSystem({ ...defaultDesignSystem });
    }, [projectId, setDesignSystem]);

    // Initialize store with fetched data when valid data is received
    useEffect(() => {
        if (fetchedDesignSystem) {
            // Parse JSON fields if they come as strings, or use directly if tRPC typed them correctly
            // Prisma Json type is usually any or generic JsonValue, so safe to cast if structure matches
            setDesignSystem({
                ...defaultDesignSystem, // Fallback
                ...fetchedDesignSystem as any
            });
        }
    }, [fetchedDesignSystem, setDesignSystem]);

    const deleteMutation = api.components.delete.useMutation({
        onSuccess: () => {
            utils.components.listByProject.invalidate({ projectId });
            toast.success("Component deleted");
        },
        onError: () => {
            toast.error("Failed to delete component");
        },
    });

    const updateMutation = api.components.update.useMutation({
        onSuccess: () => {
            utils.components.listByProject.invalidate({ projectId });
            toast.success("Component renamed");
        },
        onError: () => {
            toast.error("Failed to rename component");
        },
    });

    const saveDesignSystemMutation = api.designSystem.upsert.useMutation({
        onSuccess: () => {
            utils.designSystem.get.invalidate({ projectId });
            toast.success("Design System saved");
        },
        onError: () => {
            toast.error("Failed to save Design System");
        }
    });

    const handleCopy = (html: string) => {
        navigator.clipboard.writeText(html);
        toast.success("Component code copied to clipboard");
    };

    const handleSaveDesignSystem = () => {
        saveDesignSystemMutation.mutate({
            projectId,
            data: {
                ...designSystem,
                // Ensure proper types for JSON fields if needed
            }
        });
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Revert changes on close if not saved (simulated by resetting to fetched state)
    // Since we don't have a specific "saved" flag that persists locally beyond mutation, 
    // we simply reset strict state when the dialog closes to ensure next open starts fresh from DB 
    // (or keeps current if cache is up to date, but here we want to discard *unsaved* changes in the local atom).
    useEffect(() => {
        if (!isOpen && fetchedDesignSystem) {
            setDesignSystem({
                ...defaultDesignSystem,
                ...fetchedDesignSystem as any
            });
        }
    }, [isOpen, fetchedDesignSystem, setDesignSystem]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-20 z-10 h-10 w-10 rounded-full bg-background shadow-md hover:bg-muted"
                    title="Component Library & Design System"
                >
                    <Book className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="!max-w-none !w-[100vw] !h-[100vh] !rounded-none !border-0 p-0 flex flex-col overflow-hidden gap-0">

                {/* Header / Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-background z-10">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="mr-2 -ml-2"
                            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                        >
                            <PanelLeft className="h-5 w-5" />
                        </Button>
                        <Book className="h-5 w-5" />
                        <DialogTitle className="font-semibold text-lg flex items-center gap-3">
                            Project Library
                            {(!fetchedDesignSystem && activeTab === "design-system") && (
                                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                    Default System (Unsaved)
                                </span>
                            )}
                        </DialogTitle>
                    </div>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                </div>

                <div className="flex flex-1 min-h-0">
                    {/* Sidebar Navigation */}
                    <div
                        className={cn(
                            "border-r bg-muted/10 p-4 flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden",
                            isSidebarOpen ? "w-64" : "w-16 px-2"
                        )}
                    >
                        <Button
                            variant={activeTab === "library" ? "secondary" : "ghost"}
                            className={cn(
                                "justify-start gap-2 overflow-hidden",
                                !isSidebarOpen && "justify-center px-0"
                            )}
                            onClick={() => setActiveTab("library")}
                            title={!isSidebarOpen ? "My Components" : undefined}
                        >
                            <LayoutGrid className="h-4 w-4 shrink-0" />
                            <span className={cn("transition-opacity duration-200", !isSidebarOpen && "opacity-0 w-0 hidden")}>
                                My Components
                            </span>
                        </Button>
                        <Button
                            variant={activeTab === "design-system" ? "secondary" : "ghost"}
                            className={cn(
                                "justify-start gap-2 overflow-hidden",
                                !isSidebarOpen && "justify-center px-0"
                            )}
                            onClick={() => setActiveTab("design-system")}
                            title={!isSidebarOpen ? "Design System" : undefined}
                        >
                            <Palette className="h-4 w-4 shrink-0" />
                            <span className={cn("transition-opacity duration-200", !isSidebarOpen && "opacity-0 w-0 hidden")}>
                                Design System
                            </span>
                        </Button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col min-w-0 bg-background">
                        {activeTab === "library" && (
                            <ScrollArea className="flex-1">
                                <div className="p-8 max-w-5xl mx-auto w-full">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-semibold tracking-tight">My Components</h2>
                                            <p className="text-muted-foreground">Reusable components extracted from your designs.</p>
                                        </div>
                                    </div>

                                    <Alert className="mb-6 bg-primary/5 border-primary/20">
                                        <Info className="h-4 w-4 text-primary" />
                                        <AlertDescription className="text-primary text-sm">
                                            These components are automatically provided to the AI as context for future generations.
                                        </AlertDescription>
                                    </Alert>

                                    {isLoadingComponents ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                                <ComponentCardSkeleton key={i} />
                                            ))}
                                        </div>
                                    ) : components?.length === 0 ? (
                                        <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
                                            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No components saved yet</p>
                                            <p className="text-sm mt-2 max-w-sm mx-auto">
                                                Enter Presentation Mode and click the "Extract Component" button on any design to save it here.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {components?.map((component) => (
                                                <ComponentCard
                                                    key={component.id}
                                                    component={component}
                                                    onRename={(id, name) => updateMutation.mutate({ componentId: id, name })}
                                                    onDelete={(id) => deleteMutation.mutate({ componentId: id })}
                                                    onCopy={handleCopy}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        )}

                        {activeTab === "design-system" && (
                            <div className="flex flex-col lg:flex-row flex-1 h-full overflow-hidden">
                                <div className="w-full lg:w-[400px] border-r border-b lg:border-b-0 flex flex-col bg-card p-6 overflow-hidden h-1/2 lg:h-full">
                                    <div className="flex-1 min-h-0">
                                        <DesignSystemEditor projectId={projectId} />
                                    </div>
                                    <div className="pt-4 mt-auto border-t">
                                        <Button
                                            className="w-full"
                                            onClick={handleSaveDesignSystem}
                                            disabled={saveDesignSystemMutation.isPending}
                                        >
                                            {saveDesignSystemMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-1 bg-muted/10 p-6 flex flex-col overflow-hidden h-1/2 lg:h-full">
                                    <DesignSystemShowcase projectId={projectId} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

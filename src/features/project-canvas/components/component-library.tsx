import React, { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Book, Copy, Trash2, Loader2, Code, Info, Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ComponentPreview } from "./component-preview";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ComponentLibraryProps {
    projectId: string;
}

export function ComponentLibrary({ projectId }: ComponentLibraryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const utils = api.useUtils();

    const { data: components, isLoading } = api.components.listByProject.useQuery(
        { projectId },
        { enabled: isOpen }
    );

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
            setEditingId(null);
            toast.success("Component renamed");
        },
        onError: () => {
            toast.error("Failed to rename component");
        },
    });

    const handleCopy = (html: string) => {
        navigator.clipboard.writeText(html);
        toast.success("Component code copied to clipboard");
    };



    const startEditing = (id: string, currentName: string) => {
        setEditingId(id);
        setEditName(currentName);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditName("");
    };

    const saveEditing = (id: string) => {
        if (!editName.trim()) return;
        updateMutation.mutate({ componentId: id, name: editName });
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-20 z-10 h-10 w-10 rounded-full bg-background shadow-md hover:bg-muted"
                    title="Component Library"
                >
                    <Book className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5" />
                        Component Library
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 min-h-0">
                    <div className="p-6">
                        <Alert className="mb-6 bg-primary/10 border-primary/20">
                            <Info className="h-4 w-4 text-primary" />
                            <AlertDescription className="text-primary text-xs">
                                These components are automatically available to the AI. When generating new designs, the AI will use these components to maintain consistency.
                            </AlertDescription>
                        </Alert>

                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : components?.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No components saved yet.</p>
                                <p className="text-sm mt-2">
                                    Extract components from your designs in Presentation Mode to see them here.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {components?.map((component) => (
                                    <div
                                        key={component.id}
                                        className="group relative flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                {editingId === component.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                                            autoFocus
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveEditing(component.id);
                                                                if (e.key === 'Escape') cancelEditing();
                                                            }}
                                                        />
                                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-green-600" onClick={() => saveEditing(component.id)}>
                                                            <Check className="h-3 w-3" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-red-600" onClick={cancelEditing}>
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="group/title flex items-center gap-2">
                                                        <h4 className="font-semibold truncate" title={component.name}>{component.name}</h4>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-6 w-6 opacity-0 group-hover/title:opacity-100 transition-opacity"
                                                            onClick={() => startEditing(component.id, component.name)}
                                                        >
                                                            <Pencil className="h-3 w-3 text-muted-foreground" />
                                                        </Button>
                                                    </div>
                                                )}
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Added by {component.createdBy.name} • {new Date(component.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                    onClick={() => handleCopy(component.html)}
                                                    title="Copy Code"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the component from your library.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => deleteMutation.mutate({ componentId: component.id })}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>

                                        <div className="h-40 w-full overflow-hidden rounded-lg border bg-muted/20">
                                            <ComponentPreview html={component.html} scale={0.5} className="w-full h-full bg-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

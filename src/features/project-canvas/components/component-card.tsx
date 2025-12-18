import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "./component-preview";
import { Copy, Trash2, Pencil, Check, X } from "lucide-react";
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

interface ComponentCardProps {
    component: {
        id: string;
        name: string;
        html: string;
        createdAt: Date;
    };
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
    onCopy: (html: string) => void;
}

export function ComponentCard({ component, onRename, onDelete, onCopy }: ComponentCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(component.name);

    const handleSave = () => {
        if (editName.trim()) {
            onRename(component.id, editName);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditName(component.name);
        setIsEditing(false);
    };

    return (
        <div className="group relative flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="flex-1 min-w-0 px-2 py-1 text-sm font-semibold bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave();
                                    if (e.key === 'Escape') handleCancel();
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={handleSave}>
                                <Check className="h-3 w-3" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleCancel}>
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ) : (
                        <div className="group/title flex items-center gap-2">
                            <h4 className="font-semibold truncate text-sm" title={component.name}>{component.name}</h4>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 opacity-0 group-hover/title:opacity-100 transition-opacity hover:bg-muted"
                                onClick={() => setIsEditing(true)}
                            >
                                <Pencil className="h-3 w-3 text-muted-foreground" />
                            </Button>
                        </div>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                        {new Date(component.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                </div>
                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                        onClick={() => onCopy(component.html)}
                        title="Copy Code"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                title="Delete"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Component</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "{component.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(component.id)}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted/50 relative group/preview">
                <div className="absolute inset-0 z-0">
                    <ComponentPreview html={component.html} scale={0.5} className="w-full h-full bg-white origin-top-left" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/5 transition-colors pointer-events-none" />
            </div>
        </div>
    );
}

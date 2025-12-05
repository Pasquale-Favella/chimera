'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { AttachedImage } from "@/types/design";
import type { ExcalidrawImperativeAPI, BinaryFileData } from "@excalidraw/excalidraw/types";
import { useTheme } from "next-themes";
import '@excalidraw/excalidraw/index.css';
import { v4 as uuidv4 } from 'uuid';
import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";

const Excalidraw = dynamic(
    async () => {
        const mod = await import("@excalidraw/excalidraw");
        return mod.Excalidraw;
    },
    {
        ssr: false,
        loading: () => (
            <div className="flex h-full w-full items-center justify-center bg-muted/10">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </div>
        ),
    }
);


interface SketchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (imageData: AttachedImage) => void;
    initialImage?: AttachedImage | null;
    trigger?: React.ReactNode;
}


export function SketchDialog({
    open,
    onOpenChange,
    onSave,
    initialImage,
    trigger
}: SketchDialogProps) {
    const { resolvedTheme } = useTheme();
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Effect to modify scene when open
    useEffect(() => {
        // Just a small timeout to force a refresh if needed
        if (open && excalidrawAPI) {
            excalidrawAPI.updateScene({ appState: { ...excalidrawAPI.getAppState() } });
        }
    }, [open, excalidrawAPI]);


    // Handle saving the sketch
    const handleSave = async () => {
        if (!excalidrawAPI) return;

        try {
            setIsLoading(true);
            const elements = excalidrawAPI.getSceneElements();
            const files = excalidrawAPI.getFiles();

            if (elements.length === 0 && !initialImage) {
                toast.error("Canvas is empty");
                setIsLoading(false);
                return;
            }

            // Export to blob
            const { exportToBlob } = await import("@excalidraw/excalidraw");

            const blob = await exportToBlob({
                elements,
                files,
                mimeType: "image/png",
                appState: {
                    ...excalidrawAPI.getAppState(),
                },
            });

            if (!blob) {
                throw new Error("Failed to generate image blob");
            }

            // Convert blob to base64/dataURL
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                const base64 = dataUrl.split(",")?.at(1) ?? "";

                onSave({
                    dataUrl,
                    base64,
                    mimeType: "image/png",
                });

                onOpenChange(false);
                setIsLoading(false);
            };

            reader.onerror = () => {
                toast.error("Failed to process image");
                setIsLoading(false);
            };

            reader.readAsDataURL(blob);

        } catch (error) {
            console.error("Error saving sketch:", error);
            toast.error("Failed to save sketch");
            setIsLoading(false);
        }
    };

    // Add initial image to canvas if provided
    useEffect(() => {
        if (open && excalidrawAPI && initialImage) {
            const addImage = async () => {
                try {
                    // Load the image to get dimensions
                    const img = new Image();
                    img.onload = () => {
                        const fileId = uuidv4() as BinaryFileData['id'];

                        // Construct the image element
                        const imageElement = {
                            type: "image",
                            version: 1,
                            versionNonce: 0,
                            isDeleted: false,
                            id: fileId,
                            fillStyle: "hachure",
                            strokeWidth: 1,
                            strokeStyle: "solid",
                            roughness: 1,
                            opacity: 100,
                            angle: 0,
                            x: 0,
                            y: 0,
                            strokeColor: "transparent",
                            backgroundColor: "transparent",
                            width: img.width,
                            height: img.height,
                            seed: Math.random(),
                            groupIds: [],
                            frameId: null,
                            roundness: null,
                            boundElements: [],
                            updated: Date.now(),
                            link: null,
                            locked: true, // Lock it so it serves as a background
                            status: "saved",
                            fileId: fileId,
                            scale: [1, 1],
                        };

                        // Update scene
                        excalidrawAPI.updateScene({
                            elements: [imageElement as unknown as ExcalidrawElement],
                        });

                        // Add file to data
                        excalidrawAPI.addFiles([{
                            id: fileId,
                            dataURL: initialImage.dataUrl as BinaryFileData['dataURL'],
                            mimeType: initialImage.mimeType as BinaryFileData['mimeType'],
                            created: Date.now(),
                            lastRetrieved: Date.now(),
                        }]);

                        // Scroll to content
                        excalidrawAPI.scrollToContent(undefined, { fitToContent: true });
                    };
                    img.src = initialImage.dataUrl;

                } catch (e) {
                    console.error("Failed to load initial image", e);
                    toast.error("Failed to load image for sketching");
                }
            };

            // Only add if scene is empty to avoid overwriting or duplicating on re-renders
            if (excalidrawAPI.getSceneElements().length === 0) {
                addImage();
            }
        }
    }, [open, excalidrawAPI, initialImage]);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                className="h-[100dvh] w-[100dvw] max-h-[100dvh] max-w-[100vw] p-0 gap-0 border-none bg-background shadow-none outline-none overflow-hidden z-[9999]"
                style={{ maxWidth: '100vw' }}
            >
                <DialogTitle className="sr-only">Draw sketch dialog</DialogTitle>
                {/* Header / Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[500] flex gap-2 pointer-events-auto">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-background/80 backdrop-blur shadow-sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Sketch
                    </Button>
                </div>

                <div className="h-full w-full">
                    <Excalidraw
                        excalidrawAPI={(api) => setExcalidrawAPI(api)}
                        theme={resolvedTheme === "dark" ? "dark" : "light"}

                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
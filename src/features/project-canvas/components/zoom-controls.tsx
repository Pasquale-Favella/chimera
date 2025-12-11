'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCanvasContainer } from "../contexts/canvas-container-context";

import { Maximize2, Minus, Plus } from "lucide-react";

export function ZoomControls() {
    const { zoom, zoomIn, zoomOut, fitToScreen } = useCanvasContainer();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center rounded-full border border-border bg-card/90 p-1 shadow-2xl backdrop-blur-sm">
            <Button variant="ghost" size="icon" onClick={zoomOut} title="Zoom out" className="h-8 w-8">
                <Minus className="h-4 w-4" />
            </Button>
            <div className="w-16 px-2 text-center text-sm font-semibold tabular-nums text-foreground">
                {Math.round(zoom * 100)}%
            </div>
            <Button variant="ghost" size="icon" onClick={zoomIn} title="Zoom in" className="h-8 w-8">
                <Plus className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <Button variant="ghost" size="icon" onClick={() => fitToScreen()} title="Fit to screen" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
            </Button>
        </div>
    );
}



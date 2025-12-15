'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useReactFlow, useViewport } from "@xyflow/react";

import { Maximize2, Minus, Plus } from "lucide-react";

export function ZoomControls() {
    const { zoomIn, zoomOut, fitView } = useReactFlow();
    const { zoom } = useViewport();

    const handleZoomIn = () => {
        zoomIn({ duration: 200 });
    };

    const handleZoomOut = () => {
        zoomOut({ duration: 200 });
    };

    const handleFitToScreen = () => {
        fitView({ padding: 0.1, duration: 300 });
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center rounded-full border border-border bg-card/90 p-1 shadow-2xl backdrop-blur-sm">
            <Button variant="ghost" size="icon" onClick={handleZoomOut} title="Zoom out" className="h-8 w-8">
                <Minus className="h-4 w-4" />
            </Button>
            <div className="w-16 px-2 text-center text-sm font-semibold tabular-nums text-foreground">
                {Math.round(zoom * 100)}%
            </div>
            <Button variant="ghost" size="icon" onClick={handleZoomIn} title="Zoom in" className="h-8 w-8">
                <Plus className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <Button variant="ghost" size="icon" onClick={handleFitToScreen} title="Fit to screen" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

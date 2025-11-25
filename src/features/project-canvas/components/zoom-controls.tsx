'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { Maximize2, Minus, Plus } from "lucide-react";

interface ZoomControlsProps {
	zoom: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onFitToScreen: () => void;
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut, onFitToScreen }: ZoomControlsProps) {
	return (
		<div className="fixed bottom-4 right-4 z-50 flex items-center rounded-full border border-border bg-card/90 p-1 shadow-2xl backdrop-blur-sm">
			<Button variant="ghost" size="icon" onClick={onZoomOut} title="Zoom out" className="h-8 w-8">
				<Minus className="h-4 w-4" />
			</Button>
			<div className="w-16 px-2 text-center text-sm font-semibold tabular-nums text-foreground">
				{Math.round(zoom * 100)}%
			</div>
			<Button variant="ghost" size="icon" onClick={onZoomIn} title="Zoom in" className="h-8 w-8">
				<Plus className="h-4 w-4" />
			</Button>
			<Separator orientation="vertical" className="mx-1 h-5" />
			<Button variant="ghost" size="icon" onClick={onFitToScreen} title="Fit to screen" className="h-8 w-8">
				<Maximize2 className="h-4 w-4" />
			</Button>
		</div>
	);
}



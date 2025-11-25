'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StyleClipboardBannerProps {
	sourceDescription: string;
	onClear: () => void;
}

export function StyleClipboardBanner({ sourceDescription, onClear }: StyleClipboardBannerProps) {
	return (
		<div
			className={cn(
				"fixed left-1/2 top-4 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-top-2",
				"rounded-full border border-primary/50 bg-card/90 px-6 py-3 text-sm shadow-2xl backdrop-blur-sm",
			)}
		>
			<div className="flex items-center gap-4">
				<span className="text-foreground">
					Copied style from{" "}
					<span className="font-semibold text-primary">&quot;{sourceDescription}&quot;</span>. Click any element to apply.
				</span>
				<Button onClick={onClear} variant="secondary" size="sm" className="rounded-full">
					Done
				</Button>
			</div>
		</div>
	);
}



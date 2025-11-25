'use client';

import { useState } from "react";

import { ChevronDown } from "lucide-react";

export function Legend() {
	const [isExpanded, setIsExpanded] = useState(false);

	const Kbd = ({ children }: { children: React.ReactNode }) => (
		<kbd className="ml-1 inline-block rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-foreground">
			{children}
		</kbd>
	);

	return (
		<div
			className="absolute top-4 right-4 z-50 rounded-lg border border-border bg-card/90 text-xs text-foreground shadow-2xl backdrop-blur transition-all duration-300"
			style={{ width: isExpanded ? 220 : "auto" }}
		>
			<button
				onClick={() => setIsExpanded((prev) => !prev)}
				className="flex w-full items-center justify-between p-3"
				aria-expanded={isExpanded}
				aria-controls="legend-content"
				type="button"
			>
				<h3 className="text-sm font-semibold text-foreground">Controls</h3>
				<ChevronDown
					className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
				/>
			</button>
			<div id="legend-content" className={`overflow-hidden transition-all ${isExpanded ? "max-h-64" : "max-h-0"}`}>
				<div className="space-y-1.5 px-3 pb-3">
					<div className="flex items-center justify-between">
						<span className="font-semibold">Pan canvas</span>
						<span>Click & drag</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="font-semibold">Zoom</span>
						<span>Mouse wheel</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="font-semibold">Select</span>
						<span>Click item</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="font-semibold">Multi-select</span>
						<span>
							<Kbd>Shift</Kbd> + Click
						</span>
					</div>

				</div>
			</div>
		</div>
	);
}



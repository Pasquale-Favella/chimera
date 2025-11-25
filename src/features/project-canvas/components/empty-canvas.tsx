'use client';

import { useEffect, useState } from "react";

import { Sparkles } from "lucide-react";

export function EmptyCanvas() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`pointer-events-none fixed left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"
				}`}
		>
			<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/30 backdrop-blur-sm">
				<Sparkles className="h-10 w-10 text-muted-foreground/70" />
			</div>
			<h1 className="text-3xl font-bold tracking-tight text-foreground">AI Sketch Canvas</h1>
			<p className="mt-3 max-w-md text-lg text-muted-foreground">
				Describe your interface in the prompt bar below to generate your first design.
			</p>
		</div>
	);
}



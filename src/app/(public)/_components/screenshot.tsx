"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ScreenshotProps {
	srcLight: string;
	srcDark?: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
}

export default function Screenshot({
	srcLight,
	srcDark,
	alt,
	width,
	height,
	className,
}: ScreenshotProps) {
	const { resolvedTheme } = useTheme();
	const [src, setSrc] = useState<string | null>(null);

	useEffect(() => {
		if (resolvedTheme) {
			setSrc(resolvedTheme === "light" ? srcLight : srcDark || srcLight);
		}
	}, [resolvedTheme, srcLight, srcDark]);

	if (!src) {
		return (
			<div
				aria-label={alt}
				className={cn("bg-muted", className)}
				style={{ width, height }}
			/>
		);
	}

	return (
		<Image
			alt={alt}
			className={className}
			height={height}
			src={src}
			width={width}
		/>
	);
}

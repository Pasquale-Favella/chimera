import type React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
	image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	name: string;
	version?: string;
	width?: number;
	height?: number;
	showName?: boolean;
	badge?: string;
}

export default function Logo({
	className,
	image: SvgImage,
	name,
	version,
	width = 24,
	height = 24,
	showName = true,
	badge,
	...props
}: LogoProps) {
	return (
		<div
			className={cn("flex items-center gap-2 font-medium text-sm", className)}
			data-slot="logo"
			{...props}
		>
			<SvgImage
				aria-hidden="true"
				className="max-h-full max-w-full opacity-70"
				height={height}
				width={width}
			/>
			<span className={cn(!showName && "sr-only")}>{name}</span>
			{version && <span className="text-muted-foreground">{version}</span>}
			{badge && (
				<Badge size="sm" variant="brand">
					{badge}
				</Badge>
			)}
		</div>
	);
}

import type * as React from "react";

import { cn } from "@/lib/utils";

function Footer({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("bg-background pt-12 pb-4 text-foreground", className)}
			data-slot="footer"
			{...props}
		/>
	);
}

function FooterContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
				className,
			)}
			data-slot="footer-content"
			{...props}
		/>
	);
}

function FooterColumn({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col gap-4", className)}
			data-slot="footer-column"
			{...props}
		/>
	);
}

function FooterBottom({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mt-8 flex flex-col items-center justify-between gap-4 border-border border-t pt-4 text-muted-foreground text-xs sm:flex-row dark:border-border/15",
				className,
			)}
			data-slot="footer-bottom"
			{...props}
		/>
	);
}

export { Footer, FooterBottom, FooterColumn, FooterContent };

import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

import { cn } from "@/lib/utils";

const glowVariants = cva("absolute w-full", {
	variants: {
		variant: {
			top: "top-0",
			above: "-top-[128px]",
			bottom: "bottom-0",
			below: "-bottom-[128px]",
			center: "top-[50%]",
		},
	},
	defaultVariants: {
		variant: "top",
	},
});

function Glow({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof glowVariants>) {
	return (
		<div
			className={cn(glowVariants({ variant }), className)}
			data-slot="glow"
			{...props}
		>
			<div
				className={cn(
					"-translate-x-1/2 absolute left-1/2 h-[256px] w-[60%] scale-[2.5] rounded-[50%] bg-radial from-10% from-brand-foreground/50 to-60% to-brand-foreground/0 opacity-20 sm:h-[512px] dark:opacity-100",
					variant === "center" && "-translate-y-1/2",
				)}
			/>
			<div
				className={cn(
					"-translate-x-1/2 absolute left-1/2 h-[128px] w-[40%] scale-200 rounded-[50%] bg-radial from-10% from-brand/30 to-60% to-brand-foreground/0 opacity-20 sm:h-[256px] dark:opacity-100",
					variant === "center" && "-translate-y-1/2",
				)}
			/>
		</div>
	);
}

export default Glow;

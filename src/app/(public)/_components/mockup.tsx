import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

import { cn } from "@/lib/utils";

const mockupVariants = cva(
	"relative z-10 flex overflow-hidden border border-border/70 shadow-2xl dark:border-border/5 dark:border-t-border/15",
	{
		variants: {
			type: {
				mobile: "max-w-[350px] rounded-[48px]",
				responsive: "rounded-md",
			},
		},
		defaultVariants: {
			type: "responsive",
		},
	},
);

export interface MockupProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof mockupVariants> {}

function Mockup({ className, type, ...props }: MockupProps) {
	return (
		<div
			className={cn(mockupVariants({ type, className }))}
			data-slot="mockup"
			{...props}
		/>
	);
}

const frameVariants = cva(
	"relative z-10 flex overflow-hidden rounded-2xl bg-border/50 dark:bg-border/10",
	{
		variants: {
			size: {
				small: "p-2",
				large: "p-4",
			},
		},
		defaultVariants: {
			size: "small",
		},
	},
);

export interface MockupFrameProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof frameVariants> {}

function MockupFrame({ className, size, ...props }: MockupFrameProps) {
	return (
		<div
			className={cn(frameVariants({ size, className }))}
			data-slot="mockup-frame"
			{...props}
		/>
	);
}

export { Mockup, MockupFrame };

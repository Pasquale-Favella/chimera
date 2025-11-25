import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center gap-2 rounded-full border border-border/100 font-semibold text-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-border/20",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground dark:border-transparent dark:shadow-sm",
				brand:
					"border-transparent bg-brand text-primary-foreground dark:border-transparent dark:shadow-sm",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground dark:border-transparent dark:shadow-sm",
				destructive:
					"border-transparent bg-destructive/30 text-destructive-foreground dark:border-transparent dark:shadow-sm",
				outline: "text-foreground",
			},
			size: {
				default: "px-2.5 py-1",
				sm: "px-1",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Badge({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			className={cn(badgeVariants({ variant, size }), className)}
			data-slot="badge"
			{...props}
		/>
	);
}

export { Badge, badgeVariants };

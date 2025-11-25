import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pricingColumnVariants = cva(
	"relative flex max-w-container flex-col gap-6 overflow-hidden rounded-2xl p-8 shadow-xl",
	{
		variants: {
			variant: {
				default: "glass-1 dark:glass-3 to-transparent",
				glow: "glass-2 dark:glass-3 after:-top-[128px] after:-translate-x-1/2 to-trasparent after:absolute after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:rounded-[50%] after:blur-[72px] after:content-[''] dark:after:bg-foreground/30",
				"glow-brand":
					"glass-3 dark:glass-4 after:-top-[128px] after:-translate-x-1/2 from-card/100 to-card/100 after:absolute after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px] after:content-['']",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface PricingColumnProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof pricingColumnVariants> {
	name: string;
	icon?: ReactNode;
	description: string;
	price: number;
	priceNote: string;
	cta: {
		variant: "glow" | "default";
		label: string;
		href: string;
	};
	features: string[];
}

export function PricingColumn({
	name,
	icon,
	description,
	price,
	priceNote,
	cta,
	features,
	variant,
	className,
	...props
}: PricingColumnProps) {
	return (
		<div
			className={cn(pricingColumnVariants({ variant, className }))}
			{...props}
		>
			<hr
				className={cn(
					"absolute top-0 left-[10%] h-[1px] w-[80%] border-0 bg-linear-to-r from-transparent via-foreground/60 to-transparent",
					variant === "glow-brand" && "via-brand",
				)}
			/>
			<div className="flex flex-col gap-7">
				<div className="flex flex-col gap-2">
					<h2 className="flex items-center gap-2 font-bold">
						{icon && (
							<div className="flex items-center gap-2 text-muted-foreground">
								{icon}
							</div>
						)}
						{name}
					</h2>
					<p className="max-w-[220px] text-muted-foreground text-sm">
						{description}
					</p>
				</div>
				<div className="flex items-center gap-3 lg:flex-col lg:items-start xl:flex-row xl:items-center">
					<div className="flex items-baseline gap-1">
						<span className="font-bold text-2xl text-muted-foreground">$</span>
						<span className="font-bold text-6xl">{price}</span>
					</div>
					<div className="flex min-h-[40px] flex-col">
						{price > 0 && (
							<>
								<span className="text-sm">one-time payment</span>
								<span className="text-muted-foreground text-sm">
									plus local taxes
								</span>
							</>
						)}
					</div>
				</div>
				<Button asChild size="lg" variant={cta.variant}>
					<Link href={cta.href}>{cta.label}</Link>
				</Button>
				<p className="min-h-[40px] max-w-[220px] text-muted-foreground text-sm">
					{priceNote}
				</p>
				<hr className="border-input" />
			</div>
			<div>
				<ul className="flex flex-col gap-2">
					{features.map((feature) => (
						<li className="flex items-center gap-2 text-sm" key={feature}>
							<CircleCheckBig className="size-4 shrink-0 text-muted-foreground" />
							{feature}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export { pricingColumnVariants };

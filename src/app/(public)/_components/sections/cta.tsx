import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import Glow from "../../../../components/ui/glow";
import { siteConfig } from "../../config/site";

interface CTAButtonProps {
	href: string;
	text: string;
	variant?: VariantProps<typeof buttonVariants>["variant"];
	icon?: ReactNode;
	iconRight?: ReactNode;
}

interface CTAProps {
	title?: string;
	buttons?: CTAButtonProps[] | false;
	className?: string;
}

export default function CTA({
	title = "Ready to Bring Your Designs to Life?",
	buttons = [
		{
			href: siteConfig.getStartedUrl,
			text: "Get Started",
			variant: "default",
		},
	],
	className,
}: CTAProps) {
	return (
		<Section className={cn("group relative overflow-hidden", className)}>
			<div className="relative z-10 mx-auto flex max-w-container flex-col items-center gap-6 text-center sm:gap-8">
				<h2 className="max-w-[640px] font-semibold text-3xl leading-tight sm:text-5xl sm:leading-tight">
					{title}
				</h2>
				{buttons !== false && buttons.length > 0 && (
					<div className="flex justify-center gap-4">
						{buttons.map((button) => (
							<Button
								asChild
								key={button.text}
								size="lg"
								variant={button.variant || "default"}
							>
								<a href={button.href}>
									{button.icon}
									{button.text}
									{button.iconRight}
								</a>
							</Button>
						))}
					</div>
				)}
			</div>
			<div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
				<Glow variant="bottom" />
			</div>
		</Section>
	);
}

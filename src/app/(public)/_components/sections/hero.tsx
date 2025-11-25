import type { VariantProps } from "class-variance-authority";
import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Glow from "../../../../components/ui/glow";
import { Section } from "../../../../components/ui/section";
import { siteConfig } from "../../config/site";
import Github from "../logos/github";
import { Mockup, MockupFrame } from "../mockup";
import Screenshot from "../screenshot";

interface HeroButtonProps {
	href: string;
	text: string;
	variant?: VariantProps<typeof buttonVariants>["variant"];
	icon?: ReactNode;
	iconRight?: ReactNode;
}

interface HeroProps {
	title?: string;
	description?: string;
	mockup?: ReactNode | false;
	badge?: ReactNode | false;
	buttons?: HeroButtonProps[] | false;
	className?: string;
}

export default function Hero({
	title = "Design, Prototype, and Present with AI-Powered Precision",
	description = "Chimera is a visual design canvas that helps you create stunning UI designs, build interactive prototypes, and showcase your work—all enhanced with intelligent AI assistance.",
	mockup = (
		<Screenshot
			alt="Chimera app screenshot"
			className="w-full"
			height={765}
			srcDark="/assets/dashboard-dark.png"
			srcLight="/assets/dashboard-light.png"
			width={1248}
		/>
	),
	badge = (
		<Badge className="animate-appear" variant="outline">
			<span className="text-muted-foreground">
				Start creating beautiful designs today!
			</span>
			<a className="flex items-center gap-1" href={siteConfig.getStartedUrl}>
				Get started
				<ArrowRightIcon className="size-3" />
			</a>
		</Badge>
	),
	buttons = [
		{
			href: siteConfig.getStartedUrl,
			text: "Get Started",
			variant: "default",
		},
		{
			href: siteConfig.links.github,
			text: "Github",
			variant: "glow",
			icon: <Github className="mr-2 size-4" />,
		},
	],
	className,
}: HeroProps) {
	return (
		<Section
			className={cn(
				"fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0",
				className,
			)}
		>
			<div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
				<div className="flex flex-col items-center gap-6 text-center sm:gap-12">
					{badge !== false && badge}
					<h1 className="relative z-10 inline-block animate-appear text-balance bg-linear-to-r from-foreground to-foreground bg-clip-text font-semibold text-4xl text-transparent leading-tight drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight dark:to-muted-foreground">
						{title}
					</h1>
					<p className="relative z-10 max-w-[740px] animate-appear text-balance font-medium text-md text-muted-foreground opacity-0 delay-100 sm:text-xl">
						{description}
					</p>
					{buttons && buttons.length > 0 && (
						<div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
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
					{mockup && (
						<div className="relative w-full pt-12">
							<MockupFrame
								className="animate-appear opacity-0 delay-700"
								size="small"
							>
								<Mockup
									className="w-full rounded-xl border-0 bg-background/90"
									type="responsive"
								>
									{mockup}
								</Mockup>
							</MockupFrame>
							<Glow
								className="animate-appear-zoom opacity-0 delay-1000"
								variant="top"
							/>
						</div>
					)}
				</div>
			</div>
		</Section>
	);
}

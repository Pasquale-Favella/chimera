import type { VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "../../config/site";
import ChimeraLogo from "../logos/chimera-logo";
import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from "../navbar";
import Navigation from "../navigation";

interface NavbarLink {
	text: string;
	href: string;
}

interface NavbarActionProps {
	text: string;
	href: string;
	variant?: VariantProps<typeof buttonVariants>["variant"];
	icon?: ReactNode;
	iconRight?: ReactNode;
	isButton?: boolean;
}

interface NavbarProps {
	logo?: ReactNode;
	name?: string;
	homeUrl?: string;
	mobileLinks?: NavbarLink[];
	actions?: NavbarActionProps[];
	showNavigation?: boolean;
	customNavigation?: ReactNode;
	className?: string;
}

export default function Navbar({
	logo = <ChimeraLogo />,
	name = "Chimera",
	homeUrl = siteConfig.url,
	mobileLinks = [
		{ text: "Getting Started", href: siteConfig.url },
		{ text: "Components", href: siteConfig.url },
		{ text: "Documentation", href: siteConfig.url },
	],
	actions = [
		{ text: "Sign in", href: siteConfig.url, isButton: false },
		{
			text: "Get Started",
			href: siteConfig.getStartedUrl,
			isButton: true,
			variant: "default",
		},
	],
	showNavigation = true,
	customNavigation,
	className,
}: NavbarProps) {
	return (
		<header className={cn("-mb-4 sticky top-0 z-50 px-4 pb-4", className)}>
			<div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
			<div className="relative mx-auto max-w-container">
				<NavbarComponent>
					<NavbarLeft>
						<a
							className="flex items-center gap-2 font-bold text-xl"
							href={homeUrl}
						>
							{logo}
							{name}
						</a>
						{showNavigation && (customNavigation || <Navigation />)}
					</NavbarLeft>
					<NavbarRight>
						{actions.map((action) =>
							action.isButton ? (
								<Button
									asChild
									key={action.text}
									variant={action.variant || "default"}
								>
									<a href={action.href}>
										{action.icon}
										{action.text}
										{action.iconRight}
									</a>
								</Button>
							) : (
								<a
									className="hidden text-sm md:block"
									href={action.href}
									key={action.text}
								>
									{action.text}
								</a>
							),
						)}

						<ModeToggle />
						<Sheet>
							<SheetTrigger asChild>
								<Button
									className="shrink-0 md:hidden"
									size="icon"
									variant="ghost"
								>
									<Menu className="size-5" />
									<span className="sr-only">Toggle navigation menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right">
								<nav className="grid gap-6 font-medium text-lg">
									<a
										className="flex items-center gap-2 font-bold text-xl"
										href={homeUrl}
									>
										<span>{name}</span>
									</a>
									{mobileLinks.map((link) => (
										<a
											className="text-muted-foreground hover:text-foreground"
											href={link.href}
											key={link.text}
										>
											{link.text}
										</a>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</NavbarRight>
				</NavbarComponent>
			</div>
		</header>
	);
}

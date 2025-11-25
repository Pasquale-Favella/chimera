import type { ReactNode } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import { siteConfig } from "../../config/site";
import { Footer, FooterBottom, FooterColumn, FooterContent } from "../footer";
import ChimeraLogo from "../logos/chimera-logo";

interface FooterLink {
	text: string;
	href: string;
}

interface FooterColumnProps {
	title: string;
	links: FooterLink[];
}

interface FooterProps {
	logo?: ReactNode;
	name?: string;
	columns?: FooterColumnProps[];
	copyright?: string;
	policies?: FooterLink[];
	showModeToggle?: boolean;
	className?: string;
}

export default function FooterSection({
	logo = <ChimeraLogo />,
	name = "Chimera",
	columns = [
		{
			title: "Product",
			links: [
				{ text: "Changelog", href: siteConfig.getStartedUrl },
				{ text: "Documentation", href: siteConfig.getStartedUrl },
			],
		},
		{
			title: "Company",
			links: [
				{ text: "About", href: siteConfig.getStartedUrl },
				{ text: "Careers", href: siteConfig.getStartedUrl },
				{ text: "Blog", href: siteConfig.getStartedUrl },
			],
		},
		{
			title: "Contact",
			links: [
				{ text: "Discord", href: siteConfig.getStartedUrl },
				{ text: "Twitter", href: siteConfig.links.twitter },
				{ text: "Github", href: siteConfig.links.github },
			],
		},
	],
	copyright = "© 2025 Pasquale Favella. All rights reserved",
	policies = [
		{ text: "Privacy Policy", href: siteConfig.url },
		{ text: "Terms of Service", href: siteConfig.url },
	],
	showModeToggle = true,
	className,
}: FooterProps) {
	return (
		<footer className={cn("w-full bg-background px-4", className)}>
			<div className="mx-auto max-w-container">
				<Footer>
					<FooterContent>
						<FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
							<div className="flex items-center gap-2">
								{logo}
								<h3 className="font-bold text-xl">{name}</h3>
							</div>
						</FooterColumn>
						{columns.map((column) => (
							<FooterColumn key={column.title}>
								{" "}
								<h3 className="pt-1 font-semibold text-md">{column.title}</h3>
								{column.links.map((link) => (
									<a
										className="text-muted-foreground text-sm"
										href={link.href}
										key={link.text}
									>
										{link.text}
									</a>
								))}
							</FooterColumn>
						))}
					</FooterContent>
					<FooterBottom>
						<div className="md:ml-2">{copyright}</div>
						<div className="flex items-center gap-4 md:mr-2">
							{policies.map((policy) => (
								<a href={policy.href} key={policy.text}>
									{" "}
									{policy.text}
								</a>
							))}
							{showModeToggle && <ModeToggle />}
						</div>
					</FooterBottom>
				</Footer>
			</div>
		</footer>
	);
}

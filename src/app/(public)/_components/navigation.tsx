"use client";

import Link from "next/link";
import type * as React from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { siteConfig } from "../config/site";
import ChimeraLogo from "./logos/chimera-logo";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./navigation-menu";

interface ComponentItem {
	title: string;
	href: string;
	description: string;
}

interface MenuItem {
	title: string;
	href?: string;
	isLink?: boolean;
	content?: ReactNode;
}

interface NavigationProps {
	menuItems?: MenuItem[];
	components?: ComponentItem[];
	logo?: ReactNode;
	logoTitle?: string;
	logoDescription?: string;
	logoHref?: string;
	introItems?: {
		title: string;
		href: string;
		description: string;
	}[];
}

export default function Navigation({
	menuItems = [
		{
			title: "Getting started",
			content: "default",
		},
		{
			title: "Components",
			content: "components",
		},
		{
			title: "Documentation",
			isLink: true,
			href: siteConfig.getStartedUrl,
		},
	],
	components = [
		{
			title: "AI-Assisted Component Generation",
			href: siteConfig.getStartedUrl,
			description:
				"Generate React components from natural language descriptions or Figma designs.",
		},
		{
			title: "Intelligent User Flow Suggestions",
			href: siteConfig.getStartedUrl,
			description:
				"Receive AI-powered recommendations for optimal user journeys.",
		},
		{
			title: "Real-time Design to Code",
			href: siteConfig.getStartedUrl,
			description:
				"Convert design mockups into clean, production-ready code instantly.",
		},
		{
			title: "Automated Style Enforcement",
			href: siteConfig.getStartedUrl,
			description:
				"Ensure consistent coding style and conventions across your project.",
		},
		{
			title: "Type-Safe Architecture",
			href: siteConfig.getStartedUrl,
			description:
				"Maintain code quality and reliability through end-to-end type safety.",
		},
		{
			title: "Rapid Prototyping",
			href: siteConfig.getStartedUrl,
			description:
				"Accelerate development from concept to working prototype with AI assistance.",
		},
	],
	logo = <ChimeraLogo />,
	logoTitle = "Chimera",
	logoDescription = "AI-powered full-stack platform that enables rapid design implementation and intelligent user flow creation.",
	logoHref = siteConfig.url,
	introItems = [
		{
			title: "Introduction to Chimera",
			href: siteConfig.getStartedUrl,
			description:
				"Discover how Chimera leverages AI to streamline your development process.",
		},
		{
			title: "Getting Started with AI Features",
			href: siteConfig.getStartedUrl,
			description: "Learn to use AI for component generation and user flows.",
		},
		{
			title: "Integrating with Your Workflow",
			href: siteConfig.getStartedUrl,
			description: "Seamlessly integrate Chimera into your existing projects.",
		},
	],
}: NavigationProps) {
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				{menuItems.map((item) => (
					<NavigationMenuItem key={item.title}>
						{" "}
						{item.isLink ? (
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href={item.href || ""}>{item.title}</Link>
							</NavigationMenuLink>
						) : (
							<>
								<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
								<NavigationMenuContent>
									{item.content === "default" ? (
										<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<a
														className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/30 to-muted/10 p-6 no-underline outline-hidden focus:shadow-md"
														href={logoHref}
													>
														{logo}
														<div className="mt-4 mb-2 font-medium text-lg">
															{logoTitle}
														</div>
														<p className="text-muted-foreground text-sm leading-tight">
															{logoDescription}
														</p>
													</a>
												</NavigationMenuLink>
											</li>
											{introItems.map((intro) => (
												<ListItem
													href={intro.href}
													key={intro.title}
													title={intro.title}
												>
													{" "}
													{intro.description}
												</ListItem>
											))}
										</ul>
									) : item.content === "components" ? (
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											{components.map((component) => (
												<ListItem
													href={component.href}
													key={component.title}
													title={component.title}
												>
													{component.description}
												</ListItem>
											))}
										</ul>
									) : (
										item.content
									)}
								</NavigationMenuContent>
							</>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function ListItem({
	className,
	title,
	children,
	...props
}: React.ComponentProps<"a"> & { title: string }) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					data-slot="list-item"
					{...props}
				>
					<div className="font-medium text-sm leading-none">{title}</div>
					<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
}

import { User, Users } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { siteConfig } from "../../config/site";
import { PricingColumn, type PricingColumnProps } from "../pricing-column";

interface PricingProps {
	title?: string | false;
	description?: string | false;
	plans?: PricingColumnProps[] | false;
	className?: string;
}

export default function Pricing({
	title = "Unlock the Power of AI-Powered Development",
	description = "Choose the plan that best fits your needs and start building with the power of AI. No recurring fees. Just simple, transparent pricing.",
	plans = [
		{
			name: "Free",
			description: "For everyone starting out on a website for their big idea",
			price: 0,
			priceNote: "Free and open-source forever.",
			cta: {
				variant: "glow",
				label: "Get started for free",
				href: "/docs/getting-started/introduction",
			},
			features: [
				"1 website template",
				"9 blocks and sections",
				"Basic AI-powered suggestions",
			],
			variant: "default",
			className: "hidden lg:flex",
		},
		{
			name: "Pro",
			icon: <User className="size-4" />,
			description: "For early-stage founders, solopreneurs and indie devs",
			price: 99,
			priceNote: "Lifetime access. Free updates. No recurring fees.",
			cta: {
				variant: "default",
				label: "Get all-access",
				href: siteConfig.pricing.pro,
			},
			features: [
				`${siteConfig.stats.websiteTemplates} website templates`,
				`${siteConfig.stats.appTemplates} app templates`,
				`${siteConfig.stats.sections} blocks and sections`,
				"Advanced AI-Assisted Component Generation",
				"Intelligent User Flow Suggestions",
			],
			variant: "glow-brand",
		},
		{
			name: "Pro Team",
			icon: <Users className="size-4" />,
			description: "For teams and agencies working on cool products together",
			price: 499,
			priceNote: "Lifetime access. Free updates. No recurring fees.",
			cta: {
				variant: "default",
				label: "Get all-access for your team",
				href: siteConfig.pricing.team,
			},
			features: [
				"All the templates, components and sections available for your entire team",
				"Priority support for AI features",
			],
			variant: "glow",
		},
	],
	className = "",
}: PricingProps) {
	return (
		<Section className={cn(className)}>
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
				{(title || description) && (
					<div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
						{title && (
							<h2 className="font-semibold text-3xl leading-tight sm:text-5xl sm:leading-tight">
								{title}
							</h2>
						)}
						{description && (
							<p className="max-w-[600px] font-medium text-md text-muted-foreground sm:text-xl">
								{description}
							</p>
						)}
					</div>
				)}
				{plans !== false && plans.length > 0 && (
					<div className="mx-auto grid max-w-container grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{plans.map((plan) => (
							<PricingColumn
								className={plan.className}
								cta={plan.cta}
								description={plan.description}
								features={plan.features}
								icon={plan.icon}
								key={plan.name}
								name={plan.name}
								price={plan.price}
								priceNote={plan.priceNote}
								variant={plan.variant}
							/>
						))}
					</div>
				)}
			</div>
		</Section>
	);
}

import { Section } from "@/components/ui/section";
import { siteConfig } from "../../config/site";

interface StatItemProps {
	label?: string;
	value: string | number;
	suffix?: string;
	description?: string;
}

interface StatsProps {
	items?: StatItemProps[] | false;
	className?: string;
}

export default function Stats({
	items = [
		{
			label: "used by",
			value: Math.round(siteConfig.stats.figma / 100) / 10,
			suffix: "k",
			description: "designers on Figma Community",
		},
		{
			label: "over",
			value: siteConfig.stats.github,
			description: "clones and forks of the template on Github",
		},
		{
			label: "powering",
			value: "100+",
			description: "AI-powered features",
		},
		{
			label: "includes",
			value: siteConfig.stats.sections,
			description: "blocks and sections",
		},
	],
	className,
}: StatsProps) {
	return (
		<Section className={className}>
			<div className="container mx-auto max-w-[960px]">
				{items !== false && items.length > 0 && (
					<div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
						{items.map((item) => (
							<div
								className="flex flex-col items-start gap-3 text-left"
								key={item.label}
							>
								{item.label && (
									<div className="font-semibold text-muted-foreground text-sm">
										{item.label}
									</div>
								)}
								<div className="flex items-baseline gap-2">
									<div className="bg-linear-to-r from-foreground to-foreground bg-clip-text font-medium text-4xl text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 sm:text-5xl md:text-6xl dark:to-brand">
										{item.value}
									</div>
									{item.suffix && (
										<div className="font-semibold text-2xl text-brand">
											{item.suffix}
										</div>
									)}
								</div>
								{item.description && (
									<div className="text-pretty font-semibold text-muted-foreground text-sm">
										{item.description}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</Section>
	);
}

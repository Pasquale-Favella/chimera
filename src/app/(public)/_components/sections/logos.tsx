import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Section } from "../../../../components/ui/section";
import { siteConfig } from "../../config/site";
import Logo from "../logo";
import Figma from "../logos/figma";
import React from "../logos/react";
import ShadcnUi from "../logos/shadcn-ui";
import Tailwind from "../logos/tailwind";
import TypeScript from "../logos/typescript";

interface LogosProps {
	title?: string;
	badge?: ReactNode | false;
	logos?: ReactNode[] | false;
	className?: string;
}

export default function Logos({
	title = "Built with industry-standard tools and powered by AI",
	badge = (
		<Badge className="border-brand/30 text-brand" variant="outline">
			Last updated: {siteConfig.stats.updated}
		</Badge>
	),
	logos = [
		<Logo image={Figma} key="figma" name="Figma" />,
		<Logo image={React} key="react" name="React" version="19.0.0" />,
		<Logo
			image={TypeScript}
			key="typescript"
			name="TypeScript"
			version="5.9.3"
		/>,
		<Logo
			badge="New"
			image={ShadcnUi}
			key="shadcn"
			name="Shadcn/ui"
			version="3.4.2"
		/>,
		<Logo image={Tailwind} key="tailwind" name="Tailwind" version="4.0.15" />,
	],
	className,
}: LogosProps) {
	return (
		<Section className={className}>
			<div className="mx-auto flex max-w-container flex-col items-center gap-8 text-center">
				<div className="flex flex-col items-center gap-6">
					{badge !== false && badge}
					<h2 className="font-semibold text-md sm:text-2xl">{title}</h2>
				</div>
				{logos !== false && logos.length > 0 && (
					<div className="flex flex-wrap items-center justify-center gap-8">
						{logos}
					</div>
				)}
			</div>
		</Section>
	);
}

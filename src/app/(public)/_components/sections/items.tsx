import {
	BlocksIcon,
	EclipseIcon,
	FastForwardIcon,
	LanguagesIcon,
	MonitorSmartphoneIcon,
	RocketIcon,
	ScanFaceIcon,
	SquarePenIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import {
	Item,
	ItemDescription,
	ItemIcon,
	ItemTitle,
} from "@/components/ui/item";
import { Section } from "@/components/ui/section";

interface ItemProps {
	title: string;
	description: string;
	icon: ReactNode;
}

interface ItemsProps {
	title?: string;
	items?: ItemProps[] | false;
	className?: string;
}

export default function Items({
	title = "Everything You Need to Design and Prototype",
	items = [
		{
			title: "Visual Design Canvas",
			description:
				"Create and edit UI designs with an intuitive drag-and-drop canvas. Build your interfaces visually with complete creative control.",
			icon: <SquarePenIcon className="size-5 stroke-1" />,
		},
		{
			title: "AI-Powered Design Refinement",
			description:
				"Enhance your designs with intelligent AI assistance. Get suggestions for improvements and automatically refine your work.",
			icon: <ScanFaceIcon className="size-5 stroke-1" />,
		},
		{
			title: "Interactive Prototyping",
			description:
				"Build clickable prototypes to test user flows and interactions. Connect design elements to create realistic user journeys.",
			icon: <MonitorSmartphoneIcon className="size-5 stroke-1" />,
		},
		{
			title: "Component Library",
			description:
				"Extract and reuse design elements as components. Build a library of reusable UI patterns for consistent designs.",
			icon: <BlocksIcon className="size-5 stroke-1" />,
		},
		{
			title: "Presentation Mode",
			description: "Showcase your designs in a polished presentation view. Perfect for client reviews and stakeholder demos.",
			icon: <FastForwardIcon className="size-5 stroke-1" />,
		},
		{
			title: "Style Management",
			description: "Copy and apply styles across elements with ease. Maintain design consistency effortlessly.",
			icon: <RocketIcon className="size-5 stroke-1" />,
		},
		{
			title: "Responsive Design",
			description:
				"Preview your designs across desktop, tablet, and mobile viewports to ensure perfect responsiveness.",
			icon: <LanguagesIcon className="size-5 stroke-1" />,
		},
		{
			title: "Collaborative Projects",
			description:
				"Share projects with team members and collaborate in real-time. Invite users and work together seamlessly.",
			icon: <EclipseIcon className="size-5 stroke-1" />,
		},
	],
	className,
}: ItemsProps) {
	return (
		<Section className={className}>
			<div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-20">
				<h2 className="max-w-[560px] text-center font-semibold text-3xl leading-tight sm:text-5xl sm:leading-tight">
					{title}
				</h2>
				{items !== false && items.length > 0 && (
					<div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
						{items.map((item) => (
							<Item key={item.title}>
								{" "}
								<ItemTitle className="flex items-center gap-2">
									<ItemIcon>{item.icon}</ItemIcon>
									{item.title}
								</ItemTitle>
								<ItemDescription>{item.description}</ItemDescription>
							</Item>
						))}
					</div>
				)}
			</div>
		</Section>
	);
}

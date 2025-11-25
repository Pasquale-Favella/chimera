import Link from "next/link";
import type { ReactNode } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/ui/section";
import { siteConfig } from "../../config/site";

interface FAQItemProps {
	question: string;
	answer: ReactNode;
	value?: string;
}

interface FAQProps {
	title?: string;
	items?: FAQItemProps[] | false;
	className?: string;
}

export default function FAQ({
	title = "Frequently Asked Questions",
	items = [
		{
			question: "What is Chimera and how can it help me?",
			answer: (
				<>
					<p className="mb-4 max-w-[640px] text-balance text-muted-foreground">
						Chimera is a visual design canvas and prototyping platform powered by AI.
						It helps you create UI designs, build interactive prototypes, and present
						your work to stakeholders. With AI-assisted refinement and an intuitive
						drag-and-drop interface, you can bring your design ideas to life faster
						than ever.
					</p>
				</>
			),
		},
		{
			question: "How does the visual design canvas work?",
			answer: (
				<>
					<p className="mb-4 max-w-[600px] text-muted-foreground">
						The canvas provides an intuitive workspace where you can create and arrange
						design elements visually. Simply drag and drop components, customize their
						properties, and build your UI layouts. You can preview your designs across
						different device sizes and export components for reuse.
					</p>
				</>
			),
		},
		{
			question: "What can I do with prototype mode?",
			answer: (
				<>
					<p className="mb-4 max-w-[580px] text-muted-foreground">
						Prototype mode lets you create interactive user flows by connecting design
						elements together. Define clickable areas, set up navigation between screens,
						and test your user journeys before development. It&apos;s perfect for
						validating UX concepts and getting stakeholder feedback.
					</p>
				</>
			),
		},
		{
			question: "How does AI assist with my designs?",
			answer: (
				<>
					<p className="mb-4 max-w-[580px] text-muted-foreground">
						Chimera&apos;s AI can help refine your designs, suggest improvements, and
						automatically identify interactive elements in your prototypes. The AI
						understands design patterns and can provide intelligent recommendations
						to enhance your work.
					</p>
				</>
			),
		},
		{
			question: "Can I collaborate with my team?",
			answer: (
				<p className="mb-4 max-w-[580px] text-muted-foreground">
					Yes! Chimera supports team collaboration. You can invite team members to your
					projects, share designs, and work together. Each project has its own access
					control, so you can manage who can view and edit your work.
				</p>
			),
		},
		{
			question: "Is Chimera free to use?",
			answer: (
				<>
					<p className="mb-4 max-w-[580px] text-muted-foreground">
						Chimera is open-source and free to use. You can self-host it on your own
						infrastructure and customize it to fit your needs. For questions or support,
						feel free to reach out via{" "}
						<a
							className="underline underline-offset-2"
							href={siteConfig.links.email}
						>
							email
						</a>
						.
					</p>
				</>
			),
		},
	],
	className,
}: FAQProps) {
	return (
		<Section className={className}>
			<div className="mx-auto flex max-w-container flex-col items-center gap-8">
				<h2 className="text-center font-semibold text-3xl sm:text-5xl">
					{title}
				</h2>
				{items !== false && items.length > 0 && (
					<Accordion className="w-full max-w-[800px]" collapsible type="single">
						{items.map((item) => (
							<AccordionItem
								key={item.question}
								value={item.value || item.question}
							>
								<AccordionTrigger>{item.question}</AccordionTrigger>
								<AccordionContent>{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				)}
			</div>
		</Section>
	);
}

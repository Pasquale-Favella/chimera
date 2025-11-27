import { Button } from "@/components/ui/button";
import { ProjectQuickCreate } from "@/app/(secure)/dashboard/_components/project-quick-create";
import { InviteCollaboratorDialog } from "./invite-collaborator-dialog";

type HeroSectionProps = {
	userName?: string | null;
	projectCount: number;
	owned: number;
	shared: number;
	latestProjectName?: string;
};

export function HeroSection({
	userName,
	projectCount,
	owned,
	shared,
	latestProjectName,
}: HeroSectionProps) {
	const heroStats = [
		{
			label: "Projects live",
			value: projectCount,
		},
		{
			label: "Owned by you",
			value: owned,
		},
		{
			label: "Shared with you",
			value: shared,
		},
	];

	return (
		<section className="px-4 lg:px-6">
			<div className="rounded-3xl bg-linear-to-br from-primary/90 via-primary to-primary-foreground/70 p-px shadow-2xl">
				<div className="rounded-[calc(1.5rem-1px)] bg-background/90 p-6 backdrop-blur">
					<div className="flex flex-col gap-8 lg:flex-row">
						<div className="flex flex-1 flex-col gap-6 text-foreground">
							<div className="space-y-2">
								<p className="text-sm uppercase tracking-wide text-muted-foreground">
									Workspace overview
								</p>
								<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
									{userName ? `Welcome back, ${userName}` : "Your design hub"}
								</h1>
								<p className="text-muted-foreground text-base leading-relaxed">
									Manage collaborative projects, share access with teammates, and
									track the evolution of every design without leaving this page.
								</p>
							</div>
							<div className="flex flex-wrap gap-4">
								{heroStats.map((stat) => (
									<div
										key={stat.label}
										className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-inner backdrop-blur"
									>
										<p className="text-muted-foreground">{stat.label}</p>
										<p className="text-2xl font-semibold">{stat.value}</p>
									</div>
								))}
							</div>
							<div className="flex flex-wrap gap-3">
								<InviteCollaboratorDialog />
							</div>
						</div>
						<div className="w-full max-w-sm lg:w-80">
							<ProjectQuickCreate latestProjectName={latestProjectName} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


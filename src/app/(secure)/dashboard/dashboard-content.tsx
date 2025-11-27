"use client";

import { useMemo, useState } from "react";
import { api } from "@/trpc/react";

import { DesignHighlights } from "@/app/(secure)/dashboard/_components/design-highlights";
import { HeroSection } from "@/app/(secure)/dashboard/_components/hero-section";
import { ProjectStats } from "@/app/(secure)/dashboard/_components/project-stats";
import { ProjectsOverview } from "@/app/(secure)/dashboard/_components/projects-overview";
import { authClient } from "@/server/better-auth/client";

type DashboardContentProps = {
	recentLimit: number;
};

export function DashboardContent({ recentLimit }: DashboardContentProps) {
	const [limit] = useState(4);

	const { data } = authClient.useSession();

	const [projectsData] = api.projects.list.useSuspenseQuery({ page: 1, limit });
	const projects = projectsData.items;
	const [recentDesigns] = api.designs.listRecent.useSuspenseQuery({ limit: recentLimit });
	const [stats] = api.projects.getStats.useSuspenseQuery();

	const featuredProject = projects[0];

	return (
		<div className="flex flex-col gap-6 pb-10 pt-6">
			<HeroSection
				userName={data?.user?.name ?? undefined}
				projectCount={stats.projects}
				owned={stats.owned}
				shared={Math.max(stats.projects - stats.owned, 0)}
				latestProjectName={featuredProject?.name}
			/>

			<ProjectStats
				projects={stats.projects}
				owned={stats.owned}
				designs={stats.designs}
				collaborators={stats.collaborators}
			/>

			<div className="grid gap-6 px-4 lg:grid-cols-[2fr,1fr] lg:px-6">
				<ProjectsOverview
					projects={projects}
				/>
				<DesignHighlights
					headline={projects.length > 0 ? "Recent designs across your workspace" : undefined}
					designs={recentDesigns}
					showProjectBadge
				/>
			</div>
		</div>
	);
}



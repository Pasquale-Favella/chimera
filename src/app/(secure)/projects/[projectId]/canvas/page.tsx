import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCanvasClient } from "@/features/project-canvas/project-canvas-client";
import { Button } from "@/components/ui/button";
import { api, HydrateClient } from "@/trpc/server";
import { withSession } from "@/lib/session-check.utils";

type CanvasPageProps = {
	params: Promise<{ projectId: string }>;
};

export default async function CanvasPage({ params }: CanvasPageProps) {
	await withSession();
	const { projectId } = await params;
	const project = await api.projects
		.getById({ projectId })
		.catch(() => null);

	if (!project) {
		notFound();
	}

	await Promise.all([
		api.projects.getById.prefetch({ projectId }),
		api.designs.listByProject.prefetch({ projectId }),
		api.designConnections.listByProject.prefetch({ projectId }),
	]);

	return (
		<HydrateClient>
			<div className="relative h-[calc(100vh_-_var(--header-height,0px)_-_4*var(--spacing,0px))] w-full overflow-hidden rounded-3xl bg-background shadow-lg">
				<div className="pointer-events-none absolute left-4 top-4 z-40 flex gap-2">
					<Button
						asChild
						size="sm"
						variant="outline"
						className="pointer-events-auto bg-background/90 backdrop-blur-sm border-border"
					>
						<Link href={`/projects/${project.id}`}>Back to project</Link>
					</Button>
					<div className="hidden rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-1 text-sm font-semibold text-foreground shadow-lg md:block">
						{project.name}
					</div>
				</div>
				<ProjectCanvasClient projectId={projectId} />
			</div>
		</HydrateClient>
	);
}



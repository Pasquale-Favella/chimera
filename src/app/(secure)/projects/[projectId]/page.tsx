import { api, HydrateClient } from "@/trpc/server";
import { ProjectPageClient } from "./project-page-client";
import { withSession } from "@/lib/session-check.utils";

type ProjectPageProps = {
	params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
	await withSession();
	const { projectId } = await params;

	await Promise.all([
		api.projects.getById.prefetch({ projectId }),
		api.projectMemberships.list.prefetch({ projectId }),
	]);

	return (
		<HydrateClient>
			<ProjectPageClient projectId={projectId} />
		</HydrateClient>
	);
}



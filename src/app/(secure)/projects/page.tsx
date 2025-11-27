import { api, HydrateClient } from "@/trpc/server";
import { ProjectsPageClient } from "./projects-page-client";
import { withSession } from "@/lib/session-check.utils";
import { PROJECTS_PAGE_SIZE } from "./hooks/use-projects-page";

export default async function ProjectsPage() {
    await withSession();
    await api.projects.list.prefetch({ page: 1, limit: PROJECTS_PAGE_SIZE });

    return (
        <HydrateClient>
            <ProjectsPageClient />
        </HydrateClient>
    );
}

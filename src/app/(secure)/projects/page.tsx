import { api, HydrateClient } from "@/trpc/server";
import { ProjectsPageClient } from "./projects-page-client";
import { withSession } from "@/lib/session-check.utils";

export default async function ProjectsPage() {
    await withSession();
    await api.projects.list.prefetch({ page: 1, limit: 12 });

    return (
        <HydrateClient>
            <ProjectsPageClient />
        </HydrateClient>
    );
}

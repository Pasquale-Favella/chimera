import { api, HydrateClient } from "@/trpc/server";
import { DashboardContent } from "./dashboard-content";
import { withSession } from "@/lib/session-check.utils";

export default async function Page() {
	await withSession();

	const recentDesignLimit = 8;

	await Promise.all([
		api.projects.list.prefetch({ page: 1, limit: 4 }),
		api.designs.listRecent.prefetch({ limit: recentDesignLimit }),
		api.projects.getStats.prefetch(),
	]);

	return (
		<HydrateClient>
			<DashboardContent recentLimit={recentDesignLimit} />
		</HydrateClient>
	);
}

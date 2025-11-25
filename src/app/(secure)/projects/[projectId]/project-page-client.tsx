"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
	ArrowLeft,
	Calendar,
	Layout,
	Sparkles,
	Users,
	Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MembershipManager } from "@/app/(secure)/projects/[projectId]/_components/membership-manager";
import { ProjectRole } from "../../../../../generated/prisma";
import { authClient } from "@/server/better-auth/client";
import { api } from "@/trpc/react";

type ProjectPageClientProps = {
	projectId: string;
};

export function ProjectPageClient({ projectId }: ProjectPageClientProps) {
	const { data: session } = authClient.useSession();
	const currentUserId = session?.user?.id ?? "";

	const [project] = api.projects.getById.useSuspenseQuery({ projectId });
	const [memberships] = api.projectMemberships.list.useSuspenseQuery({ projectId });

	const currentMembership =
		memberships.find((membership) => membership.userId === currentUserId) ??
		project.memberships.find((membership) => membership.userId === currentUserId);
	const currentRole = currentMembership?.role ?? ProjectRole.VIEWER;

	const stats = {
		designs: project.designs.length,
		members: memberships.length || project.memberships.length,
		updatedAt: project.updatedAt,
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm lg:flex-row lg:items-start lg:justify-between">
				<div className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="w-fit">
								{currentRole === ProjectRole.OWNER
									? "Owner"
									: `Access: ${currentRole.toLowerCase()}`}
							</Badge>
							<span className="text-xs text-muted-foreground">
								Last updated{" "}
								{formatDistanceToNow(new Date(stats.updatedAt), {
									addSuffix: true,
								})}
							</span>
						</div>
						<h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
						<p className="max-w-2xl text-lg text-muted-foreground">
							{project.description || "No description provided yet."}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-3 sm:flex-row">
					<Button asChild variant="outline" size="lg">
						<Link href="/dashboard">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to dashboard
						</Link>
					</Button>
					<Button asChild size="lg" className="bg-primary text-primary-foreground">
						<Link href={`/projects/${projectId}/canvas`}>
							<Sparkles className="mr-2 h-4 w-4" />
							Go to Project Designs
						</Link>
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Designs</CardTitle>
						<Layout className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.designs}</div>
						<p className="text-xs text-muted-foreground">
							Visual components created
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Collaborators</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.members}</div>
						<p className="text-xs text-muted-foreground">
							Team members with access
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Created</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatDistanceToNow(new Date(project.createdAt))} ago
						</div>
						<p className="text-xs text-muted-foreground">
							Project inception date
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
				<Card>
					<CardHeader>
						<CardTitle>Recent designs</CardTitle>
						<CardDescription>Latest work attached to this project.</CardDescription>
					</CardHeader>
					<CardContent>
						{project.designs.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
								<Layout className="mb-4 h-12 w-12 opacity-20" />
								<p className="text-lg font-medium">No designs yet</p>
								<p className="text-sm">
									Generate concepts or import work from the AI canvas.
								</p>
							</div>
						) : (
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{project.designs.slice(0, 6).map((design) => (
									<div
										key={design.id}
										className="group relative flex flex-col justify-between rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
									>
										<div className="space-y-3">
											<div className="flex items-start justify-between">
												<div className="rounded-md bg-primary/10 p-2 text-primary">
													<Layout className="h-4 w-4" />
												</div>
												<Badge variant="outline" className="font-normal">
													v{design.version}
												</Badge>
											</div>
											<div>
												<h3 className="font-semibold leading-none tracking-tight">
													{design.name}
												</h3>
												{design.description && (
													<p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
														{design.description}
													</p>
												)}
											</div>
										</div>
										<div className="mt-4 flex items-center text-xs text-muted-foreground">
											<Clock className="mr-1 h-3 w-3" />
											Updated{" "}
											{formatDistanceToNow(new Date(design.updatedAt), {
												addSuffix: true,
											})}
										</div>
									</div>
								))}
							</div>
						)}
					</CardContent>
					{project.designs.length > 6 && (
						<>
							<Separator />
							<CardContent className="text-sm text-muted-foreground">
								Showing the latest 6 designs. Visit the canvas for the full history.
							</CardContent>
						</>
					)}
				</Card>

				<div id="team">
					<MembershipManager
						projectId={projectId}
						currentUserId={currentUserId}
						currentRole={currentRole}
						memberships={memberships}
					/>
				</div>
			</div>
		</div>
	);
}



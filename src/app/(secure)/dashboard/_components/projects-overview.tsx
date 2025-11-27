"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ProjectCard } from "@/app/(secure)/dashboard/_components/project-card";
import { cn } from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";
import { DeleteProjectDialog } from "./delete-project-dialog";

type ProjectsList = RouterOutputs["projects"]["list"]["items"];

type ProjectsOverviewProps = {
	projects: ProjectsList;
	onSelectProject?: (projectId: string) => void;
	onManageMembers?: (projectId: string) => void;
};

export function ProjectsOverview({
	projects,
	onSelectProject,
	onManageMembers,
}: ProjectsOverviewProps) {
	const router = useRouter();
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const navigateToProject = (projectId: string, hash?: string) => {
		if (hash) {
			router.push(`/projects/${projectId}${hash}`);
			return;
		}
		router.push(`/projects/${projectId}`);
	};
	return (
		<Card className="overflow-hidden">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1.5">
					<CardTitle>
						<Link href="/projects" className="hover:underline">
							Latest Projects
						</Link>
					</CardTitle>
					<CardDescription>
						Overview of latest projects you can access right now.
					</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="default"
						size="default"
						onClick={() => router.push("/projects")}
					>
						View All
					</Button>
					<div className="flex items-center rounded-md border bg-muted/50 p-1">
						<Button
							variant={viewMode === "grid" ? "secondary" : "ghost"}
							size="icon"
							className="h-7 w-7"
							onClick={() => setViewMode("grid")}
						>
							<LayoutGrid className="h-4 w-4" />
							<span className="sr-only">Grid view</span>
						</Button>
						<Button
							variant={viewMode === "list" ? "secondary" : "ghost"}
							size="icon"
							className="h-7 w-7"
							onClick={() => setViewMode("list")}
						>
							<List className="h-4 w-4" />
							<span className="sr-only">List view</span>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-6">
				{projects.length === 0 ? (
					<div className="px-6 pb-6 text-sm text-muted-foreground">
						You do not have any projects yet. Use the quick action to create
						your first project.
					</div>
				) : viewMode === "grid" ? (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								onSelectProject={
									onSelectProject ?? ((pid) => navigateToProject(pid))
								}
								onManageMembers={
									onManageMembers ?? ((pid) => navigateToProject(pid, "#team"))
								}
							/>
						))}
					</div>
				) : (
					<Card className="p-0">
						<CardContent className="p-0">
							<Table>
								<TableHeader className="bg-muted/50">
									<TableRow className="hover:bg-muted/50">
										<TableHead className="h-12 pl-6">Project</TableHead>
										<TableHead className="h-12">Role</TableHead>
										<TableHead className="h-12">Designs</TableHead>
										<TableHead className="h-12">Collaborators</TableHead>
										<TableHead className="h-12 text-right">Last updated</TableHead>
										<TableHead className="h-12 text-right pr-6">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{projects.map((project) => (
										<TableRow
											key={project.id}
											className="cursor-pointer hover:bg-muted/50 transition-colors"
											onClick={() => navigateToProject(project.id)}
										>
											<TableCell className="py-4 pl-6 font-medium">
												<div className="flex flex-col gap-1">
													<span className="text-base font-semibold text-foreground">
														{project.name}
													</span>
													{project.description && (
														<span className="text-muted-foreground text-sm line-clamp-1 max-w-[300px]">
															{project.description}
														</span>
													)}
												</div>
											</TableCell>
											<TableCell className="py-4">
												<Badge
													variant={
														project.currentRole === "OWNER"
															? "default"
															: "secondary"
													}
													className="font-medium capitalize"
												>
													{project.currentRole.toLowerCase()}
												</Badge>
											</TableCell>
											<TableCell className="py-4 text-muted-foreground">
												<div className="flex items-center gap-2">
													<span className="font-medium text-foreground">
														{project._count?.designs ?? 0}
													</span>
													<span className="text-xs">files</span>
												</div>
											</TableCell>
											<TableCell className="py-4 text-muted-foreground">
												<div className="flex items-center gap-2">
													<span className="font-medium text-foreground">
														{project._count?.memberships ?? 0}
													</span>
													<span className="text-xs">members</span>
												</div>
											</TableCell>
											<TableCell className="py-4 text-right text-sm text-muted-foreground">
												{formatDistanceToNow(new Date(project.updatedAt), {
													addSuffix: true,
												})}
											</TableCell>
											<TableCell
												className="py-4 text-right pr-6"
												onClick={(e) => e.stopPropagation()}
											>
												<RowActions
													projectId={project.id}
													projectName={project.name}
													isOwner={project.currentRole === "OWNER"}
													onSelectProject={
														onSelectProject ??
														((pid) => navigateToProject(pid))
													}
													onManageMembers={
														onManageMembers ??
														((pid) => navigateToProject(pid, "#team"))
													}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
			</CardContent>
		</Card>
	);
}

function RowActions({
	projectId,
	projectName,
	isOwner,
	onSelectProject,
	onManageMembers,
}: {
	projectId: string;
	projectName: string;
	isOwner: boolean;
	onSelectProject?: (projectId: string) => void;
	onManageMembers?: (projectId: string) => void;
}) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const makeHandler =
		(cb?: (pid: string) => void) =>
			() => {
				cb?.(projectId);
			};

	return (
		<div className="flex items-center justify-end gap-2">
			<Button
				size="sm"
				variant="outline"
				onClick={makeHandler(onSelectProject)}
				className={cn("hidden sm:flex")}
			>
				Open
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" variant="ghost" className="h-8 w-8">
						<span className="sr-only">Project actions</span>
						⋮
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48">
					<DropdownMenuItem onClick={makeHandler(onSelectProject)}>
						View project
					</DropdownMenuItem>
					<DropdownMenuItem onClick={makeHandler(onManageMembers)}>
						Manage members
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => navigator.clipboard.writeText(projectName)}
					>
						Copy name
					</DropdownMenuItem>
					{isOwner && (
						<DeleteProjectDialog
							projectId={projectId}
							projectName={projectName}
							open={isDeleteDialogOpen}
							onOpenChange={setIsDeleteDialogOpen}
						>
							<DropdownMenuItem
								className="text-destructive focus:text-destructive"
								onSelect={(e) => e.preventDefault()}
							>
								Delete project
							</DropdownMenuItem>
						</DeleteProjectDialog>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

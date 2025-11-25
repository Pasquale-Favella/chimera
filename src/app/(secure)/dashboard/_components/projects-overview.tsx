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

type ProjectsList = RouterOutputs["projects"]["list"]["items"];

type ProjectsOverviewProps = {
	projects: ProjectsList;
	onSelectProject?: (projectId: string) => void;
	onManageMembers?: (projectId: string) => void;
	page?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
};

export function ProjectsOverview({
	projects,
	onSelectProject,
	onManageMembers,
	page = 1,
	totalPages = 1,
	onPageChange,
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
							Projects
						</Link>
					</CardTitle>
					<CardDescription>
						Overview of every project you can access right now.
					</CardDescription>
				</div>
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
					<div className="rounded-md">
						<Table>
							<TableHeader className="bg-muted/50">
								<TableRow className="hover:bg-muted/50">
									<TableHead className="h-10">Project</TableHead>
									<TableHead className="h-10">Role</TableHead>
									<TableHead className="h-10">Designs</TableHead>
									<TableHead className="h-10">Collaborators</TableHead>
									<TableHead className="h-10 text-right">Last updated</TableHead>
									<TableHead className="h-10 text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{projects.map((project) => (
									<TableRow
										key={project.id}
										className="cursor-pointer hover:bg-muted/50"
										onClick={() => navigateToProject(project.id)}
									>
										<TableCell className="py-3 font-medium">
											<div className="flex flex-col">
												<span>{project.name}</span>
												{project.description && (
													<span className="text-muted-foreground text-sm">
														{project.description}
													</span>
												)}
											</div>
										</TableCell>
										<TableCell className="py-3">
											<Badge variant="outline" className="font-normal">
												{project.currentRole.toLowerCase()}
											</Badge>
										</TableCell>
										<TableCell className="py-3 text-muted-foreground">
											{project._count?.designs ?? 0}
										</TableCell>
										<TableCell className="py-3 text-muted-foreground">
											{project._count?.memberships ?? 0}
										</TableCell>
										<TableCell className="py-3 text-right text-sm text-muted-foreground">
											{formatDistanceToNow(new Date(project.updatedAt), {
												addSuffix: true,
											})}
										</TableCell>
										<TableCell className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
											<RowActions
												projectId={project.id}
												projectName={project.name}
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
					</div>
				)}
			</CardContent>
			{totalPages > 1 && (
				<CardFooter className="flex items-center justify-between border-t px-6 py-4">
					<div className="text-xs text-muted-foreground">
						Page {page} of {totalPages}
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => onPageChange?.(page - 1)}
							disabled={page <= 1}
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous page</span>
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => onPageChange?.(page + 1)}
							disabled={page >= totalPages}
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Next page</span>
						</Button>
					</div>
				</CardFooter>
			)}
		</Card>
	);
}

function RowActions({
	projectId,
	projectName,
	onSelectProject,
	onManageMembers,
}: {
	projectId: string;
	projectName: string;
	onSelectProject?: (projectId: string) => void;
	onManageMembers?: (projectId: string) => void;
}) {
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
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}


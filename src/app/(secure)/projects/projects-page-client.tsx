"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
    LayoutGrid,
    List,
    Plus,
    Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { CreateProjectDialog } from "@/components/create-project-dialog";
import { ProjectCard } from "@/app/(secure)/dashboard/_components/project-card";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/trpc/react";
import { useProjectsPage } from "./hooks/use-projects-page";
import { DeleteProjectDialog } from "@/app/(secure)/dashboard/_components/delete-project-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProjectsPageClient() {
    const router = useRouter();
    const {
        viewMode,
        setViewMode,
        search,
        setSearch,
        page,
        setPage,
        limit,
    } = useProjectsPage();

    const debouncedSearch = useDebounce(search, 500);

    const [projectsData] = api.projects.list.useSuspenseQuery({
        page,
        limit,
        search: debouncedSearch,
    });

    const { items: projects, totalPages } = projectsData;

    const navigateToProject = (projectId: string, hash?: string) => {
        if (hash) {
            router.push(`/projects/${projectId}${hash}`);
            return;
        }
        router.push(`/projects/${projectId}`);
    };

    return (
        <div className="flex flex-1 flex-col gap-8 p-8 pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1.5">
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground text-lg">
                        Manage and organize your creative work.
                    </p>
                </div>
                <CreateProjectDialog>
                    <Button size="lg" className="shadow-sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Button>
                </CreateProjectDialog>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-card p-2 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        className="border-0 bg-transparent pl-9 focus-visible:ring-0 shadow-none"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <div className="flex items-center gap-2 px-2">
                    <div className="h-4 w-[1px] bg-border mx-2 hidden sm:block" />
                    <div className="flex items-center gap-1">
                        <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 px-2 lg:px-3"
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4 lg:mr-2" />
                            <span className="sr-only lg:not-sr-only">Grid</span>
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 px-2 lg:px-3"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4 lg:mr-2" />
                            <span className="sr-only lg:not-sr-only">List</span>
                        </Button>
                    </div>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-16 text-center animate-in fade-in-50 zoom-in-95 duration-500">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-6">
                        <LayoutGrid className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">No projects found</h3>
                    <p className="mb-8 mt-2 text-muted-foreground max-w-sm mx-auto">
                        {search
                            ? "We couldn't find any projects matching your search. Try adjusting your terms."
                            : "Get started by creating your first project. It's where your creative journey begins."}
                    </p>
                    {!search && (
                        <CreateProjectDialog>
                            <Button size="lg" className="shadow-sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Project
                            </Button>
                        </CreateProjectDialog>
                    )}
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="transition-all duration-300 hover:-translate-y-1"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <ProjectCard
                                project={project}
                                onSelectProject={(pid) => navigateToProject(pid)}
                                onManageMembers={(pid) => navigateToProject(pid, "#team")}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <Card className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700 py-0">
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
                                            <ProjectRowActions
                                                projectId={project.id}
                                                projectName={project.name}
                                                isOwner={project.currentRole === "OWNER"}
                                                onSelectProject={() => navigateToProject(project.id)}
                                                onManageMembers={() => navigateToProject(project.id, "#team")}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {totalPages > 1 && (
                <div className="mt-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page > 1) setPage(page - 1);
                                    }}
                                    aria-disabled={page <= 1}
                                    className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {/* Logic to show page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                                // Simple logic for now: show all if <= 7, otherwise show start, end, and around current
                                const showPage =
                                    totalPages <= 7 ||
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= page - 1 && pageNum <= page + 1);

                                if (!showPage) {
                                    if (pageNum === 2 || pageNum === totalPages - 1) {
                                        return (
                                            <PaginationItem key={pageNum}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }
                                    return null;
                                }

                                return (
                                    <PaginationItem key={pageNum}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === pageNum}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPage(pageNum);
                                            }}
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page < totalPages) setPage(page + 1);
                                    }}
                                    aria-disabled={page >= totalPages}
                                    className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}

function ProjectRowActions({
    projectId,
    projectName,
    isOwner,
    onSelectProject,
    onManageMembers,
}: {
    projectId: string;
    projectName: string;
    isOwner: boolean;
    onSelectProject: () => void;
    onManageMembers: () => void;
}) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <div className="flex items-center justify-end gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                        <span className="sr-only">Project actions</span>
                        ⋮
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onSelectProject}>
                        View project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onManageMembers}>
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

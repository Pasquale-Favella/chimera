"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
    List,
    Plus,
    Search,
    SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
import { CreateProjectDialog } from "@/components/create-project-dialog";
import { ProjectCard } from "@/app/(secure)/dashboard/_components/project-card";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

export function ProjectsPageClient() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

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
                        className="border-0 bg-transparent pl-9 focus-visible:ring-0"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // Reset page on search
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
                <div className="rounded-md border animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                                    <span className="sr-only">Project actions</span>
                                                    ⋮
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem onClick={() => navigateToProject(project.id)}>
                                                    View project
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigateToProject(project.id, "#team")}>
                                                    Manage members
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => navigator.clipboard.writeText(project.name)}
                                                >
                                                    Copy name
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                        Page {page} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage(page - 1)}
                            disabled={page <= 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous page</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next page</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

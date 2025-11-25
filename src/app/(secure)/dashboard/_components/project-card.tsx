"use client";

import { formatDistanceToNow } from "date-fns";
import { MoreVertical, Users, Layout } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RouterOutputs } from "@/trpc/react";

type Project = RouterOutputs["projects"]["list"]["items"][number];

type ProjectCardProps = {
    project: Project;
    onSelectProject?: (projectId: string) => void;
    onManageMembers?: (projectId: string) => void;
};

export function ProjectCard({
    project,
    onSelectProject,
    onManageMembers,
}: ProjectCardProps) {
    const makeHandler = (cb?: (pid: string) => void) => () => {
        cb?.(project.id);
    };

    return (
        <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle className="line-clamp-1 text-base">
                            {project.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                            {project.description || "No description provided."}
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="-mr-2 -mt-2 h-8 w-8 text-muted-foreground"
                            >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={makeHandler(onSelectProject)}>
                                Open project
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={makeHandler(onManageMembers)}>
                                Manage members
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(project.name)}
                            >
                                Copy name
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Layout className="h-4 w-4" />
                        <span>{project._count?.designs ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project._count?.memberships ?? 0}</span>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs font-normal">
                        {project.currentRole.toLowerCase()}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter className="mt-auto border-t px-6 py-3">
                <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                    <span>
                        Updated{" "}
                        {formatDistanceToNow(new Date(project.updatedAt), {
                            addSuffix: true,
                        })}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-mr-2 h-auto px-2 py-1 text-xs hover:bg-transparent hover:text-primary"
                        onClick={makeHandler(onSelectProject)}
                    >
                        Open
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

'use client';

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProjectRole } from "generated/prisma/enums";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";

type Project = RouterOutputs["projects"]["getById"];

type ProjectHeaderProps = {
    project: Project;
    currentRole: ProjectRole;
};

const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
    description: z.string().trim().max(500, "Description is too long").optional(),
});

export function ProjectHeader({ project, currentRole }: ProjectHeaderProps) {
    const utils = api.useUtils();
    const [isOpen, setIsOpen] = useState(false);
    const canEdit = currentRole === ProjectRole.OWNER;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: project.name,
            description: project.description || "",
        },
    });

    const updateMutation = api.projects.update.useMutation({
        onSuccess: async () => {
            toast.success("Project updated successfully");
            setIsOpen(false);
            await utils.projects.getById.invalidate({ projectId: project.id });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update project");
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateMutation.mutate({
            projectId: project.id,
            name: values.name,
            description: values.description || null,
        });
    };

    return (
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
                        {formatDistanceToNow(new Date(project.updatedAt), {
                            addSuffix: true,
                        })}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
                    {canEdit && (
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit project</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Project</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your project details here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Project name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Project description (optional)"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button type="submit" disabled={updateMutation.isPending}>
                                                {updateMutation.isPending && (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
                {project.description && (
                    <p className="text-muted-foreground">{project.description}</p>
                )}
            </div>
        </div>
    );
}


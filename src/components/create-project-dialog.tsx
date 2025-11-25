"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IconCirclePlusFilled } from "@tabler/icons-react";

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
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { api } from "@/trpc/react";

const formSchema = z.object({
    name: z.string().trim().min(1, "Project name is required").max(120),
    description: z
        .string()
        .trim()
        .max(500, "Description is too long")
        .optional()
        .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateProjectDialog({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const utils = api.useUtils();
    const router = useRouter();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onChange",
    });

    const createProject = api.projects.create.useMutation({
        onSuccess: async (project) => {
            await utils.projects.invalidate();
            await utils.designs.invalidate();
            form.reset();
            setOpen(false);
            router.push(`/projects/${project.id}`);
        },
    });

    const onSubmit = (values: FormValues) => {
        createProject.mutate({
            name: values.name.trim(),
            description: values.description?.trim().length
                ? values.description.trim()
                : undefined,
        });
    };

    const isDisabled = createProject.isPending || !form.formState.isValid;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ?? (
                    <SidebarMenuButton
                        tooltip="Quick Create"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                    >
                        <IconCirclePlusFilled />
                        <span>Quick Create</span>
                    </SidebarMenuButton>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to start designing.
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
                                        <Input
                                            placeholder="Project name"
                                            disabled={createProject.isPending}
                                            {...field}
                                        />
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
                                            placeholder="Optional description"
                                            rows={3}
                                            disabled={createProject.isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isDisabled}>
                                {createProject.isPending ? "Creating..." : "Create Project"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

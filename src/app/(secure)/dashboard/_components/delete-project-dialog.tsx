"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteProjectDialogProps = {
    projectId: string;
    projectName: string;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onDeleteSuccess?: () => void;
};

export function DeleteProjectDialog({
    projectId,
    projectName,
    children,
    open,
    onOpenChange,
    onDeleteSuccess,
}: DeleteProjectDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const utils = api.useUtils();

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

    const { mutate: deleteProject, isPending } = api.projects.delete.useMutation({
        onSuccess: () => {
            toast.success("Project deleted successfully");
            utils.projects.invalidate();
            utils.designs.invalidate();
            setIsOpen?.(false);
            onDeleteSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project{" "}
                        <strong>{projectName}</strong> and all of its designs.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            deleteProject({ projectId });
                        }}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

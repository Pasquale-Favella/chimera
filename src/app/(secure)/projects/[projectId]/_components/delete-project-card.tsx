"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeleteProjectDialog } from "@/app/(secure)/dashboard/_components/delete-project-dialog";
import { useRouter } from "next/navigation";

type DeleteProjectCardProps = {
    projectId: string;
    projectName: string;
};

export function DeleteProjectCard({
    projectId,
    projectName,
}: DeleteProjectCardProps) {
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <Card className="border-destructive">
            <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <h3 className="font-semibold text-destructive">Delete Project</h3>
                    <p className="text-sm text-muted-foreground">
                        Permanently delete this project and all of its contents. This action
                        cannot be undone.
                    </p>
                </div>
                <DeleteProjectDialog
                    projectId={projectId}
                    projectName={projectName}
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    onDeleteSuccess={() => router.push("/projects")}
                >
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Project
                    </Button>
                </DeleteProjectDialog>
            </div>
        </Card>
    );
}

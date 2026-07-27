'use client';

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ProjectRole } from "generated/prisma/enums";

const roleLabels: Record<ProjectRole, string> = {
    [ProjectRole.OWNER]: "Owner",
    [ProjectRole.EDITOR]: "Editor",
    [ProjectRole.VIEWER]: "Viewer",
};

export function InviteCollaboratorDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [openUserCombobox, setOpenUserCombobox] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{
        id: string;
        email: string;
        name: string | null;
        image: string | null;
    } | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");
    const [shareRole, setShareRole] = useState<ProjectRole>(ProjectRole.VIEWER);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: projects, isLoading: isLoadingProjects } =
        api.projects.listOwned.useQuery(undefined, {
            enabled: isOpen,
        });

    const { data: searchResults, isLoading: isSearching } = api.user.search.useQuery(
        { query: searchQuery },
        { enabled: searchQuery.length >= 2 }
    );

    const upsertMutation = api.projectMemberships.upsert.useMutation({
        onSuccess: () => {
            toast.success("Invitation sent successfully");
            setIsOpen(false);
            resetForm();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to send invitation");
        },
    });

    const resetForm = () => {
        setSelectedUser(null);
        setSelectedProjectId("");
        setShareRole(ProjectRole.VIEWER);
        setSearchQuery("");
    };

    const handleInvite = () => {
        if (!selectedUser || !selectedProjectId) return;
        upsertMutation.mutate({
            projectId: selectedProjectId,
            email: selectedUser.email,
            role: shareRole,
        });
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetForm();
            }}
        >
            <DialogTrigger asChild>
                <Button size="lg">Invite collaborator</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Collaborator</DialogTitle>
                    <DialogDescription>
                        Invite a team member to collaborate on one of your projects.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm font-medium">Project</label>
                        <Select
                            value={selectedProjectId}
                            onValueChange={setSelectedProjectId}
                            disabled={isLoadingProjects}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects?.map((project) => (
                                    <SelectItem key={project.id} value={project.id}>
                                        {project.name}
                                    </SelectItem>
                                ))}
                                {projects?.length === 0 && (
                                    <div className="p-2 text-sm text-muted-foreground text-center">
                                        No owned projects found.
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">User</label>
                        <Popover open={openUserCombobox} onOpenChange={setOpenUserCombobox}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openUserCombobox}
                                    className="justify-between"
                                >
                                    {selectedUser ? (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={selectedUser.image ?? undefined} />
                                                <AvatarFallback>
                                                    {selectedUser.name?.slice(0, 2).toUpperCase() ?? "??"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{selectedUser.name || selectedUser.email}</span>
                                        </div>
                                    ) : (
                                        "Select user..."
                                    )}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                <Command shouldFilter={false}>
                                    <CommandInput
                                        placeholder="Search name or email..."
                                        value={searchQuery}
                                        onValueChange={setSearchQuery}
                                    />
                                    <CommandList>
                                        {isSearching && (
                                            <div className="flex items-center justify-center p-4">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </div>
                                        )}
                                        {!isSearching && searchQuery.length < 2 && (
                                            <div className="p-4 text-sm text-muted-foreground text-center">
                                                Type at least 2 characters to search...
                                            </div>
                                        )}
                                        {!isSearching &&
                                            searchQuery.length >= 2 &&
                                            searchResults?.length === 0 && (
                                                <CommandEmpty>No user found.</CommandEmpty>
                                            )}
                                        <CommandGroup>
                                            {searchResults?.map((user) => (
                                                <CommandItem
                                                    key={user.id}
                                                    value={user.id}
                                                    onSelect={() => {
                                                        setSelectedUser(user);
                                                        setOpenUserCombobox(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedUser?.id === user.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={user.image ?? undefined} />
                                                            <AvatarFallback>
                                                                {user.name?.slice(0, 2).toUpperCase() ?? "??"}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span>{user.name}</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {user.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Role</label>
                        <Select
                            value={shareRole}
                            onValueChange={(value) => setShareRole(value as ProjectRole)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ProjectRole).map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {roleLabels[role]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleInvite}
                        disabled={
                            !selectedUser || !selectedProjectId || upsertMutation.isPending
                        }
                    >
                        {upsertMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send Invite
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


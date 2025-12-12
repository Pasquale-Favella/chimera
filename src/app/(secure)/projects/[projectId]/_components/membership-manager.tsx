'use client';

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { ProjectRole } from "../../../../../../generated/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import type { RouterOutputs } from "@/trpc/react";

type Membership = RouterOutputs["projectMemberships"]["list"][number];

type MembershipManagerProps = {
	projectId: string;
	currentUserId: string;
	currentRole: ProjectRole;
	memberships: Membership[];
};

const roleLabels: Record<ProjectRole, string> = {
	[ProjectRole.OWNER]: "Owner",
	[ProjectRole.EDITOR]: "Editor",
	[ProjectRole.VIEWER]: "Viewer",
};

export function MembershipManager({
	projectId,
	currentUserId,
	currentRole,
	memberships,
}: MembershipManagerProps) {
	const utils = api.useUtils();
	const [isInviteOpen, setIsInviteOpen] = useState(false);
	const [openCombobox, setOpenCombobox] = useState(false);
	const [selectedUser, setSelectedUser] = useState<{
		id: string;
		email: string;
		name: string | null;
		image: string | null;
	} | null>(null);
	const [shareRole, setShareRole] = useState<ProjectRole>(ProjectRole.VIEWER);
	const [searchQuery, setSearchQuery] = useState("");

	const canManage = currentRole === ProjectRole.OWNER;

	const { data: searchResults, isLoading: isSearching } = api.user.search.useQuery(
		{ query: searchQuery },
		{ enabled: searchQuery.length >= 2 }
	);

	const upsertMutation = api.projectMemberships.upsert.useMutation({
		onSuccess: async () => {
			toast.success("Invitation sent successfully");
			setIsInviteOpen(false);
			setSelectedUser(null);
			setSearchQuery("");
			await utils.projectMemberships.list.invalidate({ projectId });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to send invitation");
		},
	});

	const updateRoleMutation = api.projectMemberships.updateRole.useMutation({
		onSuccess: async () => {
			toast.success("Role updated successfully");
			await utils.projectMemberships.list.invalidate({ projectId });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update role");
		},
	});

	const removeMutation = api.projectMemberships.remove.useMutation({
		onSuccess: async () => {
			toast.success("Member removed successfully");
			await utils.projectMemberships.list.invalidate({ projectId });
		},
		onError: (error) => {
			toast.error(error.message || "Failed to remove member");
		},
	});

	const handleInvite = () => {
		if (!selectedUser) return;
		upsertMutation.mutate({
			projectId,
			email: selectedUser.email,
			role: shareRole,
		});
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<div className="space-y-1">
					<CardTitle>Team & access</CardTitle>
					<CardDescription>
						Manage who can collaborate on this project.
					</CardDescription>
				</div>
				{canManage && (
					<Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
						<DialogTrigger asChild>
							<Button size="sm">
								<UserPlus className="mr-2 h-4 w-4" />
								Invite Member
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Invite Team Member</DialogTitle>
								<DialogDescription>
									Search for a user to invite to this project.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="flex flex-col gap-2">
									<label className="text-sm font-medium">User</label>
									<Popover open={openCombobox} onOpenChange={setOpenCombobox}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={openCombobox}
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
																	setOpenCombobox(false);
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
									disabled={!selectedUser || upsertMutation.isPending}
								>
									{upsertMutation.isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Send Invite
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}
			</CardHeader>
			<CardContent className="space-y-4">
				{memberships.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No members have been added to this project yet.
					</p>
				) : (
					<div className="space-y-2">
						{memberships.map((membership) => {
							const isSelf = membership.userId === currentUserId;
							const canEditRole = canManage && !isSelf;
							const canRemove = canManage && !isSelf;

							return (
								<div
									key={membership.id}
									className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
								>
									<div className="flex items-center gap-3">
										<Avatar className="h-10 w-10">
											{membership.user?.image ? (
												<img
													src={membership.user.image}
													alt={membership.user.name ?? ""}
													className="h-full w-full rounded-full object-cover"
												/>
											) : (
												<AvatarFallback>
													{membership.user?.name?.slice(0, 2).toUpperCase() ??
														membership.user?.email?.slice(0, 2).toUpperCase() ??
														"??"}
												</AvatarFallback>
											)}
										</Avatar>
										<div>
											<p className="font-medium">
												{membership.user?.name ??
													membership.user?.email ??
													"Unknown member"}
											</p>
											<p className="text-xs text-muted-foreground">
												{membership.user?.email}
											</p>
										</div>
									</div>
									<div className="flex flex-col gap-2 sm:items-end">
										<Select
											disabled={
												!canEditRole ||
												(updateRoleMutation.isPending &&
													updateRoleMutation.variables?.membershipId === membership.id)
											}
											value={membership.role}
											onValueChange={(value) =>
												updateRoleMutation.mutate({
													projectId,
													membershipId: membership.id,
													role: value as ProjectRole,
												})
											}
										>
											<SelectTrigger className="w-36">
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
										<div className="flex items-center gap-2">
											<Badge variant={isSelf ? "outline" : "secondary"}>
												{isSelf ? "You" : roleLabels[membership.role]}
											</Badge>
											{canRemove && (
												<Button
													variant="ghost"
													size="sm"
													disabled={
														removeMutation.isPending &&
														removeMutation.variables?.membershipId === membership.id
													}
													onClick={() =>
														removeMutation.mutate({
															projectId,
															membershipId: membership.id,
														})
													}
												>
													{removeMutation.isPending &&
														removeMutation.variables?.membershipId === membership.id ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														"Remove"
													)}
												</Button>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

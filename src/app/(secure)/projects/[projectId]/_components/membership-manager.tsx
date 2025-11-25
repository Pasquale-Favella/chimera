'use client';

import { useState } from "react";

import { ProjectRole } from "../../../../../../generated/prisma";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
	const [email, setEmail] = useState("");
	const [shareRole, setShareRole] = useState<ProjectRole>(ProjectRole.VIEWER);
	const canManage = currentRole === ProjectRole.OWNER;

	const upsertMutation = api.projectMemberships.upsert.useMutation({
		onSuccess: async () => {
			setEmail("");
			await utils.projectMemberships.list.invalidate({ projectId });
		},
	});

	const updateRoleMutation = api.projectMemberships.updateRole.useMutation({
		onSuccess: async () => {
			await utils.projectMemberships.list.invalidate({ projectId });
		},
	});

	const removeMutation = api.projectMemberships.remove.useMutation({
		onSuccess: async () => {
			await utils.projectMemberships.list.invalidate({ projectId });
		},
	});

	const handleInvite = () => {
		if (!email.trim()) return;
		upsertMutation.mutate({
			projectId,
			email: email.trim().toLowerCase(),
			role: shareRole,
		});
	};

	return (
		<Card>
			<CardHeader className="gap-1">
				<CardTitle>Team & access</CardTitle>
				<CardDescription>
					Manage who can collaborate on this project. Owners can invite teammates, update roles, and remove
					access.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{memberships.length === 0 ? (
					<p className="text-sm text-muted-foreground">No members have been added to this project yet.</p>
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
												{membership.user?.name ?? membership.user?.email ?? "Unknown member"}
											</p>
											<p className="text-xs text-muted-foreground">{membership.user?.email}</p>
										</div>
									</div>
									<div className="flex flex-col gap-2 sm:items-end">
										<Select
											disabled={!canEditRole}
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
													onClick={() =>
														removeMutation.mutate({
															projectId,
															membershipId: membership.id,
														})
													}
												>
													Remove
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
			{canManage && (
				<>
					<Separator />
					<CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-end">
						<div className="flex-1">
							<label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
								Invite by email
							</label>
							<Input
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="teammate@example.com"
								className="mt-2"
								type="email"
							/>
						</div>
						<div className="flex flex-1 flex-col gap-2 sm:max-w-[180px]">
							<label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
								Role
							</label>
							<Select value={shareRole} onValueChange={(value) => setShareRole(value as ProjectRole)}>
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
						<Button
							className={cn("w-full sm:w-auto")}
							disabled={!email.trim() || upsertMutation.isPending}
							onClick={handleInvite}
						>
							{upsertMutation.isPending ? "Sending…" : "Send invite"}
						</Button>
					</CardFooter>
				</>
			)}
		</Card>
	);
}



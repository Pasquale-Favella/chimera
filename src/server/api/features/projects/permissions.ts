import { ProjectRole } from "generated/prisma/enums";
import { TRPCError } from "@trpc/server";
import type { ProtectedContext } from "../../trpc";

export const VIEWER_ACCESS: readonly ProjectRole[] = [
	ProjectRole.VIEWER,
	ProjectRole.EDITOR,
	ProjectRole.OWNER,
] as const;

export const EDITOR_ACCESS: readonly ProjectRole[] = [
	ProjectRole.EDITOR,
	ProjectRole.OWNER,
] as const;

export const OWNER_ACCESS: readonly ProjectRole[] = [ProjectRole.OWNER] as const;

export async function assertProjectAccess(
	ctx: ProtectedContext,
	projectId: string,
	allowedRoles: readonly ProjectRole[] = VIEWER_ACCESS,
) {
	const project = await ctx.db.project.findUnique({
		where: { id: projectId },
		select: { id: true },
	});

	if (!project) {
		throw new TRPCError({ code: "NOT_FOUND", message: "Project not found." });
	}

	const membership = await ctx.db.projectMembership.findUnique({
		where: {
			projectId_userId: {
				projectId,
				userId: ctx.session.user.id,
			},
		},
	});

	if (!membership || !allowedRoles.includes(membership.role)) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You do not have access to this project.",
		});
	}

	return membership;
}

export async function ensureProjectRetainsOwner(
	ctx: ProtectedContext,
	projectId: string,
	excludeMembershipId?: string,
) {
	const owners = await ctx.db.projectMembership.count({
		where: {
			projectId,
			role: ProjectRole.OWNER,
			...(excludeMembershipId
				? {
					NOT: {
						id: excludeMembershipId,
					},
				}
				: undefined),
		},
	});

	if (owners === 0) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "A project must have at least one owner.",
		});
	}
}



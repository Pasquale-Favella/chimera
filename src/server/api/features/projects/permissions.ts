import { ProjectRole } from "generated/prisma/enums";
import { TRPCError } from "@trpc/server";
import type { ProtectedContext } from "../../trpc";
import {
	findProjectOrThrow,
	findProjectMembershipOrThrow,
} from "@/server/lib/project-access";

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
	try {
		await findProjectOrThrow(projectId);
		const membership = await findProjectMembershipOrThrow(
			projectId,
			ctx.session.user.id,
			allowedRoles,
		);
		return membership;
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === "Project not found.") {
				throw new TRPCError({ code: "NOT_FOUND", message: error.message });
			}
			throw new TRPCError({ code: "FORBIDDEN", message: error.message });
		}
		throw error;
	}
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



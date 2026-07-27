import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ProjectRole } from "generated/prisma/enums";

import {
	assertProjectAccess,
	ensureProjectRetainsOwner,
	OWNER_ACCESS,
} from "./permissions";

const baseInput = z.object({
	projectId: z.string().cuid(),
});

const membershipSelect = {
	id: true,
	projectId: true,
	userId: true,
	role: true,
	createdAt: true,
	user: {
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
		},
	},
	invitedBy: {
		select: {
			id: true,
			name: true,
			email: true,
		},
	},
};

export const projectMembershipRouter = createTRPCRouter({
	list: protectedProcedure.input(baseInput).query(async ({ ctx, input }) => {
		await assertProjectAccess(ctx, input.projectId);

		return ctx.db.projectMembership.findMany({
			where: { projectId: input.projectId },
			select: membershipSelect,
			orderBy: [{ role: "desc" }, { createdAt: "asc" }],
		});
	}),

	upsert: protectedProcedure
		.input(
			baseInput
				.extend({
					userId: z.string().optional(),
					email: z.email().optional(),
					role: z.nativeEnum(ProjectRole).default(ProjectRole.VIEWER),
				})
				.refine(
					(data) => Boolean(data.userId || data.email),
					"Provide either a user ID or an email.",
				),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, OWNER_ACCESS);

			let resolvedUserId = input.userId;

			if (!resolvedUserId && input.email) {
				const user = await ctx.db.user.findUnique({
					where: { email: input.email },
					select: { id: true },
				});

				if (!user) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "No user exists with that email.",
					});
				}

				resolvedUserId = user.id;
			}

			if (!resolvedUserId) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Unable to resolve user for the invitation.",
				});
			}

			if (
				resolvedUserId === ctx.session.user.id &&
				input.role !== ProjectRole.OWNER
			) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "You cannot change your own owner role via sharing.",
				});
			}

			const membership = await ctx.db.projectMembership.upsert({
				where: {
					projectId_userId: {
						projectId: input.projectId,
						userId: resolvedUserId,
					},
				},
				update: {
					role: input.role,
					invitedById: ctx.session.user.id,
				},
				create: {
					projectId: input.projectId,
					userId: resolvedUserId,
					role: input.role,
					invitedById: ctx.session.user.id,
				},
				select: membershipSelect,
			});

			return membership;
		}),

	updateRole: protectedProcedure
		.input(
			baseInput.extend({
				membershipId: z.string().cuid(),
				role: z.nativeEnum(ProjectRole),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, OWNER_ACCESS);

			const membership = await ctx.db.projectMembership.findFirst({
				where: {
					id: input.membershipId,
					projectId: input.projectId,
				},
				select: membershipSelect,
			});

			if (!membership) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Membership not found.",
				});
			}

			if (
				membership.userId === ctx.session.user.id &&
				membership.role === ProjectRole.OWNER &&
				input.role !== ProjectRole.OWNER
			) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "You cannot revoke your own ownership.",
				});
			}

			if (
				membership.role === ProjectRole.OWNER &&
				input.role !== ProjectRole.OWNER
			) {
				await ensureProjectRetainsOwner(ctx, input.projectId, membership.id);
			}

			return ctx.db.projectMembership.update({
				where: { id: membership.id },
				data: { role: input.role },
				select: membershipSelect,
			});
		}),

	remove: protectedProcedure
		.input(
			baseInput.extend({
				membershipId: z.string().cuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, OWNER_ACCESS);

			const membership = await ctx.db.projectMembership.findFirst({
				where: {
					id: input.membershipId,
					projectId: input.projectId,
				},
			});

			if (!membership) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Membership not found.",
				});
			}

			if (membership.role === ProjectRole.OWNER) {
				if (membership.userId === ctx.session.user.id) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Use project deletion to remove your own ownership.",
					});
				}

				await ensureProjectRetainsOwner(ctx, input.projectId, membership.id);
			}

			await ctx.db.projectMembership.delete({
				where: { id: membership.id },
			});

			return { success: true };
		}),
});

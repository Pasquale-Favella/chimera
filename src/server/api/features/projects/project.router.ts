import { ProjectRole } from "generated/prisma/enums";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
	EDITOR_ACCESS,
	OWNER_ACCESS,
	VIEWER_ACCESS,
	assertProjectAccess,
} from "./permissions";

const projectIdSchema = z.object({
	projectId: z.string().cuid(),
});

export const projectsRouter = createTRPCRouter({
	list: protectedProcedure
		.input(
			z.object({
				page: z.number().min(1).default(1),
				limit: z.number().min(1).max(50).default(10),
				search: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;
			const skip = (input.page - 1) * input.limit;

			const where: any = {
				OR: [
					{ createdById: userId },
					{
						memberships: {
							some: { userId },
						},
					},
				],
			};

			if (input.search) {
				where.AND = [
					{
						OR: [
							{ name: { contains: input.search } }, // SQLite case-insensitive by default for ASCII, but usually requires specific handling for full case-insensitivity if not configured. Prisma usually handles this with mode: 'insensitive' for Postgres/Mongo, but for SQLite it depends. Let's try basic contains first or add mode: 'insensitive' if supported.
							{ description: { contains: input.search } },
						],
					},
				];
			}

			const [total, projects] = await ctx.db.$transaction([
				ctx.db.project.count({ where }),
				ctx.db.project.findMany({
					where,
					distinct: ["id"],
					include: {
						memberships: {
							where: { userId },
							select: { role: true },
						},
						_count: {
							select: {
								memberships: true,
								designs: true,
							},
						},
					},
					orderBy: { updatedAt: "desc" },
					skip,
					take: input.limit,
				}),
			]);

			const items = projects.map((project) => {
				const { memberships, ...projectData } = project;
				const currentRole =
					memberships[0]?.role ??
					(projectData.createdById === userId
						? ProjectRole.OWNER
						: ProjectRole.VIEWER);

				return {
					...projectData,
					currentRole,
				};
			});

			return {
				items,
				total,
				page: input.page,
				totalPages: Math.ceil(total / input.limit),
			};
		}),

	listOwned: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;
		return ctx.db.project.findMany({
			where: {
				createdById: userId,
			},
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				name: "asc",
			},
		});
	}),

	getStats: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;

		const [projects, uniqueCollaborators] = await Promise.all([
			ctx.db.project.findMany({
				where: {
					OR: [
						{ createdById: userId },
						{
							memberships: {
								some: { userId },
							},
						},
					],
				},
				select: {
					createdById: true,
					_count: {
						select: {
							designs: true,
						},
					},
				},
			}),
			ctx.db.projectMembership.findMany({
				where: {
					project: {
						OR: [
							{ createdById: userId },
							{
								memberships: {
									some: { userId },
								},
							},
						],
					},
					userId: { not: userId },
				},
				distinct: ["userId"],
				select: {
					userId: true,
				},
			}),
		]);

		const owned = projects.filter((p) => p.createdById === userId).length;
		const designs = projects.reduce((sum, p) => sum + (p._count?.designs ?? 0), 0);

		return {
			projects: projects.length,
			owned,
			designs,
			collaborators: uniqueCollaborators.length,
		};
	}),

	getById: protectedProcedure.input(projectIdSchema).query(async ({ ctx, input }) => {
		await assertProjectAccess(ctx, input.projectId, VIEWER_ACCESS);

		const project = await ctx.db.project.findUnique({
			where: { id: input.projectId },
			include: {
				memberships: {
					include: {
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
					},
					orderBy: { createdAt: "asc" },
				},
				designs: {
					orderBy: { updatedAt: "desc" },
				},
				_count: {
					select: {
						memberships: true,
						designs: true,
					},
				},
			},
		});

		if (!project) {
			throw new TRPCError({ code: "NOT_FOUND", message: "Project not found." });
		}

		return project;
	}),

	create: protectedProcedure
		.input(
			z.object({
				name: z.string().trim().min(1).max(120),
				description: z.string().trim().max(500).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			return ctx.db.project.create({
				data: {
					name: input.name,
					description: input.description,
					createdBy: { connect: { id: userId } },
					memberships: {
						create: {
							user: { connect: { id: userId } },
							role: ProjectRole.OWNER,
						},
					},
				},
			});
		}),

	update: protectedProcedure
		.input(
			projectIdSchema.extend({
				name: z.string().trim().min(1).max(120).optional(),
				description: z
					.string()
					.trim()
					.max(500)
					.nullable()
					.optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			const data: {
				name?: string;
				description?: string | null;
			} = {};

			if (input.name !== undefined) {
				data.name = input.name;
			}

			if (input.description !== undefined) {
				data.description = input.description;
			}

			return ctx.db.project.update({
				where: { id: input.projectId },
				data,
			});
		}),

	delete: protectedProcedure
		.input(projectIdSchema)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, OWNER_ACCESS);

			return ctx.db.project.delete({
				where: { id: input.projectId },
			});
		}),
});



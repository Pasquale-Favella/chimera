import { Prisma } from "../../../../../generated/prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { PointPosition } from "@/types/design";

import {
	EDITOR_ACCESS,
	VIEWER_ACCESS,
	assertProjectAccess,
} from "../projects/permissions";

const connectionSelect = {
	id: true,
	projectId: true,
	fromDesignId: true,
	toDesignId: true,
	fromPosition: true,
	toPosition: true,
	createdAt: true,
	updatedAt: true,
} satisfies Prisma.DesignConnectionSelect;

const pointPositionSchema = z.enum(["top", "right", "bottom", "left"]);

type ConnectionPositionEnum = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

const connectionPositionMap: Record<PointPosition, ConnectionPositionEnum> = {
	top: "TOP",
	right: "RIGHT",
	bottom: "BOTTOM",
	left: "LEFT",
};

const reverseConnectionPositionMap: Record<
	ConnectionPositionEnum,
	PointPosition
> = {
	TOP: "top",
	RIGHT: "right",
	BOTTOM: "bottom",
	LEFT: "left",
};

function toConnectionPosition(position: PointPosition): ConnectionPositionEnum {
	return connectionPositionMap[position];
}

function fromConnectionPosition(
	position: ConnectionPositionEnum,
): PointPosition {
	return reverseConnectionPositionMap[position] ?? "top";
}

async function ensureDesignBelongsToProject(
	ctx: Parameters<typeof assertProjectAccess>[0],
	projectId: string,
	designId: string,
) {
	const design = await ctx.db.design.findFirst({
		where: { id: designId, projectId },
		select: { id: true },
	});

	if (!design) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Design does not belong to the provided project.",
		});
	}
}

export const designConnectionsRouter = createTRPCRouter({
	listByProject: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, VIEWER_ACCESS);

			const connections = await ctx.db.designConnection.findMany({
				where: { projectId: input.projectId },
				select: connectionSelect,
				orderBy: { createdAt: "desc" },
			});

			return connections.map((connection) => ({
				...connection,
				fromPosition: fromConnectionPosition(connection.fromPosition as ConnectionPositionEnum),
				toPosition: fromConnectionPosition(connection.toPosition as ConnectionPositionEnum),
			}));
		}),

	create: protectedProcedure
		.input(
			z.object({
				projectId: z.string().cuid(),
				fromDesignId: z.string().cuid(),
				toDesignId: z.string().cuid(),
				fromPosition: pointPositionSchema,
				toPosition: pointPositionSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await assertProjectAccess(ctx, input.projectId, EDITOR_ACCESS);

			if (input.fromDesignId === input.toDesignId) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Cannot connect a design to itself.",
				});
			}

			await Promise.all([
				ensureDesignBelongsToProject(
					ctx,
					input.projectId,
					input.fromDesignId,
				),
				ensureDesignBelongsToProject(ctx, input.projectId, input.toDesignId),
			]);

			try {
				const connection = await ctx.db.designConnection.create({
					data: {
						projectId: input.projectId,
						fromDesignId: input.fromDesignId,
						toDesignId: input.toDesignId,
						fromPosition: toConnectionPosition(input.fromPosition),
						toPosition: toConnectionPosition(input.toPosition),
					},
					select: connectionSelect,
				});

				return {
					...connection,
					fromPosition: input.fromPosition,
					toPosition: input.toPosition,
				};
			} catch (error) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (error.code === "P2002") {
						throw new TRPCError({
							code: "CONFLICT",
							message: "This connection already exists.",
						});
					}
				}
				throw error;
			}
		}),

	delete: protectedProcedure
		.input(
			z.object({
				connectionId: z.string().cuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const connection = await ctx.db.designConnection.findUnique({
				where: { id: input.connectionId },
				select: { id: true, projectId: true },
			});

			if (!connection) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Connection not found.",
				});
			}

			await assertProjectAccess(ctx, connection.projectId, EDITOR_ACCESS);

			await ctx.db.designConnection.delete({
				where: { id: input.connectionId },
			});

			return { success: true };
		}),
});


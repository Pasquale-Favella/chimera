import { z } from "zod";
import type { PointPosition } from "@/types/design";
import { Prisma } from "../../../../../generated/prisma/client";

export const designIdSchema = z.object({
	designId: z.string().cuid(),
});

export const positionSchema = z.object({
	x: z.number(),
	y: z.number(),
});

export const sizeSchema = z.object({
	width: z.number(),
	height: z.number(),
});

export const viewModeSchema = z.enum(["DESKTOP", "TABLET", "MOBILE"]);

export const attachedImageSchema = z.object({
	mimeType: z.string(),
	base64: z.string(),
	dataUrl: z.url(),
});

export const promptSchema = z.object({
	projectId: z.string().cuid(),
	prompt: z.string().default(""),
	count: z.number().min(1).max(4).optional(),
	namePrefix: z.string().optional(),
	images: z.array(attachedImageSchema).max(4).optional(),
});

export const designTokensSchema = z.object({
	colors: z.object({
		background: z.array(z.string()),
		text: z.array(z.string()),
		primary: z.array(z.string()),
		border: z.array(z.string()),
	}),
	typography: z.object({
		headingFont: z.string(),
		bodyFont: z.string(),
	}),
	borderRadius: z.array(z.string()),
	boxShadow: z.array(z.string()),
});

export type ConnectionPositionEnum = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

const connectionPositionMap: Record<PointPosition, ConnectionPositionEnum> = {
  top: "TOP",
  right: "RIGHT",
  bottom: "BOTTOM",
  left: "LEFT",
};

const reverseConnectionPositionMap: Record<ConnectionPositionEnum, PointPosition> = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
};

export function toConnectionPosition(position: PointPosition): ConnectionPositionEnum {
  return connectionPositionMap[position];
}

export function fromConnectionPosition(position: ConnectionPositionEnum): PointPosition {
  return reverseConnectionPositionMap[position] ?? "top";
}

export type DesignIdDto = z.infer<typeof designIdSchema>;
export type DesignPositionDto = z.infer<typeof positionSchema>;
export type DesignSizeDto = z.infer<typeof sizeSchema>;
export type DesignViewModeDto = z.infer<typeof viewModeSchema>;
export type AttachedImageDto = z.infer<typeof attachedImageSchema>;
export type GenerateDesignPromptDto = z.infer<typeof promptSchema>;
export type DesignTokensDto = z.infer<typeof designTokensSchema>;

export const connectionSelect = {
  id: true,
  fromDesignId: true,
  toDesignId: true,
  fromPosition: true,
  toPosition: true,
};

export const designSelect = {
  id: true,
  projectId: true,
  name: true,
  description: true,
  data: true,
  html: true,
  position: true,
  size: true,
  viewMode: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  history: true,
  version: true,
  tokens: true,
};

export function toJsonInput(
  value: unknown,
): typeof Prisma.JsonNull | Prisma.InputJsonValue {
  if (value === undefined || value === null) {
    return Prisma.JsonNull;
  }

  return value as Prisma.InputJsonValue;
}

export function normalizeHistory(history: unknown): string[] {
  if (Array.isArray(history)) {
    return history.filter((item): item is string => typeof item === "string");
  }
  return [];
}

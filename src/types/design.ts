import type { RouterOutputs } from "@/trpc/react";

export type {
	GenerationMode,
	PointPosition,
	DesignViewMode,
	DesignPosition,
	DesignSize,
	ConnectionPoint,
	DesignTokens,
	AttachedImage,
	GeneratedDesign,
	ModifiedDesign,
	FlowDesign,
	FlowConnection,
	GeneratedFlow,
} from "./shared";

import type {
	DesignPosition,
	DesignSize,
	DesignViewMode,
	DesignTokens,
	ConnectionPoint,
	PointPosition,
} from "./shared";

// Base type from Prisma/RouterOutputs
export type DbDesign = RouterOutputs["designs"]["listByProject"][number];
export type DbConnection = RouterOutputs["designConnections"]["listByProject"][number];

// Normalized client-side Design type based on DbDesign
export type Design = Omit<DbDesign, "viewMode" | "position" | "size" | "history" | "tokens" | "interactiveSelectorsCache"> & {
	viewMode: DesignViewMode; // Normalized from "PREVIEW" | "CODE" to "preview" | "code"
	position: DesignPosition; // Parsed from Json
	size: DesignSize; // Parsed from Json
	history?: string[]; // Parsed from Json
	tokens?: DesignTokens | null; // Parsed from Json

	isApplyingStyle?: boolean; // Client-side only field
};

// Normalized client-side Connection type based on DbConnection
export type Connection = {
	id: string;
	from: ConnectionPoint;
	to: ConnectionPoint;
};

export interface DesignFlow {
	designs: (Omit<Design, "id" | "position" | "size" | "viewMode"> & {
		id: string;
	})[];
	connections: {
		from: string;
		to: string;
		fromPosition: PointPosition;
		toPosition: PointPosition;
	}[];
}


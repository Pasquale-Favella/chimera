import type { RouterOutputs } from "@/trpc/react";

export type {
	AttachedImage,
	ConnectionPoint,
	DesignPosition,
	DesignSize,
	DesignTokens,
	DesignViewMode,
	FlowConnection,
	FlowDesign,
	GeneratedDesign,
	GeneratedFlow,
	GenerationMode,
	ModifiedDesign,
	PointPosition,
} from "./shared";

import type {
	ConnectionPoint,
	DesignPosition,
	DesignSize,
	DesignTokens,
	DesignViewMode,
	PointPosition,
} from "./shared";

// Base type from Prisma/RouterOutputs
export type DbDesign = RouterOutputs["designs"]["listByProject"][number];
export type DbConnection =
	RouterOutputs["designConnections"]["listByProject"][number];

// Normalized client-side Design type based on DbDesign
export type Design = Omit<
	DbDesign,
	| "viewMode"
	| "position"
	| "size"
	| "history"
	| "tokens"
	| "schema"
	| "interactiveSelectorsCache"
> & {
	viewMode: DesignViewMode; // Normalized from "PREVIEW" | "CODE" to "preview" | "code"
	position: DesignPosition; // Parsed from Json
	size: DesignSize; // Parsed from Json
	history?: string[]; // Parsed from Json
	tokens?: DesignTokens | null; // Parsed from Json
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

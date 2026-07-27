import type {
	AttachedImageDto,
	DesignPositionDto,
	DesignSizeDto,
	DesignTokensDto,
} from "@/server/api/features/designs/design.dto";
import type { UINode } from "@/server/lib/schema/ui-node.schema";

export type GenerationMode = "single" | "variations" | "flow";

export type PointPosition = "top" | "right" | "bottom" | "left";

export type DesignViewMode = "preview" | "code";

export type DesignPosition = DesignPositionDto;

export type DesignSize = DesignSizeDto;

export interface ConnectionPoint {
	designId: string;
	position: PointPosition;
}

export type DesignTokens = DesignTokensDto;

export type AttachedImage = AttachedImageDto;

export interface GeneratedDesign {
	html: string;
	description: string;
	schema: UINode | null;
}

export interface ModifiedDesign {
	id: string;
	html: string;
}

export interface FlowDesign {
	id: string;
	html: string;
	description: string;
	schema: UINode | null;
}

export interface FlowConnection {
	from: string;
	to: string;
	fromPosition: PointPosition;
	toPosition: PointPosition;
}

export interface GeneratedFlow {
	designs: FlowDesign[];
	connections: FlowConnection[];
}
// Design System Context Types
export interface DesignSystemColors {
	primary: string;
	secondary: string;
	background: string;
	foreground: string;
	muted: string;
	mutedForeground: string;
	border: string;
	input: string;
	ring: string;
	[key: string]: string;
}

export interface DesignSystemTypography {
	fontFamily: string;
	headingFont?: string;
	bodyFont?: string;
	baseSize?: string;
	scale?: number;
	[key: string]: any;
}

export interface DesignSystemSpacing {
	base: number;
	scale: number;
	[key: string]: any;
}

export interface DesignSystemRadius {
	small: string;
	medium: string;
	large: string;
	[key: string]: string;
}

export interface DesignSystemContext {
	colors: DesignSystemColors;
	typography: DesignSystemTypography;
	spacing: DesignSystemSpacing;
	radius: DesignSystemRadius;
}

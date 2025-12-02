import type {
    AttachedImageDto,
    DesignPositionDto,
    DesignSizeDto,
    DesignTokensDto,
} from "@/server/api/features/designs/design.dto";

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
}

export interface ModifiedDesign {
    id: string;
    html: string;
}

export interface FlowDesign {
    id: string;
    html: string;
    description: string;
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

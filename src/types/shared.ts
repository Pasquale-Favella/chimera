export type GenerationMode = "single" | "variations" | "flow";

export type PointPosition = "top" | "right" | "bottom" | "left";

export type DesignViewMode = "preview" | "code";

export interface DesignPosition {
    x: number;
    y: number;
}

export interface DesignSize {
    width: number;
    height: number;
}

export interface ConnectionPoint {
    designId: string;
    position: PointPosition;
}

export interface DesignTokens {
    colors: {
        background: string[];
        text: string[];
        primary: string[];
        border: string[];
    };
    typography: {
        headingFont: string;
        bodyFont: string;
    };
    borderRadius: string[];
    boxShadow: string[];
}

export interface AttachedImage {
    base64: string;
    mimeType: string;
    dataUrl: string; // For easy previewing in an <img> tag
}

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

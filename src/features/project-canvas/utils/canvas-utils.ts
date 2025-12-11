import type {
    Connection,
    DbConnection,
    DbDesign,
    Design,
    DesignTokens,
    PointPosition,
} from "@/types/design";

const DEFAULT_SIZE = { width: 480, height: 320 };
const DEFAULT_POSITION = { x: 0, y: 0 };

const getJsonVector = (
    value: unknown,
    fallback: { x: number; y: number },
): { x: number; y: number } => {
    if (!value || typeof value !== "object") return fallback;
    const maybe = value as { x?: unknown; y?: unknown };
    const x = typeof maybe.x === "number" ? maybe.x : fallback.x;
    const y = typeof maybe.y === "number" ? maybe.y : fallback.y;
    return { x, y };
};

const getJsonSize = (
    value: unknown,
    fallback: { width: number; height: number },
): { width: number; height: number } => {
    if (!value || typeof value !== "object") return fallback;
    const maybe = value as { width?: unknown; height?: unknown };
    const width = typeof maybe.width === "number" ? maybe.width : fallback.width;
    const height = typeof maybe.height === "number" ? maybe.height : fallback.height;
    return { width, height };
};

const mapTokens = (value: unknown): DesignTokens | null => {
    if (!value || typeof value !== "object") return null;
    const maybe = value as any;

    if (!maybe.colors || !maybe.typography) return null;

    return {
        colors: {
            background: Array.isArray(maybe.colors.background) ? maybe.colors.background : [],
            text: Array.isArray(maybe.colors.text) ? maybe.colors.text : [],
            primary: Array.isArray(maybe.colors.primary) ? maybe.colors.primary : [],
            border: Array.isArray(maybe.colors.border) ? maybe.colors.border : [],
        },
        typography: {
            headingFont: typeof maybe.typography.headingFont === 'string' ? maybe.typography.headingFont : '',
            bodyFont: typeof maybe.typography.bodyFont === 'string' ? maybe.typography.bodyFont : '',
        },
        borderRadius: Array.isArray(maybe.borderRadius) ? maybe.borderRadius : [],
        boxShadow: Array.isArray(maybe.boxShadow) ? maybe.boxShadow : [],
    };
};

const normalizeHistory = (value: unknown): string[] => {
    if (!value || !Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
};
export const mapDesign = (record: DbDesign): Design => {
    return {
        ...record,
        id: record.id,
        html: record.html ?? "",
        description: record.description ?? record.name,
        position: getJsonVector(record.position, DEFAULT_POSITION),
        size: getJsonSize(record.size, DEFAULT_SIZE),
        viewMode: "preview",
        history: normalizeHistory(record.history),
        tokens: mapTokens(record.tokens),
    };
};

export const mapConnection = (record: DbConnection): Connection => ({
    id: record.id,
    from: {
        designId: record.fromDesignId,
        position: record.fromPosition as PointPosition,
    },
    to: {
        designId: record.toDesignId,
        position: record.toPosition as PointPosition,
    },
});

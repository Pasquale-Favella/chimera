import { Prisma } from "@prisma/client";

interface Point {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

interface Rect extends Point, Size { }

const DEFAULT_GAP = 50;
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;

/**
 * Helper to parse position from Prisma JSON
 */
function parsePosition(pos: any): Point | null {
    if (!pos || typeof pos !== "object") return null;
    const p = pos as any;
    if (typeof p.x === "number" && typeof p.y === "number") {
        return { x: p.x, y: p.y };
    }
    return null;
}

/**
 * Helper to parse size from Prisma JSON
 */
function parseSize(size: any): Size | null {
    if (!size || typeof size !== "object") return null;
    const s = size as any;
    if (typeof s.width === "number" && typeof s.height === "number") {
        return { width: s.width, height: s.height };
    }
    return null;
}

/**
 * Checks if two rectangles overlap
 */
function doRectsOverlap(a: Rect, b: Rect): boolean {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

/**
 * Calculates the next available position for a new design
 * ensuring it doesn't overlap with existing designs.
 * Tries to place it as close to (0,0) as possible.
 */
export function calculateNextPosition(
    existingDesigns: { position: any; size: any }[],
    newDesignSize: Size = { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
): Point {
    const occupiedRects: Rect[] = [];

    for (const d of existingDesigns) {
        const pos = parsePosition(d.position);
        const size = parseSize(d.size);

        // If a design has no position, we can't really collide with it in a meaningful way on the canvas,
        // or it might be at 0,0. Let's assume if it has position, it's occupied.
        if (pos) {
            occupiedRects.push({
                x: pos.x,
                y: pos.y,
                width: size?.width ?? DEFAULT_WIDTH,
                height: size?.height ?? DEFAULT_HEIGHT,
            });
        }
    }

    // If no existing designs, start at 0,0
    if (occupiedRects.length === 0) {
        return { x: 0, y: 0 };
    }

    // Generate candidate points
    // 1. (0,0)
    // 2. For each rect: (right + gap, y), (x, bottom + gap)
    const candidates: Point[] = [{ x: 0, y: 0 }];

    for (const r of occupiedRects) {
        candidates.push({ x: r.x + r.width + DEFAULT_GAP, y: r.y });
        candidates.push({ x: r.x, y: r.y + r.height + DEFAULT_GAP });
    }

    // Sort candidates by distance from origin
    candidates.sort((a, b) => {
        const distA = a.x * a.x + a.y * a.y;
        const distB = b.x * b.x + b.y * b.y;
        if (distA !== distB) return distA - distB;
        // Tie-breaker: prefer top-left (y then x)
        if (a.y !== b.y) return a.y - b.y;
        return a.x - b.x;
    });

    // Find first valid candidate
    for (const p of candidates) {
        const candidateRect: Rect = {
            x: p.x,
            y: p.y,
            width: newDesignSize.width,
            height: newDesignSize.height,
        };

        let collision = false;
        for (const r of occupiedRects) {
            if (doRectsOverlap(candidateRect, r)) {
                collision = true;
                break;
            }
        }

        if (!collision) {
            return p;
        }
    }

    // Fallback
    const rightMost = occupiedRects.reduce((max, r) => Math.max(max, r.x + r.width), 0);
    return { x: rightMost + DEFAULT_GAP, y: 0 };
}

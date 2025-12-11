import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type {
    AttachedImage,
    Connection,
    ConnectionPoint,
    Design,
    DesignTokens,
    GenerationMode,
    PointPosition,
} from "@/types/design";

// Types
export type InteractionState =
    | {
        type: "drag";
        initialPositions: Map<string, { x: number; y: number }>;
        startX: number;
        startY: number;
        currentX: number;
        currentY: number;
        clickedDesignId: string;
        didDrag: boolean;
    }
    | {
        type: "resize";
        designId: string;
        handle: string;
        startX: number;
        startY: number;
        initialWidth: number;
        initialHeight: number;
        initialX: number;
        initialY: number;
        currentX: number;
        currentY: number;
    }
    | {
        type: "connect";
        from: ConnectionPoint;
        startCoords: { x: number; y: number };
    }
    | { type: "pan"; startX: number; startY: number; initialPan: { x: number; y: number } };

export type StyleClipboardState = { tokens: DesignTokens; sourceDescription: string } | null;

// Atoms
export const designsFamily = atomFamily((projectId: string) => atom<Design[]>([]));
export const connectionsFamily = atomFamily((projectId: string) => atom<Connection[]>([]));
export const selectedDesignIdsFamily = atomFamily((projectId: string) => atom<string[]>([]));
export const selectedConnectionIdFamily = atomFamily((projectId: string) => atom<string | null>(null));
export const hoveredConnectionIdFamily = atomFamily((projectId: string) => atom<string | null>(null));
export const interactionFamily = atomFamily((projectId: string) => atom<InteractionState | null>(null));
export const viewTransformFamily = atomFamily((projectId: string) => atom({ zoom: 1, pan: { x: 0, y: 0 } }));

// Connection Preview State
export const previewConnectionFamily = atomFamily((projectId: string) => atom<{
    start: { x: number; y: number };
    end: { x: number; y: number };
} | null>(null));
export const connectionTargetFamily = atomFamily((projectId: string) => atom<ConnectionPoint | null>(null));

// Clipboard & AI State
export const styleClipboardFamily = atomFamily((projectId: string) => atom<StyleClipboardState>(null));
export const copyingStyleIdFamily = atomFamily((projectId: string) => atom<string | null>(null));
export const promptFamily = atomFamily((projectId: string) => atom(""));
export const generationModeFamily = atomFamily((projectId: string) => atom<GenerationMode>("single"));
export const attachedImagesFamily = atomFamily((projectId: string) => atom<AttachedImage[]>([]));

// Mode State
export const presentationDesignIdFamily = atomFamily((projectId: string) => atom<string | null>(null));
export const prototypeStartIdFamily = atomFamily((projectId: string) => atom<string | null>(null));
export const interactiveSelectorsCacheFamily = atomFamily((projectId: string) => atom<Record<string, { html: string; selectors: Record<string, string | null> }>>({}));

// Derived Atoms
export const renderedDesignsFamily = atomFamily((projectId: string) => atom((get) => {
    const designs = get(designsFamily(projectId));
    const interaction = get(interactionFamily(projectId));
    const selectedDesignIds = get(selectedDesignIdsFamily(projectId));
    const viewTransform = get(viewTransformFamily(projectId));

    if (!interaction) return designs;

    if (interaction.type === "drag" && interaction.didDrag) {
        const dx = (interaction.currentX - interaction.startX) / viewTransform.zoom;
        const dy = (interaction.currentY - interaction.startY) / viewTransform.zoom;

        const idsToUpdate = selectedDesignIds.includes(interaction.clickedDesignId)
            ? selectedDesignIds
            : [interaction.clickedDesignId];

        return designs.map((design) => {
            if (idsToUpdate.includes(design.id)) {
                const initial = interaction.initialPositions.get(design.id);
                if (!initial) return design;
                return {
                    ...design,
                    position: { x: initial.x + dx, y: initial.y + dy },
                };
            }
            return design;
        });
    }

    if (interaction.type === "resize") {
        const dx = (interaction.currentX - interaction.startX) / viewTransform.zoom;
        const dy = (interaction.currentY - interaction.startY) / viewTransform.zoom;

        return designs.map((design) => {
            if (design.id !== interaction.designId) return design;

            let newWidth = interaction.initialWidth;
            let newHeight = interaction.initialHeight;
            let newX = interaction.initialX;
            let newY = interaction.initialY;
            const minSize = 50;

            if (interaction.handle.includes("right")) newWidth = Math.max(minSize, interaction.initialWidth + dx);
            if (interaction.handle.includes("bottom")) newHeight = Math.max(minSize, interaction.initialHeight + dy);
            if (interaction.handle.includes("left")) {
                const potentialWidth = interaction.initialWidth - dx;
                if (potentialWidth < minSize) {
                    newWidth = minSize;
                    newX = interaction.initialX + (interaction.initialWidth - minSize);
                } else {
                    newWidth = potentialWidth;
                    newX = interaction.initialX + dx;
                }
            }
            if (interaction.handle.includes("top")) {
                const potentialHeight = interaction.initialHeight - dy;
                if (potentialHeight < minSize) {
                    newHeight = minSize;
                    newY = interaction.initialY + (interaction.initialHeight - minSize);
                } else {
                    newHeight = potentialHeight;
                    newY = interaction.initialY + dy;
                }
            }
            return {
                ...design,
                size: { width: newWidth, height: newHeight },
                position: { x: newX, y: newY },
            };
        });
    }

    return designs;
}));

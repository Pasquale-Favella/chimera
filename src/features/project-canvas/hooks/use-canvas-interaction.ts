import { useAtom, useAtomValue } from "jotai";
import {
    interactionFamily,
    previewConnectionFamily,
    connectionTargetFamily,
    viewTransformFamily,
    designsFamily,
} from "../stores/canvas-store";
import { useCallback } from "react";
import type { PointPosition } from "@/types/design";
import { useCanvasSelection } from "./use-canvas-selection";
import { useCanvasActions } from "@/features/project-canvas/hooks/use-canvas-actions";
import { useCanvasContainer } from "../contexts/canvas-container-context";

export function useCanvasInteraction(projectId: string) {
    const [interaction, setInteraction] = useAtom(interactionFamily(projectId));
    const [previewConnection, setPreviewConnection] = useAtom(previewConnectionFamily(projectId));
    const [connectionTarget, setConnectionTarget] = useAtom(connectionTargetFamily(projectId));
    const [viewTransform, setViewTransform] = useAtom(viewTransformFamily(projectId));
    const designs = useAtomValue(designsFamily(projectId));

    const { selectedDesignIds, selectDesign } = useCanvasSelection(projectId);
    const { updateDesign, createConnection, pasteStyle, styleClipboard } = useCanvasActions(projectId);
    const { containerRef } = useCanvasContainer();

    const handleInteractionStart = useCallback(
        (
            designId: string,
            type: "drag" | "resize" | "connect" | "pan",
            event: React.MouseEvent,
            details: { handle?: string; position?: PointPosition } = {},
        ) => {
            if (event.button !== 0 && !(type === "pan" && (event.button === 1 || event.altKey))) return;
            if (styleClipboard && type !== "drag" && type !== "pan") {
                event.preventDefault();
                return;
            }

            const setCursor = (cursor: string) => {
                if (typeof document !== "undefined") {
                    document.body.style.cursor = cursor;
                }
            };

            if (type === "pan") {
                setCursor("grabbing");
                setInteraction({
                    type,
                    startX: event.clientX,
                    startY: event.clientY,
                    initialPan: viewTransform.pan,
                });
                return;
            }

            const design = designs.find((d) => d.id === designId);
            if (!design) return;

            if (type === "resize") {
                if (typeof window !== "undefined") {
                    const handleElement = event.target as HTMLElement;
                    const cursor = window.getComputedStyle(handleElement).cursor || "nwse-resize";
                    setCursor(cursor);
                }
                setInteraction({
                    type,
                    designId,
                    handle: details.handle ?? "",
                    startX: event.clientX,
                    startY: event.clientY,
                    initialWidth: design.size.width,
                    initialHeight: design.size.height,
                    initialX: design.position.x,
                    initialY: design.position.y,
                    currentX: event.clientX,
                    currentY: event.clientY,
                });
            } else if (type === "connect" && details.position) {
                setCursor("crosshair");
                selectDesign(designId);
                const from = { designId, position: details.position };
                setInteraction({
                    type,
                    from,
                    startCoords: {
                        x: design.position.x + (details.position === "left" ? 0 : details.position === "right" ? design.size.width : design.size.width / 2),
                        y: design.position.y + (details.position === "top" ? 0 : details.position === "bottom" ? design.size.height : design.size.height / 2),
                    },
                });
            } else if (type === "drag") {
                setCursor("move");
                const initialPositions = new Map<string, { x: number; y: number }>();
                designs.forEach((d) => {
                    initialPositions.set(d.id, d.position);
                });
                setInteraction({
                    type,
                    initialPositions,
                    startX: event.clientX,
                    startY: event.clientY,
                    clickedDesignId: designId,
                    didDrag: false,
                    currentX: event.clientX,
                    currentY: event.clientY,
                });
            }
        },
        [designs, styleClipboard, selectDesign, setInteraction, viewTransform],
    );

    const handleInteractionMove = useCallback(
        (event: React.MouseEvent) => {
            if (!interaction) return;

            const containerRect = containerRef.current?.getBoundingClientRect();
            const offsetX = containerRect?.left || 0;
            const offsetY = containerRect?.top || 0;

            if (interaction.type === "connect") {
                let endCoords;
                const targetDesign = connectionTarget ? designs.find((d) => d.id === connectionTarget.designId) : null;
                if (connectionTarget && targetDesign) {
                    const { x, y } = targetDesign.position;
                    const { width, height } = targetDesign.size;
                    switch (connectionTarget.position) {
                        case "top":
                            endCoords = { x: x + width / 2, y };
                            break;
                        case "right":
                            endCoords = { x: x + width, y: y + height / 2 };
                            break;
                        case "bottom":
                            endCoords = { x: x + width / 2, y: y + height };
                            break;
                        case "left":
                        default:
                            endCoords = { x, y: y + height / 2 };
                            break;
                    }
                } else {
                    endCoords = {
                        x: (event.clientX - offsetX - viewTransform.pan.x) / viewTransform.zoom,
                        y: (event.clientY - offsetY - viewTransform.pan.y) / viewTransform.zoom,
                    };
                }
                setPreviewConnection({ start: interaction.startCoords, end: endCoords });
                return;
            }

            const dxScreen = event.clientX - interaction.startX;
            const dyScreen = event.clientY - interaction.startY;

            if (interaction.type === "pan") {
                setViewTransform((prev) => ({
                    ...prev,
                    pan: { x: interaction.initialPan.x + dxScreen, y: interaction.initialPan.y + dyScreen },
                }));
                return;
            }

            if (interaction.type === "drag") {
                if (!interaction.didDrag && (Math.abs(dxScreen) > 5 || Math.abs(dyScreen) > 5)) {
                    setInteraction((prev) => (prev?.type === "drag" ? { ...prev, didDrag: true } : prev));
                    if (!selectedDesignIds.includes(interaction.clickedDesignId)) {
                        selectDesign(interaction.clickedDesignId);
                    }
                }
                setInteraction(prev => prev?.type === "drag" ? { ...prev, currentX: event.clientX, currentY: event.clientY } : prev);
                return;
            }

            if (interaction.type === "resize") {
                setInteraction(prev => prev?.type === "resize" ? { ...prev, currentX: event.clientX, currentY: event.clientY } : prev);
            }
        },
        [connectionTarget, designs, interaction, selectedDesignIds, viewTransform, selectDesign, setInteraction, setPreviewConnection, setViewTransform],
    );

    const handleInteractionEnd = useCallback(
        (event: React.MouseEvent) => {
            if (!interaction) return;

            if (interaction.type === "drag" && !interaction.didDrag) {
                if (styleClipboard) {
                    pasteStyle(interaction.clickedDesignId);
                } else {
                    selectDesign(interaction.clickedDesignId, event.shiftKey);
                }
            }

            if (interaction.type === "drag" && interaction.didDrag) {
                const idsToUpdate = selectedDesignIds.includes(interaction.clickedDesignId)
                    ? selectedDesignIds
                    : [interaction.clickedDesignId];

                const dx = (interaction.currentX - interaction.startX) / viewTransform.zoom;
                const dy = (interaction.currentY - interaction.startY) / viewTransform.zoom;

                idsToUpdate.forEach((designId) => {
                    const design = designs.find((d) => d.id === designId);
                    if (!design) return;

                    const initial = interaction.initialPositions.get(designId);
                    if (!initial) return;

                    updateDesign({
                        designId,
                        position: { x: initial.x + dx, y: initial.y + dy },
                    });
                });
            }

            if (interaction.type === "resize") {
                const design = designs.find((d) => d.id === interaction.designId);
                if (design) {
                    const dx = (interaction.currentX - interaction.startX) / viewTransform.zoom;
                    const dy = (interaction.currentY - interaction.startY) / viewTransform.zoom;

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

                    updateDesign({
                        designId: design.id,
                        position: { x: newX, y: newY },
                        size: { width: newWidth, height: newHeight },
                    });
                }
            }

            if (interaction.type === "connect" && connectionTarget) {
                const from = interaction.from;
                const to = connectionTarget;

                if (from.designId !== to.designId) {
                    createConnection({
                        projectId,
                        fromDesignId: from.designId,
                        toDesignId: to.designId,
                        fromPosition: from.position,
                        toPosition: to.position,
                    });
                }
            }

            setInteraction(null);
            setPreviewConnection(null);
            if (typeof document !== "undefined") {
                document.body.style.cursor = "default";
            }
        },
        [interaction, styleClipboard, selectedDesignIds, viewTransform, designs, connectionTarget, selectDesign, pasteStyle, updateDesign, createConnection, setInteraction, setPreviewConnection],
    );

    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            if (e.cancelable) e.preventDefault();

            // Always zoom on wheel, regardless of modifier keys
            // Use a sensitivity factor that works for both mouse wheel (delta ~100) and trackpad (delta small)
            // deltaY > 0 is scroll down (zoom out), deltaY < 0 is scroll up (zoom in)
            const sensitivity = 0.001;
            const delta = -e.deltaY;

            setViewTransform((prev) => {
                const newZoom = prev.zoom * (1 + delta * sensitivity);
                return {
                    ...prev,
                    zoom: Math.max(0.1, Math.min(5, newZoom)),
                };
            });
        },
        [setViewTransform]
    );

    return {
        interaction,
        setInteraction,
        previewConnection,
        connectionTarget,
        setConnectionTarget,
        handleInteractionStart,
        handleInteractionMove,
        handleInteractionEnd,
        handleWheel,
    };
}

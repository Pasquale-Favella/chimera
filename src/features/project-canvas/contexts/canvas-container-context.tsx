"use client";

import { createContext, useContext, useRef, useCallback, type RefObject, type ReactNode } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useProjectId } from "./project-id-context";
import { viewTransformFamily, designsFamily } from "../stores/canvas-store";

interface CanvasContainerContextValue {
    containerRef: RefObject<HTMLDivElement | null>;
    zoom: number;
    viewTransform: { zoom: number; pan: { x: number; y: number } };
    setViewTransform: (value: { zoom: number; pan: { x: number; y: number } }) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    fitToScreen: () => void;
}

const CanvasContainerContext = createContext<CanvasContainerContextValue | null>(null);

export function CanvasContainerProvider({ children }: { children: ReactNode }) {
    const projectId = useProjectId();
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewTransform, setViewTransform] = useAtom(viewTransformFamily(projectId));
    const designs = useAtomValue(designsFamily(projectId));

    const zoomIn = useCallback(() => {
        setViewTransform((prev) => ({
            ...prev,
            zoom: Math.min(prev.zoom * 1.2, 5),
        }));
    }, [setViewTransform]);

    const zoomOut = useCallback(() => {
        setViewTransform((prev) => ({
            ...prev,
            zoom: Math.max(prev.zoom / 1.2, 0.1),
        }));
    }, [setViewTransform]);

    const fitToScreen = useCallback(() => {
        if (designs.length === 0 || !containerRef.current) {
            setViewTransform({ zoom: 1, pan: { x: 0, y: 0 } });
            return;
        }

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const padding = 50;

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        designs.forEach((d) => {
            minX = Math.min(minX, d.position.x);
            minY = Math.min(minY, d.position.y);
            maxX = Math.max(maxX, d.position.x + d.size.width);
            maxY = Math.max(maxY, d.position.y + d.size.height);
        });

        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;

        if (contentWidth <= 0 || contentHeight <= 0) return;

        const scaleX = (containerWidth - padding * 2) / contentWidth;
        const scaleY = (containerHeight - padding * 2) / contentHeight;
        const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.1), 2);

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        const newPanX = containerWidth / 2 - centerX * newZoom;
        const newPanY = containerHeight / 2 - centerY * newZoom;

        setViewTransform({
            zoom: newZoom,
            pan: { x: newPanX, y: newPanY },
        });
    }, [designs, setViewTransform]);

    return (
        <CanvasContainerContext.Provider
            value={{
                containerRef,
                zoom: viewTransform.zoom,
                viewTransform,
                setViewTransform,
                zoomIn,
                zoomOut,
                fitToScreen,
            }}
        >
            {children}
        </CanvasContainerContext.Provider>
    );
}

export function useCanvasContainer() {
    const context = useContext(CanvasContainerContext);
    if (!context) {
        throw new Error("useCanvasContainer must be used within a CanvasContainerProvider");
    }
    return context;
}

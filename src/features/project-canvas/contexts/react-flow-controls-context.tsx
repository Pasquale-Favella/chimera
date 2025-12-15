"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useReactFlow } from "@xyflow/react";

interface ReactFlowContextValue {
    zoom: number;
    zoomIn: () => void;
    zoomOut: () => void;
    fitToScreen: () => void;
}

const ReactFlowControlsContext = createContext<ReactFlowContextValue | null>(null);

export function ReactFlowControlsProvider({ children }: { children: ReactNode }) {
    const { zoomIn, zoomOut, fitView, getZoom } = useReactFlow();

    const handleZoomIn = () => {
        zoomIn({ duration: 200 });
    };

    const handleZoomOut = () => {
        zoomOut({ duration: 200 });
    };

    const handleFitToScreen = () => {
        fitView({ padding: 0.1, duration: 300 });
    };

    return (
        <ReactFlowControlsContext.Provider
            value={{
                zoom: getZoom(),
                zoomIn: handleZoomIn,
                zoomOut: handleZoomOut,
                fitToScreen: handleFitToScreen,
            }}
        >
            {children}
        </ReactFlowControlsContext.Provider>
    );
}

export function useReactFlowControls() {
    const context = useContext(ReactFlowControlsContext);
    if (!context) {
        throw new Error("useReactFlowControls must be used within a ReactFlowControlsProvider");
    }
    return context;
}

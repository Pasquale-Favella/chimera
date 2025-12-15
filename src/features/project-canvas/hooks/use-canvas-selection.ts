import { useAtom } from "jotai";
import {
    selectedDesignIdsFamily,
    selectedConnectionIdFamily,
} from "../stores/canvas-store";
import { useCallback } from "react";

export function useCanvasSelection(projectId: string) {
    const [selectedDesignIds, setSelectedDesignIds] = useAtom(selectedDesignIdsFamily(projectId));
    const [selectedConnectionId, setSelectedConnectionId] = useAtom(selectedConnectionIdFamily(projectId));

    const selectDesign = useCallback(
        (designId: string, multiSelect = false) => {
            setSelectedConnectionId(null);
            if (multiSelect) {
                setSelectedDesignIds((prev) => {
                    if (prev.includes(designId)) {
                        return prev.filter((id) => id !== designId);
                    }
                    return [...prev, designId];
                });
            } else {
                setSelectedDesignIds([designId]);
            }
        },
        [setSelectedDesignIds, setSelectedConnectionId],
    );

    const selectConnection = useCallback(
        (connectionId: string) => {
            setSelectedDesignIds([]);
            setSelectedConnectionId((prev) => (prev === connectionId ? null : connectionId));
        },
        [setSelectedDesignIds, setSelectedConnectionId],
    );

    const clearSelection = useCallback(() => {
        setSelectedDesignIds([]);
        setSelectedConnectionId(null);
    }, [setSelectedDesignIds, setSelectedConnectionId]);

    return {
        selectedDesignIds,
        setSelectedDesignIds,
        selectedConnectionId,
        setSelectedConnectionId,
        selectDesign,
        selectConnection,
        clearSelection,
    };
}

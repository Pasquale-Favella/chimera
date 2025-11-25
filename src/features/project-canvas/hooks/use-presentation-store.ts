import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { presentationStateFamily, type PresentationState, type ViewMode, type DeviceSize, type SidebarTab } from '../stores/presentation-store';
import type { AttachedImage, Design, DesignTokens } from '@/types/design';
import type { ElementStyles } from '../components/properties-panel';

export function usePresentationStore(designId: string, initialDesign?: Design) {
    const [state, setState] = useAtom(presentationStateFamily(designId));

    // Initialize state from props if needed
    useEffect(() => {
        if (initialDesign) {
            setState(prev => {
                // Sync if history is empty (first load) OR if the content has changed externally
                if (prev.history.length === 0 || (initialDesign.html && initialDesign.html !== prev.currentHtml)) {
                    return {
                        ...prev,
                        currentHtml: initialDesign.html,
                        history: initialDesign.history || [initialDesign.html],
                        currentHistoryIndex: (initialDesign.history?.length || 1) - 1,
                    }
                }
                return prev;
            });
        }
    }, [designId, initialDesign, setState]);

    const updateState = useCallback((updates: Partial<PresentationState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, [setState]);

    const setViewMode = useCallback((mode: ViewMode) => updateState({ activeView: mode }), [updateState]);
    const setDeviceSize = useCallback((size: DeviceSize) => updateState({ deviceSize: size }), [updateState]);
    const setSelectionMode = useCallback((isActive: boolean) => updateState({ isSelectionModeActive: isActive }), [updateState]);

    const setSelectedElement = useCallback((path: string | null, styles: ElementStyles | null) => {
        updateState({ selectedElementPath: path, selectedElementStyles: styles });
    }, [updateState]);

    const setChatState = useCallback((updates: Partial<Pick<PresentationState, 'chatPrompt' | 'isChatLoading' | 'chatError' | 'attachedImages'>>) => {
        updateState(updates);
    }, [updateState]);

    const setSidebarTab = useCallback((tab: SidebarTab) => updateState({ activeSidebarTab: tab }), [updateState]);

    const updateHistory = useCallback((newHtml: string, newHistory: string[]) => {
        updateState({
            currentHtml: newHtml,
            history: newHistory,
            currentHistoryIndex: newHistory.length - 1
        });
    }, [updateState]);

    const restoreVersion = useCallback((index: number) => {
        setState(prev => {
            const newHtml = prev.history[index];
            if (newHtml) {
                return {
                    ...prev,
                    currentHtml: newHtml,
                    currentHistoryIndex: index
                };
            }
            return prev;
        });
    }, [setState]);

    return {
        state,
        updateState,
        setViewMode,
        setDeviceSize,
        setSelectionMode,
        setSelectedElement,
        setChatState,
        setSidebarTab,
        updateHistory,
        restoreVersion
    };
}

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import type { AttachedImage, DesignTokens } from '@/types/design';
import type { ElementStyles } from '../components/properties-panel';

export type ViewMode = 'preview' | 'code';
export type DeviceSize = 'mobile' | 'tablet' | 'desktop';
export type SidebarTab = 'refine' | 'tokens' | 'history';

export interface PresentationState {
    activeView: ViewMode;
    deviceSize: DeviceSize;
    currentHtml: string;
    history: string[];
    currentHistoryIndex: number;
    isSelectionModeActive: boolean;
    selectedElementPath: string | null;
    selectedElementStyles: ElementStyles | null;
    chatPrompt: string;
    isChatLoading: boolean;
    chatError: string | null;
    attachedImages: AttachedImage[];
    activeSidebarTab: SidebarTab;
    isTokenLoading: boolean;
    extractedComponentHtml: string | null;
    isExtracting: boolean;
}

const initialState: PresentationState = {
    activeView: 'preview',
    deviceSize: 'desktop',
    currentHtml: '',
    history: [],
    currentHistoryIndex: 0,
    isSelectionModeActive: false,
    selectedElementPath: null,
    selectedElementStyles: null,
    chatPrompt: '',
    isChatLoading: false,
    chatError: null,
    attachedImages: [],
    activeSidebarTab: 'refine',
    isTokenLoading: false,
    extractedComponentHtml: null,
    isExtracting: false,
};

// Create a family of atoms, keyed by designId to allow multiple instances if needed (though usually one modal at a time)
// Using a simple atom for now as the modal is likely a singleton in the UI context, 
// but we can scope it if we want to persist state per design ID even when closed.
// For now, let's use a simple atom that we reset on mount/unmount or use a provider.
// Actually, since we want to refactor `presentation-mode.tsx`, let's use a store that can be initialized with props.

// We will use a store created via a hook or context, OR we can use atomFamily keyed by some unique ID (like designId).
// Let's use atomFamily keyed by designId to keep it clean and separated.

export const presentationStateFamily = atomFamily((designId: string) =>
    atom<PresentationState>(initialState)
);

// Derived atoms for easier access/updates if needed, or just use the main atom.
// For simplicity in the refactor, we'll expose the main atom and some helpers in the hook.

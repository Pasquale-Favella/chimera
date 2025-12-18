
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import type {
    DesignSystemColors,
    DesignSystemTypography,
    DesignSystemSpacing,
    DesignSystemRadius
} from '@/types/shared';

export interface DesignSystemState {
    id?: string;
    name: string;
    description?: string;
    colors: DesignSystemColors;
    typography: DesignSystemTypography;
    spacing: DesignSystemSpacing;
    radius: DesignSystemRadius;
    type: string;
    presetName?: string;
}

export const defaultDesignSystem: DesignSystemState = {
    name: "Default System",
    colors: {
        primary: "#0f172a",
        secondary: "#f1f5f9",
        background: "#ffffff",
        foreground: "#0f172a",
        muted: "#f1f5f9",
        mutedForeground: "#64748b",
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#020617",
    },
    typography: {
        fontFamily: "Inter",
        baseSize: "16px",
        scale: 1.25,
    },
    spacing: {
        base: 4,
        scale: 1,
    },
    radius: {
        small: "0.25rem",
        medium: "0.5rem",
        large: "0.75rem",
    },
    type: "custom",
};

export const designSystemFamily = atomFamily((projectId: string) => atom<DesignSystemState>(defaultDesignSystem));

// Atom to track if there are unsaved changes
export const hasUnsavedChangesAtom = atom(false);

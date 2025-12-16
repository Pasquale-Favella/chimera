
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
        primary: "hsl(222.2 47.4% 11.2%)",
        secondary: "hsl(210 40% 96.1%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 47.4% 11.2%)",
        muted: "hsl(210 40% 96.1%)",
        mutedForeground: "hsl(215.4 16.3% 46.9%)",
        border: "hsl(214.3 31.8% 91.4%)",
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(222.2 84% 4.9%)",
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

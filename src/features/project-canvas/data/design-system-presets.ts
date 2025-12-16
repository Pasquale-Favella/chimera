
import type { DesignSystemState } from "../stores/design-system-store";

export const designSystemPresets: Record<string, Partial<DesignSystemState>> = {
    "material-3": {
        name: "Material Design 3",
        description: "Google's latest design system. Playful, adaptable, and accessible.",
        colors: {
            primary: "hsl(262 80% 50%)", // M3 Purple
            secondary: "hsl(262 30% 90%)",
            background: "hsl(270 20% 99%)", // Very subtle tint
            foreground: "hsl(260 10% 10%)",
            muted: "hsl(260 10% 90%)",
            mutedForeground: "hsl(260 5% 45%)",
            border: "hsl(260 10% 85%)",
            input: "hsl(260 10% 94%)", // Filled input style background
            ring: "hsl(262 80% 50%)",
        },
        typography: {
            fontFamily: "Roboto",
            baseSize: "16px",
            scale: 1.25,
            headingFont: "Roboto",
        },
        spacing: { base: 4, scale: 1 },
        radius: {
            small: "0.25rem",   // 4px
            medium: "0.75rem",  // 12px (Cards)
            large: "1.5rem"     // 24px (Buttons/Pills)
        }
    },
    "human-interface": {
        name: "Human Interface (iOS)",
        description: "Apple's system design. Clean, refined, and content-first.",
        colors: {
            primary: "hsl(211 100% 50%)", // SF Blue
            secondary: "hsl(210 20% 96%)",
            background: "hsl(0 0% 100%)",
            foreground: "hsl(0 0% 0%)",
            muted: "hsl(210 10% 96%)",
            mutedForeground: "hsl(210 5% 55%)",
            border: "hsl(210 10% 90%)",
            input: "hsl(210 10% 94%)",
            ring: "hsl(211 100% 50%)",
        },
        typography: {
            fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            baseSize: "17px", // Standard body size on iOS
            scale: 1.2,
            headingFont: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        },
        spacing: { base: 4, scale: 1 },
        radius: {
            small: "0.5rem",   // 8px
            medium: "0.75rem", // 12px
            large: "0.875rem"  // 14px (Standard iOS corner)
        }
    },
    "ant-design": {
        name: "Ant Design",
        description: "Alibaba's enterprise-grade system. Professional and compact.",
        colors: {
            primary: "hsl(210 100% 56%)", // Ant Blue #1677ff
            secondary: "hsl(210 100% 96%)",
            background: "hsl(0 0% 100%)",
            foreground: "hsl(0 0% 0%)", // 85% black usually, approximating
            muted: "hsl(0 0% 96%)",
            mutedForeground: "hsl(0 0% 45%)",
            border: "hsl(220 13% 91%)",
            input: "hsl(0 0% 100%)",
            ring: "hsl(210 100% 85%)",
        },
        typography: {
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            baseSize: "14px", // Ant uses smaller base 14px
            scale: 1.2,
            headingFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        },
        spacing: { base: 4, scale: 1 },
        radius: {
            small: "0.125rem", // 2px
            medium: "0.375rem",// 6px
            large: "0.5rem"    // 8px
        }
    },
    "vercel": {
        name: "Geist / Vercel",
        description: "Minimalist, developer-focused, High contrast.",
        colors: {
            primary: "hsl(0 0% 0%)",
            secondary: "hsl(0 0% 96%)",
            background: "hsl(0 0% 100%)",
            foreground: "hsl(0 0% 0%)",
            muted: "hsl(0 0% 96%)",
            mutedForeground: "hsl(0 0% 40%)",
            border: "hsl(0 0% 90%)",
            input: "hsl(0 0% 100%)",
            ring: "hsl(0 0% 0%)",
        },
        typography: {
            fontFamily: "Inter, sans-serif", // Geist equivalent
            baseSize: "16px",
            scale: 1.25,
            headingFont: "Inter, sans-serif",
        },
        spacing: { base: 4, scale: 1 },
        radius: {
            small: "0.25rem",  // 4px
            medium: "0.375rem",// 6px
            large: "0.5rem"    // 8px
        }
    },
};

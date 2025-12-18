
import type { DesignSystemState } from "../stores/design-system-store";

export const designSystemPresets: Record<string, Partial<DesignSystemState>> = {
    "material-3": {
        name: "Material Design 3",
        description: "Google's latest design system. Playful, adaptable, and accessible.",
        colors: {
            primary: "#6722d6", // M3 Purple
            secondary: "#edeaf5",
            background: "#fdfbfc", // Very subtle tint
            foreground: "#1c1b1d",
            muted: "#e6e5e7",
            mutedForeground: "#767479",
            border: "#dad9db",
            input: "#f0eff1", // Filled input style background
            ring: "#6722d6",
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
            primary: "#007aff", // SF Blue
            secondary: "#f2f4f5",
            background: "#ffffff",
            foreground: "#000000",
            muted: "#f4f5f6",
            mutedForeground: "#8e9297",
            border: "#e1e3e5",
            input: "#eff1f2",
            ring: "#007aff",
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
            primary: "#1677ff", // Ant Blue #1677ff
            secondary: "#e6f4ff",
            background: "#ffffff",
            foreground: "#000000", // 85% black usually, approximating
            muted: "#f5f5f5",
            mutedForeground: "#737373",
            border: "#d9d9d9",
            input: "#ffffff",
            ring: "#b3d4ff",
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
            primary: "#000000",
            secondary: "#f5f5f5",
            background: "#ffffff",
            foreground: "#000000",
            muted: "#f5f5f5",
            mutedForeground: "#666666",
            border: "#e6e6e6",
            input: "#ffffff",
            ring: "#000000",
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

export interface FontOption {
    label: string;
    value: string;
    googleFont?: string; // The canonical name for Google Fonts API (e.g., "Open Sans")
}

export const FONT_OPTIONS: FontOption[] = [
    {
        label: "Inter",
        value: "Inter",
        googleFont: "Inter"
    },
    {
        label: "Inter (Generic)",
        value: "Inter, sans-serif",
        googleFont: "Inter"
    },
    {
        label: "Roboto",
        value: "Roboto",
        googleFont: "Roboto"
    },
    {
        label: "Open Sans",
        value: "Open Sans",
        googleFont: "Open Sans"
    },
    {
        label: "Playfair Display",
        value: "playfair display, serif",
        googleFont: "Playfair Display"
    },
    {
        label: "System Sans (iOS)",
        value: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    },
    {
        label: "System (Ant Design)",
        value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
    },
    {
        label: "System Serif",
        value: "ui-serif, Georgia, serif"
    },
    {
        label: "System Mono",
        value: "ui-monospace, monospace"
    }
];

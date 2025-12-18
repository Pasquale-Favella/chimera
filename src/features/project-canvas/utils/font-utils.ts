import { FONT_OPTIONS } from "../data/font-options";

export function getGoogleFontLink(fontFamily: string): string | null {
    if (!fontFamily) return null;

    // Normalize input string
    const inputFont = fontFamily.toLowerCase();

    // Find a matching font option where the input contains the font value
    // or matches the Google Font name (for direct matches like "Roboto")
    const matchedOption = FONT_OPTIONS.find(option =>
        inputFont.includes(option.value.toLowerCase()) ||
        (option.googleFont && inputFont.includes(option.googleFont.toLowerCase()))
    );

    if (matchedOption?.googleFont) {
        // Create Google Fonts URL
        // Example: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap
        return `https://fonts.googleapis.com/css2?family=${matchedOption.googleFont.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`;
    }

    return null;
}

export function getFontFaceStyle(fontFamily: string): string {
    return `body { font-family: ${fontFamily}; }`;
}

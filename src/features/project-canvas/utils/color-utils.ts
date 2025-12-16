
/**
 * Converts an HSL color string to a Hex color string.
 * Supports formats: 
 * - hsl(222.2 47.4% 11.2%)
 * - 222.2 47.4% 11.2%
 * - hsl(222, 50%, 50%)
 */
export function hslToHex(hsl: string): string {
    // Remove "hsl(", ")", and commas
    const cleanHsl = hsl.replace(/hsl\(|\)|,/g, "").trim();
    const parts = cleanHsl.split(/\s+/).map(p => parseFloat(p));

    if (parts.length < 3) return "#000000"; // Fallback

    let [h, s, l] = parts;

    if (h === undefined || s === undefined || l === undefined) return "#000000";

    // Normalize S and L (if they don't have %, they might be raw 0-1 or 0-100, but CSS usually implies %)
    // However, our regex removed %. 
    // Usually s and l are 0-100 in CSS syntax.
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    // Convert to 0-255 and hex
    const toHex = (n: number) => {
        const hex = Math.round((n + m) * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts a Hex color string to an HSL color string.
 * Returns format: "hsl(H S% L%)"
 */
export function hexToHsl(hex: string): string {
    let r = 0, g = 0, b = 0;

    // Handle 3-char hex
    if (hex.length === 4) {
        r = parseInt("0x" + hex[1] + hex[1]);
        g = parseInt("0x" + hex[2] + hex[2]);
        b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length === 7) {
        r = parseInt("0x" + hex[1] + hex[2]);
        g = parseInt("0x" + hex[3] + hex[4]);
        b = parseInt("0x" + hex[5] + hex[6]);
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin;

    let h = 0, s = 0, l = 0;

    if (delta === 0)
        h = 0;
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `hsl(${h} ${s}% ${l}%)`;
}

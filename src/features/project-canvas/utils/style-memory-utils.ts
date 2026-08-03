/**
 * Style-memory parsing helpers
 * Client-side utilities for reading and manipulating the Mastra working-memory
 * markdown. The template mirrors `STYLE_MEMORY_TEMPLATE` in
 * `src/server/mastra/memory/memory.ts` (kept as a local constant so it can be
 * used in client components without pulling server modules into the bundle).
 */

export const STYLE_MEMORY_TEMPLATE = `# Style Memory

## Brand Summary
- **Product / Purpose**:
- **Audience**:
- **Design Personality**:

## Style Directives
- **Visual Direction**:
- **Layout Principles**:
- **Accessibility Requirements**:
- **Interaction Patterns**:

## Design Tokens
- **Colors**:
  - Primary:
  - Secondary:
  - Accent:
  - Background:
  - Text:
  - Semantic (success/warning/error):
- **Typography**:
  - Font families:
  - Heading styles:
  - Body styles:
- **Spacing**:
- **Border Radius**:
- **Shadows**:

## Notes
- **Current Progress**:
- **Decisions Made**:
- **Open Questions**:
`;

export interface StyleMemoryColor {
	label: string;
	value: string;
}

export interface ParsedStyleMemory {
	summary: string;
	directives: string[];
	notes: string;
	colors: StyleMemoryColor[];
	fonts: string[];
	spacing: string[];
}

const HEX_COLOR = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

/** Non-global variant used only for `test()` checks (avoids lastIndex state). */
const HEX_COLOR_TEST = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;

/** Strips common markdown emphasis markers from a line of text. */
function cleanText(value: string): string {
	return value.replace(/[*_`]/g, "").trim();
}

/**
 * Parses a working-memory markdown string into structured sections. Heuristic
 * and defensive: unknown layouts simply produce empty lists rather than errors.
 */
export function parseStyleMemory(markdown: string | null): ParsedStyleMemory {
	if (!markdown) {
		return {
			summary: "",
			directives: [],
			notes: "",
			colors: [],
			fonts: [],
			spacing: [],
		};
	}

	const sections = new Map<string, string[]>();
	let current = "";

	for (const rawLine of markdown.split("\n")) {
		const line = rawLine.trim();
		const heading = line.match(/^##\s+(.*)$/);
		if (heading) {
			current = cleanText(heading[1] ?? "").toLowerCase();
			if (!sections.has(current)) {
				sections.set(current, []);
			}
			continue;
		}
		if (current && line) {
			sections.get(current)?.push(line);
		}
	}

	const summary = (sections.get("brand summary") ?? [])
		.map((line) => cleanText(line.replace(/^-\s*/, "")))
		.join(" ")
		.trim();

	const directives = (sections.get("style directives") ?? [])
		.map((line) => cleanText(line.replace(/^-\s*/, "")))
		.filter(Boolean);

	const notes = (sections.get("notes") ?? [])
		.map((line) => cleanText(line))
		.join(" ")
		.trim();

	const colors: StyleMemoryColor[] = [];
	const fonts: string[] = [];
	const spacing: string[] = [];

	for (const line of sections.get("design tokens") ?? []) {
		const hexes = line.match(HEX_COLOR) ?? [];
		for (const hex of hexes) {
			const label = cleanText((line.split(hex)[0] ?? "").replace(/^-\s*/, ""))
				.replace(/[:-]$/, "")
				.trim();
			colors.push({
				label: label || "color",
				value: hex.toLowerCase(),
			});
		}

		const lower = line.toLowerCase();
		if (
			hexes.length === 0 &&
			(lower.includes("font") || lower.includes("font-family"))
		) {
			const value = cleanText(
				line.replace(/^-\s*/, "").split(":").slice(1).join(":"),
			);
			const candidates = value
				.split(/[,;]/)
				.map((font) => font.trim())
				.filter(
					(font) =>
						font.length > 1 &&
						!HEX_COLOR_TEST.test(font) &&
						!/^\s*\d/.test(font),
				);
			fonts.push(...candidates);
		}

		if (
			hexes.length === 0 &&
			(lower.includes("spacing") ||
				lower.includes("border radius") ||
				lower.includes("shadow") ||
				lower.includes("gap"))
		) {
			const value = cleanText(
				line.replace(/^-\s*/, "").split(":").slice(1).join(":"),
			);
			const candidates = value
				.split(/[,;]/)
				.map((item) => item.trim())
				.filter((item) => item.length > 0);
			spacing.push(...candidates);
		}
	}

	return {
		summary,
		directives,
		notes,
		colors: dedupeColors(colors),
		fonts: Array.from(new Set(fonts)),
		spacing: Array.from(new Set(spacing)),
	};
}

function dedupeColors(colors: StyleMemoryColor[]): StyleMemoryColor[] {
	const seen = new Set<string>();
	return colors.filter((color) => {
		const key = color.value.toLowerCase();
		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});
}

/**
 * Appends a directive under the "Style Directives" section. If the section is
 * missing, it is created at the end of the document. Returns the updated
 * markdown (or the original when the directive is empty).
 */
export function appendStyleDirective(
	markdown: string,
	directive: string,
): string {
	const trimmed = directive.trim();
	if (!trimmed) {
		return markdown;
	}

	const directiveLine = `- ${trimmed}`;
	const directiveHeading = "## Style Directives";
	const index = markdown.indexOf(directiveHeading);

	if (index === -1) {
		return `${markdown.trimEnd()}\n\n${directiveHeading}\n${directiveLine}\n`;
	}

	const sectionStart = index + directiveHeading.length;
	const nextHeadingIndex = markdown.indexOf("\n## ", sectionStart);
	const sectionEnd =
		nextHeadingIndex === -1 ? markdown.length : nextHeadingIndex + 1;

	const section = markdown.slice(sectionStart, sectionEnd);
	const updated = `${section.trimEnd()}\n${directiveLine}`;

	return `${markdown.slice(0, sectionStart)}${updated}${markdown.slice(sectionEnd)}`;
}

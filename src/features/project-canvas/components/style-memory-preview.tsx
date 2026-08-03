import { Palette, Rows3, Sparkles, Type } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { parseStyleMemory } from "../utils/style-memory-utils";

interface StyleMemoryPreviewProps {
	markdown: string | null;
}

/** Picks a color by fuzzy label match, falling back to the provided default. */
function pickColor(
	colors: { label: string; value: string }[],
	labels: string[],
	fallback: string,
): string {
	const match = colors.find((color) =>
		labels.some((label) => color.label.toLowerCase().includes(label)),
	);
	return match?.value ?? fallback;
}

function isMeaningful(markdown: string | null): boolean {
	const parsed = parseStyleMemory(markdown);
	return Boolean(
		parsed.summary ||
			parsed.directives.length ||
			parsed.colors.length ||
			parsed.fonts.length,
	);
}

/**
 * Visual preview of the project's style memory. Renders the parsed markdown as
 * a live design-system snapshot — brand summary, style directives, and design
 * tokens (colors, fonts, spacing) plus a sample UI mock built from them — so
 * the user can see what the AI "remembers" without reading raw markdown.
 */
export function StyleMemoryPreview({ markdown }: StyleMemoryPreviewProps) {
	const parsed = parseStyleMemory(markdown);

	if (!isMeaningful(markdown)) {
		return (
			<div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center text-muted-foreground">
				<Sparkles className="h-8 w-8 opacity-50" />
				<p className="font-medium text-sm">Nothing to preview yet</p>
				<p className="max-w-xs text-xs">
					Add a brand summary, style directives, or design tokens — or
					synthesize from your designs — and the preview will render here.
				</p>
			</div>
		);
	}

	const colors = parsed.colors;
	const background = pickColor(
		colors,
		["background", "bg"],
		colors[0]?.value ?? "#ffffff",
	);
	const text = pickColor(colors, ["text", "foreground"], "#0f172a");
	const primary = pickColor(
		colors,
		["primary", "accent", "secondary"],
		colors[1]?.value ?? colors[0]?.value ?? "#4f46e5",
	);
	const fontFamily = parsed.fonts[0] ?? "inherit";

	return (
		<div className="flex flex-col gap-6">
			{/* Brand summary */}
			<section>
				<h3 className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
					Brand Summary
				</h3>
				<p className="text-foreground text-sm leading-relaxed">
					{parsed.summary ||
						"No summary yet — describe the product, audience, and personality."}
				</p>
			</section>

			{/* Style directives */}
			{parsed.directives.length > 0 && (
				<section>
					<h3 className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						Style Directives
					</h3>
					<div className="flex flex-wrap gap-2">
						{parsed.directives.map((directive) => (
							<Badge
								className="font-normal text-xs"
								key={directive}
								variant="secondary"
							>
								{directive}
							</Badge>
						))}
					</div>
				</section>
			)}

			{/* Design tokens */}
			{colors.length > 0 && (
				<section>
					<h3 className="mb-2 flex items-center gap-1.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						<Palette className="h-3.5 w-3.5" />
						Colors
					</h3>
					<div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
						{colors.slice(0, 8).map((color) => (
							<div
								className="flex flex-col gap-1.5"
								key={`${color.label}-${color.value}`}
								title={color.value}
							>
								<div
									className="h-12 w-full rounded-md border shadow-sm"
									style={{ backgroundColor: color.value }}
								/>
								<p className="truncate text-[10px] text-muted-foreground">
									{color.label}
								</p>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Typography */}
			{parsed.fonts.length > 0 && (
				<section>
					<h3 className="mb-2 flex items-center gap-1.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						<Type className="h-3.5 w-3.5" />
						Typography
					</h3>
					<ul className="space-y-2">
						{parsed.fonts.slice(0, 4).map((font) => (
							<li
								className="rounded-md border bg-muted/20 px-3 py-2"
								key={font}
							>
								<p
									className="text-lg leading-snug"
									style={{ fontFamily: font }}
								>
									The quick brown fox
								</p>
								<p className="mt-0.5 text-[10px] text-muted-foreground">
									{font}
								</p>
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Spacing */}
			{parsed.spacing.length > 0 && (
				<section>
					<h3 className="mb-2 flex items-center gap-1.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						<Rows3 className="h-3.5 w-3.5" />
						Spacing &amp; Effects
					</h3>
					<div className="flex flex-wrap gap-2">
						{parsed.spacing.map((value) => (
							<code className="rounded bg-muted px-2 py-1 text-xs" key={value}>
								{value}
							</code>
						))}
					</div>
				</section>
			)}

			{/* Sample UI mock */}
			{colors.length > 0 && (
				<section>
					<h3 className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						Sample Screen
					</h3>
					<div
						className={cn("rounded-xl border p-5 shadow-sm")}
						style={{
							backgroundColor: background,
							color: text,
							fontFamily,
						}}
					>
						<div className="flex items-center justify-between">
							<p className="font-semibold text-sm">Acme</p>
							<span
								className="rounded-full px-2.5 py-0.5 font-medium text-[10px]"
								style={{ backgroundColor: primary, color: background }}
							>
								PRO
							</span>
						</div>
						<h4 className="mt-6 font-bold text-xl">Welcome back</h4>
						<p className="mt-1 text-xs opacity-80">
							This card is rendered from your style memory — colors, typography,
							and spacing included.
						</p>
						<div className="mt-6 flex items-center gap-2">
							<span
								className="rounded-md px-3.5 py-1.5 font-medium text-xs"
								style={{ backgroundColor: primary, color: background }}
							>
								Get started
							</span>
							<span className="rounded-md border px-3.5 py-1.5 font-medium text-xs opacity-90">
								Learn more
							</span>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}

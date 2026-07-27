import type { DesignSystemContext } from "@/types/shared";
import type { UINode, UINodeLayout, UINodeStyle } from "./ui-node.schema";

type DesignSystemTokens = DesignSystemContext;

const SELF_CLOSING_TAGS = new Set(["img", "input", "br", "hr", "meta", "link"]);
const LAYOUT_CLASS_KEYS = new Set(["classes"]);
const STYLE_CLASS_KEYS = new Set(["classes"]);

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

function escapeAttribute(value: string) {
	return escapeHtml(value).replaceAll('"', "&quot;");
}

function joinClasses(values: Array<string | undefined | null | false>) {
	return values
		.flatMap((value) => (typeof value === "string" ? value.split(/\s+/) : []))
		.filter(Boolean)
		.join(" ");
}

function toArbitraryClass(prefix: string, value: string) {
	return value.length > 0 ? `${prefix}-[${value}]` : undefined;
}

function isNumericToken(value: string) {
	return /^-?\d+(\.\d+)?$/.test(value);
}

function isCssLiteral(value: string) {
	return (
		value.startsWith("#") ||
		value.startsWith("rgb(") ||
		value.startsWith("rgba(") ||
		value.startsWith("hsl(") ||
		value.startsWith("hsla(") ||
		value.startsWith("var(") ||
		/^-?\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(value)
	);
}

function toScaleOrArbitraryClass(prefix: string, value: string) {
	if (isNumericToken(value)) {
		return `${prefix}-${value}`;
	}

	return toArbitraryClass(prefix, value);
}

function toColorClass(prefix: string, value: string) {
	if (isCssLiteral(value)) {
		return toArbitraryClass(prefix, value);
	}

	return `${prefix}-${value}`;
}

function toRadiusClass(value: string) {
	const radiusTokens = new Set([
		"none",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"full",
	]);

	if (radiusTokens.has(value)) {
		return `rounded-${value}`;
	}

	return toArbitraryClass("rounded", value);
}

function toFontSizeClass(value: string) {
	const sizeTokens = new Set([
		"xs",
		"sm",
		"base",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl",
		"6xl",
		"7xl",
		"8xl",
		"9xl",
	]);

	if (sizeTokens.has(value)) {
		return `text-${value}`;
	}

	return toArbitraryClass("text", value);
}

function toLineHeightClass(value: string) {
	const lineHeightTokens = new Set([
		"none",
		"tight",
		"snug",
		"normal",
		"relaxed",
		"loose",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
	]);

	if (lineHeightTokens.has(value)) {
		return `leading-${value}`;
	}

	return toArbitraryClass("leading", value);
}

function toTrackingClass(value: string) {
	const trackingTokens = new Set([
		"tighter",
		"tight",
		"normal",
		"wide",
		"wider",
		"widest",
	]);

	if (trackingTokens.has(value)) {
		return `tracking-${value}`;
	}

	return toArbitraryClass("tracking", value);
}

function resolveColorToken(
	value: string,
	designSystem?: DesignSystemTokens,
): string | undefined {
	if (!designSystem) return undefined;

	const tokenValue = designSystem.colors[value];
	return typeof tokenValue === "string" ? tokenValue : undefined;
}

function resolveRadiusToken(
	value: string,
	designSystem?: DesignSystemTokens,
): string | undefined {
	if (!designSystem) return undefined;

	const radiusTokenMap: Record<string, string | undefined> = {
		small: designSystem.radius.small,
		medium: designSystem.radius.medium,
		large: designSystem.radius.large,
	};

	return radiusTokenMap[value];
}

function resolveSpacingToken(
	value: string,
	designSystem?: DesignSystemTokens,
): string {
	if (!designSystem) return value;

	const spacingIndex = Number(value);
	if (Number.isFinite(spacingIndex)) {
		return `${designSystem.spacing.base + spacingIndex * designSystem.spacing.scale}px`;
	}

	return value;
}

function mapDisplay(value: string) {
	const displayMap: Record<string, string> = {
		block: "block",
		inline: "inline",
		"inline-block": "inline-block",
		flex: "flex",
		grid: "grid",
		hidden: "hidden",
	};

	return displayMap[value] ?? value;
}

function mapFlexDirection(value: string) {
	const directionMap: Record<string, string> = {
		row: "flex-row",
		column: "flex-col",
		"row-reverse": "flex-row-reverse",
		"column-reverse": "flex-col-reverse",
	};

	return directionMap[value] ?? undefined;
}

function mapWrap(value: string) {
	const wrapMap: Record<string, string> = {
		wrap: "flex-wrap",
		nowrap: "flex-nowrap",
		"wrap-reverse": "flex-wrap-reverse",
	};

	return wrapMap[value] ?? undefined;
}

function mapJustifyContent(value: string) {
	const justifyMap: Record<string, string> = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
		around: "justify-around",
		evenly: "justify-evenly",
	};

	return justifyMap[value] ?? undefined;
}

function mapAlignItems(value: string, prefix: "items" | "self" = "items") {
	const alignMap: Record<string, string> = {
		start: `${prefix}-start`,
		center: `${prefix}-center`,
		end: `${prefix}-end`,
		stretch: `${prefix}-stretch`,
		baseline: `${prefix}-baseline`,
	};

	return alignMap[value] ?? undefined;
}

function mapPosition(value: string) {
	const positionMap: Record<string, string> = {
		relative: "relative",
		absolute: "absolute",
		fixed: "fixed",
		sticky: "sticky",
	};

	return positionMap[value] ?? undefined;
}

function mapTextAlign(value: string) {
	const alignMap: Record<string, string> = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
		justify: "text-justify",
	};

	return alignMap[value] ?? undefined;
}

function mapTextTransform(value: string) {
	const transformMap: Record<string, string> = {
		uppercase: "uppercase",
		lowercase: "lowercase",
		capitalize: "capitalize",
		none: "normal-case",
	};

	return transformMap[value] ?? undefined;
}

function mapObjectFit(value: string) {
	const fitMap: Record<string, string> = {
		cover: "object-cover",
		contain: "object-contain",
		fill: "object-fill",
		none: "object-none",
		"scale-down": "object-scale-down",
	};

	return fitMap[value] ?? undefined;
}

function renderLayoutClasses(
	layout?: UINodeLayout,
	designSystem?: DesignSystemTokens,
) {
	if (!layout) return "";

	const classes = Object.entries(layout).flatMap(([key, rawValue]) => {
		if (typeof rawValue !== "string" || LAYOUT_CLASS_KEYS.has(key)) {
			return [];
		}

		switch (key) {
			case "display":
				return [mapDisplay(rawValue)];
			case "direction":
			case "flexDirection":
				return [mapFlexDirection(rawValue)];
			case "wrap":
				return [mapWrap(rawValue)];
			case "justifyContent":
				return [mapJustifyContent(rawValue)];
			case "alignItems":
				return [mapAlignItems(rawValue)];
			case "alignSelf":
				return [mapAlignItems(rawValue, "self")];
			case "gap":
				return [
					toScaleOrArbitraryClass(
						"gap",
						resolveSpacingToken(rawValue, designSystem),
					),
				];
			case "padding":
				return [
					toScaleOrArbitraryClass(
						"p",
						resolveSpacingToken(rawValue, designSystem),
					),
				];
			case "paddingX":
				return [
					toScaleOrArbitraryClass(
						"px",
						resolveSpacingToken(rawValue, designSystem),
					),
				];
			case "paddingY":
				return [
					toScaleOrArbitraryClass(
						"py",
						resolveSpacingToken(rawValue, designSystem),
					),
				];
			case "margin":
				return [
					toScaleOrArbitraryClass(
						"m",
						resolveSpacingToken(rawValue, designSystem),
					),
				];
			case "marginX":
				return [
					toScaleOrArbitraryClass(
						"mx",
						resolveSpacingToken(rawValue, designSystem),
					),
				];
			case "marginY":
				return [
					toScaleOrArbitraryClass(
						"my",
						resolveSpacingToken(rawValue, designSystem),
					),
				];
			case "width":
				return [
					rawValue === "full" ? "w-full" : toArbitraryClass("w", rawValue),
				];
			case "height":
				return [
					rawValue === "full" ? "h-full" : toArbitraryClass("h", rawValue),
				];
			case "minWidth":
				return [toArbitraryClass("min-w", rawValue)];
			case "minHeight":
				return [toArbitraryClass("min-h", rawValue)];
			case "maxWidth":
				return [toArbitraryClass("max-w", rawValue)];
			case "maxHeight":
				return [toArbitraryClass("max-h", rawValue)];
			case "position":
				return [mapPosition(rawValue)];
			case "top":
				return [toArbitraryClass("top", rawValue)];
			case "right":
				return [toArbitraryClass("right", rawValue)];
			case "bottom":
				return [toArbitraryClass("bottom", rawValue)];
			case "left":
				return [toArbitraryClass("left", rawValue)];
			case "overflow":
				return [`overflow-${rawValue}`];
			default:
				return [];
		}
	});

	return joinClasses([layout.classes, ...classes]);
}

function renderStyleClasses(
	style?: UINodeStyle,
	designSystem?: DesignSystemTokens,
) {
	if (!style) return "";

	const classes = Object.entries(style).flatMap(([key, rawValue]) => {
		if (typeof rawValue !== "string" || STYLE_CLASS_KEYS.has(key)) {
			return [];
		}

		switch (key) {
			case "backgroundColor": {
				const resolvedColor =
					resolveColorToken(rawValue, designSystem) ?? rawValue;
				return [toColorClass("bg", resolvedColor)];
			}
			case "textColor": {
				const resolvedColor =
					resolveColorToken(rawValue, designSystem) ?? rawValue;
				return [toColorClass("text", resolvedColor)];
			}
			case "borderColor": {
				const resolvedColor =
					resolveColorToken(rawValue, designSystem) ?? rawValue;
				return [toColorClass("border", resolvedColor)];
			}
			case "borderWidth":
				return [
					rawValue === "1"
						? "border"
						: toScaleOrArbitraryClass("border", rawValue),
				];
			case "borderStyle":
				return [rawValue === "solid" ? "border-solid" : `border-${rawValue}`];
			case "borderRadius": {
				const resolvedRadius =
					resolveRadiusToken(rawValue, designSystem) ?? rawValue;
				return [toRadiusClass(resolvedRadius)];
			}
			case "opacity":
				return [
					rawValue.includes(".")
						? toArbitraryClass("opacity", rawValue)
						: `opacity-${rawValue}`,
				];
			case "shadow":
				return [
					rawValue.startsWith("shadow") ? rawValue : `shadow-${rawValue}`,
				];
			case "fontFamily": {
				if (
					designSystem &&
					(rawValue === "heading" || rawValue === "body" || rawValue === "base")
				) {
					const fontFamily =
						rawValue === "heading"
							? designSystem.typography.headingFont
							: designSystem.typography.bodyFont ||
								designSystem.typography.fontFamily;
					return fontFamily ? [`[font-family:${fontFamily}]`] : [];
				}
				if (["sans", "serif", "mono"].includes(rawValue)) {
					return [`font-${rawValue}`];
				}
				return [`[font-family:${rawValue}]`];
			}
			case "fontSize":
				return [toFontSizeClass(rawValue)];
			case "fontWeight":
				return [`font-${rawValue}`];
			case "lineHeight":
				return [toLineHeightClass(rawValue)];
			case "letterSpacing":
				return [toTrackingClass(rawValue)];
			case "textAlign":
				return [mapTextAlign(rawValue)];
			case "textTransform":
				return [mapTextTransform(rawValue)];
			case "objectFit":
				return [mapObjectFit(rawValue)];
			case "aspectRatio":
				return [toArbitraryClass("aspect", rawValue)];
			default:
				return [];
		}
	});

	return joinClasses([style.classes, ...classes]);
}

function resolveTagName(node: UINode) {
	const semanticTag =
		typeof node.props?.as === "string" ? node.props.as : undefined;

	if (semanticTag) return semanticTag;

	switch (node.type) {
		case "container":
		case "frame":
		case "stack":
		case "card":
			return "div";
		case "text":
			return "span";
		case "image":
			return "img";
		case "link":
			return "a";
		default:
			return /^[a-z][a-z0-9-]*$/.test(node.type) ? node.type : "div";
	}
}

function resolveTextContent(node: UINode) {
	const textValue = node.props?.text ?? node.props?.content;
	return typeof textValue === "string" ? textValue : "";
}

function renderAttributes(node: UINode, classes: string) {
	const attributes = [`data-ui-node-id="${escapeAttribute(node.id)}"`];

	if (classes) {
		attributes.push(`class="${escapeAttribute(classes)}"`);
	}

	for (const [key, value] of Object.entries(node.props ?? {})) {
		if (
			key === "text" ||
			key === "content" ||
			key === "children" ||
			key === "className" ||
			key === "as" ||
			value === undefined ||
			value === null
		) {
			continue;
		}

		if (typeof value === "string") {
			attributes.push(`${key}="${escapeAttribute(value)}"`);
			continue;
		}

		if (typeof value === "number" || typeof value === "boolean") {
			attributes.push(`${key}="${String(value)}"`);
		}
	}

	return attributes.join(" ");
}

export function renderUINodeToHtml(
	node: UINode,
	designSystem?: DesignSystemTokens,
): string {
	const tag = resolveTagName(node);
	const classes = joinClasses([
		renderLayoutClasses(node.layout, designSystem),
		renderStyleClasses(node.style, designSystem),
		typeof node.props?.className === "string"
			? node.props.className
			: undefined,
	]);
	const attributes = renderAttributes(node, classes);

	if (tag === "img") {
		return `<img ${attributes} />`;
	}

	const textContent = tag === "img" ? "" : escapeHtml(resolveTextContent(node));
	const childrenHtml = (node.children ?? [])
		.map((child) => renderUINodeToHtml(child, designSystem))
		.join("");

	if (SELF_CLOSING_TAGS.has(tag)) {
		return `<${tag} ${attributes} />`;
	}

	return `<${tag} ${attributes}>${textContent}${childrenHtml}</${tag}>`;
}

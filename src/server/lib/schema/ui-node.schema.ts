import { z } from "zod";

const jsonValueSchema: z.ZodType<
	string | number | boolean | null | Record<string, unknown> | unknown[]
> = z.lazy(() =>
	z.union([
		z.string(),
		z.number(),
		z.boolean(),
		z.null(),
		z.array(jsonValueSchema),
		z.record(z.string(), jsonValueSchema),
	]),
);

export const uiNodeLayoutSchema = z
	.object({
		display: z.string().optional(),
		direction: z.string().optional(),
		flexDirection: z.string().optional(),
		wrap: z.string().optional(),
		justifyContent: z.string().optional(),
		alignItems: z.string().optional(),
		alignSelf: z.string().optional(),
		gap: z.string().optional(),
		padding: z.string().optional(),
		paddingX: z.string().optional(),
		paddingY: z.string().optional(),
		margin: z.string().optional(),
		marginX: z.string().optional(),
		marginY: z.string().optional(),
		width: z.string().optional(),
		height: z.string().optional(),
		minWidth: z.string().optional(),
		minHeight: z.string().optional(),
		maxWidth: z.string().optional(),
		maxHeight: z.string().optional(),
		position: z.string().optional(),
		top: z.string().optional(),
		right: z.string().optional(),
		bottom: z.string().optional(),
		left: z.string().optional(),
		overflow: z.string().optional(),
		classes: z.string().optional(),
	})
	.catchall(z.string());

export const uiNodeStyleSchema = z
	.object({
		backgroundColor: z.string().optional(),
		textColor: z.string().optional(),
		borderColor: z.string().optional(),
		borderWidth: z.string().optional(),
		borderStyle: z.string().optional(),
		borderRadius: z.string().optional(),
		opacity: z.string().optional(),
		shadow: z.string().optional(),
		fontFamily: z.string().optional(),
		fontSize: z.string().optional(),
		fontWeight: z.string().optional(),
		lineHeight: z.string().optional(),
		letterSpacing: z.string().optional(),
		textAlign: z.string().optional(),
		textTransform: z.string().optional(),
		objectFit: z.string().optional(),
		aspectRatio: z.string().optional(),
		classes: z.string().optional(),
	})
	.catchall(z.string());

export type UINodeLayout = z.infer<typeof uiNodeLayoutSchema>;
export type UINodeStyle = z.infer<typeof uiNodeStyleSchema>;

export const uiNodeSchema: z.ZodType<{
	id: string;
	type: string;
	layout?: UINodeLayout;
	style?: UINodeStyle;
	props?: Record<string, unknown>;
	children?: UINode[];
}> = z.lazy(() =>
	z.object({
		id: z.string().min(1),
		type: z.string().min(1),
		layout: uiNodeLayoutSchema.optional(),
		style: uiNodeStyleSchema.optional(),
		props: z.record(z.string(), jsonValueSchema).optional(),
		children: z.array(uiNodeSchema).optional(),
	}),
);

export type UINode = z.infer<typeof uiNodeSchema>;

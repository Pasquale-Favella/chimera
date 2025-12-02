import { z } from "zod";

export const designIdSchema = z.object({
    designId: z.string().cuid(),
});

export const positionSchema = z.object({
    x: z.number(),
    y: z.number(),
});

export const sizeSchema = z.object({
    width: z.number(),
    height: z.number(),
});

export const viewModeSchema = z.enum(["DESKTOP", "TABLET", "MOBILE"]);

export const attachedImageSchema = z.object({
    mimeType: z.string(),
    base64: z.string(),
    dataUrl: z.string().url(),
});

export const promptSchema = z.object({
    projectId: z.string().cuid(),
    prompt: z.string().default(""),
    count: z.number().min(1).max(4).optional(),
    namePrefix: z.string().optional(),
    images: z.array(attachedImageSchema).max(4).optional(),
});

export const designTokensSchema = z.object({
    colors: z.object({
        background: z.array(z.string()),
        text: z.array(z.string()),
        primary: z.array(z.string()),
        border: z.array(z.string()),
    }),
    typography: z.object({
        headingFont: z.string(),
        bodyFont: z.string(),
    }),
    borderRadius: z.array(z.string()),
    boxShadow: z.array(z.string()),
});

export type DesignIdDto = z.infer<typeof designIdSchema>;
export type DesignPositionDto = z.infer<typeof positionSchema>;
export type DesignSizeDto = z.infer<typeof sizeSchema>;
export type DesignViewModeDto = z.infer<typeof viewModeSchema>;
export type AttachedImageDto = z.infer<typeof attachedImageSchema>;
export type GenerateDesignPromptDto = z.infer<typeof promptSchema>;
export type DesignTokensDto = z.infer<typeof designTokensSchema>;

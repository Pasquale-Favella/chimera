import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type {
	AttachedImage,
	Connection,
	Design,
	DesignTokens,
	GenerationMode,
} from "@/types/design";

// Types
export type StyleClipboardState = {
	tokens: DesignTokens;
	sourceDescription: string;
} | null;

// Atoms
export const designsFamily = atomFamily((projectId: string) =>
	atom<Design[]>([]),
);
export const connectionsFamily = atomFamily((projectId: string) =>
	atom<Connection[]>([]),
);
export const selectedDesignIdsFamily = atomFamily((projectId: string) =>
	atom<string[]>([]),
);
export const selectedConnectionIdFamily = atomFamily((projectId: string) =>
	atom<string | null>(null),
);

// Clipboard & AI State
export const styleClipboardFamily = atomFamily((projectId: string) =>
	atom<StyleClipboardState>(null),
);
export const copyingStyleIdFamily = atomFamily((projectId: string) =>
	atom<string | null>(null),
);
export const promptFamily = atomFamily((projectId: string) => atom(""));
export const generationModeFamily = atomFamily((projectId: string) =>
	atom<GenerationMode>("single"),
);
export const attachedImagesFamily = atomFamily((projectId: string) =>
	atom<AttachedImage[]>([]),
);

// Mode State
export const presentationDesignIdFamily = atomFamily((projectId: string) =>
	atom<string | null>(null),
);
export const prototypeStartIdFamily = atomFamily((projectId: string) =>
	atom<string | null>(null),
);
export const interactiveSelectorsCacheFamily = atomFamily((projectId: string) =>
	atom<
		Record<string, { html: string; selectors: Record<string, string | null> }>
	>({}),
);

// Project Library Dialog
export type LibraryTab = "library" | "design-system" | "memory";
export const libraryOpenFamily = atomFamily((projectId: string) => atom(false));
export const libraryActiveTabFamily = atomFamily((projectId: string) =>
	atom<LibraryTab>("library"),
);

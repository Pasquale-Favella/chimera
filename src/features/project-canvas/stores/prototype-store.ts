import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

// Atoms
export const currentScreenIdFamily = atomFamily((projectId: string) => atom<string | null>(null));
export const interactiveSelectorsFamily = atomFamily((projectId: string) => atom<Record<string, string | null>>({}));
export const isLoadingFamily = atomFamily((projectId: string) => atom<boolean>(true));
export const errorFamily = atomFamily((projectId: string) => atom<string | null>(null));

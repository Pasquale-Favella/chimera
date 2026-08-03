"use client";

import { useSetAtom } from "jotai";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
	libraryActiveTabFamily,
	libraryOpenFamily,
} from "../stores/canvas-store";

interface MemoryStatusBannerProps {
	projectId: string;
}

/**
 * Non-intrusive canvas banner shown only when the project has no persisted
 * style memory. Lets the user synthesize one from their existing designs or
 * jump straight to the Memory panel.
 */
export function MemoryStatusBanner({ projectId }: MemoryStatusBannerProps) {
	const setLibraryOpen = useSetAtom(libraryOpenFamily(projectId));
	const setLibraryTab = useSetAtom(libraryActiveTabFamily(projectId));

	const utils = api.useUtils();

	const { data, isLoading } = api.memory.getStatus.useQuery({ projectId });

	const synthesizeMutation = api.designAi.aiStyleMemory.useMutation({
		onSuccess: () => {
			utils.memory.getStatus.invalidate({ projectId });
			utils.memory.getProjectState.invalidate({ projectId });
			toast.success("Style memory synthesized from your designs");
		},
		onError: () => {
			toast.error("Failed to synthesize style memory");
		},
	});

	if (isLoading || synthesizeMutation.isPending || data?.hasMemory) {
		return null;
	}

	return (
		<div className="-translate-x-1/2 absolute top-3 left-1/2 z-20 w-[calc(100%-2rem)] max-w-xl">
			<div className="flex items-center gap-3 rounded-xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
				<div className="shrink-0 rounded-full bg-primary/10 p-2 text-primary">
					<Brain className="h-4 w-4" />
				</div>
				<div className="min-w-0 flex-1">
					<p className="font-medium text-sm">
						The AI has no style memory for this project
					</p>
					<p className="truncate text-muted-foreground text-xs">
						Generations will lack style context until you build it.
					</p>
				</div>
				<div className="flex shrink-0 items-center gap-2">
					<Button
						disabled={synthesizeMutation.isPending}
						onClick={() => synthesizeMutation.mutate({ projectId, prompt: "" })}
						size="sm"
					>
						{synthesizeMutation.isPending ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Sparkles className="mr-2 h-4 w-4" />
						)}
						Synthesize
					</Button>
					<Button
						onClick={() => {
							setLibraryTab("memory");
							setLibraryOpen(true);
						}}
						size="sm"
						variant="outline"
					>
						Open memory
					</Button>
				</div>
			</div>
		</div>
	);
}

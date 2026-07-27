import { api } from "@/trpc/react";
import { useAtom } from "jotai";
import { toast } from "sonner";
import {
    promptFamily,
    generationModeFamily,
    attachedImagesFamily,
    selectedDesignIdsFamily,
} from "../stores/canvas-store";
import { useCallback } from "react";

export function useCanvasAI(projectId: string) {
    const utils = api.useUtils();
    const [prompt, setPrompt] = useAtom(promptFamily(projectId));
    const [generationMode, setGenerationMode] = useAtom(generationModeFamily(projectId));
    const [attachedImages, setAttachedImages] = useAtom(attachedImagesFamily(projectId));
    const [selectedDesignIds, setSelectedDesignIds] = useAtom(selectedDesignIdsFamily(projectId));

    const aiGenerateMutation = api.designAi.aiGenerate.useMutation({
        onSuccess: async () => {
            await utils.designs.listByProject.invalidate({ projectId });
            setPrompt("");
            setAttachedImages([]);
            toast.success("Designs generated");
        },
        onError: () => {
            toast.error("Failed to generate designs");
        },
    });

    const aiGenerateFlowMutation = api.designAi.aiGenerateFlow.useMutation({
        onSuccess: async () => {
            await Promise.all([
                utils.designs.listByProject.invalidate({ projectId }),
                utils.designConnections.listByProject.invalidate({ projectId }),
            ]);
            setPrompt("");
            setAttachedImages([]);
            toast.success("Flow generated");
        },
        onError: () => {
            toast.error("Failed to generate flow");
        },
    });

    const aiModifyMutation = api.designAi.aiModify.useMutation({
        onSuccess: async () => {
            await utils.designs.listByProject.invalidate({ projectId });
            setPrompt("");
            setAttachedImages([]);
            setSelectedDesignIds([]);
            toast.success("Design modified");
        },
        onError: () => {
            toast.error("Failed to modify design");
        },
    });

    const handleGenerate = useCallback(() => {
        if (!prompt.trim() && attachedImages.length === 0) return;
        const count = generationMode === "single" ? 1 : generationMode === "variations" ? 3 : 1;
        if (generationMode === "flow") {
            aiGenerateFlowMutation.mutate({
                projectId,
                prompt: prompt.trim(),
                count,
                images: attachedImages,
            });
            return;
        }
        aiGenerateMutation.mutate({
            projectId,
            prompt: prompt.trim(),
            count,
            images: attachedImages,
        });
    }, [prompt, generationMode, attachedImages, aiGenerateMutation, aiGenerateFlowMutation, projectId]);

    const handleModify = useCallback(() => {
        if (!prompt.trim() || selectedDesignIds.length === 0) return;
        aiModifyMutation.mutate({
            projectId,
            prompt: prompt.trim(),
            designIds: selectedDesignIds,
            images: attachedImages,
        });
    }, [aiModifyMutation, attachedImages, projectId, prompt, selectedDesignIds]);

    return {
        prompt,
        setPrompt,
        generationMode,
        setGenerationMode,
        attachedImages,
        setAttachedImages,
        handleGenerate,
        handleModify,
        isGenerating: aiGenerateMutation.isPending || aiGenerateFlowMutation.isPending,
        isModifying: aiModifyMutation.isPending,
    };
}

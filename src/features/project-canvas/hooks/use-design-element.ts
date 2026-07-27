import { useAtomValue } from "jotai";
import { useMutationState } from "@tanstack/react-query";
import { useProjectId } from "../contexts/project-id-context";
import {
    selectedDesignIdsFamily,
    copyingStyleIdFamily,
    connectionsFamily,
    styleClipboardFamily,
} from "../stores/canvas-store";
import { getMutationKey } from "@trpc/react-query";
import { api } from "@/trpc/react";
import { useMemo } from "react";

export function useDesignElement(designId: string) {
    const projectId = useProjectId();
    const selectedDesignIds = useAtomValue(selectedDesignIdsFamily(projectId));
    const copyingStyleId = useAtomValue(copyingStyleIdFamily(projectId));
    const connections = useAtomValue(connectionsFamily(projectId));
    const styleClipboard = useAtomValue(styleClipboardFamily(projectId));

    const isSelected = selectedDesignIds.includes(designId);
    const isCopyingStyle = copyingStyleId === designId;
    const isPastingStyle = styleClipboard !== null;
    const hasOutgoingConnections = connections.some((c) => c.from.designId === designId);
    const pendingApplyTokenVars = useMutationState({
        filters: {
            status: 'pending',
            mutationKey: getMutationKey(api.designAi.aiApplyTokens)
        },
        select: (mutation) => mutation.state.variables as { designId: string },
    });
    const isApplyingStyle = useMemo(() => pendingApplyTokenVars.some((vars) => vars?.designId === designId), [pendingApplyTokenVars, designId]);

    return {
        isSelected,
        isCopyingStyle,
        isPastingStyle,
        hasOutgoingConnections,
        isApplyingStyle,
    };
}


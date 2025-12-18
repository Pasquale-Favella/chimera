import { useAtom, useAtomValue } from "jotai";
import {
    designsFamily,
    connectionsFamily,
    presentationDesignIdFamily,
    prototypeStartIdFamily,
    copyingStyleIdFamily,
} from "../stores/canvas-store";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { mapConnection, mapDesign } from "../utils/canvas-utils";

export function useCanvasState(projectId: string) {
    const [designs, setDesigns] = useAtom(designsFamily(projectId));
    const [connections, setConnections] = useAtom(connectionsFamily(projectId));
    const [presentationDesignId, setPresentationDesignId] = useAtom(presentationDesignIdFamily(projectId));
    const [prototypeStartId, setPrototypeStartId] = useAtom(prototypeStartIdFamily(projectId));
    const copyingStyleId = useAtomValue(copyingStyleIdFamily(projectId));

    const { data: designsData, isLoading: isLoadingDesigns } = api.designs.listByProject.useQuery(
        { projectId },
        { staleTime: Infinity }
    );
    const { data: connectionsData, isLoading: isLoadingConnections } = api.designConnections.listByProject.useQuery(
        { projectId },
        { staleTime: Infinity }
    );

    useEffect(() => {
        if (designsData) {
            setDesigns(designsData.map(mapDesign));
        }
    }, [designsData, setDesigns]);

    useEffect(() => {
        if (connectionsData) {
            setConnections(connectionsData.map(mapConnection));
        }
    }, [connectionsData, setConnections]);

    return {
        designs,
        setDesigns,
        connections,
        setConnections,
        presentationDesignId,
        setPresentationDesignId,
        prototypeStartId,
        setPrototypeStartId,
        copyingStyleId,
        isLoading: isLoadingDesigns || isLoadingConnections,
    };
}

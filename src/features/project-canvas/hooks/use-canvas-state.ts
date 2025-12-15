import { useAtom, useAtomValue } from "jotai";
import {
    designsFamily,
    connectionsFamily,
    presentationDesignIdFamily,
    prototypeStartIdFamily,
    copyingStyleIdFamily,
} from "../stores/canvas-store";

export function useCanvasState(projectId: string) {
    const [designs, setDesigns] = useAtom(designsFamily(projectId));
    const [connections, setConnections] = useAtom(connectionsFamily(projectId));
    const [presentationDesignId, setPresentationDesignId] = useAtom(presentationDesignIdFamily(projectId));
    const [prototypeStartId, setPrototypeStartId] = useAtom(prototypeStartIdFamily(projectId));
    const copyingStyleId = useAtomValue(copyingStyleIdFamily(projectId));

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
    };
}

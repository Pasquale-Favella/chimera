import { useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { api } from "@/trpc/react";
import { useCanvasState } from "./use-canvas-state";
import { useCanvasActions } from "./use-canvas-actions";
import {
    currentScreenIdFamily,
    interactiveSelectorsFamily,
    isLoadingFamily,
    errorFamily,
} from "../stores/prototype-store";
import { interactiveSelectorsCacheFamily as canvasCacheFamily } from "../stores/canvas-store";

export function usePrototype(projectId: string, startId: string) {
    const { designs, connections } = useCanvasState(projectId);
    const { updatePrototypeCache } = useCanvasActions(projectId);
    const utils = api.useUtils();

    const [currentScreenId, setCurrentScreenId] = useAtom(currentScreenIdFamily(projectId));
    const [interactiveSelectors, setInteractiveSelectors] = useAtom(interactiveSelectorsFamily(projectId));
    const [isLoading, setIsLoading] = useAtom(isLoadingFamily(projectId));
    const [error, setError] = useAtom(errorFamily(projectId));
    const [selectorsCache] = useAtom(canvasCacheFamily(projectId));

    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Initialize current screen and handle flow switching
    useEffect(() => {
        if (startId) {
            setCurrentScreenId(startId);
        }
    }, [startId, setCurrentScreenId]);

    const designsMap = useMemo(() => new Map(designs.map(d => [d.id, d])), [designs]);

    // Filter designs to only include those reachable from the startId
    const connectedDesigns = useMemo(() => {
        if (!startId) return [];
        const visited = new Set<string>();
        const queue = [startId];
        visited.add(startId);

        while (queue.length > 0) {
            const currentId = queue.shift()!;
            const outgoing = connections.filter(c => c.from.designId === currentId);
            for (const conn of outgoing) {
                if (!visited.has(conn.to.designId)) {
                    visited.add(conn.to.designId);
                    queue.push(conn.to.designId);
                }
            }
        }

        // Return designs in their original order, but filtered
        return designs.filter(d => visited.has(d.id));
    }, [designs, connections, startId]);

    const aiFindClickableSelectorsMutation = api.designs.aiFindClickableSelectors.useMutation();

    const retry = async () => {
        if (!currentScreenId) return;

        setIsLoading(true);
        setError(null);
        setInteractiveSelectors({});

        const currentDesign = designsMap.get(currentScreenId);
        if (!currentDesign) {
            setError("Current design not found.");
            setIsLoading(false);
            return;
        }

        // Check cache on the design object first
        const cached = selectorsCache[currentScreenId];
        if (cached && cached.html === currentDesign.html) {
            setInteractiveSelectors(cached.selectors);
            setIsLoading(false);
            return; // Cache hit
        }

        const outgoingConnections = connections.filter(c => c.from.designId === currentScreenId);
        if (outgoingConnections.length === 0) {
            setIsLoading(false);
            return; // No selectors to find
        }

        const targets = outgoingConnections.map(conn => {
            const targetDesign = designsMap.get(conn.to.designId);
            return {
                connectionId: conn.id,
                targetDescription: targetDesign?.description || 'next screen'
            };
        });

        try {
            const results = await aiFindClickableSelectorsMutation.mutateAsync({
                designId: currentScreenId,
                targets: targets,
            });

            const selectorsMap: Record<string, string | null> = {};
            results.forEach(result => {
                selectorsMap[result.connectionId] = result.selector;
            });

            setInteractiveSelectors(selectorsMap);
            updatePrototypeCache(currentScreenId, currentDesign.html, selectorsMap);
        } catch (e: any) {
            setError(e.message || "Failed to find interactive elements.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch interactive selectors when the screen changes
    useEffect(() => {
        retry();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScreenId, connections, designsMap, aiFindClickableSelectorsMutation.mutateAsync, updatePrototypeCache]);

    // Post selectors to iframe when they are updated
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_LISTENERS', selectors: interactiveSelectors }, '*');
        }
    }, [interactiveSelectors]);

    // Listen for navigation messages from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'NAVIGATE' && event.data.connectionId) {
                const connection = connections.find(c => c.id === event.data.connectionId);
                if (connection) {
                    setCurrentScreenId(connection.to.designId);
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [connections, setCurrentScreenId]);

    const handleRestart = () => {
        setCurrentScreenId(startId);
    };

    const currentDesign = currentScreenId ? designsMap.get(currentScreenId) : null;

    return {
        currentScreenId,
        setCurrentScreenId,
        interactiveSelectors,
        isLoading,
        error,
        iframeRef,
        connectedDesigns,
        currentDesign,
        handleRestart,
        retry,
        designs, // Expose full designs list if needed, but connectedDesigns is usually preferred for UI
    };
}

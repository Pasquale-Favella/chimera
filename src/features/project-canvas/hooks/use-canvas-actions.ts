import { api } from "@/trpc/react";
import { useAtom, useSetAtom } from "jotai";
import { toast } from "sonner";
import {
    designsFamily,
    connectionsFamily,
    selectedDesignIdsFamily,
    selectedConnectionIdFamily,
    styleClipboardFamily,
    copyingStyleIdFamily,
    interactiveSelectorsCacheFamily,
} from "../stores/canvas-store";
import { useCallback } from "react";
import type { DbConnection, DesignTokens, PointPosition } from "@/types/design";

export function useCanvasActions(projectId: string) {
    const utils = api.useUtils();
    const setDesigns = useSetAtom(designsFamily(projectId));
    const setConnections = useSetAtom(connectionsFamily(projectId));
    const setSelectedDesignIds = useSetAtom(selectedDesignIdsFamily(projectId));
    const setSelectedConnectionId = useSetAtom(selectedConnectionIdFamily(projectId));
    const [styleClipboard, setStyleClipboard] = useAtom(styleClipboardFamily(projectId));
    const setCopyingStyleId = useSetAtom(copyingStyleIdFamily(projectId));

    const updateDesignMutation = api.designs.update.useMutation({
        onMutate: async (newDesign) => {
            await utils.designs.listByProject.cancel({ projectId });
            const previousDesigns = utils.designs.listByProject.getData({ projectId });
            utils.designs.listByProject.setData({ projectId }, (old) => {
                if (!old) return [];
                return old.map((d) => {
                    if (d.id === newDesign.designId) {
                        return {
                            ...d,
                            ...(newDesign.name !== undefined ? { name: newDesign.name } : {}),
                            ...(newDesign.description !== undefined ? { description: newDesign.description } : {}),
                            ...(newDesign.data !== undefined ? { data: newDesign.data as any } : {}),
                            position: newDesign.position ? { x: newDesign.position.x, y: newDesign.position.y } : d.position,
                            size: newDesign.size ? { width: newDesign.size.width, height: newDesign.size.height } : d.size,
                        };
                    }
                    return d;
                });
            });
            return { previousDesigns };
        },
        onError: (err, newDesign, context) => {
            utils.designs.listByProject.setData({ projectId }, context?.previousDesigns);
            toast.error("Failed to update design");
        },
        onSettled: () => {
            utils.designs.listByProject.invalidate({ projectId });
        },
    });

    const deleteDesignMutation = api.designs.delete.useMutation({
        onMutate: async ({ designId }) => {
            await Promise.all([
                utils.designs.listByProject.cancel({ projectId }),
                utils.designConnections.listByProject.cancel({ projectId }),
            ]);
            const previousDesigns = utils.designs.listByProject.getData({ projectId });
            const previousConnections = utils.designConnections.listByProject.getData({ projectId });

            utils.designs.listByProject.setData({ projectId }, (old) => old?.filter((d) => d.id !== designId) ?? []);
            utils.designConnections.listByProject.setData({ projectId }, (old) =>
                old?.filter((c) => c.fromDesignId !== designId && c.toDesignId !== designId) ?? []
            );

            return { previousDesigns, previousConnections };
        },
        onError: (err, variables, context) => {
            utils.designs.listByProject.setData({ projectId }, context?.previousDesigns);
            utils.designConnections.listByProject.setData({ projectId }, context?.previousConnections);
            toast.error("Failed to delete design");
        },
        onSuccess: () => {
            toast.success("Design deleted");
        },
        onSettled: () => {
            utils.designs.listByProject.invalidate({ projectId });
            utils.designConnections.listByProject.invalidate({ projectId });
        },
    });

    const createDesignMutation = api.designs.create.useMutation({
        onSuccess: async () => {
            await utils.designs.listByProject.invalidate({ projectId });
            toast.success("Design created");
        },
        onError: () => {
            toast.error("Failed to create design");
        },
    });

    const createConnectionMutation = api.designConnections.create.useMutation({
        onMutate: async (newConnection) => {
            await utils.designConnections.listByProject.cancel({ projectId });
            const previousConnections = utils.designConnections.listByProject.getData({ projectId });

            const tempId = `temp-${Date.now()}`;
            utils.designConnections.listByProject.setData({ projectId }, (old) => {
                const newConn: DbConnection = {
                    id: tempId,
                    projectId,
                    fromDesignId: newConnection.fromDesignId,
                    toDesignId: newConnection.toDesignId,
                    fromPosition: newConnection.fromPosition,
                    toPosition: newConnection.toPosition,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                return [...(old || []), newConn];
            });

            // Optimistic update for local state
            setConnections((prev) => [
                ...prev,
                {
                    id: tempId,
                    from: { designId: newConnection.fromDesignId, position: newConnection.fromPosition as PointPosition },
                    to: { designId: newConnection.toDesignId, position: newConnection.toPosition as PointPosition },
                },
            ]);

            return { previousConnections };
        },
        onError: (err, variables, context) => {
            utils.designConnections.listByProject.setData({ projectId }, context?.previousConnections);
            toast.error("Failed to create connection");
        },
        onSuccess: () => {
            toast.success("Connection created");
        },
        onSettled: () => {
            utils.designConnections.listByProject.invalidate({ projectId });
        },
    });

    const deleteConnectionMutation = api.designConnections.delete.useMutation({
        onMutate: async ({ connectionId }) => {
            await utils.designConnections.listByProject.cancel({ projectId });
            const previousConnections = utils.designConnections.listByProject.getData({ projectId });
            utils.designConnections.listByProject.setData({ projectId }, (old) => old?.filter((c) => c.id !== connectionId) ?? []);
            return { previousConnections };
        },
        onError: (err, variables, context) => {
            utils.designConnections.listByProject.setData({ projectId }, context?.previousConnections);
            toast.error("Failed to delete connection");
        },
        onSuccess: () => {
            toast.success("Connection deleted");
        },
        onSettled: () => {
            utils.designConnections.listByProject.invalidate({ projectId });
        },
    });

    const extractTokensMutation = api.designs.aiExtractTokens.useMutation({
        onError: () => {
            toast.error("Failed to extract styles");
        }
    });
    const applyTokensMutation = api.designs.aiApplyTokens.useMutation({
        onSuccess: async () => {
            await utils.designs.listByProject.invalidate({ projectId });
            toast.success("Style applied");
        },
        onError: () => {
            toast.error("Failed to apply style");
        },
    });

    const updateDesign = useCallback((updates: any) => {
        updateDesignMutation.mutate(updates);
        // Optimistic local update for immediate feedback
        setDesigns((prev) =>
            prev.map((d) => {
                if (d.id === updates.designId) {
                    return {
                        ...d,
                        ...updates,
                        position: updates.position ? { ...d.position, ...updates.position } : d.position,
                        size: updates.size ? { ...d.size, ...updates.size } : d.size,
                    };
                }
                return d;
            })
        );
    }, [updateDesignMutation, setDesigns]);

    const deleteDesigns = useCallback((ids: string[]) => {
        if (ids.length === 0) return;
        ids.forEach((designId) => deleteDesignMutation.mutate({ designId }));
        setSelectedDesignIds((prev) => prev.filter((id) => !ids.includes(id)));
        setConnections((prev) => prev.filter((conn) => !ids.includes(conn.from.designId) && !ids.includes(conn.to.designId)));
        setDesigns((prev) => prev.filter((d) => !ids.includes(d.id)));
    }, [deleteDesignMutation, setSelectedDesignIds, setConnections, setDesigns]);

    const deleteConnection = useCallback((connectionId: string) => {
        deleteConnectionMutation.mutate({ connectionId });
        setSelectedConnectionId((prev) => (prev === connectionId ? null : prev));
        setConnections((prev) => prev.filter((c) => c.id !== connectionId));
    }, [deleteConnectionMutation, setSelectedConnectionId, setConnections]);

    const duplicateDesign = useCallback((designId: string, designs: any[]) => {
        const source = designs.find((design) => design.id === designId);
        if (!source) return;

        const baseName = source.name || source.description || "Concept";
        const maxNameLength = 120 - 5;
        const truncatedName = baseName.length > maxNameLength
            ? baseName.slice(0, maxNameLength).trim()
            : baseName;
        const newName = `${truncatedName} Copy`;

        createDesignMutation.mutate({
            projectId,
            name: newName,
            description: source.description,
            html: source.html,
            position: {
                x: source.position.x + 40,
                y: source.position.y + 40,
            },
            size: source.size,
        });
    }, [createDesignMutation, projectId]);

    const copyStyle = useCallback(async (designId: string, designs: any[]) => {
        setCopyingStyleId(designId);
        try {
            const tokens = await extractTokensMutation.mutateAsync({ designId });
            setStyleClipboard({
                tokens,
                sourceDescription: designs.find((design) => design.id === designId)?.description ?? "Design",
            });
            toast.success("Style copied to clipboard");
        } finally {
            setCopyingStyleId(null);
        }
    }, [extractTokensMutation, setStyleClipboard, setCopyingStyleId]);

    const pasteStyle = useCallback((designId: string) => {
        if (!styleClipboard) return;
        applyTokensMutation.mutate({
            designId,
            tokens: styleClipboard.tokens,
        });
    }, [applyTokensMutation, styleClipboard]);

    const updateDesignLocal = useCallback((designId: string, updates: { html?: string; history?: string[]; tokens?: DesignTokens | null; viewMode?: "preview" | "code" }) => {
        setDesigns(prev =>
            prev.map(design => {
                if (design.id === designId) {
                    const updatedDesign = { ...design, ...updates };
                    if (updates.html && updates.html !== design.html) {
                        setInteractiveSelectorsCache(prev => {
                            const { [designId]: _, ...rest } = prev;
                            return rest;
                        });
                    }
                    return updatedDesign;
                }
                return design;
            })
        );
    }, [setDesigns]);

    const setInteractiveSelectorsCache = useSetAtom(interactiveSelectorsCacheFamily(projectId));

    const updatePrototypeCache = useCallback((designId: string, html: string, selectors: Record<string, string | null>) => {
        setInteractiveSelectorsCache(prev => ({
            ...prev,
            [designId]: { html, selectors }
        }));
    }, [setInteractiveSelectorsCache]);

    const clearStyleClipboard = useCallback(() => {
        setStyleClipboard(null);
    }, [setStyleClipboard]);

    return {
        updateDesign,
        deleteDesigns,
        createConnection: createConnectionMutation.mutate,
        deleteConnection,
        duplicateDesign,
        copyStyle,
        pasteStyle,
        clearStyleClipboard,
        updateDesignLocal,
        updatePrototypeCache,
        styleClipboard,
    };
}

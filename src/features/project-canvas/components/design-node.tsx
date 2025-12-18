'use client';

import { memo, useMemo, useCallback } from "react";
import { Handle, Position, useReactFlow, NodeResizer, type Node } from "@xyflow/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Design, PointPosition } from "@/types/design";
import { useProjectId } from "../contexts/project-id-context";
import { useDesignElement } from "../hooks/use-design-element";
import { useCanvasActions } from "../hooks/use-canvas-actions";
import { useCanvasState } from "../hooks/use-canvas-state";

import {
    Code,
    Copy,
    Loader2,
    Maximize2,
    Paintbrush,
    Play,
    Trash2,
} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Editor, type OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useDesignSystem } from "../hooks/use-design-system";

// Node data type - the data property of the node
export type DesignNodeData = {
    design: Design;
};

// Full node type
export type DesignNodeType = Node<DesignNodeData, 'designNode'>;

// Props for the component
interface DesignNodeProps {
    id: string;
    data: DesignNodeData;
    selected?: boolean;
}

const CodeEditorLoader = () => (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
    </div>
);

const CodeView = memo(({ html }: { html: string }) => {
    const { resolvedTheme } = useTheme();

    const handleEditorDidMount: OnMount = useCallback((editor) => {
        editor.getAction("editor.action.formatDocument")?.run();
    }, []);

    return (
        <div className="h-full w-full overflow-hidden rounded-lg bg-[#1e1e1e]">
            <Editor
                theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
                language="html"
                value={html}
                loading={<CodeEditorLoader />}
                onMount={handleEditorDidMount}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 12,
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: "off",
                    glyphMargin: false,
                    folding: false,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 0,
                }}
            />
        </div>
    );
});
CodeView.displayName = "CodeView";

// Position mapping for React Flow handles
const positionMap: Record<PointPosition, Position> = {
    top: Position.Top,
    right: Position.Right,
    bottom: Position.Bottom,
    left: Position.Left,
};

const connectionPoints: PointPosition[] = ["top", "right", "bottom", "left"];

const DesignNode = ({ data, selected }: DesignNodeProps) => {
    const projectId = useProjectId();
    const design = data.design;
    const { getZoom } = useReactFlow();

    const {
        isCopyingStyle,
        isPastingStyle,
        hasOutgoingConnections,
        isApplyingStyle,
    } = useDesignElement(design.id);

    const { iframeFonts } = useDesignSystem(projectId);

    const { duplicateDesign, copyStyle, deleteDesigns, updateDesignLocal, updateDesign } = useCanvasActions(projectId);
    const { setPresentationDesignId, setPrototypeStartId, designs } = useCanvasState(projectId);

    const zoom = getZoom();

    const onDuplicate = useCallback(() => duplicateDesign(design.id, designs), [design.id, designs, duplicateDesign]);
    const onCopyStyle = useCallback(() => copyStyle(design.id, designs), [design.id, designs, copyStyle]);
    const onToggleViewMode = useCallback(() => {
        const viewMode = design.viewMode === "preview" ? "code" : "preview";
        updateDesignLocal(design.id, { viewMode });
    }, [design.id, design.viewMode, updateDesignLocal]);
    const onDelete = useCallback(() => deleteDesigns([design.id]), [design.id, deleteDesigns]);
    const onEnterPresentationMode = useCallback(() => setPresentationDesignId(design.id), [design.id, setPresentationDesignId]);
    const onStartPrototype = useCallback(() => setPrototypeStartId(design.id), [design.id, setPrototypeStartId]);

    const iframeContent = useMemo(() => {
        return `
            <html>
            <head>
                <script src="https://cdn.tailwindcss.com"></script>
                ${iframeFonts.fontLinkTag}
                <style>
                    ${iframeFonts.fontStyle}
                </style>
            </head>
            <body class="overflow-hidden bg-transparent">
                <div id="wrapper">${design.html}</div>
            </body>
        </html>
        `;
    }, [design.html, iframeFonts]);

    const toolbarScale = useMemo(() => {
        const scaleFactor = 1 / zoom;
        return Math.max(0.5, Math.min(scaleFactor, 2));
    }, [zoom]);

    const cursorClass = useMemo(() => {
        if (isPastingStyle) return "cursor-copy";
        if (selected) return "cursor-move";
        return "cursor-pointer";
    }, [selected, isPastingStyle]);

    return (
        <div className="group h-full w-full">
            <NodeResizer
                isVisible={!!selected}
                onResizeEnd={(_, params) => {
                    updateDesign({
                        designId: design.id,
                        size: { width: params.width, height: params.height },
                    });
                }}
                handleStyle={{
                    borderRadius: 9999,
                    zIndex: 100,
                }}
                handleClassName="!bg-background !border-2 !border-primary"
                lineStyle={{ opacity: 1 }}
                lineClassName="!border-primary"
            />
            {/* Toolbar */}
            <div
                className="pointer-events-auto absolute bottom-full left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                    marginBottom: "8px",
                    transform: `translate(-50 %, 0) scale(${toolbarScale})`,
                    transformOrigin: "bottom center",
                }}
            >
                <div className="flex items-center rounded-full border border-border bg-card/90 backdrop-blur-md shadow-lg">
                    {hasOutgoingConnections && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                onStartPrototype();
                            }}
                            variant="ghost"
                            size="icon-sm"
                            title="Run prototype from here"
                            className="h-7 w-7"
                        >
                            <Play className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onCopyStyle();
                        }}
                        variant="ghost"
                        size="icon-sm"
                        title="Copy style"
                        disabled={isCopyingStyle}
                        className="h-7 w-7"
                    >
                        {isCopyingStyle ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Paintbrush className="h-3.5 w-3.5" />
                        )}
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate();
                        }}
                        variant="ghost"
                        size="icon-sm"
                        title="Duplicate"
                        className="h-7 w-7"
                    >
                        <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleViewMode();
                        }}
                        variant="ghost"
                        size="icon-sm"
                        title={design.viewMode === "preview" ? "View code" : "View preview"}
                        className="h-7 w-7"
                    >
                        <Code className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEnterPresentationMode();
                        }}
                        variant="ghost"
                        size="icon-sm"
                        title="Full screen"
                        className="h-7 w-7"
                    >
                        <Maximize2 className="h-3.5 w-3.5" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                variant="ghost"
                                size="icon-sm"
                                title="Delete"
                                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the design.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete();
                                    }}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Main content */}
            <div
                className={cn(
                    "relative h-full w-full rounded-lg shadow-xl transition-shadow duration-200",
                    "hover:shadow-primary/30",
                    cursorClass,
                    design.viewMode === "preview" ? "bg-card" : "bg-transparent",
                )}
            >
                {isApplyingStyle && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-sm">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                <div
                    className={cn(
                        "absolute inset-0 rounded-lg ring-offset-4 ring-offset-background transition-all duration-200",
                        selected ? "ring-2 ring-primary" : "ring-1 ring-border group-hover:ring-primary",
                    )}
                />

                {design.viewMode === "preview" ? (
                    <iframe
                        srcDoc={iframeContent}
                        title={design.description || ""}
                        sandbox="allow-scripts"
                        className="h-full w-full rounded-lg bg-transparent pointer-events-none"
                        scrolling="no"
                    />
                ) : (
                    <CodeView html={design.html} />
                )}

                {/* Description label */}
                <div
                    className={cn(
                        "absolute -top-8 left-0 rounded-t-md bg-muted/80 px-2 py-1 text-xs text-foreground backdrop-blur-sm transition-opacity",
                        selected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                >
                    {design.description}
                </div>

                {connectionPoints.map((pos) => {
                    return (
                        <Handle
                            key={pos}
                            id={pos}
                            type="source"
                            position={positionMap[pos]}
                            className={cn(
                                "!h-4 !w-4 !rounded-full !border-2 !border-background !shadow-sm transition-all duration-200",
                                "!bg-muted-foreground hover:!scale-125 hover:!bg-primary",
                                selected ? "" : "opacity-0 group-hover:opacity-100",
                            )}
                            isConnectable={true}
                        />
                    );
                })}

                {/* Also add target handles for incoming connections */}
                {connectionPoints.map((pos) => (
                    <Handle
                        key={`target-${pos}`}
                        id={`target-${pos}`}
                        type="target"
                        position={positionMap[pos]}
                        className="!h-4 !w-4 !rounded-full !border-2 !border-background !shadow-sm !bg-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 hover:!scale-125 hover:!bg-primary"
                        isConnectable={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(DesignNode);

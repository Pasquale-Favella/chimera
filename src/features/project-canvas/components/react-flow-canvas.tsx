'use client';

import { useCallback, useMemo, useEffect, useRef } from 'react';
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
    type OnConnect,
    type OnNodesChange,
    type OnEdgesChange,
    type NodeChange,
    type EdgeChange,
    useReactFlow,
    ConnectionMode,
    SelectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import DesignNode, { type DesignNodeData, type DesignNodeType } from './design-node';
import DesignEdge, { type DesignEdgeData, type DesignEdgeType } from './design-edge';
import { useProjectId } from '../contexts/project-id-context';
import { useCanvasState } from '../hooks/use-canvas-state';
import { useCanvasActions } from '../hooks/use-canvas-actions';
import { useCanvasSelection } from '../hooks/use-canvas-selection';
import type { Design, Connection, PointPosition } from '@/types/design';

// Define custom node and edge types
const nodeTypes = {
    designNode: DesignNode,
};

const edgeTypes = {
    designEdge: DesignEdge,
};

// Default edge options
const defaultEdgeOptions = {
    type: 'designEdge' as const,
    animated: false,
};

// Convert Design to React Flow Node
function designToNode(design: Design): DesignNodeType {
    return {
        id: design.id,
        type: 'designNode',
        position: { x: design.position.x, y: design.position.y },
        data: { design },
        style: {
            width: design.size.width,
            height: design.size.height,
        },
        selectable: true,
        draggable: true,
    };
}

// Convert Connection to React Flow Edge
function connectionToEdge(connection: Connection): DesignEdgeType {
    return {
        id: connection.id,
        source: connection.from.designId,
        target: connection.to.designId,
        sourceHandle: connection.from.position,
        targetHandle: `target-${connection.to.position}`,
        type: 'designEdge',
        data: { connectionId: connection.id },
    };
}

// Map handle position strings to PointPosition
function handleToPosition(handle: string | null): PointPosition {
    if (!handle) return 'right';
    // Remove 'target-' prefix if present
    const pos = handle.replace('target-', '');
    if (pos === 'top' || pos === 'right' || pos === 'bottom' || pos === 'left') {
        return pos;
    }
    return 'right';
}

const ReactFlowCanvas = () => {
    const projectId = useProjectId();
    const { designs, connections } = useCanvasState(projectId);
    const { updateDesign, createConnection, pasteStyle, styleClipboard } = useCanvasActions(projectId);
    const { selectDesign, clearSelection } = useCanvasSelection(projectId);
    const { fitView } = useReactFlow();

    const hasInitialFit = useRef(false);

    // Convert designs and connections to React Flow format
    const initialNodes = useMemo(() => designs.map(designToNode), [designs]);
    const initialEdges = useMemo(() => connections.map(connectionToEdge), [connections]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Sync nodes when designs change from external source
    useEffect(() => {
        setNodes(designs.map(designToNode));
    }, [designs, setNodes]);

    // Sync edges when connections change from external source
    useEffect(() => {
        setEdges(connections.map(connectionToEdge));
    }, [connections, setEdges]);

    // Initial fit to screen
    useEffect(() => {
        if (designs.length > 0 && !hasInitialFit.current) {
            // Small delay to ensure React Flow is ready
            setTimeout(() => {
                fitView({ padding: 0.1, duration: 300 });
                hasInitialFit.current = true;
            }, 100);
        }
    }, [designs.length, fitView]);

    // Handle node changes (position updates from drag)
    const handleNodesChange: OnNodesChange<DesignNodeType> = useCallback(
        (changes: NodeChange<DesignNodeType>[]) => {
            onNodesChange(changes);

            // Process position changes after drag ends
            changes.forEach((change) => {
                if (change.type === 'position' && change.dragging === false && change.position) {
                    // Drag ended, persist to server
                    updateDesign({
                        designId: change.id,
                        position: { x: change.position.x, y: change.position.y },
                    });
                }
            });
        },
        [onNodesChange, updateDesign]
    );

    // Handle edge changes (mainly for deletions handled by edge component)
    const handleEdgesChange: OnEdgesChange<DesignEdgeType> = useCallback(
        (changes: EdgeChange<DesignEdgeType>[]) => {
            onEdgesChange(changes);
        },
        [onEdgesChange]
    );

    // Handle new connections
    const handleConnect: OnConnect = useCallback(
        (connection) => {
            if (!connection.source || !connection.target) return;
            if (connection.source === connection.target) return;

            createConnection({
                projectId,
                fromDesignId: connection.source,
                toDesignId: connection.target,
                fromPosition: handleToPosition(connection.sourceHandle),
                toPosition: handleToPosition(connection.targetHandle),
            });
        },
        [createConnection, projectId]
    );

    // Handle selection changes
    const handleSelectionChange = useCallback(
        ({ nodes: selectedNodes }: { nodes: DesignNodeType[]; edges: DesignEdgeType[] }) => {
            if (!selectedNodes || selectedNodes.length === 0) {
                // Don't clear if we're pasting style
                if (!styleClipboard) {
                    clearSelection();
                }
            } else if (selectedNodes.length === 1 && selectedNodes[0]) {
                selectDesign(selectedNodes[0].id);
            } else {
                // Multi-select: update selected design IDs
                selectedNodes.forEach((node, index) => {
                    selectDesign(node.id, index > 0);
                });
            }
        },
        [clearSelection, selectDesign, styleClipboard]
    );

    // Handle node click for style pasting
    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: DesignNodeType) => {
            if (styleClipboard) {
                pasteStyle(node.id);
            }
        },
        [styleClipboard, pasteStyle]
    );

    // Cursor style based on mode
    const canvasCursor = styleClipboard ? 'cursor-copy' : 'cursor-grab';

    return (
        <div className={`h-full w-full ${canvasCursor}`}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={handleConnect}
                onSelectionChange={handleSelectionChange}
                onNodeClick={handleNodeClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionMode={ConnectionMode.Loose}
                fitView={false}
                minZoom={0.1}
                maxZoom={5}
                snapToGrid={false}
                panOnScroll={false}
                zoomOnScroll={true}
                zoomOnDoubleClick={false}
                panOnDrag={true}
                selectionOnDrag={true}
                selectionKeyCode="Shift"
                multiSelectionKeyCode="Shift"
                selectionMode={SelectionMode.Partial}
                proOptions={{ hideAttribution: true }}
            >
                {/* SVG Defs for arrow markers - must be inside ReactFlow for proper SVG context */}
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                        <marker
                            id="arrow-muted"
                            viewBox="0 0 10 10"
                            refX="8"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                        </marker>
                        <marker
                            id="arrow-primary"
                            viewBox="0 0 10 10"
                            refX="8"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
                        </marker>
                    </defs>
                </svg>
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    color="#4a5568"
                    className="bg-background"
                />
            </ReactFlow>
        </div>
    );
};

export default ReactFlowCanvas;

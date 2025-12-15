'use client';

import { memo, useState, useCallback } from 'react';
import {
    EdgeLabelRenderer,
    getSmoothStepPath,
    type Edge,
    type Position,
} from '@xyflow/react';
import { XCircle } from 'lucide-react';
import { useProjectId } from '../contexts/project-id-context';
import { useCanvasActions } from '../hooks/use-canvas-actions';
import { useCanvasSelection } from '../hooks/use-canvas-selection';

// Edge data type
export type DesignEdgeData = {
    connectionId: string;
};

// Full edge type
export type DesignEdgeType = Edge<DesignEdgeData, 'designEdge'>;

// Props for the component
interface DesignEdgeProps {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: Position;
    targetPosition: Position;
    selected?: boolean;
    data?: DesignEdgeData;
}

const DesignEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
}: DesignEdgeProps) => {
    const projectId = useProjectId();
    const { deleteConnection } = useCanvasActions(projectId);
    const { selectedConnectionId } = useCanvasSelection(projectId);
    const [isHovered, setIsHovered] = useState(false);

    // Use smooth step path for better visibility
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 10,
    });

    const isSelected = selected || selectedConnectionId === id;
    const showDeleteButton = isSelected || isHovered;

    const handleDelete = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        deleteConnection(id);
    }, [deleteConnection, id]);

    // Use solid colors for debugging visibility
    const strokeColor = isSelected ? '#8b5cf6' : '#71717a';

    return (
        <>
            {/* Invisible wider path for easier interaction */}
            <path
                d={edgePath}
                fill="none"
                stroke="transparent"
                strokeWidth={20}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />

            {/* Visible edge path with solid stroke color */}
            <path
                id={id}
                d={edgePath}
                fill="none"
                stroke={strokeColor}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
            />

            {/* Arrow marker manually drawn at the end */}
            <polygon
                points={`${targetX},${targetY} ${targetX - 10},${targetY - 5} ${targetX - 10},${targetY + 5}`}
                fill={strokeColor}
                style={{ pointerEvents: 'none' }}
            />

            {/* Delete button */}
            {showDeleteButton && (
                <EdgeLabelRenderer>
                    <div
                        className="pointer-events-auto absolute z-30"
                        style={{
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <button
                            onClick={handleDelete}
                            className="rounded-full bg-card border border-border text-foreground transition-all hover:scale-110 hover:border-destructive hover:text-destructive"
                            aria-label="Delete connection"
                        >
                            <XCircle className="h-6 w-6" />
                        </button>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default memo(DesignEdge);

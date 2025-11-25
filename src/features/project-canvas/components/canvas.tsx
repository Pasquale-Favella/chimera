'use client';

import type { Connection, ConnectionPoint, Design, PointPosition } from "@/types/design";
import { XCircle } from "lucide-react";

import DesignElement from "./design-element";

interface CanvasProps {
	designs: Design[];
	selectedDesignIds: string[];
	connections: Connection[];
	selectedConnectionId: string | null;
	hoveredConnectionId: string | null;
	previewConnection: { start: { x: number; y: number }; end: { x: number; y: number } } | null;
	previewSourcePosition?: PointPosition;
	connectionTarget: ConnectionPoint | null;
	viewTransform: { zoom: number; pan: { x: number; y: number } };
	isPastingStyle: boolean;
	copyingStyleId: string | null;
	onCanvasMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
	onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
	onInteractionStart: (
		designId: string,
		type: "drag" | "resize" | "connect",
		e: React.MouseEvent,
		details: { handle?: string; position?: PointPosition },
	) => void;
	onMouseEnterPoint: (designId: string, position: PointPosition) => void;
	onMouseLeavePoint: () => void;
	onConnectionClick: (connectionId: string) => void;
	onDeleteConnection: (connectionId: string) => void;
	onHoverConnection: (connectionId: string | null) => void;
	onDuplicate: (designId: string) => void;
	onCopyStyle: (designId: string) => void;
	onToggleViewMode: (designId: string) => void;
	onDeleteDesign: (designId: string) => void;
	onEnterPresentationMode: (designId: string) => void;
	onStartPrototype: (designId: string) => void;
}

const Canvas = ({
	designs,
	selectedDesignIds,
	connections,
	selectedConnectionId,
	hoveredConnectionId,
	previewConnection,
	previewSourcePosition,
	connectionTarget,
	viewTransform,
	isPastingStyle,
	copyingStyleId,
	onCanvasMouseDown,
	onWheel,
	onInteractionStart,
	onMouseEnterPoint,
	onMouseLeavePoint,
	onConnectionClick,
	onDeleteConnection,
	onHoverConnection,
	onDuplicate,
	onCopyStyle,
	onToggleViewMode,
	onDeleteDesign,
	onEnterPresentationMode,
	onStartPrototype,
}: CanvasProps) => {
	const getPointCoordinates = (design: Design, position: PointPosition): { x: number; y: number } => {
		const { x, y } = design.position;
		const { width, height } = design.size;
		switch (position) {
			case "top":
				return { x: x + width / 2, y: y };
			case "right":
				return { x: x + width, y: y + height / 2 };
			case "bottom":
				return { x: x + width / 2, y: y + height };
			case "left":
				return { x: x, y: y + height / 2 };
		}
	};

	const findDesign = (id: string) => designs.find((d) => d.id === id);

	const canvasCursor = isPastingStyle ? "cursor-copy" : "cursor-grab active:cursor-grabbing";

	const getSmoothPath = (
		p1: { x: number; y: number },
		p2: { x: number; y: number },
		pos1?: PointPosition,
		pos2?: PointPosition,
	) => {
		let cp1 = { x: p1.x, y: p1.y };
		let cp2 = { x: p2.x, y: p2.y };
		const curvature = 0.5;

		// Calculate distance to adjust curvature
		const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
		const offset = Math.max(distance * curvature, 50);

		if (pos1) {
			switch (pos1) {
				case "top":
					cp1.y -= offset;
					break;
				case "bottom":
					cp1.y += offset;
					break;
				case "left":
					cp1.x -= offset;
					break;
				case "right":
					cp1.x += offset;
					break;
			}
		}

		if (pos2) {
			switch (pos2) {
				case "top":
					cp2.y -= offset;
					break;
				case "bottom":
					cp2.y += offset;
					break;
				case "left":
					cp2.x -= offset;
					break;
				case "right":
					cp2.x += offset;
					break;
			}
		} else {
			// If no end position (preview), just curve towards the mouse point naturally
			cp2.x = p2.x;
			cp2.y = p2.y;
		}

		return {
			path: `M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`,
			cp1,
			cp2,
		};
	};

	// Helper to calculate a point on a cubic Bezier curve at t (0 <= t <= 1)
	const getBezierPoint = (
		t: number,
		p0: { x: number; y: number },
		p1: { x: number; y: number },
		p2: { x: number; y: number },
		p3: { x: number; y: number },
	) => {
		const oneMinusT = 1 - t;
		const oneMinusT2 = oneMinusT * oneMinusT;
		const oneMinusT3 = oneMinusT2 * oneMinusT;
		const t2 = t * t;
		const t3 = t2 * t;

		return {
			x:
				oneMinusT3 * p0.x +
				3 * oneMinusT2 * t * p1.x +
				3 * oneMinusT * t2 * p2.x +
				t3 * p3.x,
			y:
				oneMinusT3 * p0.y +
				3 * oneMinusT2 * t * p1.y +
				3 * oneMinusT * t2 * p2.y +
				t3 * p3.y,
		};
	};

	return (
		<div
			className={`absolute inset-0 overflow-hidden ${canvasCursor}`}
			onMouseDown={onCanvasMouseDown}
			onWheel={onWheel}
			style={{
				backgroundImage: "radial-gradient(circle at 1px 1px, #4a5568 1px, transparent 0)",
				backgroundSize: `${20 * viewTransform.zoom}px ${20 * viewTransform.zoom}px`,
				backgroundPosition: `${viewTransform.pan.x % (20 * viewTransform.zoom)}px ${viewTransform.pan.y % (20 * viewTransform.zoom)}px`,
				backgroundColor: "hsl(var(--background))",
			}}
		>
			<div
				className="absolute left-0 top-0"
				style={{
					transform: `translate(${viewTransform.pan.x}px, ${viewTransform.pan.y}px) scale(${viewTransform.zoom})`,
					transformOrigin: "0 0",
				}}
			>
				<svg className="pointer-events-none absolute left-0 top-0" style={{ overflow: "visible" }}>
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
							<path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground" />
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
							<path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
						</marker>
					</defs>

					{connections.map((conn) => {
						const fromDesign = findDesign(conn.from.designId);
						const toDesign = findDesign(conn.to.designId);
						if (!fromDesign || !toDesign) return null;

						const p1 = getPointCoordinates(fromDesign, conn.from.position);
						const p2 = getPointCoordinates(toDesign, conn.to.position);
						const isSelected = conn.id === selectedConnectionId;
						const { path: pathData } = getSmoothPath(p1, p2, conn.from.position, conn.to.position);

						return (
							<g
								key={conn.id}
								className="pointer-events-auto"
								onMouseEnter={() => onHoverConnection(conn.id)}
								onMouseLeave={() => onHoverConnection(null)}
							>
								<path
									d={pathData}
									stroke="transparent"
									strokeWidth="12"
									fill="none"
									className="cursor-pointer"
									onClick={(e) => {
										e.stopPropagation();
										onConnectionClick(conn.id);
									}}
								/>
								<path
									d={pathData}
									className={isSelected ? "stroke-primary" : "stroke-muted-foreground"}
									strokeWidth="2"
									fill="none"
									markerEnd={isSelected ? "url(#arrow-primary)" : "url(#arrow-muted)"}
								/>
							</g>
						);
					})}

					{previewConnection && (
						<path
							d={
								getSmoothPath(
									previewConnection.start,
									previewConnection.end,
									previewSourcePosition,
									connectionTarget?.position,
								).path
							}
							className="stroke-primary"
							strokeWidth="2"
							strokeDasharray="5,5"
							fill="none"
							markerEnd="url(#arrow-primary)"
						/>
					)}
				</svg>

				{connections.map((conn) => {
					const isSelected = conn.id === selectedConnectionId;
					const isHovered = conn.id === hoveredConnectionId;

					if (!isSelected && !isHovered) return null;

					const fromDesign = findDesign(conn.from.designId);
					const toDesign = findDesign(conn.to.designId);
					if (!fromDesign || !toDesign) return null;

					const p1 = getPointCoordinates(fromDesign, conn.from.position);
					const p2 = getPointCoordinates(toDesign, conn.to.position);
					const { cp1, cp2 } = getSmoothPath(p1, p2, conn.from.position, conn.to.position);
					const midPoint = getBezierPoint(0.5, p1, cp1, cp2, p2);

					return (
						<div
							key={`delete-${conn.id}`}
							className="absolute z-30 pointer-events-auto"
							style={{
								left: `${midPoint.x}px`,
								top: `${midPoint.y}px`,
								transform: "translate(-50%, -50%)",
							}}
							onMouseEnter={() => onHoverConnection(conn.id)}
							onMouseLeave={() => onHoverConnection(null)}
						>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onDeleteConnection(conn.id);
								}}
								className="rounded-full bg-card border border-border text-foreground transition-all hover:scale-110 hover:border-destructive hover:text-destructive"
								aria-label="Delete connection"
							>
								<XCircle className="h-6 w-6" />
							</button>
						</div>
					);
				})}

				{designs.map((design) => {
					const hasOutgoingConnections = connections.some((c) => c.from.designId === design.id);
					return (
						<DesignElement
							key={design.id}
							design={design}
							isSelected={selectedDesignIds.includes(design.id)}
							connectionTarget={connectionTarget}
							zoom={viewTransform.zoom}
							isCopyingStyle={copyingStyleId === design.id}
							isPastingStyle={isPastingStyle}
							hasOutgoingConnections={hasOutgoingConnections}
							onInteractionStart={(type, e, details) => onInteractionStart(design.id, type, e, details)}
							onMouseEnterPoint={onMouseEnterPoint}
							onMouseLeavePoint={onMouseLeavePoint}
							onDuplicate={onDuplicate}
							onCopyStyle={onCopyStyle}
							onToggleViewMode={onToggleViewMode}
							onDelete={onDeleteDesign}
							onEnterPresentationMode={onEnterPresentationMode}
							onStartPrototype={onStartPrototype}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Canvas;

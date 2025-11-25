"use client";

import { useEffect, useRef } from "react";
import type {
	Connection,
	DbConnection,
	DbDesign,
	Design,
	DesignTokens,
	PointPosition,
} from "@/types/design";

import { EmptyCanvas } from "./components/empty-canvas";
import Canvas from "./components/canvas";
import { Legend } from "./components/legend";
import { StyleClipboardBanner } from "./components/style-clipboard-banner";
import { Toolbar } from "./components/toolbar";
import { ZoomControls } from "./components/zoom-controls";
import { PresentationMode } from "./components/presentation-mode";
import { PrototypeMode } from "./components/prototype-mode";
import { ComponentLibrary } from "./components/component-library";
import { api } from "@/trpc/react";
import { useCanvasState } from "./hooks/use-canvas-state";
import { useCanvasSelection } from "./hooks/use-canvas-selection";
import { useCanvasInteraction } from "./hooks/use-canvas-interaction";
import { useCanvasActions } from "./hooks/use-canvas-actions";
import { useCanvasAI } from "./hooks/use-canvas-ai";

const DEFAULT_SIZE = { width: 480, height: 320 };
const DEFAULT_POSITION = { x: 0, y: 0 };

type ProjectCanvasClientProps = {
	projectId: string;
};

const getJsonVector = (
	value: unknown,
	fallback: { x: number; y: number },
): { x: number; y: number } => {
	if (!value || typeof value !== "object") return fallback;
	const maybe = value as { x?: unknown; y?: unknown };
	const x = typeof maybe.x === "number" ? maybe.x : fallback.x;
	const y = typeof maybe.y === "number" ? maybe.y : fallback.y;
	return { x, y };
};

const getJsonSize = (
	value: unknown,
	fallback: { width: number; height: number },
): { width: number; height: number } => {
	if (!value || typeof value !== "object") return fallback;
	const maybe = value as { width?: unknown; height?: unknown };
	const width = typeof maybe.width === "number" ? maybe.width : fallback.width;
	const height = typeof maybe.height === "number" ? maybe.height : fallback.height;
	return { width, height };
};

const mapTokens = (value: unknown): DesignTokens | null => {
	if (!value || typeof value !== "object") return null;
	const maybe = value as any;

	if (!maybe.colors || !maybe.typography) return null;

	return {
		colors: {
			background: Array.isArray(maybe.colors.background) ? maybe.colors.background : [],
			text: Array.isArray(maybe.colors.text) ? maybe.colors.text : [],
			primary: Array.isArray(maybe.colors.primary) ? maybe.colors.primary : [],
			border: Array.isArray(maybe.colors.border) ? maybe.colors.border : [],
		},
		typography: {
			headingFont: typeof maybe.typography.headingFont === 'string' ? maybe.typography.headingFont : '',
			bodyFont: typeof maybe.typography.bodyFont === 'string' ? maybe.typography.bodyFont : '',
		},
		borderRadius: Array.isArray(maybe.borderRadius) ? maybe.borderRadius : [],
		boxShadow: Array.isArray(maybe.boxShadow) ? maybe.boxShadow : [],
	};
};

const normalizeHistory = (value: unknown): string[] => {
	if (!value || !Array.isArray(value)) return [];
	return value.filter((item): item is string => typeof item === "string");
};
const mapDesign = (record: DbDesign): Design => {
	return {
		...record,
		id: record.id,
		html: record.html ?? "",
		description: record.description ?? record.name,
		position: getJsonVector(record.position, DEFAULT_POSITION),
		size: getJsonSize(record.size, DEFAULT_SIZE),
		viewMode: "preview",
		history: normalizeHistory(record.history),
		tokens: mapTokens(record.tokens),
		isApplyingStyle: false,
	};
};

const mapConnection = (record: DbConnection): Connection => ({
	id: record.id,
	from: {
		designId: record.fromDesignId,
		position: record.fromPosition as PointPosition,
	},
	to: {
		designId: record.toDesignId,
		position: record.toPosition as PointPosition,
	},
});

export function ProjectCanvasClient({ projectId }: ProjectCanvasClientProps) {
	// TRPC Queries
	const [designsData] = api.designs.listByProject.useSuspenseQuery({ projectId });
	const [connectionsData] = api.designConnections.listByProject.useSuspenseQuery({ projectId });

	// Custom Hooks
	const {
		designs,
		setDesigns,
		connections,
		setConnections,
		viewTransform,
		setViewTransform,
		renderedDesigns,
		presentationDesignId,
		setPresentationDesignId,
		prototypeStartId,
		setPrototypeStartId,
		copyingStyleId,
	} = useCanvasState(projectId);

	const {
		selectedDesignIds,
		selectedConnectionId,
		hoveredConnectionId,
		setHoveredConnectionId,
		selectDesign,
		selectConnection,
		clearSelection,
	} = useCanvasSelection(projectId);

	const {
		updateDesign,
		deleteDesigns,
		deleteConnection,
		duplicateDesign,
		copyStyle,
		pasteStyle,
		clearStyleClipboard,
		updateDesignLocal,
		styleClipboard,
	} = useCanvasActions(projectId);

	const {
		prompt,
		setPrompt,
		generationMode,
		setGenerationMode,
		attachedImages,
		setAttachedImages,
		handleGenerate,
		handleModify,
		isGenerating,
		isModifying,
	} = useCanvasAI(projectId);

	const {
		interaction,
		previewConnection,
		connectionTarget,
		setConnectionTarget,
		handleInteractionStart,
		handleInteractionMove,
		handleInteractionEnd,
		handleWheel,
		containerRef,
	} = useCanvasInteraction(projectId);

	const hasInitialFit = useRef(false);

	// Sync data from server
	useEffect(() => {
		setDesigns(designsData.map(mapDesign));
	}, [designsData, setDesigns]);

	useEffect(() => {
		setConnections(connectionsData.map(mapConnection));
	}, [connectionsData, setConnections]);

	// Derived state for UI
	const hasOutgoingConnections = (designId: string) => {
		return connections.some((c) => c.from.designId === designId);
	};

	const hasSelection = selectedDesignIds.length > 0;

	const handleToggleViewMode = (designId: string) => {
		const design = designs.find((d) => d.id === designId);
		if (design) {
			const viewMode = design.viewMode === "preview" ? "code" : "preview";
			updateDesignLocal(designId, { viewMode });
		}
	};

	const handleZoomIn = () => setViewTransform((prev) => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 5) }));
	const handleZoomOut = () => setViewTransform((prev) => ({ ...prev, zoom: Math.max(prev.zoom / 1.2, 0.1) }));
	const handleFitToScreen = () => {
		if (designs.length === 0 || !containerRef.current) {
			setViewTransform({ zoom: 1, pan: { x: 0, y: 0 } });
			return;
		}

		const containerWidth = containerRef.current.clientWidth;
		const containerHeight = containerRef.current.clientHeight;
		const padding = 50;

		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;

		designs.forEach((d) => {
			minX = Math.min(minX, d.position.x);
			minY = Math.min(minY, d.position.y);
			maxX = Math.max(maxX, d.position.x + d.size.width);
			maxY = Math.max(maxY, d.position.y + d.size.height);
		});

		const contentWidth = maxX - minX;
		const contentHeight = maxY - minY;

		if (contentWidth <= 0 || contentHeight <= 0) return;

		const scaleX = (containerWidth - padding * 2) / contentWidth;
		const scaleY = (containerHeight - padding * 2) / contentHeight;
		const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.1), 2);

		const centerX = (minX + maxX) / 2;
		const centerY = (minY + maxY) / 2;

		const newPanX = containerWidth / 2 - centerX * newZoom;
		const newPanY = containerHeight / 2 - centerY * newZoom;

		setViewTransform({
			zoom: newZoom,
			pan: { x: newPanX, y: newPanY },
		});
	};

	useEffect(() => {
		if (designs.length > 0 && containerRef.current && !hasInitialFit.current) {
			handleFitToScreen();
			hasInitialFit.current = true;
		}
	});



	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		// Prevent default to avoid text selection or other browser behaviors during drag
		if (e.button === 0 || e.button === 1) {
			e.preventDefault();
		}

		clearSelection();
		// Allow pan on middle button (1) or left button (0)
		if (e.button === 1 || e.button === 0) {
			handleInteractionStart("root", "pan", e, {});
		}
	};

	const presentationDesign = designs.find((d) => d.id === presentationDesignId);

	if (presentationDesignId && presentationDesign) {
		return (
			<PresentationMode
				design={presentationDesign}
				onClose={() => setPresentationDesignId(null)}
				onUpdateDesign={(designId, updates) => updateDesign({ designId, ...updates })}
				projectId={projectId}
			/>
		);
	}

	if (prototypeStartId) {
		return (
			<PrototypeMode
				projectId={projectId}
				startId={prototypeStartId}
				onClose={() => setPrototypeStartId(null)}
			/>
		);
	}

	return (
		<div className="flex h-screen w-full flex-col overflow-hidden bg-neutral-50 dark:bg-neutral-950">
			<Toolbar
				prompt={prompt}
				setPrompt={setPrompt}
				onSubmit={hasSelection ? handleModify : handleGenerate}
				isLoading={isGenerating || isModifying}
				hasSelection={hasSelection}
				attachedImages={attachedImages}
				setAttachedImages={setAttachedImages}
				generationMode={generationMode}
				setGenerationMode={setGenerationMode}
			/>

			<div className="relative flex-1 overflow-hidden">
				<div
					ref={containerRef}
					className="absolute inset-0 touch-none"
					onMouseMove={handleInteractionMove}
					onMouseUp={handleInteractionEnd}
					onMouseLeave={handleInteractionEnd}
					onMouseDown={handleMouseDown}
					onWheel={handleWheel}
				>
					{designs.length === 0 && !isGenerating && <EmptyCanvas />}
					<Canvas
						designs={renderedDesigns}
						connections={connections}
						viewTransform={viewTransform}
						selectedDesignIds={selectedDesignIds}
						selectedConnectionId={selectedConnectionId}
						hoveredConnectionId={hoveredConnectionId}
						previewConnection={previewConnection}
						connectionTarget={connectionTarget}
						copyingStyleId={copyingStyleId}
						isPastingStyle={false}
						onInteractionStart={handleInteractionStart}
						onHoverConnection={setHoveredConnectionId}
						onConnectionClick={selectConnection}
						onCanvasMouseDown={handleMouseDown}
						onMouseEnterPoint={(designId, position) => setConnectionTarget({ designId, position })}
						onMouseLeavePoint={() => setConnectionTarget(null)}
						onDuplicate={(id) => duplicateDesign(id, designs)}
						onCopyStyle={(id) => copyStyle(id, designs)}
						onDeleteDesign={(id) => deleteDesigns([id])}
						onDeleteConnection={deleteConnection}
						onToggleViewMode={handleToggleViewMode}
						onEnterPresentationMode={setPresentationDesignId}
						onStartPrototype={setPrototypeStartId}
						onWheel={() => { }}
					/>
				</div>

				<Legend />

				<div className="absolute bottom-4 right-4 z-10">
					<ZoomControls
						zoom={viewTransform.zoom}
						onZoomIn={handleZoomIn}
						onZoomOut={handleZoomOut}
						onFitToScreen={handleFitToScreen}
					/>
				</div>
			</div>

			<ComponentLibrary projectId={projectId} />

			{styleClipboard && (
				<StyleClipboardBanner
					sourceDescription={styleClipboard.sourceDescription}
					onClear={clearStyleClipboard}
				/>
			)}
		</div>
	);
}

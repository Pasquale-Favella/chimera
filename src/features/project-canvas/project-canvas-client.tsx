"use client";

import { useEffect } from "react";


import { EmptyCanvas } from "./components/empty-canvas";
import Canvas from "./components/canvas";
import { Legend } from "./components/legend";
import { StyleClipboardBanner } from "./components/style-clipboard-banner";
import { Toolbar } from "./components/toolbar";
import { ZoomControls } from "./components/zoom-controls";
import { PresentationMode } from "./components/presentation-mode";
import { PrototypeMode } from "./components/prototype-mode";
import { ComponentLibrary } from "./components/component-library";
import { ProjectIdProvider } from "./contexts/project-id-context";
import { CanvasContainerProvider, useCanvasContainer } from "./contexts/canvas-container-context";
import { api } from "@/trpc/react";
import { useCanvasState } from "./hooks/use-canvas-state";
import { useCanvasSelection } from "./hooks/use-canvas-selection";
import { useCanvasInteraction } from "./hooks/use-canvas-interaction";
import { useCanvasActions } from "./hooks/use-canvas-actions";
import { useCanvasAI } from "./hooks/use-canvas-ai";
import { mapConnection, mapDesign } from "./utils/canvas-utils";



type ProjectCanvasClientProps = {
	projectId: string;
};

function CanvasContent({ projectId }: { projectId: string }) {
	// TRPC Queries
	const [designsData] = api.designs.listByProject.useSuspenseQuery({ projectId });
	const [connectionsData] = api.designConnections.listByProject.useSuspenseQuery({ projectId });

	// Custom Hooks
	const {
		designs,
		setDesigns,
		setConnections,
		presentationDesignId,
		setPresentationDesignId,
		prototypeStartId,
		setPrototypeStartId,
	} = useCanvasState(projectId);

	const {
		clearSelection,
	} = useCanvasSelection(projectId);

	const {
		updateDesign,
		clearStyleClipboard,
		styleClipboard,
	} = useCanvasActions(projectId);

	const {
		isGenerating,
	} = useCanvasAI(projectId);

	const {
		handleInteractionStart,
		handleInteractionMove,
		handleInteractionEnd,
		handleWheel,
	} = useCanvasInteraction(projectId);

	const { containerRef } = useCanvasContainer();

	// Sync data from server
	useEffect(() => {
		setDesigns(designsData.map(mapDesign));
	}, [designsData, setDesigns]);

	useEffect(() => {
		setConnections(connectionsData.map(mapConnection));
	}, [connectionsData, setConnections]);


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

	return (
		<>
			{prototypeStartId && (
				<PrototypeMode
					projectId={projectId}
					startId={prototypeStartId}
					onClose={() => setPrototypeStartId(null)}
				/>
			)}
			{presentationDesignId && (
				<PresentationMode
					design={designs.find((d) => d.id === presentationDesignId)!}
					onClose={() => setPresentationDesignId(null)}
					onUpdateDesign={(designId, updates) => updateDesign({ designId, ...updates })}
					projectId={projectId}
				/>
			)}
			<div className="flex h-screen w-full flex-col overflow-hidden bg-neutral-50 dark:bg-neutral-950 select-none">
				<Toolbar />

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
						<Canvas />
					</div>

					<Legend />

					<div className="absolute bottom-4 right-4 z-10">
						<ZoomControls />
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
		</>
	);
}

export function ProjectCanvasClient({ projectId }: ProjectCanvasClientProps) {
	return (
		<ProjectIdProvider projectId={projectId}>
			<CanvasContainerProvider>
				<CanvasContent projectId={projectId} />
			</CanvasContainerProvider>
		</ProjectIdProvider>
	);
}

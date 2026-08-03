"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { ComponentLibrary } from "./components/component-library";
import { EmptyCanvas } from "./components/empty-canvas";
import { Legend } from "./components/legend";
import { MemoryStatusBanner } from "./components/memory-status-banner";
import { PresentationMode } from "./components/presentation-mode";
import { PrototypeMode } from "./components/prototype-mode";
import ReactFlowCanvas from "./components/react-flow-canvas";
import { StyleClipboardBanner } from "./components/style-clipboard-banner";
import { Toolbar } from "./components/toolbar";
import { ZoomControls } from "./components/zoom-controls";
import { ProjectIdProvider } from "./contexts/project-id-context";
import { useCanvasActions } from "./hooks/use-canvas-actions";
import { useCanvasAI } from "./hooks/use-canvas-ai";
import { useCanvasState } from "./hooks/use-canvas-state";
import { useDesignSystem } from "./hooks/use-design-system";

type ProjectCanvasClientProps = {
	projectId: string;
};

function CanvasContent({ projectId }: { projectId: string }) {
	// Custom Hooks
	const {
		designs,
		presentationDesignId,
		setPresentationDesignId,
		prototypeStartId,
		setPrototypeStartId,
	} = useCanvasState(projectId);

	const { updateDesign, clearStyleClipboard, styleClipboard } =
		useCanvasActions(projectId);

	useDesignSystem(projectId);

	const { isGenerating } = useCanvasAI(projectId);

	return (
		<>
			{prototypeStartId && (
				<PrototypeMode
					onClose={() => setPrototypeStartId(null)}
					projectId={projectId}
					startId={prototypeStartId}
				/>
			)}
			{presentationDesignId && (
				<PresentationMode
					design={designs.find((d) => d.id === presentationDesignId)!}
					onClose={() => setPresentationDesignId(null)}
					onUpdateDesign={(designId, updates) =>
						updateDesign({ designId, ...updates })
					}
					projectId={projectId}
				/>
			)}
			<div className="flex h-screen w-full select-none flex-col overflow-hidden bg-neutral-50 dark:bg-neutral-950">
				<Toolbar />

				<div className="relative flex-1 overflow-hidden">
					{designs.length === 0 && !isGenerating && <EmptyCanvas />}
					<ReactFlowCanvas />

					<MemoryStatusBanner projectId={projectId} />

					<Legend />

					<div className="absolute right-4 bottom-4 z-10">
						<ZoomControls />
					</div>
				</div>

				<ComponentLibrary projectId={projectId} />

				{styleClipboard && (
					<StyleClipboardBanner
						onClear={clearStyleClipboard}
						sourceDescription={styleClipboard.sourceDescription}
					/>
				)}
			</div>
		</>
	);
}

export function ProjectCanvasClient({ projectId }: ProjectCanvasClientProps) {
	return (
		<ProjectIdProvider projectId={projectId}>
			<ReactFlowProvider>
				<CanvasContent projectId={projectId} />
			</ReactFlowProvider>
		</ProjectIdProvider>
	);
}

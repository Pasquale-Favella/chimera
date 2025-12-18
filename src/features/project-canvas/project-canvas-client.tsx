"use client";

import { useEffect } from "react";
import { ReactFlowProvider } from "@xyflow/react";

import { EmptyCanvas } from "./components/empty-canvas";
import ReactFlowCanvas from "./components/react-flow-canvas";
import { Legend } from "./components/legend";
import { StyleClipboardBanner } from "./components/style-clipboard-banner";
import { Toolbar } from "./components/toolbar";
import { ZoomControls } from "./components/zoom-controls";
import { PresentationMode } from "./components/presentation-mode";
import { PrototypeMode } from "./components/prototype-mode";
import { ComponentLibrary } from "./components/component-library";
import { ProjectIdProvider } from "./contexts/project-id-context";
import { api } from "@/trpc/react";
import { useCanvasState } from "./hooks/use-canvas-state";
import { useCanvasActions } from "./hooks/use-canvas-actions";
import { useCanvasAI } from "./hooks/use-canvas-ai";
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

	const {
		updateDesign,
		clearStyleClipboard,
		styleClipboard,
	} = useCanvasActions(projectId);

	useDesignSystem(projectId);

	const {
		isGenerating,
	} = useCanvasAI(projectId);


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
					{designs.length === 0 && !isGenerating && <EmptyCanvas />}
					<ReactFlowCanvas />

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
			<ReactFlowProvider>
				<CanvasContent projectId={projectId} />
			</ReactFlowProvider>
		</ProjectIdProvider>
	);
}

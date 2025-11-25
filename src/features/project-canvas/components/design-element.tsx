'use client';

import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ConnectionPoint, Design, PointPosition } from "@/types/design";

import {
	Code,
	Copy,
	Loader2,
	Maximize2,
	Paintbrush,
	Play,
	PlusCircle,
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

interface DesignElementProps {
	design: Design;
	isSelected: boolean;
	connectionTarget: ConnectionPoint | null;
	zoom: number;
	isCopyingStyle: boolean;
	isPastingStyle: boolean;
	hasOutgoingConnections: boolean;
	onInteractionStart: (
		type: "drag" | "resize" | "connect",
		e: React.MouseEvent,
		details: { handle?: string; position?: PointPosition },
	) => void;
	onMouseEnterPoint: (designId: string, position: PointPosition) => void;
	onMouseLeavePoint: () => void;
	onDuplicate: (designId: string) => void;
	onCopyStyle: (designId: string) => void;
	onToggleViewMode: (designId: string) => void;
	onDelete: (designId: string) => void;
	onEnterPresentationMode: (designId: string) => void;
	onStartPrototype: (designId: string) => void;
}

const resizeHandles = ["top-left", "top-right", "bottom-left", "bottom-right"];
const connectionPoints: PointPosition[] = ["top", "right", "bottom", "left"];

import { Editor, type OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

const CodeEditorLoader = () => (
	<div className="flex h-full w-full items-center justify-center text-muted-foreground">
		<Loader2 className="h-6 w-6 animate-spin" />
	</div>
);

const CodeView = ({ html }: { html: string }) => {
	const { resolvedTheme } = useTheme();

	const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
		setTimeout(() => {
			editor.getAction("editor.action.formatDocument")?.run();
		}, 200);
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
};

const DesignElement = ({
	design,
	isSelected,
	connectionTarget,
	zoom,
	isCopyingStyle,
	isPastingStyle,
	hasOutgoingConnections,
	onInteractionStart,
	onMouseEnterPoint,
	onMouseLeavePoint,
	onDuplicate,
	onCopyStyle,
	onToggleViewMode,
	onDelete,
	onEnterPresentationMode,
	onStartPrototype,
}: DesignElementProps) => {
	const iframeContent = useMemo(
		() => `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="overflow-hidden bg-transparent">
          <div id="wrapper">${design.html}</div>
        </body>
      </html>
    `,
		[design.html],
	);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (e.button !== 0) return;
		onInteractionStart("drag", e, {});
	};

	const toolbarScale = useMemo(() => {
		const scaleFactor = 1 / zoom;
		return Math.max(0.5, Math.min(scaleFactor, 2));
	}, [zoom]);

	const cursorClass = useMemo(() => {
		if (isPastingStyle) return "cursor-copy";
		if (isSelected) return "cursor-move";
		return "cursor-pointer";
	}, [isSelected, isPastingStyle]);

	return (
		<div
			className="group absolute"
			style={{
				left: `${design.position.x}px`,
				top: `${design.position.y}px`,
				width: `${design.size.width}px`,
				height: `${design.size.height}px`,
			}}
		>
			<div
				className="pointer-events-auto absolute bottom-full left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				style={{
					marginBottom: "8px",
					transform: `translate(-50%, 0) scale(${toolbarScale})`,
					transformOrigin: "bottom center",
				}}
			>
				<div className="flex items-center rounded-full border border-border bg-card/90 backdrop-blur-md shadow-lg">
					{hasOutgoingConnections && (
						<Button
							onClick={(e) => {
								e.stopPropagation();
								onStartPrototype(design.id);
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
							onCopyStyle(design.id);
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
							onDuplicate(design.id);
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
							onToggleViewMode(design.id);
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
							onEnterPresentationMode(design.id);
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
										onDelete(design.id);
									}}
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

				</div>
			</div>

			<div
				className={cn(
					"relative h-full w-full rounded-lg shadow-xl transition-shadow duration-200",
					"hover:shadow-primary/30",
					cursorClass,
					design.viewMode === "preview" ? "bg-card" : "bg-transparent",
				)}
				onMouseDown={handleMouseDown}
			>
				{design.isApplyingStyle && (
					<div className="absolute inset-0 z-30 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-sm">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</div>
				)}
				<div
					className={cn(
						"absolute inset-0 rounded-lg ring-offset-4 ring-offset-background transition-all duration-200",
						isSelected ? "ring-2 ring-primary" : "ring-1 ring-border group-hover:ring-primary",
					)}
				/>

				{design.viewMode === "preview" ? (
					<iframe
						srcDoc={iframeContent}
						title={design.description || ""}
						sandbox="allow-scripts"
						className="h-full w-full rounded-lg bg-transparent"
						scrolling="no"
					/>
				) : (
					<CodeView html={design.html} />
				)}

				<div
					className={cn(
						"absolute -top-8 left-0 rounded-t-md bg-muted/80 px-2 py-1 text-xs text-foreground backdrop-blur-sm transition-opacity",
						isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
					)}
				>
					{design.description}
				</div>

				{isSelected &&
					resizeHandles.map((handle) => {
						const cursorClass =
							handle === "top-left" || handle === "bottom-right" ? "cursor-nwse-resize" : "cursor-nesw-resize";
						return (
							<div
								key={handle}
								className={cn(
									"absolute z-10 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary",
									cursorClass,
									handle.includes("top") ? "-top-[7px]" : "-bottom-[7px]",
									handle.includes("left") ? "-left-[7px]" : "-right-[7px]",
								)}
								onMouseDown={(e) => {
									e.stopPropagation();
									onInteractionStart("resize", e, { handle });
								}}
							/>
						);
					})}

				<div className={isSelected ? "" : "opacity-0 transition-opacity duration-150 group-hover:opacity-100"}>
					{connectionPoints.map((pos) => {
						const isTarget = connectionTarget?.designId === design.id && connectionTarget?.position === pos;
						return (
							<div
								key={pos}
								className={cn(
									"pointer-events-auto absolute z-20 flex h-8 w-8 items-center justify-center transition-all",
									pos === "top"
										? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
										: pos === "bottom"
											? "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
											: pos === "left"
												? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
												: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
								)}
								onMouseDown={(e) => {
									e.stopPropagation();
									onInteractionStart("connect", e, { position: pos });
								}}
								onMouseEnter={() => onMouseEnterPoint(design.id, pos)}
								onMouseLeave={onMouseLeavePoint}
							>
								<div
									className={cn(
										"h-4 w-4 rounded-full border-2 border-background shadow-sm transition-all duration-200",
										isTarget
											? "scale-125 bg-primary"
											: "bg-muted-foreground hover:scale-125 hover:bg-primary",
									)}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default DesignElement;


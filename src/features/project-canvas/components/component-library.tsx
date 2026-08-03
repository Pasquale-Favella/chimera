import { useAtom } from "jotai";
import {
	Book,
	Code,
	Database,
	Info,
	LayoutGrid,
	Loader2,
	Palette,
	PanelLeft,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useDesignSystem } from "../hooks/use-design-system";
import {
	libraryActiveTabFamily,
	libraryOpenFamily,
} from "../stores/canvas-store";
import { defaultDesignSystem } from "../stores/design-system-store";
import { ComponentCard } from "./component-card";
import { ComponentCardSkeleton } from "./component-card-skeleton";
import { DesignSystemEditor } from "./design-system-editor";
import { DesignSystemShowcase } from "./design-system-showcase";
import { MemoryPanel } from "./memory-panel";

interface ComponentLibraryProps {
	projectId: string;
}

export function ComponentLibrary({ projectId }: ComponentLibraryProps) {
	const [isOpen, setIsOpen] = useAtom(libraryOpenFamily(projectId));
	const [activeTab, setActiveTab] = useAtom(libraryActiveTabFamily(projectId));
	const {
		designSystem,
		setDesignSystem,
		serverDesignSystem: fetchedDesignSystem,
		isLoading: isLoadingDS,
		revertToDefault,
	} = useDesignSystem(projectId);

	const utils = api.useUtils();

	// Components Query
	const { data: components, isLoading: isLoadingComponents } =
		api.components.listByProject.useQuery(
			{ projectId },
			{ enabled: isOpen && activeTab === "library" },
		);

	// Reset styling when switching projects to avoid stale state from previous project
	useEffect(() => {
		revertToDefault();
	}, [projectId, revertToDefault]);

	const deleteMutation = api.components.delete.useMutation({
		onSuccess: () => {
			utils.components.listByProject.invalidate({ projectId });
			toast.success("Component deleted");
		},
		onError: () => {
			toast.error("Failed to delete component");
		},
	});

	const updateMutation = api.components.update.useMutation({
		onSuccess: () => {
			utils.components.listByProject.invalidate({ projectId });
			toast.success("Component renamed");
		},
		onError: () => {
			toast.error("Failed to rename component");
		},
	});

	const saveDesignSystemMutation = api.designSystem.upsert.useMutation({
		onSuccess: () => {
			utils.designSystem.get.invalidate({ projectId });
			toast.success("Design System saved");
		},
		onError: () => {
			toast.error("Failed to save Design System");
		},
	});

	const handleCopy = (html: string) => {
		navigator.clipboard.writeText(html);
		toast.success("Component code copied to clipboard");
	};

	const handleSaveDesignSystem = () => {
		saveDesignSystemMutation.mutate({
			projectId,
			data: {
				...designSystem,
				// Ensure proper types for JSON fields if needed
			},
		});
	};

	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	// Revert changes on close if not saved (simulated by resetting to fetched state)
	// Since we don't have a specific "saved" flag that persists locally beyond mutation,
	// we simply reset strict state when the dialog closes to ensure next open starts fresh from DB
	// (or keeps current if cache is up to date, but here we want to discard *unsaved* changes in the local atom).
	// Revert changes on close if not saved
	useEffect(() => {
		if (!isOpen && fetchedDesignSystem) {
			setDesignSystem({
				...defaultDesignSystem,
				...(fetchedDesignSystem as any),
			});
		}
	}, [isOpen, fetchedDesignSystem, setDesignSystem]);

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button
					className="absolute top-20 left-4 z-10 h-10 w-10 rounded-full bg-background shadow-md hover:bg-muted"
					size="icon"
					title="Component Library & Design System"
					variant="outline"
				>
					<Book className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="!max-w-none !w-[100vw] !h-[100vh] !rounded-none !border-0 flex flex-col gap-0 overflow-hidden p-0"
				showCloseButton={false}
			>
				{/* Header / Top Bar */}
				<div className="z-10 flex items-center justify-between border-b bg-background px-6 py-4">
					<div className="flex items-center gap-2">
						<Button
							className="-ml-2 mr-2"
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							size="icon"
							title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
							variant="ghost"
						>
							<PanelLeft className="h-5 w-5" />
						</Button>
						<Book className="h-5 w-5" />
						<DialogTitle className="flex items-center gap-3 font-semibold text-lg">
							Project Library
							{!fetchedDesignSystem && activeTab === "design-system" && (
								<span className="rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 font-normal text-amber-800 text-xs dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
									Default System (Unsaved)
								</span>
							)}
						</DialogTitle>
					</div>
					<DialogClose asChild>
						<Button
							className="h-8 w-8 rounded-full"
							size="icon"
							variant="ghost"
						>
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</Button>
					</DialogClose>
				</div>

				<div className="flex min-h-0 flex-1">
					{/* Sidebar Navigation */}
					<div
						className={cn(
							"flex flex-col gap-2 overflow-hidden border-r bg-muted/10 p-4 transition-all duration-300 ease-in-out",
							isSidebarOpen ? "w-64" : "w-16 px-2",
						)}
					>
						<Button
							className={cn(
								"justify-start gap-2 overflow-hidden",
								!isSidebarOpen && "justify-center px-0",
							)}
							onClick={() => setActiveTab("library")}
							title={!isSidebarOpen ? "My Components" : undefined}
							variant={activeTab === "library" ? "secondary" : "ghost"}
						>
							<LayoutGrid className="h-4 w-4 shrink-0" />
							<span
								className={cn(
									"transition-opacity duration-200",
									!isSidebarOpen && "hidden w-0 opacity-0",
								)}
							>
								My Components
							</span>
						</Button>
						<Button
							className={cn(
								"justify-start gap-2 overflow-hidden",
								!isSidebarOpen && "justify-center px-0",
							)}
							onClick={() => setActiveTab("design-system")}
							title={!isSidebarOpen ? "Design System" : undefined}
							variant={activeTab === "design-system" ? "secondary" : "ghost"}
						>
							<Palette className="h-4 w-4 shrink-0" />
							<span
								className={cn(
									"transition-opacity duration-200",
									!isSidebarOpen && "hidden w-0 opacity-0",
								)}
							>
								Design System
							</span>
						</Button>
						<Button
							className={cn(
								"justify-start gap-2 overflow-hidden",
								!isSidebarOpen && "justify-center px-0",
							)}
							onClick={() => setActiveTab("memory")}
							title={!isSidebarOpen ? "Project Memory" : undefined}
							variant={activeTab === "memory" ? "secondary" : "ghost"}
						>
							<Database className="h-4 w-4 shrink-0" />
							<span
								className={cn(
									"transition-opacity duration-200",
									!isSidebarOpen && "hidden w-0 opacity-0",
								)}
							>
								Project Memory
							</span>
						</Button>
					</div>

					{/* Main Content Area */}
					<div className="flex min-w-0 flex-1 flex-col bg-background">
						{activeTab === "library" && (
							<ScrollArea className="flex-1">
								<div className="mx-auto w-full max-w-5xl p-8">
									<div className="mb-6 flex items-center justify-between">
										<div>
											<h2 className="font-semibold text-2xl tracking-tight">
												My Components
											</h2>
											<p className="text-muted-foreground">
												Reusable components extracted from your designs.
											</p>
										</div>
									</div>

									<Alert className="mb-6 border-primary/20 bg-primary/5">
										<Info className="h-4 w-4 text-primary" />
										<AlertDescription className="text-primary text-sm">
											These components are automatically provided to the AI as
											context for future generations.
										</AlertDescription>
									</Alert>

									{isLoadingComponents ? (
										<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
											{[1, 2, 3, 4, 5, 6].map((i) => (
												<ComponentCardSkeleton key={i} />
											))}
										</div>
									) : components?.length === 0 ? (
										<div className="rounded-xl border-2 border-dashed py-20 text-center text-muted-foreground">
											<Code className="mx-auto mb-4 h-12 w-12 opacity-50" />
											<p className="font-medium text-lg">
												No components saved yet
											</p>
											<p className="mx-auto mt-2 max-w-sm text-sm">
												Enter Presentation Mode and click the "Extract
												Component" button on any design to save it here.
											</p>
										</div>
									) : (
										<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
											{components?.map((component) => (
												<ComponentCard
													component={component}
													key={component.id}
													onCopy={handleCopy}
													onDelete={(id) =>
														deleteMutation.mutate({ componentId: id })
													}
													onRename={(id, name) =>
														updateMutation.mutate({ componentId: id, name })
													}
												/>
											))}
										</div>
									)}
								</div>
							</ScrollArea>
						)}

						{activeTab === "design-system" && (
							<div className="flex h-full flex-1 flex-col overflow-hidden lg:flex-row">
								<div className="flex h-1/2 w-full flex-col overflow-hidden border-r border-b bg-card p-6 lg:h-full lg:w-[400px] lg:border-b-0">
									<div className="min-h-0 flex-1">
										<DesignSystemEditor projectId={projectId} />
									</div>
									<div className="mt-auto border-t pt-4">
										<Button
											className="w-full"
											disabled={saveDesignSystemMutation.isPending}
											onClick={handleSaveDesignSystem}
										>
											{saveDesignSystemMutation.isPending && (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											)}
											Save Changes
										</Button>
									</div>
								</div>
								<div className="flex h-1/2 flex-1 flex-col overflow-hidden bg-muted/10 p-6 lg:h-full">
									<DesignSystemShowcase projectId={projectId} />
								</div>
							</div>
						)}
						{activeTab === "memory" && (
							<div className="min-h-0 flex-1">
								<MemoryPanel enabled={isOpen} projectId={projectId} />
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

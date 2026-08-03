import {
	Check,
	Copy,
	Database,
	Eye,
	Loader2,
	MessageSquare,
	Pencil,
	Plus,
	Save,
	Sparkles,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
	appendStyleDirective,
	STYLE_MEMORY_TEMPLATE,
} from "../utils/style-memory-utils";
import { StyleMemoryPreview } from "./style-memory-preview";

interface MemoryPanelProps {
	projectId: string;
	enabled: boolean;
}

const ROLE_STYLES: Record<string, string> = {
	user: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
	assistant:
		"bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
	tool: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
	system:
		"bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
};

function formatDate(value: Date | string): string {
	const date = typeof value === "string" ? new Date(value) : value;
	return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
}

/**
 * Memory hub for the canvas. Left column: the project's persisted style
 * memory — rendered as a live visual preview with one-click actions
 * (synthesize, add directive, copy, clear) plus a raw markdown editor.
 * Right column: the memory history (threads + messages).
 */
export function MemoryPanel({ projectId, enabled }: MemoryPanelProps) {
	const utils = api.useUtils();

	const { data, isLoading } = api.memory.getProjectState.useQuery(
		{ projectId },
		{ enabled },
	);

	const [viewMode, setViewMode] = useState<"preview" | "edit">("preview");
	const [draft, setDraft] = useState("");
	const [isAddingDirective, setIsAddingDirective] = useState(false);
	const [directiveDraft, setDirectiveDraft] = useState("");

	const hasMemory = Boolean(data?.workingMemory?.trim());

	useEffect(() => {
		if (data) {
			setDraft(data.workingMemory ?? "");
		}
	}, [data]);

	const invalidateMemory = () => {
		utils.memory.getProjectState.invalidate({ projectId });
		utils.memory.getStatus.invalidate({ projectId });
	};

	const saveMutation = api.memory.updateStyleMemory.useMutation({
		onSuccess: () => {
			invalidateMemory();
			toast.success("Style memory saved");
			setViewMode("preview");
		},
		onError: () => {
			toast.error("Failed to save style memory");
		},
	});

	const clearMutation = api.memory.clearStyleMemory.useMutation({
		onSuccess: () => {
			invalidateMemory();
			toast.success("Style memory cleared");
			setViewMode("preview");
		},
		onError: () => {
			toast.error("Failed to clear style memory");
		},
	});

	const synthesizeMutation = api.designAi.aiStyleMemory.useMutation({
		onSuccess: () => {
			invalidateMemory();
			toast.success("Style memory synthesized from your designs");
			setViewMode("preview");
		},
		onError: () => {
			toast.error("Failed to synthesize style memory");
		},
	});

	const handleSave = () => {
		saveMutation.mutate({ projectId, workingMemory: draft });
	};

	const handleAddDirective = () => {
		const directive = directiveDraft.trim();
		if (!directive) {
			return;
		}
		const next = appendStyleDirective(data?.workingMemory ?? "", directive);
		saveMutation.mutate(
			{ projectId, workingMemory: next },
			{
				onSuccess: () => {
					setDirectiveDraft("");
					setIsAddingDirective(false);
				},
			},
		);
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(data?.workingMemory ?? "");
			toast.success("Style memory copied to clipboard");
		} catch {
			toast.error("Could not copy to clipboard");
		}
	};

	return (
		<div className="flex h-full flex-col overflow-hidden lg:flex-row">
			{/* Style memory */}
			<div className="flex w-full flex-col gap-4 overflow-hidden border-b p-6 lg:w-[45%] lg:border-r lg:border-b-0">
				{/* Header */}
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<h2 className="flex items-center gap-2 font-semibold text-2xl tracking-tight">
							<Sparkles className="h-5 w-5 shrink-0 text-primary" />
							Style Memory
						</h2>
						<p className="text-muted-foreground text-sm">
							What the AI remembers about your project&apos;s style — used in
							every generation.
						</p>
					</div>
					<div className="flex shrink-0 flex-col items-end gap-1.5">
						<Badge
							className={cn(
								"gap-1",
								hasMemory
									? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
									: "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
							)}
							variant="outline"
						>
							<span
								className={cn(
									"h-1.5 w-1.5 rounded-full",
									hasMemory ? "bg-emerald-500" : "bg-amber-500",
								)}
							/>
							{hasMemory ? "Active" : "No memory yet"}
						</Badge>
						{data?.lastActivityAt && (
							<p className="text-[10px] text-muted-foreground">
								Last activity {formatDate(data.lastActivityAt)}
							</p>
						)}
					</div>
				</div>

				{/* View toggle */}
				<div className="flex w-fit items-center gap-1 rounded-lg border bg-muted/20 p-0.5">
					<Button
						className="h-7 gap-1.5 px-3"
						onClick={() => setViewMode("preview")}
						size="sm"
						variant={viewMode === "preview" ? "secondary" : "ghost"}
					>
						<Eye className="h-3.5 w-3.5" />
						Preview
					</Button>
					<Button
						className="h-7 gap-1.5 px-3"
						onClick={() => setViewMode("edit")}
						size="sm"
						variant={viewMode === "edit" ? "secondary" : "ghost"}
					>
						<Pencil className="h-3.5 w-3.5" />
						Edit
					</Button>
				</div>

				{/* Content */}
				<div className="flex min-h-0 flex-1 flex-col">
					{isLoading ? (
						<div className="flex h-full items-center justify-center py-16 text-muted-foreground">
							<Loader2 className="h-5 w-5 animate-spin" />
						</div>
					) : viewMode === "preview" ? (
						<ScrollArea className="min-h-40 flex-1 pr-2">
							<StyleMemoryPreview markdown={data?.workingMemory ?? null} />
						</ScrollArea>
					) : (
						<>
							<ScrollArea className="min-h-40 flex-1">
								<Textarea
									className="min-h-72 resize-none font-mono text-xs leading-relaxed"
									onChange={(event) => setDraft(event.target.value)}
									placeholder={STYLE_MEMORY_TEMPLATE}
									value={draft}
								/>
							</ScrollArea>
							<div className="flex items-center justify-between gap-2 border-t pt-4">
								<Button
									onClick={() => setDraft(STYLE_MEMORY_TEMPLATE)}
									size="sm"
									variant="outline"
								>
									Reset to template
								</Button>
								<Button
									disabled={
										saveMutation.isPending ||
										draft === (data?.workingMemory ?? "")
									}
									onClick={handleSave}
									size="sm"
								>
									{saveMutation.isPending ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<Save className="mr-2 h-4 w-4" />
									)}
									Save
								</Button>
							</div>
						</>
					)}
				</div>

				{/* Actions */}
				<div className="flex flex-col gap-2 border-t pt-2">
					{isAddingDirective && (
						<div className="flex items-center gap-2">
							<Input
								autoFocus
								className="h-8 text-sm"
								onChange={(event) => setDirectiveDraft(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										handleAddDirective();
									}
								}}
								placeholder="e.g. Use generous white space"
								value={directiveDraft}
							/>
							<Button
								className="h-8 px-2"
								disabled={saveMutation.isPending || !directiveDraft.trim()}
								onClick={handleAddDirective}
								size="sm"
							>
								{saveMutation.isPending ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Check className="h-4 w-4" />
								)}
							</Button>
						</div>
					)}
					<div className="flex flex-wrap items-center gap-2">
						<Button
							disabled={synthesizeMutation.isPending}
							onClick={() =>
								synthesizeMutation.mutate({
									projectId,
									prompt: "",
								})
							}
							size="sm"
							variant="secondary"
						>
							{synthesizeMutation.isPending ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Sparkles className="mr-2 h-4 w-4" />
							)}
							Synthesize from designs
						</Button>
						<Button
							onClick={() => {
								setIsAddingDirective((open) => !open);
								setDirectiveDraft("");
							}}
							size="sm"
							variant="outline"
						>
							<Plus className="mr-2 h-4 w-4" />
							Add directive
						</Button>
						<Button
							disabled={!hasMemory}
							onClick={handleCopy}
							size="sm"
							variant="outline"
						>
							<Copy className="mr-2 h-4 w-4" />
							Copy
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									className="text-destructive hover:text-destructive"
									disabled={!hasMemory || clearMutation.isPending}
									size="sm"
									variant="outline"
								>
									{clearMutation.isPending ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<Trash2 className="mr-2 h-4 w-4" />
									)}
									Clear
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Clear style memory?</AlertDialogTitle>
									<AlertDialogDescription>
										This permanently removes the project&apos;s style memory.
										Future generations will start without style context until
										memory is rebuilt.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => clearMutation.mutate({ projectId })}
									>
										Clear
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</div>

			{/* Memory history (threads + messages) */}
			<div className="flex w-full min-w-0 flex-col lg:w-[55%]">
				<div className="flex items-center gap-2 px-6 pt-6 pb-2">
					<Database className="h-5 w-5 text-primary" />
					<h2 className="font-semibold text-xl tracking-tight">
						Memory History
					</h2>
				</div>
				<div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden p-6 pt-3 lg:flex-row">
					{/* Threads */}
					<div className="flex min-h-0 w-full flex-col lg:w-2/5">
						<h3 className="mb-2 flex items-center gap-2 font-medium text-muted-foreground text-sm">
							<MessageSquare className="h-4 w-4" />
							Threads
						</h3>
						<ScrollArea className="min-h-32 flex-1 rounded-lg border bg-muted/10 p-3">
							{isLoading ? (
								<p className="py-4 text-center text-muted-foreground text-sm">
									Loading…
								</p>
							) : data?.threads.length === 0 ? (
								<p className="py-4 text-center text-muted-foreground text-sm">
									No threads yet.
								</p>
							) : (
								<ul className="space-y-2">
									{data?.threads.map((thread) => (
										<li
											className="rounded-md border bg-background p-3 text-xs"
											key={thread.id}
										>
											<p className="truncate font-medium">
												{thread.title ?? thread.id}
											</p>
											<p className="mt-1 truncate text-muted-foreground">
												{thread.id}
											</p>
											<p className="mt-0.5 text-muted-foreground">
												Updated {formatDate(thread.updatedAt)}
											</p>
										</li>
									))}
								</ul>
							)}
						</ScrollArea>
					</div>

					{/* Messages */}
					<div className="flex min-h-0 w-full flex-col lg:w-3/5">
						<h3 className="mb-2 flex items-center gap-2 font-medium text-muted-foreground text-sm">
							<MessageSquare className="h-4 w-4" />
							Messages
						</h3>
						<ScrollArea className="min-h-32 flex-1 rounded-lg border bg-muted/10 p-3">
							{isLoading ? (
								<p className="py-4 text-center text-muted-foreground text-sm">
									Loading…
								</p>
							) : data?.messages.length === 0 ? (
								<p className="py-4 text-center text-muted-foreground text-sm">
									No messages yet. Run a generation to record conversation
									history.
								</p>
							) : (
								<ul className="space-y-2">
									{data?.messages.map((message) => (
										<li
											className="rounded-md border bg-background p-3"
											key={message.id}
										>
											<div className="mb-1.5 flex items-center justify-between gap-2">
												<Badge
													className={cn(
														"capitalize",
														ROLE_STYLES[message.role] ?? ROLE_STYLES.tool,
													)}
												>
													{message.role}
												</Badge>
												<span className="text-[10px] text-muted-foreground">
													{formatDate(message.createdAt)}
												</span>
											</div>
											<p className="line-clamp-4 whitespace-pre-wrap break-words text-foreground text-xs">
												{message.text || "(no text)"}
											</p>
										</li>
									))}
								</ul>
							)}
						</ScrollArea>
					</div>
				</div>
			</div>
		</div>
	);
}

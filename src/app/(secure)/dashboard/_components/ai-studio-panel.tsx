"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

type AIStudioPanelProps = {
	projectId?: string;
	projectName?: string;
};

const counts = ["1", "2", "3"] as const;
const defaultStatus =
	"Design outputs are saved to your project automatically so your team can iterate immediately.";

type AIMode = "concept" | "flow" | "modify";

type StatusTone = "muted" | "success" | "error";

export function AIStudioPanel({ projectId, projectName }: AIStudioPanelProps) {
	const utils = api.useUtils();
	const [prompt, setPrompt] = useState("");
	const [namePrefix, setNamePrefix] = useState("AI Concept");
	const [count, setCount] = useState<string>(counts[0] ?? "1");
	const [mode, setMode] = useState<AIMode>("concept");
	const [previewHtml, setPreviewHtml] = useState("");
	const [status, setStatus] = useState<{ message: string; tone: StatusTone }>({
		message: defaultStatus,
		tone: "muted",
	});
	const [selectedDesignIds, setSelectedDesignIds] = useState<string[]>([]);

	const designsQuery = api.designs.listByProject.useQuery(
		{ projectId: projectId ?? "" },
		{
			enabled: Boolean(projectId),
		},
	);

	useEffect(() => {
		if (!projectId) {
			setSelectedDesignIds([]);
			setPreviewHtml("");
			setStatus({ message: defaultStatus, tone: "muted" });
		}
	}, [projectId]);

	useEffect(() => {
		if (!designsQuery.data?.length) {
			setSelectedDesignIds([]);
			return;
		}
		setSelectedDesignIds((previous) =>
			previous.filter((id) => designsQuery.data?.some((design) => design.id === id)),
		);
	}, [designsQuery.data]);

	const setSuccessStatus = (message: string) =>
		setStatus({ message, tone: "success" });
	const setErrorStatus = (message: string) =>
		setStatus({ message, tone: "error" });

	const aiGenerate = api.designAi.aiGenerate.useMutation({
		onSuccess: async (data) => {
			await utils.designs.invalidate();
			setPreviewHtml(data?.[0]?.html ?? "");
			const added = data?.length ?? 0;
			setSuccessStatus(
				added > 0
					? `Added ${added} design${added === 1 ? "" : "s"} to ${projectName ?? "this project"}.`
					: "Designs generated with no preview available.",
			);
		},
		onError: (error) => {
			setErrorStatus(error.message ?? "Unable to generate designs at the moment.");
		},
	});

	const aiGenerateFlow = api.designAi.aiGenerateFlow.useMutation({
		onSuccess: async (payload) => {
			await Promise.all([
				utils.designs.invalidate(),
				utils.designConnections.invalidate(),
			]);
			setPreviewHtml(payload.designs?.[0]?.html ?? "");
			setSuccessStatus(
				`Generated ${payload.designs.length} screen${payload.designs.length === 1 ? "" : "s"} with ${payload.connections.length} connection${payload.connections.length === 1 ? "" : "s"}.`,
			);
		},
		onError: (error) => {
			setErrorStatus(error.message ?? "Unable to generate the user flow.");
		},
	});

	const aiModify = api.designAi.aiModify.useMutation({
		onSuccess: async (data) => {
			await utils.designs.invalidate();
			setSelectedDesignIds([]);
			setPreviewHtml(data?.[0]?.html ?? "");
			const updated = data?.length ?? 0;
			setSuccessStatus(
				updated > 0
					? `Updated ${updated} design${updated === 1 ? "" : "s"} with the new direction.`
					: "No designs were modified.",
			);
		},
		onError: (error) => {
			setErrorStatus(error.message ?? "Unable to modify the selected designs.");
		},
	});

	const trimmedPrompt = prompt.trim();
	const hasProject = Boolean(projectId);
	const actionPending =
		mode === "concept"
			? aiGenerate.isPending
			: mode === "flow"
				? aiGenerateFlow.isPending
				: aiModify.isPending;

	const canRunConcept =
		hasProject && trimmedPrompt.length >= 10 && !aiGenerate.isPending;
	const canRunFlow =
		hasProject && trimmedPrompt.length >= 10 && !aiGenerateFlow.isPending;
	const canRunModify =
		hasProject &&
		trimmedPrompt.length >= 5 &&
		selectedDesignIds.length > 0 &&
		!aiModify.isPending;

	const actionDisabled =
		!hasProject ||
		(mode === "concept"
			? !canRunConcept
			: mode === "flow"
				? !canRunFlow
				: !canRunModify);

	const actionLabel = (() => {
		if (!projectId) return "Select a project first";
		if (mode === "concept") {
			return actionPending ? "Generating concepts…" : `Generate for ${projectName ?? "project"}`;
		}
		if (mode === "flow") {
			return actionPending ? "Designing flow…" : "Generate user flow";
		}
		return actionPending ? "Applying modifications…" : "Apply modifications";
	})();

	const handleAction = () => {
		if (!projectId) return;
		if (mode === "concept") {
			aiGenerate.mutate({
				projectId,
				prompt: trimmedPrompt,
				namePrefix: namePrefix.trim().length ? namePrefix.trim() : undefined,
				count: Number.parseInt(count, 10),
			});
			return;
		}

		if (mode === "flow") {
			aiGenerateFlow.mutate({
				projectId,
				prompt: trimmedPrompt,
				namePrefix: namePrefix.trim().length ? namePrefix.trim() : undefined,
				count: Number.parseInt(count, 10),
			});
			return;
		}

		if (selectedDesignIds.length === 0) return;
		aiModify.mutate({
			projectId,
			prompt: trimmedPrompt,
			designIds: selectedDesignIds,
		});
	};

	const renderDesignSelection = () => {
		if (!projectId) {
			return (
				<p className="text-sm text-muted-foreground">
					Create and select a project to unlock modification tools.
				</p>
			);
		}

		if (designsQuery.isLoading) {
			return <p className="text-sm text-muted-foreground">Loading designs…</p>;
		}

		if (!designsQuery.data?.length) {
			return (
				<p className="text-sm text-muted-foreground">
					No designs available yet. Generate concepts first to iterate on them.
				</p>
			);
		}

		return (
			<div className="max-h-52 space-y-3 overflow-y-auto rounded-lg border bg-muted/30 p-3">
				{designsQuery.data.slice(0, 8).map((design) => {
					const checked = selectedDesignIds.includes(design.id);
					return (
						<label
							key={design.id}
							htmlFor={design.id}
							className={cn(
								"flex cursor-pointer items-start gap-3 rounded-md border bg-background p-3 text-sm",
								checked && "border-primary/60 shadow-sm",
							)}
						>
							<Checkbox
								id={design.id}
								checked={checked}
								onCheckedChange={(isChecked) => {
									setSelectedDesignIds((previous) =>
										isChecked
											? [...previous, design.id]
											: previous.filter((id) => id !== design.id),
									);
								}}
							/>
							<div className="flex flex-1 flex-col gap-1">
								<div className="flex items-center justify-between gap-2">
									<p className="font-medium">{design.name}</p>
									<span className="text-xs text-muted-foreground">
										v{design.version}
									</span>
								</div>
								{design.description && (
									<p className="text-xs text-muted-foreground">
										{design.description}
									</p>
								)}
								<p className="text-xs text-muted-foreground">
									Updated{" "}
									{formatDistanceToNow(new Date(design.updatedAt), {
										addSuffix: true,
									})}
								</p>
							</div>
						</label>
					);
				})}
				{designsQuery.data.length > 8 && (
					<p className="text-xs text-muted-foreground">
						Showing first 8 designs. Visit the canvas to manage them all.
					</p>
				)}
			</div>
		);
	};

	return (
		<Card className="flex flex-col overflow-hidden">
			<CardHeader className="gap-2">
				<CardTitle className="text-xl">AI Studio</CardTitle>
				<CardDescription>
					Generate Tailwind-powered canvases directly inside your dashboard.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{!projectId ? (
					<p className="text-sm text-muted-foreground">
						Create a project first to enable AI-powered design workflows.
					</p>
				) : (
					<>
						<Tabs
							value={mode}
							onValueChange={(value) => setMode(value as AIMode)}
							className="flex flex-col gap-4"
						>
							<TabsList className="grid grid-cols-3">
								<TabsTrigger value="concept">Screens</TabsTrigger>
								<TabsTrigger value="flow">Flow</TabsTrigger>
								<TabsTrigger value="modify">Modify</TabsTrigger>
							</TabsList>

							<TabsContent value="concept" className="space-y-4">
								<div className="flex flex-col gap-2">
									<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Prompt
									</label>
									<Textarea
										value={prompt}
										onChange={(event) => setPrompt(event.target.value)}
										placeholder="e.g. Responsive workspace with hero, sidebar and CTA cards"
										rows={3}
										disabled={actionPending}
									/>
								</div>
								<div className="grid gap-3 sm:grid-cols-2">
									<div className="flex flex-col gap-2">
										<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
											Name prefix
										</label>
										<Input
											value={namePrefix}
											onChange={(event) => setNamePrefix(event.target.value)}
											maxLength={80}
											disabled={actionPending}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
											Variations
										</label>
										<Select
											value={count}
											onValueChange={setCount}
											disabled={actionPending}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{counts.map((value) => (
													<SelectItem key={value} value={value}>
														{value}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="flow" className="space-y-4">
								<div className="flex flex-col gap-2">
									<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Prompt
									</label>
									<Textarea
										value={prompt}
										onChange={(event) => setPrompt(event.target.value)}
										placeholder="e.g. Checkout experience from cart to confirmation"
										rows={3}
										disabled={actionPending}
									/>
								</div>
								<div className="grid gap-3 sm:grid-cols-2">
									<div className="flex flex-col gap-2">
										<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
											Name prefix
										</label>
										<Input
											value={namePrefix}
											onChange={(event) => setNamePrefix(event.target.value)}
											maxLength={80}
											disabled={actionPending}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
											Flow variations
										</label>
										<Select
											value={count}
											onValueChange={setCount}
											disabled={actionPending}
										>
											<SelectTrigger>
												<SelectValue placeholder="1" />
											</SelectTrigger>
											<SelectContent>
												{counts.map((value) => (
													<SelectItem key={value} value={value}>
														{value}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<p className="text-xs text-muted-foreground">
									User flows automatically connect screens based on their semantics so
									you can preview journeys inside the prototype mode.
								</p>
							</TabsContent>

							<TabsContent value="modify" className="space-y-4">
								<div className="flex flex-col gap-2">
									<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Instruction
									</label>
									<Textarea
										value={prompt}
										onChange={(event) => setPrompt(event.target.value)}
										placeholder="e.g. Re-skin selected components with a dark theme and rounded cards"
										rows={3}
										disabled={actionPending}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Target designs
									</label>
									{renderDesignSelection()}
									{selectedDesignIds.length > 0 && (
										<p className="text-xs text-muted-foreground">
											{selectedDesignIds.length} design
											{selectedDesignIds.length === 1 ? "" : "s"} selected.
										</p>
									)}
								</div>
							</TabsContent>
						</Tabs>
					</>
				)}
			</CardContent>
			<CardFooter className="px-6 pb-6 pt-0">
				<Button className="w-full" disabled={actionDisabled} onClick={handleAction}>
					{actionLabel}
				</Button>
			</CardFooter>
			<div className="border-t bg-muted/50 px-6 py-4">
				<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
					Live preview
				</p>
				<div
					className={cn(
						"mt-3 min-h-[220px] rounded-lg border bg-background p-4",
						!previewHtml && "flex items-center justify-center text-sm text-muted-foreground",
					)}
				>
					{previewHtml ? (
						<div
							className="prose w-full max-w-none dark:prose-invert"
							dangerouslySetInnerHTML={{ __html: previewHtml }}
						/>
					) : (
						<span>
							{aiGenerate.isPending
								? "Crafting UI…"
								: "Generated designs will be rendered here."}
						</span>
					)}
				</div>
				<p
					className={cn("mt-3 text-xs", {
						"text-muted-foreground": status.tone === "muted",
						"text-emerald-600": status.tone === "success",
						"text-destructive": status.tone === "error",
					})}
				>
					{status.message}
				</p>
			</div>
		</Card>
	);
}

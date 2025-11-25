'use client';

import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { AttachedImage, GenerationMode } from "@/types/design";
import { handleImagePaste } from "@/features/project-canvas/utils/clipboard-utils";

import { ChevronDown, Loader2, Paperclip, Sparkles, X } from "lucide-react";

interface ToolbarProps {
	prompt: string;
	setPrompt: (value: string) => void;
	onSubmit: () => void;
	isLoading: boolean;
	hasSelection: boolean;
	generationMode: GenerationMode;
	setGenerationMode: (mode: GenerationMode) => void;
	attachedImages: AttachedImage[];
	setAttachedImages: (images: AttachedImage[] | ((prev: AttachedImage[]) => AttachedImage[])) => void;
}

const generationOptions: { id: GenerationMode; name: string }[] = [
	{ id: "single", name: "Single" },
	{ id: "variations", name: "Variations" },
	{ id: "flow", name: "Flow" },
];

export function Toolbar({
	prompt,
	setPrompt,
	onSubmit,
	isLoading,
	hasSelection,
	generationMode,
	setGenerationMode,
	attachedImages,
	setAttachedImages,
}: ToolbarProps) {
	const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const buttonText = hasSelection ? "Modify" : "Generate";
	const placeholderText = useMemo(() => {
		if (hasSelection) return "Describe your modifications…";
		if (generationMode === "flow") return 'Describe a user flow… e.g. "checkout journey from cart to confirmation"';
		if (generationMode === "variations") return 'Describe your design… e.g. "SaaS onboarding cards"';
		return 'Describe a design… e.g. "A dashboard hero with KPIs"';
	}, [generationMode, hasSelection]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey && !isLoading) {
			event.preventDefault();
			onSubmit();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const filePromises = Array.from(files).map(
				(file) =>
					new Promise<AttachedImage>((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = (loadEvent) => {
							const dataUrl = loadEvent.target?.result as string;
							const parts = dataUrl.split(",");
							const meta = parts[0];
							const base64 = parts[1];

							if (!meta || !base64) {
								reject(new Error("Invalid data URL"));
								return;
							}

							const mimeTypeParts = meta.split(";");
							const mimeType = mimeTypeParts[0]?.split(":")[1];

							if (!mimeType) {
								reject(new Error("Invalid mime type"));
								return;
							}

							resolve({ dataUrl, base64, mimeType });
						};
						reader.onerror = reject;
						reader.readAsDataURL(file);
					}),
			);

			Promise.all(filePromises).then((newImages) => {
				setAttachedImages((prev) => [...prev, ...newImages]);
			});
		}
		event.target.value = "";
	};

	const handleRemoveImage = (indexToRemove: number) => {
		setAttachedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
	};


	const handlePaste = async (event: React.ClipboardEvent) => {
		const newImages = await handleImagePaste(event);
		if (newImages.length > 0) {
			setAttachedImages((prev) => [...prev, ...newImages]);
		}
	};

	return (
		<div className="fixed bottom-4 left-1/2 z-50 flex w-full max-w-4xl -translate-x-1/2 flex-col items-center px-4">
			{attachedImages.length > 0 && (
				<div className="mb-2 flex w-full flex-wrap gap-2">
					{attachedImages.map((image, index) => (
						<div key={`attachment-${index}`} className="relative">
							<img
								src={image.dataUrl}
								alt={`Attachment ${index + 1}`}
								className="h-16 w-16 rounded-lg border-2 border-border object-cover shadow-sm"
							/>
							<button
								onClick={() => handleRemoveImage(index)}
								className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-md hover:bg-destructive/90 transition-colors"
								type="button"
								aria-label="Remove image"
							>
								<X className="h-3 w-3" />
							</button>
						</div>
					))}
				</div>
			)}

			<div className="flex w-full items-end gap-2 rounded-3xl border border-border bg-card/95 p-2 backdrop-blur-xl shadow-xl transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
				{!hasSelection && (
					<DropdownMenu open={isModeSelectorOpen} onOpenChange={setIsModeSelectorOpen}>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="h-10 rounded-full px-3 text-muted-foreground hover:text-foreground">
								<span>{generationOptions.find((option) => option.id === generationMode)?.name}</span>
								<ChevronDown className="ml-1 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-32">
							{generationOptions.map((option) => (
								<DropdownMenuItem
									key={option.id}
									onClick={() => {
										setGenerationMode(option.id);
										setIsModeSelectorOpen(false);
									}}
									className={cn(
										generationMode === option.id && "bg-primary text-primary-foreground",
									)}
								>
									{option.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				<Button
					onClick={() => fileInputRef.current?.click()}
					variant="ghost"
					size="icon"
					className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
					title="Attach images"
					type="button"
				>
					<Paperclip className="h-5 w-5" />
				</Button>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
					multiple
				/>
				<Textarea
					value={prompt}
					onChange={(event) => setPrompt(event.target.value)}
					onKeyDown={handleKeyDown}
					onPaste={handlePaste}
					placeholder={placeholderText}
					className="min-h-[40px] w-full resize-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
					disabled={isLoading}
					rows={1}
				/>
				<Button
					onClick={onSubmit}
					disabled={isLoading || (prompt.trim() === "" && attachedImages.length === 0)}
					className="h-10 rounded-full px-4"
					type="button"
				>
					{isLoading ? (
						<Loader2 className="h-5 w-5 animate-spin" />
					) : (
						<>
							<Sparkles className="mr-2 h-4 w-4" />
							<span>{buttonText}</span>
						</>
					)}
				</Button>
			</div>
		</div>
	);
}



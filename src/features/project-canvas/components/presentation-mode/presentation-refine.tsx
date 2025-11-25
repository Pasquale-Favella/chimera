import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send, Paperclip, X, Layers } from "lucide-react";
import { PropertiesPanel, type ElementStyles } from "../properties-panel";
import type { AttachedImage } from '@/types/design';

interface PresentationRefineProps {
    selectedElementPath: string | null;
    selectedElementStyles: ElementStyles | null;
    chatPrompt: string;
    isChatLoading: boolean;
    chatError: string | null;
    attachedImages: AttachedImage[];
    isExtracting: boolean;
    activeView: 'preview' | 'code';
    onChatPromptChange: (prompt: string) => void;
    onChatSubmit: (promptOverride?: string) => void;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (index: number) => void;
    onClearSelection: () => void;
    onCreateComponent: () => void;
    onPaste: (event: React.ClipboardEvent) => void;
}

export function PresentationRefine({
    selectedElementPath,
    selectedElementStyles,
    chatPrompt,
    isChatLoading,
    chatError,
    attachedImages,
    isExtracting,
    activeView,
    onChatPromptChange,
    onChatSubmit,
    onFileChange,
    onRemoveImage,
    onClearSelection,
    onCreateComponent,
    onPaste
}: PresentationRefineProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && !isChatLoading) {
            e.preventDefault();
            onChatSubmit();
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4">
                {chatError && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{chatError}</AlertDescription>
                    </Alert>
                )}

                {selectedElementStyles ? (
                    <PropertiesPanel
                        styles={selectedElementStyles}
                        onApplyChanges={(prompt) => onChatSubmit(prompt)}
                        isLoading={isChatLoading}
                    />
                ) : (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground">
                                {activeView === 'preview'
                                    ? 'Activate selection mode (Select icon) and click an element to inspect it.'
                                    : 'Ask the AI to make changes to this component. For example: "Make the button rounded" or "Change the color scheme to dark mode".'
                                }
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="p-4 border-t border-border flex-shrink-0 space-y-2">
                {selectedElementPath && (
                    <div className="space-y-2">
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded-md font-mono break-all relative">
                            Selected: <span className="text-primary">{selectedElementPath}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClearSelection}
                                className="absolute top-1 right-1 h-6 w-6"
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </div>
                        <Button
                            onClick={onCreateComponent}
                            disabled={isExtracting}
                            className="w-full"
                            size="sm"
                            variant="outline"
                        >
                            {isExtracting ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Layers className="w-4 h-4 mr-2" />
                            )}
                            Create Component from Selection
                        </Button>
                    </div>
                )}

                {attachedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {attachedImages.map((image, index) => (
                            <div key={`attachment-${index}`} className="relative">
                                <img
                                    src={image.dataUrl}
                                    alt={`Attachment ${index + 1}`}
                                    className="h-16 w-16 rounded-lg border-2 border-border object-cover shadow-sm"
                                />
                                <button
                                    onClick={() => onRemoveImage(index)}
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

                <div className="relative flex w-full items-end gap-2 rounded-3xl border border-border bg-card/95 p-2 backdrop-blur-xl shadow-xl transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="ghost"
                        size="icon"
                        title="Attach images"
                        type="button"
                        className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
                    >
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileChange}
                        multiple
                    />
                    <Textarea
                        value={chatPrompt}
                        onChange={(e) => onChatPromptChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onPaste={onPaste}
                        placeholder="Ask for a change..."
                        className="min-h-[40px] w-full resize-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        disabled={isChatLoading}
                        rows={1}
                    />
                    <Button
                        onClick={() => onChatSubmit()}
                        disabled={isChatLoading || (!chatPrompt.trim() && attachedImages.length === 0)}
                        className="h-10 rounded-full px-4"
                        size="default"
                    >
                        {isChatLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

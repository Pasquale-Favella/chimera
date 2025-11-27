import React from 'react';
import { Sparkles, Palette, History } from "lucide-react";
import { PresentationRefine } from "./presentation-refine";
import { PresentationTokens } from "./presentation-tokens";
import { PresentationHistory } from "./presentation-history";
import type { SidebarTab } from "../../stores/presentation-store";
import type { DesignTokens, AttachedImage } from "@/types/design";
import type { ElementStyles } from "../properties-panel";

interface PresentationSidebarProps {
    activeSidebarTab: SidebarTab;
    selectedElementPath: string | null;
    selectedElementStyles: ElementStyles | null;
    chatPrompt: string;
    isChatLoading: boolean;
    chatError: string | null;
    attachedImages: AttachedImage[];
    isExtracting: boolean;
    activeView: 'preview' | 'code';
    designTokens: DesignTokens | null;
    isTokenLoading: boolean;
    history: string[];
    currentHistoryIndex: number;
    onTabChange: (tab: SidebarTab) => void;
    onChatPromptChange: (prompt: string) => void;
    onChatSubmit: (promptOverride?: string) => void;
    onClearError: () => void;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (index: number) => void;
    onClearSelection: () => void;
    onCreateComponent: () => void;
    onScanTokens: () => void;
    onRestoreVersion: (index: number) => void;
    onPaste: (event: React.ClipboardEvent) => void;
    onDownload: () => void;
}

const SidebarTabButton: React.FC<{
    tab: SidebarTab;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ tab, label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 text-xs font-semibold border-b-2 transition-all ${isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
        title={label}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export function PresentationSidebar({
    activeSidebarTab,
    selectedElementPath,
    selectedElementStyles,
    chatPrompt,
    isChatLoading,
    chatError,
    attachedImages,
    isExtracting,
    activeView,
    designTokens,
    isTokenLoading,
    history,
    currentHistoryIndex,
    onTabChange,
    onChatPromptChange,
    onChatSubmit,
    onClearError,
    onFileChange,
    onRemoveImage,
    onClearSelection,
    onCreateComponent,
    onScanTokens,
    onRestoreVersion,
    onPaste,
    onDownload
}: PresentationSidebarProps) {
    return (
        <aside className="w-96 bg-background/50 border-l border-border flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-border">
                <button
                    onClick={onDownload}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    Download HTML
                </button>
            </div>
            <div className="flex items-center border-b border-border">
                <SidebarTabButton
                    tab="refine"
                    label="Refine"
                    icon={<Sparkles className="w-5 h-5" />}
                    isActive={activeSidebarTab === 'refine'}
                    onClick={() => onTabChange('refine')}
                />
                <SidebarTabButton
                    tab="tokens"
                    label="Tokens"
                    icon={<Palette className="w-5 h-5" />}
                    isActive={activeSidebarTab === 'tokens'}
                    onClick={() => onTabChange('tokens')}
                />
                <SidebarTabButton
                    tab="history"
                    label="History"
                    icon={<History className="w-5 h-5" />}
                    isActive={activeSidebarTab === 'history'}
                    onClick={() => onTabChange('history')}
                />
            </div>

            <div className="flex-grow overflow-hidden">
                {activeSidebarTab === 'refine' && (
                    <PresentationRefine
                        selectedElementPath={selectedElementPath}
                        selectedElementStyles={selectedElementStyles}
                        chatPrompt={chatPrompt}
                        isChatLoading={isChatLoading}
                        chatError={chatError}
                        attachedImages={attachedImages}
                        isExtracting={isExtracting}
                        activeView={activeView}
                        onChatPromptChange={onChatPromptChange}
                        onChatSubmit={onChatSubmit}
                        onClearError={onClearError}
                        onFileChange={onFileChange}
                        onRemoveImage={onRemoveImage}
                        onClearSelection={onClearSelection}
                        onCreateComponent={onCreateComponent}
                        onPaste={onPaste}
                    />
                )}

                {activeSidebarTab === 'tokens' && (
                    <PresentationTokens
                        designTokens={designTokens}
                        isTokenLoading={isTokenLoading}
                        onScanTokens={onScanTokens}
                    />
                )}

                {activeSidebarTab === 'history' && (
                    <PresentationHistory
                        history={history}
                        currentHistoryIndex={currentHistoryIndex}
                        onRestoreVersion={onRestoreVersion}
                    />
                )}
            </div>
        </aside>
    );
}

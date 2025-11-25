import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code, MousePointer, Smartphone, Tablet, Monitor, X } from "lucide-react";
import type { ViewMode, DeviceSize } from "../../stores/presentation-store";

interface PresentationToolbarProps {
    designDescription: string;
    activeView: ViewMode;
    deviceSize: DeviceSize;
    isSelectionModeActive: boolean;
    onViewChange: (view: ViewMode) => void;
    onDeviceSizeChange: (size: DeviceSize) => void;
    onToggleSelectionMode: () => void;
    onClose: () => void;
}

export function PresentationToolbar({
    designDescription,
    activeView,
    deviceSize,
    isSelectionModeActive,
    onViewChange,
    onDeviceSizeChange,
    onToggleSelectionMode,
    onClose
}: PresentationToolbarProps) {
    return (
        <header className="flex items-center gap-4 p-3 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <h2 className="text-lg font-semibold truncate" title={designDescription}>
                    {designDescription}
                </h2>
                <div className="w-px h-6 bg-border flex-shrink-0"></div>
                {/* View Toggles */}
                <Tabs value={activeView} onValueChange={(v) => onViewChange(v as ViewMode)} className="flex-shrink-0">
                    <TabsList>
                        <TabsTrigger
                            value="preview"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            <Code className="w-4 h-4 mr-1" />
                            Code
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                {activeView === 'preview' && (
                    <>
                        <Button
                            variant={isSelectionModeActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={onToggleSelectionMode}
                        >
                            <MousePointer className="w-4 h-4 mr-1" />
                            Select
                        </Button>
                        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                            {(['mobile', 'tablet', 'desktop'] as DeviceSize[]).map(size => (
                                <Button
                                    key={size}
                                    variant={deviceSize === size ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => onDeviceSizeChange(size)}
                                    title={size.charAt(0).toUpperCase() + size.slice(1)}
                                >
                                    {size === 'mobile' && <Smartphone className="w-4 h-4" />}
                                    {size === 'tablet' && <Tablet className="w-4 h-4" />}
                                    {size === 'desktop' && <Monitor className="w-4 h-4" />}
                                </Button>
                            ))}
                        </div>
                    </>
                )}
                <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
                    <X className="w-6 h-6" />
                </Button>
            </div>
        </header>
    );
}

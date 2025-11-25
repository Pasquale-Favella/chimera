import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PresentationHistoryProps {
    history: string[];
    currentHistoryIndex: number;
    onRestoreVersion: (index: number) => void;
}

export function PresentationHistory({
    history,
    currentHistoryIndex,
    onRestoreVersion
}: PresentationHistoryProps) {
    return (
        <div className="p-4 space-y-2 overflow-y-auto h-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Version History</CardTitle>
                    <CardDescription>
                        Restore previous versions of your design
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {history.slice().reverse().map((htmlContent, index) => {
                            const originalIndex = history.length - 1 - index;
                            const isCurrent = currentHistoryIndex === originalIndex;
                            const versionNumber = history.length - index;

                            const iframePreviewSrcDoc = `
                <html>
                  <head>
                    <script src="https://cdn.tailwindcss.com"></script>
                  </head>
                  <body class="bg-white overflow-hidden">
                    <div id="wrapper" style="transform: scale(0.5); transform-origin: top left; width: 200%; height: 200%;">${htmlContent}</div>
                  </body>
                </html>
              `;

                            return (
                                <li
                                    key={originalIndex}
                                    className={cn("relative overflow-hidden rounded-xl transition-all duration-200",
                                        isCurrent
                                            ? 'ring-2 ring-primary shadow-lg'
                                            : 'hover:shadow-md'
                                    )}
                                >
                                    <div className={`p-4 ${isCurrent ? 'bg-gradient-to-br from-primary/10 to-primary/5' : 'bg-muted/50 group hover:bg-muted'}`}>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                <div className={cn(
                                                    "flex-shrink-0 px-2 h-6 rounded-md flex items-center justify-center text-xs font-mono font-medium",
                                                    isCurrent
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-background text-muted-foreground border border-border'
                                                )}>
                                                    v{versionNumber}
                                                </div>

                                                {isCurrent ? (
                                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                                                        <Check className="w-3 h-3" />
                                                        <span className="text-[10px] font-semibold">Active</span>
                                                    </div>
                                                ) : (
                                                    <HoverCard openDelay={200} closeDelay={100}>
                                                        <HoverCardTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-6 px-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onRestoreVersion(originalIndex);
                                                                }}
                                                            >
                                                                <RotateCcw className="w-3 h-3" />
                                                                <span className="text-[10px]">Restore</span>
                                                            </Button>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent side="right" align="start" className="w-80 p-3 z-[9999]">
                                                            <h3 className="text-xs font-semibold mb-2">Preview - Version {versionNumber}</h3>
                                                            <div className="w-full h-48 bg-muted rounded-lg overflow-hidden border border-border relative">
                                                                <div className="absolute inset-0 pointer-events-none">
                                                                    <iframe
                                                                        srcDoc={iframePreviewSrcDoc}
                                                                        title={`Preview ${versionNumber}`}
                                                                        sandbox="allow-scripts allow-same-origin"
                                                                        className="w-full h-full border-0"
                                                                        style={{
                                                                            pointerEvents: 'none'
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

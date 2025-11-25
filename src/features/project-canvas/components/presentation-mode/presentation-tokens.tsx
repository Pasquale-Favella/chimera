import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import type { DesignTokens } from "@/types/design";

interface PresentationTokensProps {
    designTokens: DesignTokens | null;
    isTokenLoading: boolean;
    onScanTokens: () => void;
}

export function PresentationTokens({
    designTokens,
    isTokenLoading,
    onScanTokens
}: PresentationTokensProps) {
    return (
        <div className="p-4 space-y-4 overflow-y-auto h-full">
            <Button
                onClick={onScanTokens}
                disabled={isTokenLoading}
                className="w-full"
                size="sm"
            >
                {isTokenLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                    </>
                ) : (
                    'Scan for Tokens'
                )}
            </Button>
            {designTokens && (
                <div className="space-y-4 animate-in fade-in-0">
                    <div>
                        <Label className="text-sm font-medium">Colors</Label>
                        <div className="space-y-2 mt-2">
                            {Object.entries(designTokens.colors).map(([category, colors]) => (
                                colors.length > 0 && (
                                    <div key={category}>
                                        <span className="text-xs text-muted-foreground capitalize">{category}</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {colors.map((color, i) => {
                                                const isCssColor =
                                                    color.startsWith("#") ||
                                                    color.startsWith("rgb") ||
                                                    color.startsWith("hsl");
                                                return (
                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-2 bg-muted p-1.5 rounded-md"
                                                    >
                                                        <div
                                                            className={`w-5 h-5 rounded border border-border ${!isCssColor ? `bg-${color}` : ""}`}
                                                            style={
                                                                isCssColor
                                                                    ? { backgroundColor: color }
                                                                    : undefined
                                                            }
                                                        ></div>
                                                        <span className="text-xs font-mono">
                                                            {color}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Typography</Label>
                        <div className="space-y-2 mt-2">
                            {designTokens.typography.headingFont && (
                                <div>
                                    <span className="text-xs text-muted-foreground">Headings</span>
                                    <Badge variant="secondary" className="font-mono text-xs ml-2">{designTokens.typography.headingFont}</Badge>
                                </div>
                            )}
                            {designTokens.typography.bodyFont && (
                                <div>
                                    <span className="text-xs text-muted-foreground">Body</span>
                                    <Badge variant="secondary" className="font-mono text-xs ml-2">{designTokens.typography.bodyFont}</Badge>
                                </div>
                            )}
                        </div>
                    </div>
                    {designTokens.borderRadius.length > 0 && (
                        <div>
                            <Label className="text-sm font-medium">Border Radius</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {designTokens.borderRadius.map((radius, i) => (
                                    <Badge key={i} variant="outline" className="font-mono text-xs">{radius}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {designTokens.boxShadow.length > 0 && (
                        <div>
                            <Label className="text-sm font-medium">Shadows</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {designTokens.boxShadow.map((shadow, i) => (
                                    <Badge key={i} variant="outline" className="font-mono text-xs">{shadow}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

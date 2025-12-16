import React from "react";
import { useDesignSystem } from "../hooks/use-design-system";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { hslToHex, hexToHsl } from "../utils/color-utils";

import { designSystemPresets } from "../data/design-system-presets";
import { Check, Wand2 } from "lucide-react";

interface DesignSystemEditorProps {
    projectId: string;
}

export function DesignSystemEditor({ projectId }: DesignSystemEditorProps) {
    const {
        designSystem,
        updateColor,
        updateTypography,
        updateSpacing,
        updateRadius,
        applyPreset
    } = useDesignSystem(projectId);

    const ColorPicker = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => {
        // Safe conversion with fallback
        const hexValue = value.startsWith("#") ? value : hslToHex(value);

        const handleColorChange = (newHex: string) => {
            // Convert back to HSL for consistency with the design system
            const newHsl = hexToHsl(newHex);
            onChange(newHsl);
        };

        return (
            <div className="space-y-2">
                <Label>{label}</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2 px-2">
                            <div className="h-4 w-4 rounded border shadow-sm" style={{ backgroundColor: hexValue }} />
                            {/* User requested right color and NO PREVIEW TEXT of weird HSL */}
                            <span className="text-muted-foreground text-xs uppercase">{hexValue}</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3">
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Input
                                    value={hexValue}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    className="h-8"
                                />
                                <Input
                                    type="color"
                                    value={hexValue}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    className="w-10 h-8 p-0 border-0"
                                />
                            </div>
                            <div className="grid grid-cols-5 gap-1">
                                {["#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#f43f5e", "#71717a"].map((c) => (
                                    <button
                                        key={c}
                                        className="h-6 w-6 rounded-md border shadow-sm hover:scale-110 transition-transform"
                                        style={{ backgroundColor: c }}
                                        onClick={() => handleColorChange(c)}
                                    />
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="pb-4">
                <h3 className="text-lg font-medium">Design System Editor</h3>
                <p className="text-sm text-muted-foreground">
                    Customize the look and feel of your project.
                </p>
            </div>

            <Tabs defaultValue="presets" className="flex-1 w-full flex flex-col min-h-0">
                <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="presets">Presets</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="typography">Typography</TabsTrigger>
                    <TabsTrigger value="spacing">Spacing</TabsTrigger>
                </TabsList>

                <div className="flex-1 mt-4 pr-4 overflow-y-auto">
                    <TabsContent value="presets" className="mt-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Starting Points</CardTitle>
                                <CardDescription>
                                    Choose a preset to instantly style your project. You can customize it afterwards.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {Object.entries(designSystemPresets).map(([key, preset]) => (
                                    <button
                                        key={key}
                                        onClick={() => applyPreset(key)}
                                        className={cn(
                                            "relative flex items-start gap-4 rounded-lg border p-4 text-left hover:bg-accent transition-colors",
                                            designSystem.presetName === key && "border-primary bg-primary/5 ring-1 ring-primary"
                                        )}
                                    >
                                        <div className={`p-2 rounded-md bg-background border shadow-sm`}>
                                            <Wand2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold flex items-center gap-2">
                                                {preset.name}
                                                {designSystem.presetName === key && (
                                                    <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">Active</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {preset.description}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="colors" className="mt-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Base Colors</CardTitle>
                                <CardDescription>
                                    The foundational colors for your interface.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ColorPicker
                                        label="Background"
                                        value={designSystem.colors.background}
                                        onChange={(v) => updateColor("background", v)}
                                    />
                                    <ColorPicker
                                        label="Foreground"
                                        value={designSystem.colors.foreground}
                                        onChange={(v) => updateColor("foreground", v)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Primary & Secondary</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ColorPicker
                                        label="Primary"
                                        value={designSystem.colors.primary}
                                        onChange={(v) => updateColor("primary", v)}
                                    />
                                    <ColorPicker
                                        label="Secondary"
                                        value={designSystem.colors.secondary}
                                        onChange={(v) => updateColor("secondary", v)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>UI Elements</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ColorPicker
                                        label="Border"
                                        value={designSystem.colors.border}
                                        onChange={(v) => updateColor("border", v)}
                                    />
                                    <ColorPicker
                                        label="Input"
                                        value={designSystem.colors.input}
                                        onChange={(v) => updateColor("input", v)}
                                    />
                                    <ColorPicker
                                        label="Ring"
                                        value={designSystem.colors.ring}
                                        onChange={(v) => updateColor("ring", v)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="typography" className="mt-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fonts</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Default Font Family</Label>
                                    <Select
                                        value={designSystem.typography.fontFamily}
                                        onValueChange={(v) => updateTypography("fontFamily", v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Inter">Inter</SelectItem>
                                            <SelectItem value="Inter, sans-serif">Inter (Generic)</SelectItem>
                                            <SelectItem value="Roboto">Roboto</SelectItem>
                                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                                            <SelectItem value="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif">System Sans (iOS)</SelectItem>
                                            <SelectItem value="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial">System (Ant Design)</SelectItem>
                                            <SelectItem value="ui-serif, Georgia, serif">System Serif</SelectItem>
                                            <SelectItem value="ui-monospace, monospace">System Mono</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Heading Font</Label>
                                    <Select
                                        value={designSystem.typography.headingFont || "inherit"}
                                        onValueChange={(v) => updateTypography("headingFont", v === "inherit" ? "" : v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Same as default" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="inherit">Same as body</SelectItem>
                                            <SelectItem value="Inter">Inter</SelectItem>
                                            <SelectItem value="Inter, sans-serif">Inter (Generic)</SelectItem>
                                            <SelectItem value="Roboto">Roboto</SelectItem>
                                            <SelectItem value="playfair display, serif">Playfair Display</SelectItem>
                                            <SelectItem value="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif">System Sans (iOS)</SelectItem>
                                            <SelectItem value="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial">System (Ant Design)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Scale</CardTitle>
                                <CardDescription>Adjust the base size and ratio to see how it affects your hierarchy.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label>Base Size</Label>
                                        <Select
                                            value={designSystem.typography.baseSize || "16px"}
                                            onValueChange={(v) => updateTypography("baseSize", v)}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="12px">12px</SelectItem>
                                                <SelectItem value="14px">14px</SelectItem>
                                                <SelectItem value="16px">16px</SelectItem>
                                                <SelectItem value="17px">17px (iOS)</SelectItem>
                                                <SelectItem value="18px">18px</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Scale Ratio</Label>
                                        <Select
                                            value={(designSystem.typography.scale || 1.25).toFixed(3)}
                                            onValueChange={(v) => updateTypography("scale", parseFloat(v))}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1.067">Minor Second (1.067)</SelectItem>
                                                <SelectItem value="1.125">Major Second (1.125)</SelectItem>
                                                <SelectItem value="1.200">Minor Third (1.200)</SelectItem>
                                                <SelectItem value="1.250">Major Third (1.250)</SelectItem>
                                                <SelectItem value="1.333">Perfect Fourth (1.333)</SelectItem>
                                                <SelectItem value="1.414">Augmented Fourth (1.414)</SelectItem>
                                                <SelectItem value="1.500">Perfect Fifth (1.500)</SelectItem>
                                                <SelectItem value="1.618">Golden Ratio (1.618)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="rounded-lg border bg-muted/20 p-4 space-y-2">
                                    <Label className="text-xs uppercase text-muted-foreground font-bold">Scale Preview (px)</Label>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-1 text-sm">
                                        {[
                                            { label: "H1 (3xl)", level: 5 },
                                            { label: "H2 (2xl)", level: 4 },
                                            { label: "H3 (xl)", level: 3 },
                                            { label: "H4 (lg)", level: 2 },
                                            { label: "Body (base)", level: 0 },
                                            { label: "Small (sm)", level: -1 },
                                        ].map((item) => {
                                            const base = parseInt(designSystem.typography.baseSize || "16");
                                            const scale = designSystem.typography.scale || 1.25;
                                            const size = Math.round(base * Math.pow(scale, item.level));
                                            return (
                                                <div key={item.label} className="flex justify-between border-b border-dashed py-1 last:border-0">
                                                    <span className="text-muted-foreground">{item.label}</span>
                                                    <span className="font-mono">{size}px</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="spacing" className="mt-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Spacing</CardTitle>
                                <CardDescription>Base unit for padding and margins.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Base Unit (px)</Label>
                                        <span className="font-mono text-sm">{designSystem.spacing.base}px</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Slider
                                            min={2}
                                            max={12}
                                            step={1}
                                            value={[designSystem.spacing.base]}
                                            onValueChange={(val) => {
                                                const newBase = val[0];
                                                if (newBase !== undefined) {
                                                    updateSpacing("base", newBase);
                                                }
                                            }}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Border Radius</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 gap-4">
                                    {["small", "medium", "large"].map((size) => (
                                        <div key={size} className="space-y-2">
                                            <Label className="capitalize">{size}</Label>
                                            <Select
                                                value={designSystem.radius[size as keyof typeof designSystem.radius]}
                                                onValueChange={(v) => updateRadius(size, v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0rem">None</SelectItem>
                                                    <SelectItem value="0.125rem">XS (2px)</SelectItem>
                                                    <SelectItem value="0.25rem">SM (4px)</SelectItem>
                                                    <SelectItem value="0.375rem">SM-MD (6px)</SelectItem>
                                                    <SelectItem value="0.5rem">MD (8px)</SelectItem>
                                                    <SelectItem value="0.75rem">LG (12px)</SelectItem>
                                                    <SelectItem value="0.875rem">LG-XL (14px)</SelectItem>
                                                    <SelectItem value="1rem">XL (16px)</SelectItem>
                                                    <SelectItem value="1.5rem">2XL (24px)</SelectItem>
                                                    <SelectItem value="9999px">Full</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-8 mt-4 p-4 border rounded-lg bg-muted/20">
                                    <div className="w-16 h-16 border-2 border-primary bg-background flex items-center justify-center text-[10px] text-muted-foreground" style={{ borderRadius: designSystem.radius.small }}>Small</div>
                                    <div className="w-16 h-16 border-2 border-primary bg-background flex items-center justify-center text-[10px] text-muted-foreground" style={{ borderRadius: designSystem.radius.medium }}>Medium</div>
                                    <div className="w-16 h-16 border-2 border-primary bg-background flex items-center justify-center text-[10px] text-muted-foreground" style={{ borderRadius: designSystem.radius.large }}>Large</div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

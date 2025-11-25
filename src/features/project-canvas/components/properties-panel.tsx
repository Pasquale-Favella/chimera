'use client';

import { useState, useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export interface ElementStyles {
  backgroundColor: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  padding: string;
  margin: string;
  borderRadius: string;
}

interface PropertiesPanelProps {
  styles: ElementStyles;
  onApplyChanges: (prompt: string) => void;
  isLoading: boolean;
}

const rgbToHex = (rgb: string): string => {
  if (!rgb || !rgb.startsWith('rgb')) return '#000000';
  if (rgb === 'rgba(0, 0, 0, 0)') return '#ffffff'; // Special case for transparent
  const result = rgb.match(/\d+/g);
  if (!result) return '#000000';
  return "#" + result.slice(0, 3).map(x => {
    const hex = parseInt(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export function PropertiesPanel({ styles, onApplyChanges, isLoading }: PropertiesPanelProps) {
  const [editedStyles, setEditedStyles] = useState<ElementStyles>(styles);

  useEffect(() => {
    setEditedStyles(styles);
  }, [styles]);

  const handleStyleChange = (property: keyof ElementStyles, value: string) => {
    setEditedStyles(prev => ({ ...prev, [property]: value }));
  };

  const hasChanges = useMemo(() => {
    if (!styles || !editedStyles) return false;
    const originalBgHex = rgbToHex(styles.backgroundColor);
    const editedBgHex = editedStyles.backgroundColor.startsWith('#') ? editedStyles.backgroundColor : rgbToHex(editedStyles.backgroundColor);
    if (originalBgHex !== editedBgHex) return true;

    const originalColorHex = rgbToHex(styles.color);
    const editedColorHex = editedStyles.color.startsWith('#') ? editedStyles.color : rgbToHex(editedStyles.color);
    if (originalColorHex !== editedColorHex) return true;
    
    return (
      styles.fontSize !== editedStyles.fontSize ||
      styles.fontWeight !== editedStyles.fontWeight ||
      styles.padding !== editedStyles.padding ||
      styles.margin !== editedStyles.margin ||
      styles.borderRadius !== editedStyles.borderRadius
    );
  }, [styles, editedStyles]);

  const handleApply = () => {
    const changes: string[] = [];

    const originalBgHex = rgbToHex(styles.backgroundColor);
    const editedBgHex = editedStyles.backgroundColor.startsWith('#') ? editedStyles.backgroundColor : rgbToHex(editedStyles.backgroundColor);
    if (originalBgHex !== editedBgHex) {
      changes.push(`background color to "${editedBgHex}"`);
    }
    
    const originalColorHex = rgbToHex(styles.color);
    const editedColorHex = editedStyles.color.startsWith('#') ? editedStyles.color : rgbToHex(editedStyles.color);
    if (originalColorHex !== editedColorHex) {
      changes.push(`text color to "${editedColorHex}"`);
    }

    if (styles.fontSize !== editedStyles.fontSize) changes.push(`font size to "${editedStyles.fontSize}"`);
    if (styles.fontWeight !== editedStyles.fontWeight) changes.push(`font weight to "${editedStyles.fontWeight}"`);
    if (styles.padding !== editedStyles.padding) changes.push(`padding to "${editedStyles.padding}"`);
    if (styles.margin !== editedStyles.margin) changes.push(`margin to "${editedStyles.margin}"`);
    if (styles.borderRadius !== editedStyles.borderRadius) changes.push(`border radius to "${editedStyles.borderRadius}"`);

    if (changes.length > 0) {
      const prompt = `Change the ${changes.join(', and ')}.`;
      onApplyChanges(prompt);
    }
  };
  
  const getColorInputValue = (color: string) => {
    return color.startsWith('#') ? color : rgbToHex(color);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Element Properties
          {hasChanges && (
            <Badge variant="secondary" className="ml-auto">
              Modified
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Adjust the styling properties of the selected element
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {/* Color Properties */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="background-color" className="text-sm font-medium">
                Background
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">
                  {getColorInputValue(editedStyles.backgroundColor)}
                </span>
                <input
                  id="background-color"
                  type="color"
                  value={getColorInputValue(editedStyles.backgroundColor)}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  disabled={isLoading}
                  className="w-8 h-8 p-0 border border-input rounded cursor-pointer disabled:cursor-not-allowed bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="text-color" className="text-sm font-medium">
                Text Color
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">
                  {getColorInputValue(editedStyles.color)}
                </span>
                <input
                  id="text-color"
                  type="color"
                  value={getColorInputValue(editedStyles.color)}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  disabled={isLoading}
                  className="w-8 h-8 p-0 border border-input rounded cursor-pointer disabled:cursor-not-allowed bg-transparent"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Typography Properties */}
          {(['fontSize', 'fontWeight'] as const).map(prop => {
            const label = prop.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            return (
              <div key={prop} className="flex items-center justify-between">
                <Label htmlFor={prop} className="text-sm font-medium">
                  {label}
                </Label>
                <Input 
                  id={prop}
                  type="text"
                  value={editedStyles[prop]}
                  onChange={(e) => handleStyleChange(prop, e.target.value)}
                  disabled={isLoading}
                  className="w-32 text-right"
                />
              </div>
            );
          })}

          <Separator />

          {/* Layout Properties */}
          {(['padding', 'margin', 'borderRadius'] as const).map(prop => {
            const label = prop.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            return (
              <div key={prop} className="flex items-center justify-between">
                <Label htmlFor={prop} className="text-sm font-medium">
                  {label}
                </Label>
                <Input 
                  id={prop}
                  type="text"
                  value={editedStyles[prop]}
                  onChange={(e) => handleStyleChange(prop, e.target.value)}
                  disabled={isLoading}
                  className="w-32 text-right"
                />
              </div>
            );
          })}
        </div>
        
        <Separator />

        <Button
          onClick={handleApply}
          disabled={!hasChanges || isLoading}
          className="w-full"
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying Changes...
            </>
          ) : (
            'Apply Changes'
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          Use the chat for more complex modifications and layout changes.
        </p>
      </CardContent>
    </Card>
  );
}

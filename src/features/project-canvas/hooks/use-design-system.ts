import { useAtom } from "jotai";
import { designSystemFamily, defaultDesignSystem } from "../stores/design-system-store";
import { designSystemPresets } from "../data/design-system-presets";
import { useCallback, useEffect } from "react";
import { api } from "@/trpc/react";
import { getFontFaceStyle, getGoogleFontLink } from "../utils/font-utils";

export function useDesignSystem(projectId: string) {
    const [designSystem, setDesignSystem] = useAtom(designSystemFamily(projectId));

    const updateColor = useCallback((key: string, value: string) => {
        setDesignSystem((prev) => ({
            ...prev,
            colors: { ...prev.colors, [key]: value },
            type: "custom",
            presetName: undefined
        }));
    }, [setDesignSystem]);

    const updateTypography = useCallback((key: string, value: any) => {
        setDesignSystem((prev) => ({
            ...prev,
            typography: { ...prev.typography, [key]: value },
            type: "custom",
            presetName: undefined
        }));
    }, [setDesignSystem]);

    const updateSpacing = useCallback((key: string, value: any) => {
        setDesignSystem((prev) => ({
            ...prev,
            spacing: { ...prev.spacing, [key]: value },
            type: "custom",
            presetName: undefined
        }));
    }, [setDesignSystem]);

    const updateRadius = useCallback((key: string, value: string) => {
        setDesignSystem((prev) => ({
            ...prev,
            radius: { ...prev.radius, [key]: value },
            type: "custom",
            presetName: undefined
        }));
    }, [setDesignSystem]);

    const applyPreset = useCallback((presetKey: string) => {
        const preset = designSystemPresets[presetKey];
        if (!preset) return;

        setDesignSystem((prev) => ({
            ...prev,
            ...preset,
            colors: { ...prev.colors, ...preset.colors },
            typography: { ...prev.typography, ...preset.typography },
            spacing: { ...prev.spacing, ...preset.spacing },
            radius: { ...prev.radius, ...preset.radius },
            presetName: presetKey,
            type: "preset"
        }));
    }, [setDesignSystem]);

    const { data: serverDesignSystem, isLoading } = api.designSystem.get.useQuery({ projectId }, { staleTime: Infinity });

    useEffect(() => {
        if (serverDesignSystem) {
            setDesignSystem({
                ...defaultDesignSystem,
                ...serverDesignSystem as any
            });
        }
    }, [serverDesignSystem, setDesignSystem]);

    const revertToDefault = useCallback(() => {
        setDesignSystem({ ...defaultDesignSystem });
    }, [setDesignSystem]);

    // Computed values for iframes
    const fontFamily = designSystem.typography.fontFamily;
    const iframeFonts = {
        fontLink: fontFamily ? getGoogleFontLink(fontFamily) : null,
        fontStyle: fontFamily ? getFontFaceStyle(fontFamily) : "",
        fontLinkTag: fontFamily ? (getGoogleFontLink(fontFamily) ? `<link href="${getGoogleFontLink(fontFamily)}" rel="stylesheet">` : "") : "",
    };

    return {
        designSystem,
        serverDesignSystem,
        isLoading,
        setDesignSystem, // Expose raw setter if needed, but prefer specific updaters
        revertToDefault,
        updateColor,
        updateTypography,
        updateSpacing,
        updateRadius,
        applyPreset,
        iframeFonts
    };
}

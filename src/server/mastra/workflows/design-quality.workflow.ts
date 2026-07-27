import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { runStructuredAiCall } from "@/server/services/ai.service";
import { sanitizeGeneratedHtml } from "@/server/lib/sanitize-html";

const viewModeSchema = z.enum(["DESKTOP", "TABLET", "MOBILE"]);

const designQualityInputSchema = z.object({
  projectId: z.string().min(1),
  designId: z.string().min(1).optional(),
  html: z.string().min(1),
  viewMode: viewModeSchema.default("DESKTOP"),
  goal: z.string().min(1).optional(),
});

const renderArtifactSchema = z.object({
  screenshotRef: z.string(),
  viewportLabel: z.string(),
  htmlLength: z.number().int().nonnegative(),
});

const critiqueIssueSchema = z.object({
  severity: z.enum(["low", "medium", "high"]),
  title: z.string(),
  recommendation: z.string(),
});

const renderStepOutputSchema = z.object({
  projectId: z.string(),
  designId: z.string().optional(),
  goal: z.string().optional(),
  originalHtml: z.string(),
  viewMode: viewModeSchema,
  renderArtifact: renderArtifactSchema,
});

const aiCritiqueOutputSchema = z.object({
  summary: z.string(),
  issues: z.array(critiqueIssueSchema),
});

const critiqueStepOutputSchema = renderStepOutputSchema.extend({
  critique: z.object({
    summary: z.string(),
    issues: z.array(critiqueIssueSchema),
  }),
});

const aiFixOutputSchema = z.object({
  fixedHtml: z.string(),
  fixSummary: z.string(),
});

const designQualityOutputSchema = critiqueStepOutputSchema.extend({
  status: z.enum(["success", "partial", "failed"]),
  fixSummary: z.string(),
  fixedHtml: z.string(),
});

function getViewportLabel(viewMode: z.infer<typeof viewModeSchema>): string {
  switch (viewMode) {
    case "MOBILE":
      return "mobile-390x844";
    case "TABLET":
      return "tablet-834x1112";
    case "DESKTOP":
    default:
      return "desktop-1440x900";
  }
}

const renderStep = createStep({
  id: "design-quality-render",
  description: "Builds a render artifact for the render-to-vision pipeline.",
  inputSchema: designQualityInputSchema,
  outputSchema: renderStepOutputSchema,
  execute: async ({ inputData }) => {
    const designKey = inputData.designId ?? "ad-hoc-design";

    return {
      projectId: inputData.projectId,
      designId: inputData.designId,
      goal: inputData.goal,
      originalHtml: inputData.html,
      viewMode: inputData.viewMode,
      renderArtifact: {
        screenshotRef: `live://${inputData.projectId}/${designKey}/${inputData.viewMode.toLowerCase()}`,
        viewportLabel: getViewportLabel(inputData.viewMode),
        htmlLength: inputData.html.length,
      },
    };
  },
});

const critiqueStep = createStep({
  id: "design-quality-critique",
  description: "Uses AI to critique the generated HTML against the design goal.",
  inputSchema: renderStepOutputSchema,
  outputSchema: critiqueStepOutputSchema,
  execute: async ({ inputData }) => {
    const goal = inputData.goal ?? "General UI design";
    const prompt = `You are an expert UI/UX critique reviewer. Analyze the following HTML design against the stated design goal.

Design Goal: ${goal}

HTML:
${inputData.originalHtml}

Provide a structured critique with:
1. A summary of your overall assessment — what works well and what doesn't.
2. Specific issues found, each with:
   - severity: "low", "medium", or "high"
   - title: a short title for the issue
   - recommendation: a specific actionable recommendation to fix it

Focus on layout, visual hierarchy, accessibility, responsiveness, and alignment with the design goal.`;

    try {
      const critique = await runStructuredAiCall({
        operation: "design-quality-critique",
        schema: aiCritiqueOutputSchema,
        messages: [{ role: "user", content: prompt }],
        failureMessage: "AI critique failed. Please check the design and try again.",
        logLabel: "Error in design-quality critique:",
      });

      return {
        ...inputData,
        critique,
      };
    } catch {
      return {
        ...inputData,
        critique: {
          summary: "AI critique was unavailable. The design was not reviewed.",
          issues: [
            {
              severity: "medium" as const,
              title: "AI critique service unavailable",
              recommendation:
                "Check your API configuration and try again. The design has been preserved as-is.",
            },
          ],
        },
      };
    }
  },
});

const autoFixStep = createStep({
  id: "design-quality-autofix",
  description: "Uses AI to automatically fix the HTML based on the critique issues.",
  inputSchema: critiqueStepOutputSchema,
  outputSchema: designQualityOutputSchema,
  execute: async ({ inputData }) => {
    const goal = inputData.goal ?? "General UI design";
    const prompt = `You are an expert UI/UX developer. Fix the following HTML design based on the critique provided.

Design Goal: ${goal}

HTML:
${inputData.originalHtml}

Critique Summary: ${inputData.critique.summary}

Critique Issues:
${JSON.stringify(inputData.critique.issues, null, 2)}

Return the fixed HTML and a brief summary of what you changed. Use only Tailwind CSS classes for styling. Do NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags.`;

    try {
      const fix = await runStructuredAiCall({
        operation: "design-quality-autofix",
        schema: aiFixOutputSchema,
        messages: [{ role: "user", content: prompt }],
        failureMessage: "AI auto-fix failed. The original HTML was returned unchanged.",
        logLabel: "Error in design-quality auto-fix:",
      });

      return designQualityOutputSchema.parse({
        ...inputData,
        status: "success",
        fixSummary: fix.fixSummary,
        fixedHtml: sanitizeGeneratedHtml(fix.fixedHtml),
      });
    } catch {
      return designQualityOutputSchema.parse({
        ...inputData,
        status: "failed",
        fixSummary: "AI auto-fix was unable to apply changes.",
        fixedHtml: inputData.originalHtml,
      });
    }
  },
});

export const designQualityWorkflow = createWorkflow({
  id: "design-quality-workflow",
  description: "Orchestrates render, AI critique, and AI auto-fix for design quality.",
  inputSchema: designQualityInputSchema,
  outputSchema: designQualityOutputSchema,
})
  .then(renderStep)
  .then(critiqueStep)
  .then(autoFixStep)
  .commit();

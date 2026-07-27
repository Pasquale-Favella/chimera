import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { designTokensSchema } from "@/server/api/features/designs/design.dto";
import { runStructuredAiCall } from "@/server/services/ai.service";

const memorySignalSchema = z.object({
  source: z.enum(["prompt", "design", "manual"]),
  content: z.string().min(1),
  weight: z.number().min(0).max(1).default(0.5),
});

const memoryWorkflowInputSchema = z.object({
  projectId: z.string().min(1),
  projectName: z.string().min(1).optional(),
  notes: z.array(z.string().min(1)).default([]),
  signals: z.array(memorySignalSchema).default([]),
  designTokens: designTokensSchema.optional(),
});

const signalAnalysisSchema = z.object({
  patterns: z
    .array(z.string())
    .describe("Recurring themes or patterns found across signals."),
  conflicts: z
    .array(z.string())
    .describe("Conflicting or contradictory signals that need resolution."),
  priorities: z
    .array(z.string())
    .describe("High-priority signals that should take precedence."),
});

const normalizedMemorySchema = z.object({
  projectId: z.string(),
  projectName: z.string().optional(),
  normalizedSignals: z.array(z.string()),
  signalAnalysis: signalAnalysisSchema.nullable(),
  designTokens: designTokensSchema.nullable(),
});

const aiMemoryDraftSchema = z.object({
  summary: z
    .string()
    .describe(
      "A concise summary of the project's style and brand identity derived from the signals.",
    ),
  styleDirectives: z
    .array(z.string())
    .describe("A list of actionable style directives for the project."),
  recommendations: z
    .array(z.string())
    .describe("Design system recommendations based on the analyzed signals."),
});

const draftedMemorySchema = normalizedMemorySchema.extend({
  memoryDraft: z.object({
    summary: z.string(),
    styleDirectives: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
});

const memoryWorkflowOutputSchema = draftedMemorySchema.extend({
  status: z.literal("active"),
  memoryRecord: z.object({
    key: z.string(),
    scope: z.literal("project"),
    projectId: z.string(),
    summary: z.string(),
    styleDirectives: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
});

const normalizeSignalsStep = createStep({
  id: "memory-normalize-signals",
  description: "Normalizes project style inputs and enriches with AI signal analysis.",
  inputSchema: memoryWorkflowInputSchema,
  outputSchema: normalizedMemorySchema,
  execute: async ({ inputData }) => {
    const normalizedSignals = [
      ...inputData.notes.map((note) => `note:${note}`),
      ...inputData.signals.map(
        (signal) =>
          `${signal.source}:${signal.content} (weight=${signal.weight.toFixed(2)})`,
      ),
    ];

    if (normalizedSignals.length === 0) {
      return {
        projectId: inputData.projectId,
        projectName: inputData.projectName,
        normalizedSignals: [],
        signalAnalysis: null,
        designTokens: inputData.designTokens ?? null,
      };
    }

    const analysisPrompt = `You are an expert design system analyst. Analyze the following style signals extracted from a project and identify patterns, conflicts, and priorities.

Signals:
${normalizedSignals.map((s) => `- ${s}`).join("\n")}

Return a structured analysis with:
1. patterns — recurring themes or patterns found across signals
2. conflicts — conflicting or contradictory signals
3. priorities — high-priority signals that should take precedence`;

    let signalAnalysis = null;
    try {
      signalAnalysis = await runStructuredAiCall({
        operation: "memory-signal-analysis",
        schema: signalAnalysisSchema,
        messages: [{ role: "user", content: analysisPrompt }],
        failureMessage: "AI signal analysis failed.",
        logLabel: "Error in memory signal analysis:",
      });
    } catch {
      // If AI analysis fails, continue with null analysis
    }

    return {
      projectId: inputData.projectId,
      projectName: inputData.projectName,
      normalizedSignals,
      signalAnalysis,
      designTokens: inputData.designTokens ?? null,
    };
  },
});

const draftMemoryStep = createStep({
  id: "memory-draft-profile",
  description: "Synthesizes style directives, summary, and recommendations from normalized signals using AI.",
  inputSchema: normalizedMemorySchema,
  outputSchema: draftedMemorySchema,
  execute: async ({ inputData }) => {
    if (inputData.normalizedSignals.length === 0) {
      return {
        ...inputData,
        memoryDraft: {
          summary:
            "No explicit style signals were provided; memory draft remains generic.",
          styleDirectives: [
            "Preserve reusable project-level style guidance.",
            "Keep tone, brand, and visual constraints scoped per project.",
          ],
          recommendations: [
            "Add explicit design signals (notes, design tokens) to generate richer recommendations.",
          ],
        },
      };
    }

    const analysisSection = inputData.signalAnalysis
      ? `Signal Analysis:
- Patterns: ${inputData.signalAnalysis.patterns.join(", ")}
- Conflicts: ${inputData.signalAnalysis.conflicts.join(", ")}
- Priorities: ${inputData.signalAnalysis.priorities.join(", ")}`
      : "";

    const prompt = `You are an expert design system architect. Based on the following normalized style signals and optional signal analysis, synthesize a project memory profile.

Project Name: ${inputData.projectName ?? "Unnamed Project"}

Normalized Signals:
${inputData.normalizedSignals.map((s) => `- ${s}`).join("\n")}

${analysisSection}

Return a structured memory draft with:
1. summary — a concise summary of the project's style and brand identity
2. styleDirectives — a list of actionable style directives
3. recommendations — design system recommendations`;

    try {
      const memoryDraft = await runStructuredAiCall({
        operation: "memory-draft-profile",
        schema: aiMemoryDraftSchema,
        messages: [{ role: "user", content: prompt }],
        failureMessage: "AI memory draft failed.",
        logLabel: "Error in memory draft:",
      });

      return {
        ...inputData,
        memoryDraft,
      };
    } catch {
      return {
        ...inputData,
        memoryDraft: {
          summary: `Captured ${inputData.normalizedSignals.length} style signals for project memory.`,
          styleDirectives: [
            "Preserve reusable project-level style guidance.",
            "Keep tone, brand, and visual constraints scoped per project.",
          ],
          recommendations: [
            "AI synthesis unavailable. Rerun the workflow to generate recommendations.",
          ],
        },
      };
    }
  },
});

const persistMemoryPlanStep = createStep({
  id: "memory-persist-plan",
  description: "Packages the memory plan into a persistence-ready record.",
  inputSchema: draftedMemorySchema,
  outputSchema: memoryWorkflowOutputSchema,
  execute: async ({ inputData }) =>
    memoryWorkflowOutputSchema.parse({
      ...inputData,
      status: "active",
      memoryRecord: {
        key: `project:${inputData.projectId}:brand-style`,
        scope: "project",
        projectId: inputData.projectId,
        summary: inputData.memoryDraft.summary,
        styleDirectives: inputData.memoryDraft.styleDirectives,
        recommendations: inputData.memoryDraft.recommendations,
      },
    }),
});

export const memoryWorkflow = createWorkflow({
  id: "memory-workflow",
  description: "Orchestrates per-project brand/style memory synthesis with AI analysis.",
  inputSchema: memoryWorkflowInputSchema,
  outputSchema: memoryWorkflowOutputSchema,
})
  .then(normalizeSignalsStep)
  .then(draftMemoryStep)
  .then(persistMemoryPlanStep)
  .commit();

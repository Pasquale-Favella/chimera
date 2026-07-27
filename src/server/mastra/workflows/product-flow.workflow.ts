import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { runStructuredAiCall, aiConfigSchema } from "@/server/services/ai.service";

const connectionPositionSchema = z.enum(["top", "right", "bottom", "left"]);

const existingScreenSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1).optional(),
});

const screenPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  userGoal: z.string(),
});

const flowConnectionPlanSchema = z.object({
  from: z.string(),
  to: z.string(),
  fromPosition: connectionPositionSchema,
  toPosition: connectionPositionSchema,
  rationale: z.string(),
});

const productFlowInputSchema = z.object({
  projectId: z.string().min(1),
  prompt: z.string().min(1),
  maxScreens: z.number().int().min(1).max(12).default(4),
  existingScreens: z.array(existingScreenSchema).default([]),
  config: aiConfigSchema.optional(),
});

const aiScreenPlanSchema = z.object({
  screens: z.array(screenPlanSchema),
});

const aiConnectionPlanSchema = z.object({
  connections: z.array(flowConnectionPlanSchema),
});

const transitionNoteSchema = z.object({
  from: z.string(),
  to: z.string(),
  transitionLogic: z.string(),
  edgeCaseNotes: z.string().optional(),
});

const aiPackagePlanSchema = z.object({
  nextAction: z.string(),
  transitionNotes: z.array(transitionNoteSchema),
});

const outlinedFlowSchema = z.object({
  projectId: z.string(),
  prompt: z.string(),
  screens: z.array(screenPlanSchema),
  config: aiConfigSchema.optional(),
});

const connectedFlowSchema = outlinedFlowSchema.extend({
  connections: z.array(flowConnectionPlanSchema),
});

const productFlowOutputSchema = connectedFlowSchema.extend({
  status: z.literal("complete"),
  nextAction: z.string(),
  transitionNotes: z.array(transitionNoteSchema),
});

const outlineScreensStep = createStep({
  id: "product-flow-outline-screens",
  description: "Uses AI to generate a multi-screen plan from the user prompt.",
  inputSchema: productFlowInputSchema,
  outputSchema: outlinedFlowSchema,
  execute: async ({ inputData }) => {
    if (inputData.existingScreens.length > 0) {
      const desiredScreenCount = Math.min(
        inputData.maxScreens,
        inputData.existingScreens.length,
      );
      const screens = inputData.existingScreens
        .slice(0, desiredScreenCount)
        .map((screen) => ({
          id: screen.id,
          name: screen.name,
          description:
            screen.description ?? `Existing screen reused: ${screen.name}.`,
          userGoal: `Continue the flow through ${screen.name}.`,
        }));

      return {
        projectId: inputData.projectId,
        prompt: inputData.prompt,
        screens,
        config: inputData.config,
      };
    }

    const prompt = `You are an expert product designer. Based on the following user prompt, generate a plan for a multi-screen user flow.

User Prompt: ${inputData.prompt}

Generate at most ${inputData.maxScreens} screens. For each screen provide:
- id: a unique identifier (e.g., "screen-1", "screen-2")
- name: a descriptive name for the screen
- description: a brief description of what this screen contains
- userGoal: what the user achieves on this screen

Return a JSON object with a "screens" array containing the screen plans.`;

    try {
      const { screens } = await runStructuredAiCall({
        operation: "product-flow-outline-screens",
        schema: aiScreenPlanSchema,
        messages: [{ role: "user", content: prompt }],
        config: inputData.config,
        failureMessage: "AI screen plan generation failed.",
        logLabel: "Error in product-flow screen outlining:",
      });

      return {
        projectId: inputData.projectId,
        prompt: inputData.prompt,
        screens: screens.map((screen, index) => ({
          ...screen,
          id: screen.id || `screen-${index + 1}`,
        })),
        config: inputData.config,
      };
    } catch {
      const desiredScreenCount = Math.max(
        2,
        Math.min(inputData.maxScreens, 3),
      );

      return {
        projectId: inputData.projectId,
        prompt: inputData.prompt,
        config: inputData.config,
        screens: Array.from({ length: desiredScreenCount }, (_, index) => ({
          id: `screen-${index + 1}`,
          name: `Planned Screen ${index + 1}`,
          description: `Fallback screen ${index + 1} for: ${inputData.prompt}`,
          userGoal:
            index === 0
              ? "Introduce the flow entry point."
              : `Advance the user journey to step ${index + 1}.`,
        })),
      };
    }
  },
});

const mapConnectionsStep = createStep({
  id: "product-flow-map-connections",
  description: "Uses AI to determine logical connections between screens.",
  inputSchema: outlinedFlowSchema,
  outputSchema: connectedFlowSchema,
  execute: async ({ inputData }) => {
    if (inputData.screens.length <= 1) {
      return {
        ...inputData,
        connections: [],
      };
    }

    const prompt = `You are an expert UX flow designer. Determine the logical connections between the following screens in a user flow.

Screens:
${inputData.screens
  .map(
    (s) =>
      `- ${s.id}: ${s.name} — ${s.description} (User goal: ${s.userGoal})`,
  )
  .join("\n")}

For each connection, provide:
- from: the source screen ID
- to: the target screen ID
- fromPosition: "top", "right", "bottom", or "left" (connection point on source)
- toPosition: "top", "right", "bottom", or "left" (connection point on target)
- rationale: a brief explanation of why this connection exists

Use position "right" for from and "left" for to in standard linear flows. Use other positions if the flow branches or requires special layout.

Return a JSON object with a "connections" array.`;

    try {
      const { connections } = await runStructuredAiCall({
        operation: "product-flow-map-connections",
        schema: aiConnectionPlanSchema,
        messages: [{ role: "user", content: prompt }],
        config: inputData.config,
        failureMessage: "AI connection mapping failed.",
        logLabel: "Error in product-flow connection mapping:",
      });

      return {
        ...inputData,
        connections,
      };
    } catch {
      return {
        ...inputData,
        connections: inputData.screens.slice(0, -1).map((screen, index) => ({
          from: screen.id,
          to: inputData.screens[index + 1]?.id ?? screen.id,
          fromPosition: "right" as const,
          toPosition: "left" as const,
          rationale: `Linear fallback transition from ${screen.name} to ${inputData.screens[index + 1]?.name ?? screen.name}.`,
        })),
      };
    }
  },
});

const packageFlowPlanStep = createStep({
  id: "product-flow-package-plan",
  description: "Enriches the flow plan with AI-generated transition logic and edge case notes.",
  inputSchema: connectedFlowSchema,
  outputSchema: productFlowOutputSchema,
  execute: async ({ inputData }) => {
    if (inputData.connections.length === 0) {
      return productFlowOutputSchema.parse({
        ...inputData,
        status: "complete",
        nextAction:
          "Flow plan is complete. Add more screens to create connections.",
        transitionNotes: [],
      });
    }

    const prompt = `You are an expert UX flow architect. Analyze the following screen flow plan and provide transition logic and edge case notes for each connection.

Screens:
${inputData.screens
  .map((s) => `- ${s.id}: ${s.name} — ${s.description}`)
  .join("\n")}

Connections:
${inputData.connections
  .map(
    (c) =>
      `- ${c.from} -> ${c.to} (${c.fromPosition} to ${c.toPosition}): ${c.rationale}`,
  )
  .join("\n")}

For each connection, provide:
- from: the source screen ID
- to: the target screen ID
- transitionLogic: how the transition should work (e.g., "slide left", "fade", "modal appears")
- edgeCaseNotes: any edge cases or considerations for this transition (optional)

Also provide a nextAction string describing what the user should do next with this flow.

Return the transition notes and a next action.`;

    try {
      const enrichment = await runStructuredAiCall({
        operation: "product-flow-package-plan",
        schema: aiPackagePlanSchema,
        messages: [{ role: "user", content: prompt }],
        config: inputData.config,
        failureMessage: "AI flow packaging failed.",
        logLabel: "Error in product-flow packaging:",
      });

      return productFlowOutputSchema.parse({
        ...inputData,
        status: "complete",
        nextAction: enrichment.nextAction,
        transitionNotes: enrichment.transitionNotes,
      });
    } catch {
      return productFlowOutputSchema.parse({
        ...inputData,
        status: "complete",
        nextAction:
          "Flow plan is complete. Review the screens and connections to ensure they meet your requirements.",
        transitionNotes: inputData.connections.map((conn) => ({
          from: conn.from,
          to: conn.to,
          transitionLogic: "Standard slide transition.",
          edgeCaseNotes: "AI enrichment unavailable. Review manually.",
        })),
      });
    }
  },
});

export const productFlowWorkflow = createWorkflow({
  id: "product-flow-workflow",
  description: "Orchestrates AI-powered multi-screen product-flow planning.",
  inputSchema: productFlowInputSchema,
  outputSchema: productFlowOutputSchema,
})
  .then(outlineScreensStep)
  .then(mapConnectionsStep)
  .then(packageFlowPlanStep)
  .commit();

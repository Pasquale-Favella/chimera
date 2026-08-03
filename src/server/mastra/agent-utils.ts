/**
 * Agent execution utilities
 * Shared runner for calling Mastra agents with a per-user model override so
 * workflow steps can reuse the same logic as `ai.service.ts`.
 */

import type { Agent } from "@mastra/core/agent";
import type { z } from "zod";
import type { AiConfig } from "@/types/llm";
import { toMastraModel } from "./agents/model-config";

export type AgentContentPart =
	| { type: "text"; text: string }
	| { type: "image"; image: string; mediaType?: string };

export type AgentContent = string | AgentContentPart[];

/**
 * Runs an agent against a single user message and returns its structured
 * output. The model is resolved from the per-user `AiConfig`, overriding the
 * agent's default model.
 */
export async function generate<Output extends {}>(
	agent: Agent,
	content: AgentContent,
	schema: z.ZodType<Output, Output>,
	config: AiConfig,
): Promise<Output> {
	const output = await agent.generate<Output>([{ role: "user", content }], {
		structuredOutput: { schema },
		model: toMastraModel(config),
	});

	return output.object;
}

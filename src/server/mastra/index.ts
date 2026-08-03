import { Mastra } from "@mastra/core";
import { agents } from "./agents";
import { styleMemory } from "./memory";
import { tools } from "./tools";
import { workflows } from "./workflows";

export const mastra = new Mastra({
	agents,
	tools,
	workflows,
	memory: {
		style: styleMemory,
	},
});

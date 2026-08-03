/**
 * Style Memory
 *
 * Mastra Memory instance persisting per-project style memory and conversation
 * history through the LibSQL storage adapter (`@mastra/libsql`). Working memory
 * is scoped to the resource (project id) so design language extracted from one
 * design carries over to the next.
 */

import { MockMemory } from "@mastra/core/memory";
import type { InMemoryStore } from "@mastra/core/storage";
import { LibSQLStore } from "@mastra/libsql";

/**
 * Working memory template used to structure the project's style memory.
 * Fields are maintained by the `styleMemorySynthesizer` agent and read back
 * by design generation, critique, and flow planning.
 */
export const STYLE_MEMORY_TEMPLATE = `# Style Memory

## Brand Summary
- **Product / Purpose**:
- **Audience**:
- **Design Personality**:

## Style Directives
- **Visual Direction**:
- **Layout Principles**:
- **Accessibility Requirements**:
- **Interaction Patterns**:

## Design Tokens
- **Colors**:
  - Primary:
  - Secondary:
  - Accent:
  - Background:
  - Text:
  - Semantic (success/warning/error):
- **Typography**:
  - Font families:
  - Heading styles:
  - Body styles:
- **Spacing**:
- **Border Radius**:
- **Shadows**:

## Notes
- **Current Progress**:
- **Decisions Made**:
- **Open Questions**:
`;

/**
 * LibSQL (SQLite-compatible) storage adapter backing Mastra memory. Uses its
 * own database file so Mastra-managed tables stay isolated from the app's
 * Prisma-managed `db.sqlite`.
 */
const libsqlStorage = new LibSQLStore({
	id: "libsql-mastra-storage",
	url: "file:./mastra.db",
});

/**
 * Per-project style memory + message history.
 *
 * - `resourceId` identifies the project (one thread per project).
 * - Working memory is scoped to the resource, persisting across threads.
 * - `lastMessages` limits the recalled conversation history.
 * - Semantic recall is disabled (no vector store configured).
 */
export const styleMemory = new MockMemory({
	storage: libsqlStorage as unknown as InMemoryStore,
	enableWorkingMemory: true,
	enableMessageHistory: true,
	workingMemoryTemplate: STYLE_MEMORY_TEMPLATE,
	options: {
		lastMessages: 10,
		semanticRecall: false,
		workingMemory: {
			enabled: true,
			scope: "resource",
		},
	},
});

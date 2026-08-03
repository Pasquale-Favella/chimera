/**
 * Workflow errors
 * Typed errors thrown by workflow steps so callers (tRPC router, MCP) can map
 * them to the right HTTP/tool semantics instead of a generic failure.
 */

export class DesignsNotFoundError extends Error {
	constructor(message = "No matching designs were found for this project.") {
		super(message);
		this.name = "DesignsNotFoundError";
	}
}

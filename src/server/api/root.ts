import { componentsRouter } from "@/server/api/features/components/component.router";
import { designConnectionsRouter } from "@/server/api/features/designs/connection.router";
import { designAiRouter } from "@/server/api/features/designs/design-ai.router";
import { designsRouter } from "@/server/api/features/designs/design.router";
import { projectMembershipRouter } from "@/server/api/features/projects/membership.router";
import { projectsRouter } from "@/server/api/features/projects/project.router";
import { userRouter } from "@/server/api/features/users/user.router";
import { designSystemRouter } from "@/server/api/features/design-system/design-system.router";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	projects: projectsRouter,
	projectMemberships: projectMembershipRouter,
	designs: designsRouter,
	designAi: designAiRouter,
	designConnections: designConnectionsRouter,
	components: componentsRouter,
	designSystem: designSystemRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.projects.list();
 *       ^? Project[]
 */
export const createCaller = createCallerFactory(appRouter);

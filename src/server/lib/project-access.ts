import { db } from "@/server/db";

export async function findProjectOrThrow(projectId: string): Promise<void> {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { id: true },
  });
  if (!project) {
    throw new Error("Project not found.");
  }
}

export async function findProjectMembershipOrThrow(
  projectId: string,
  userId: string,
  allowedRoles: readonly string[],
) {
  const membership = await db.projectMembership.findUnique({
    where: {
      projectId_userId: { projectId, userId },
    },
  });
  if (!membership || !allowedRoles.includes(membership.role)) {
    throw new Error("You do not have access to this project.");
  }
  return membership;
}

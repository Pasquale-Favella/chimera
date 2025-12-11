"use client";

import { createContext, useContext, type ReactNode } from "react";

const ProjectIdContext = createContext<string | null>(null);

export function ProjectIdProvider({
    projectId,
    children,
}: {
    projectId: string;
    children: ReactNode;
}) {
    return (
        <ProjectIdContext.Provider value={projectId}>
            {children}
        </ProjectIdContext.Provider>
    );
}

export function useProjectId(): string {
    const projectId = useContext(ProjectIdContext);
    if (!projectId) {
        throw new Error("useProjectId must be used within a ProjectIdProvider");
    }
    return projectId;
}

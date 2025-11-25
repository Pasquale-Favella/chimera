import { formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/trpc/react";

type ProjectDesign = RouterOutputs["designs"]["listByProject"][number];
type RecentDesign = RouterOutputs["designs"]["listRecent"][number];
type DesignItem = ProjectDesign & RecentDesign;

type DesignHighlightsProps = {
	projectName?: string;
	headline?: string;
	designs: DesignItem[];
	showProjectBadge?: boolean;
};

export function DesignHighlights({
	projectName,
	headline,
	designs,
	showProjectBadge = false,
}: DesignHighlightsProps) {
	return (
		<Card className="flex h-fit flex-col">
			<CardHeader>
				<CardTitle>Recent designs</CardTitle>
				<CardDescription>
					{headline
						? headline
						: projectName
							? `Latest work from ${projectName}`
							: "Latest designs across your projects."}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col gap-4">
				{designs.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No designs found for your most recent project yet.
					</p>
				) : (
					designs.slice(0, 5).map((design) => (
						<div
							key={design.id}
							className="rounded-lg border p-3 text-sm shadow-xs"
						>
							<div className="flex items-center justify-between">
								<p className="font-medium">{design.name}</p>
								<Badge variant="secondary">v{design.version}</Badge>
							</div>
							{showProjectBadge && design.project && (
								<p className="text-xs font-semibold text-muted-foreground">
									{design.project.name}
								</p>
							)}
							{design.description && (
								<p className="mt-1 text-muted-foreground">{design.description}</p>
							)}
							<p className="mt-2 text-xs text-muted-foreground">
								Updated{" "}
								{formatDistanceToNow(new Date(design.updatedAt), {
									addSuffix: true,
								})}
							</p>
						</div>
					))
				)}
				{projectName && designs.length > 5 && (
					<p className="text-xs text-muted-foreground">
						Showing latest 5 designs.
					</p>
				)}
			</CardContent>
		</Card>
	);
}


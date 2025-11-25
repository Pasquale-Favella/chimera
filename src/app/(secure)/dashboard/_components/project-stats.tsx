import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type ProjectStatsProps = {
	projects: number;
	owned: number;
	designs: number;
	collaborators: number;
};

export function ProjectStats({
	projects,
	owned,
	designs,
	collaborators,
}: ProjectStatsProps) {
	const shared = Math.max(projects - owned, 0);

	const stats = [
		{
			label: "Active projects",
			value: projects,
			helper: `${owned} owned / ${shared} shared`,
		},
		{
			label: "Design documents",
			value: designs,
			helper: "Across all projects you can access",
		},
		{
			label: "Collaborators",
			value: collaborators,
			helper: "Members invited across your workspace",
		},
		{
			label: "Ownership",
			value: projects > 0 ? `${Math.round((owned / projects) * 100)}%` : "0%",
			helper: "Projects where you are owner",
		},
	];

	return (
		<div className="grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
			{stats.map((stat) => (
				<Card key={stat.label}>
					<CardHeader className="gap-2">
						<CardDescription>{stat.label}</CardDescription>
						<CardTitle className="text-3xl">{stat.value}</CardTitle>
						<CardDescription>{stat.helper}</CardDescription>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}


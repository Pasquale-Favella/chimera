"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

const formSchema = z.object({
	name: z.string().trim().min(1, "Project name is required").max(120),
	description: z
		.string()
		.trim()
		.max(500, "Description is too long")
		.optional()
		.or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

type ProjectQuickCreateProps = {
	latestProjectName?: string;
};

export function ProjectQuickCreate({ latestProjectName }: ProjectQuickCreateProps) {
	const utils = api.useUtils();
	const router = useRouter();
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
		mode: "onChange",
	});

	const createProject = api.projects.create.useMutation({
		onSuccess: async () => {
			await utils.projects.invalidate();
			await utils.designs.invalidate();
			form.reset();
			router.refresh();
		},
	});

	const isDisabled = createProject.isPending || !form.formState.isValid;

	return (
		<Card className="flex flex-col">
			<CardHeader className="gap-2">
				<CardTitle className="text-xl">Quick project</CardTitle>
				<CardDescription>
					{latestProjectName
						? `Latest: ${latestProjectName}`
						: "You have not created a project yet."}
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form
					className="flex flex-1 flex-col gap-3 px-6 pb-6"
					onSubmit={form.handleSubmit((values) => {
						if (isDisabled) return;

						createProject.mutate({
							name: values.name.trim(),
							description: values.description?.trim().length
								? values.description.trim()
								: undefined,
						});
					})}
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs uppercase tracking-wide">
									Name
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Project name"
										disabled={createProject.isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs uppercase tracking-wide">
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Optional description"
										rows={3}
										disabled={createProject.isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<CardFooter className="mt-auto px-0">
						<Button className="w-full" disabled={isDisabled} type="submit">
							{createProject.isPending ? "Creating…" : "Create project"}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}


"use client"; // Mark as client component

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string, type z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/server/better-auth/client";
import Github from "../../_components/logos/github";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export const signUpSchema = object({
	name: string({ required_error: "Name is required" }).min(
		1,
		"Name is required",
	),
	email: string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
	confirmPassword: string({ required_error: "Confirm Password is required" })
		.min(1, "Confirm Password is required")
		.min(8, "Confirm Password must be more than 8 characters")
		.max(32, "Confirm Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

type FormData = z.infer<typeof signUpSchema>;

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const form = useForm<FormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (formData: FormData) => {
		const { data, error } = await authClient.signUp.email({
			name: formData.name, // required
			email: formData.email, // required
			password: formData.password, // required
			callbackURL: "/dashboard",
		});

		if (error) {
			toast.error(error.message);
		} else if (data) {
			toast.success("Registration successful!");
			router.push("/dashboard");
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<Form {...form}>
				<form
					className={cn("flex flex-col gap-6", className)}
					onSubmit={form.handleSubmit(onSubmit)}
					{...props}
				>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="font-bold text-2xl">Create an account</h1>
						<p className="text-balance text-muted-foreground text-sm">
							Enter your email below to create your account
						</p>
					</div>
					<div className="grid gap-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="name">Name</FormLabel>
									<FormControl>
										<Input
											id="name"
											placeholder="John Doe"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Email</FormLabel>
									<FormControl>
										<Input
											id="email"
											placeholder="m@example.com"
											type="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="password">Password</FormLabel>
									<FormControl>
										<Input id="password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="confirmPassword">
										Confirm Password
									</FormLabel>
									<FormControl>
										<Input id="confirmPassword" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className="w-full"
							disabled={form.formState.isSubmitting}
							type="submit"
						>
							{form.formState.isSubmitting ? "Registering..." : "Register"}
						</Button>
					</div >
				</form>
			</Form>

			<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
				<span className="relative z-10 bg-background px-2 text-muted-foreground">
					Or continue with
				</span>
			</div>

			<Button className="w-full" variant="outline" onClick={() => {
				startTransition(async () => {
					await authClient.signIn.social({
						provider: "github",
						callbackURL: "/",
					})
				})
			}}>
				<Github />
				{isPending ? "Registering..." : "Register"} with GitHub
			</Button>
			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link className="underline underline-offset-4" href="/login">
					Login
				</Link>
			</div>
		</div>
	);
}

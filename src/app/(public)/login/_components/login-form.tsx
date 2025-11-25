"use client"; // Mark as client component

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { boolean, object, string, type z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useTransition } from "react";
import Github from "../../_components/logos/github";

export const signInSchema = object({
	email: string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
	rememberMe: boolean().default(true).optional(),
});

type FormData = z.infer<typeof signInSchema>;

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {


	const [isPending, startTransition] = useTransition();

	const form = useForm<FormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: true,
		},
	});

	const onSubmit = async (formData: FormData) => {
		const { data, error } = await authClient.signIn.email({
			email: formData.email, // required
			password: formData.password, // required
			rememberMe: formData.rememberMe,
			callbackURL: "/dashboard",
		});

		if (error) {
			toast.error(error.message);
		} else if (data) {
			toast.success("Login successful!");
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
						<h1 className="font-bold text-2xl">Login to your account</h1>
						<p className="text-balance text-muted-foreground text-sm">
							Enter your email below to login to your account
						</p>
					</div>
					<div className="grid gap-6">
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
									<div className="flex items-center">
										<FormLabel htmlFor="password">Password</FormLabel>
										<a
											className="ml-auto text-sm underline-offset-4 hover:underline"
											href="#"
										>
											Forgot your password?
										</a>
									</div>
									<FormControl>
										<Input id="password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center space-x-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											className="border-2 border-primary/30"
											id="rememberMe"
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel htmlFor="rememberMe">Remember me</FormLabel>
								</FormItem>
							)}
						/>
						<Button
							className="w-full"
							disabled={form.formState.isSubmitting}
							type="submit"
						>
							{form.formState.isSubmitting ? "Logging in..." : "Login"}
						</Button>
					</div>
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
				{isPending ? "Logging in..." : "Login with GitHub"}
			</Button>
			<div className="text-center text-sm">
				Don't have an account?{" "}
				<Link className="underline underline-offset-4" href="/register">
					Sign up
				</Link>
			</div>
		</div>
	);
}

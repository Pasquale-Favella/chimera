import Link from "next/link";
import ChimeraLogo from "../_components/logos/chimera-logo";
import { RegisterForm } from "./_components/register-form";
import { withoutSession } from "@/lib/session-check.utils";

export default async function RegisterPage() {
	await withoutSession();
	return (
		<main className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center md:justify-start">
					<Link className="flex items-center space-x-3" href="/">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary to-chart-1">
							<ChimeraLogo className="h-6 w-6 text-primary-foreground" />
						</div>
						<div>
							<h1 className="font-bold text-xl">Chimera</h1>
							<p className="text-muted-foreground text-xs">Unleash the beast</p>
						</div>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<RegisterForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					src="/assets/login.webp"
				/>
			</div>
		</main>
	);
}

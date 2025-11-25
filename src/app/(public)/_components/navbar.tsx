import type * as React from "react";

import { cn } from "@/lib/utils";

function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			className={cn("flex items-center justify-between py-4", className)}
			data-slot="navbar"
			{...props}
		/>
	);
}

function NavbarLeft({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			className={cn("flex items-center justify-start gap-4", className)}
			data-slot="navbar-left"
			{...props}
		/>
	);
}

function NavbarRight({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			className={cn("flex items-center justify-end gap-4", className)}
			data-slot="navbar-right"
			{...props}
		/>
	);
}

function NavbarCenter({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			className={cn("flex items-center justify-center gap-4", className)}
			data-slot="navbar-center"
			{...props}
		/>
	);
}

export { Navbar, NavbarCenter, NavbarLeft, NavbarRight };

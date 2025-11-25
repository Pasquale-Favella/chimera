import { getSession } from "@/server/better-auth/server";
import { redirect } from "next/navigation";

export async function withSession() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }
}

export async function withoutSession() {
    const session = await getSession();

    if (session) {
        redirect("/dashboard");
    }
}
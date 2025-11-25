import { withoutSession } from "@/lib/session-check.utils";
import CTA from "./_components/sections/cta";
import FAQ from "./_components/sections/faq";
import Footer from "./_components/sections/footer";
import Hero from "./_components/sections/hero";
import Items from "./_components/sections/items";
import { LayoutLines } from "./_components/sections/layout-lines";
import Logos from "./_components/sections/logos";
import Navbar from "./_components/sections/navbar-section";
import Pricing from "./_components/sections/pricing";
import Stats from "./_components/sections/stats";

export default async function LandingPage() {
	await withoutSession();
	return (
		<main className="min-h-screen w-full bg-background text-foreground">
			<LayoutLines />
			<Navbar />
			<Hero />
			<Logos />
			<Items />
			{/*<Stats />*/}
			{/*<Pricing />*/}
			<FAQ />
			<CTA />
			<Footer />
		</main>
	);
}

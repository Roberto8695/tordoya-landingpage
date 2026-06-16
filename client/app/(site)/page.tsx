import AboutUs from "@/components/AboutUs";
import FormContact from "@/components/FormContact";
import Hero from "@/components/Hero";
import PortalResultados from "@/components/PortalResultados";
import Services from "@/components/Services";
import { NosotrosProvider } from "@/features/nosotros/nosotros-context";

export default function Home() {
	return (
		<div className="flex flex-col">
			<Hero />
			<NosotrosProvider>
				<AboutUs />
			</NosotrosProvider>
			<Services />
			<PortalResultados />
			<FormContact />
		</div>
	);
}

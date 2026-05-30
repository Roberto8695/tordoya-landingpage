import AboutUs from "@/components/AboutUs";
import FormContact from "@/components/FormContact";
import Hero from "@/components/Hero";
import PortalResultados from "@/components/PortalResultados";
import Services from "@/components/Services";

export default function Home() {
	return (
		<div className="flex flex-col">
			<Hero />
			<AboutUs />
			<Services />
			<PortalResultados />
			<FormContact />
		</div>
	);
}

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import PortalResultados from "@/components/PortalResultados";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <main className="">
        <AboutUs />
        <Services />
        <PortalResultados />
      </main>
    </>
  );
}
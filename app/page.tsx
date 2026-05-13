import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import PortalResultados from "@/components/PortalResultados";
import FormContact from "@/components/FormContact";

export default function Home() {
  return (
    <>
      <Header />
      

      <main className="">
        <Hero />
        <AboutUs />
        <Services />
        <PortalResultados />
        <FormContact />
      </main>
    </>
  );
}
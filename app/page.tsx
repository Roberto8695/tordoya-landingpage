import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <>
      <Header />
      

      <main className="pt-20">
      <Hero />
     <AboutUs />
      <Services />

       
      </main>
    </>
  );
}
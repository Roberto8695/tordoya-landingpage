import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <>
      <Header />
      

      <main className="">
      <Hero />
     <AboutUs />
      <Services />

       
      </main>
    </>
  );
}
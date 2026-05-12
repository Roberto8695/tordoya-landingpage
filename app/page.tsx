import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
export default function Home() {
  return (
    <>
      <Header />
      

      <main className="pt-20">
     <AboutUs />
      <Services />

       
      </main>
    </>
  );
}

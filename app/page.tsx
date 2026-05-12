import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <section id="nosotros" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[--color-primary] text-center mb-12">
              Nosotros
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Contenido de la sección nosotros...
            </p>
          </div>
        </section>

        <Services />

        <section id="contacto" className="py-20 bg-[--color-primary]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Contáctanos
            </h2>
            <p className="text-lg text-white/90 text-center max-w-3xl mx-auto">
              Contenido de la sección contacto...
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

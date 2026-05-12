import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <section id="nosotros" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-4xl font-bold text-[--color-primary] md:text-5xl">
              Nosotros
            </h2>
            <p className="mx-auto max-w-3xl text-center text-lg text-gray-600">
              Contenido de la sección nosotros...
            </p>
          </div>
        </section>

        <Services />

        <section id="contacto" className="bg-[--color-primary] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-4xl font-bold text-white md:text-5xl">
              Contáctanos
            </h2>
            <p className="mx-auto max-w-3xl text-center text-lg text-white/90">
              Contenido de la sección contacto...
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
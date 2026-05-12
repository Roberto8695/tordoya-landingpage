import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        <section id="inicio" className="min-h-screen bg-gradient-to-br from-[--color-primary] to-[--color-secondary] flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Bienvenidos a Tordoya
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90">
              Soluciones integrales para impulsar tu negocio al siguiente nivel
            </p>
            <a
              href="#contacto"
              className="inline-block bg-[--color-accent] text-[--color-primary] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-colors duration-200"
            >
              Agenda tu cita
            </a>
          </div>
        </section>

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

        <section id="servicios" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[--color-primary] text-center mb-12">
              Servicios
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Contenido de la sección servicios...
            </p>
          </div>
        </section>

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

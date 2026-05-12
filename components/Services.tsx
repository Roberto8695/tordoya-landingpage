"use client";

import { useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
}

const services: Service[] = [
  {
    id: "strategy",
    title: "Estrategia Digital",
    description: "Planificación integral de tu presencia en línea con enfoque en resultados medibles",
    bgColor: "from-[#0B4A7A] to-[#155bb3]",
    borderColor: "from-blue-400/30 to-blue-500/30",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "design",
    title: "Diseño & UX",
    description: "Interfaces modernas que cautivan, convierten y generan experiencias inolvidables",
    bgColor: "from-[#0891b2] to-[#06b6d4]",
    borderColor: "from-cyan-400/30 to-cyan-500/30",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 3.75A2.5 2.5 0 0010 15.75" />
      </svg>
    ),
  },
  {
    id: "development",
    title: "Desarrollo Web",
    description: "Aplicaciones escalables, rápidas y seguras con tecnologías de punta",
    bgColor: "from-[#1e40af] to-[#1d4ed8]",
    borderColor: "from-blue-400/30 to-blue-600/30",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20l4-16m4 4l4 4m0 0l-4 4m4-4H3" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Tiendas online optimizadas para vender más y mejorar la experiencia del cliente",
    bgColor: "from-[#01155a] to-[#0B4A7A]",
    borderColor: "from-blue-500/30 to-cyan-400/30",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    id: "marketing",
    title: "Marketing Digital",
    description: "Campañas efectivas que atraen, engagement y convierten audiencias cualificadas",
    bgColor: "from-[#06b6d4] to-[#0891b2]",
    borderColor: "from-cyan-400/30 to-cyan-500/30",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Soporte & Mantenimiento",
    description: "Asistencia continua para garantizar que tu negocio funcione sin interrupciones",
    bgColor: "from-[#00b7fa] to-[#0891b2]",
    borderColor: "from-cyan-300/30 to-cyan-500/30",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="servicios" className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Nuestros Servicios
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Soluciones Premium
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Ofrecemos servicios integrales diseñados para elevar tu negocio a otro nivel con excelencia y precisión
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-2xl border border-white/10">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor}`} />

                {/* Overlay subtle mejorado */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Accent line top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0" />

                {/* Content */}
                <div className="relative flex flex-col justify-between h-full p-8 sm:p-10 text-white">
                  {/* Icon con mejor diseño */}
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 text-white transition-all duration-500 group-hover:scale-125 group-hover:bg-white/25 group-hover:border-white/50 group-hover:shadow-lg group-hover:shadow-white/20`}>
                    {service.icon}
                  </div>

                  {/* Text content */}
                  <div className="mt-8 flex-grow">
                    <h3 className="text-2xl font-bold leading-tight tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/80 font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA mejorado */}
                  <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                    <a
                      href="#contacto"
                      className="group/link inline-flex items-center gap-2 font-semibold text-white text-xs uppercase tracking-widest transition-all duration-300 hover:gap-3 hover:text-white/90"
                    >
                      Ver más
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className={`text-xs font-semibold uppercase tracking-widest text-white/50 transition-all duration-500 ${hoveredId === service.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Hover shimmer mejorado */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${hoveredId === service.id ? "opacity-30" : "opacity-0"}`}
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6 text-lg">
            ¿Listo para potenciar tu negocio?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1 group"
          >
            Contactar ahora
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

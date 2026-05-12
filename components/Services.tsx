"use client";

import { useState } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    id: "strategy",
    title: "Estrategia Digital",
    description: "Planificación integral para posicionar tu marca con claridad y foco comercial.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "design",
    title: "Diseño & UX",
    description: "Interfaces limpias, elegantes y pensadas para guiar mejor la atención del usuario.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 3.75A2.5 2.5 0 0010 15.75" />
      </svg>
    ),
  },
  {
    id: "development",
    title: "Desarrollo Web",
    description: "Sitios rápidos, escalables y bien estructurados para una experiencia sólida.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4m0 0l-4 4m4-4H3" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Tiendas online optimizadas para convertir visitas en ventas reales.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    id: "marketing",
    title: "Marketing Digital",
    description: "Campañas claras y efectivas para atraer, conectar y convertir audiencias.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Soporte & Mantenimiento",
    description: "Acompañamiento continuo para mantener tu presencia digital estable y segura.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="servicios" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,183,250,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(11,74,122,0.08),_transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold tracking-wide text-cyan-700">
            Nuestros Servicios
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-[--color-primary] sm:text-5xl">
            Soluciones elegantes y funcionales
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            Un conjunto de servicios diseñados para transmitir confianza, orden visual y resultados.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const isActive = activeId === service.id;

            return (
              <article
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onMouseLeave={() => setActiveId(null)}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#01155a] via-[#155bb3] to-[#00b7fa] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />

                <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(1,21,90,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(1,21,90,0.14)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#01155a] via-[#155bb3] to-[#00b7fa]" />

                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#01155a] to-[#00b7fa] text-white shadow-lg shadow-cyan-500/20 transition-transform duration-500 group-hover:scale-110">
                        {service.icon}
                      </div>

                      <span className="text-sm font-semibold text-slate-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-7 text-slate-600">
                      {service.description}
                    </p>

                    <div className={`mt-7 overflow-hidden border-t border-slate-100 pt-6 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-90"}`}>
                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[--color-primary] transition-all duration-300 hover:gap-3 hover:text-[#00b7fa]"
                      >
                        Ver más
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full bg-[--color-primary] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-[rgba(1,21,90,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#155bb3]"
          >
            Contactar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
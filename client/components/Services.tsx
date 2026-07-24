"use client";

import React, { useState, useEffect } from "react";
import { motion, type MotionProps } from "framer-motion";
import {
  HiOutlineViewList,
  HiOutlineHeart,
  HiOutlineArrowUp,
  HiOutlineBeaker,
  HiOutlineTrendingUp,
  HiOutlineExclamation,
  HiOutlineShieldExclamation,
  HiOutlineArchive,
  HiOutlineInformationCircle,
  HiChevronDown,
  HiOutlineCalendar,
} from "react-icons/hi";
import { getEspecialidades } from "@/services/especialidades.service";
import type { EspecialidadDTO } from "@/services/especialidades.service";
import { API_BASE_URL } from "@/lib/constants";

import { especialidades as fallbackData } from "@/data/especialidades";

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  HiOutlineViewList,
  HiOutlineHeart,
  HiOutlineArrowUp,
  HiOutlineBeaker,
  HiOutlineTrendingUp,
  HiOutlineExclamation,
  HiOutlineShieldExclamation,
  HiOutlineArchive,
  HiOutlineInformationCircle,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const servicesPanelTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1],
};

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

const MotionButton = motion.button as React.ComponentType<
  React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps>
>;

/** Mapa de slugs de especialidad a sus imágenes locales por defecto */
const defaultImages: Record<string, string> = {
  abdominal: "/image/especialidades/ABDOMINAL.webp",
  ginecologica: "/image/especialidades/GINECOLÓGICA.webp",
  obstetrica: "/image/especialidades/OBSTÉTRICA.webp",
  urologica: "/image/especialidades/UROLÓGICA.webp",
  "partes-blandas": "/image/especialidades/PARTES_BLANDAS.webp",
  doppler: "/image/especialidades/DOPPLER.webp",
  musculoesqueletica: "/image/especialidades/MUSCULOESQUELÉTICA.webp",
  emergencias: "/image/especialidades/EMERGENCIAS.webp",
  otros: "/image/especialidades/OTROS.webp",
};

/** Asigna la imagen por defecto si la especialidad no tiene una personalizada */
function ensureDefaultImage(esp: EspecialidadDTO): EspecialidadDTO {
  if (!esp.imagen) {
    return { ...esp, imagen: defaultImages[esp.slug] || "" };
  }
  return esp;
}

function mapFallbackToDTO(data: typeof fallbackData): EspecialidadDTO[] {
  return data.map((esp) =>
    ensureDefaultImage({
      id: esp.id,
      slug: esp.id,
      nombre: esp.nombre,
      icon: esp.icon,
      color: esp.color,
      imagen: esp.imagen || "",
      activo: true,
      orden: 0,
      servicios: (esp.servicios || []).map((svc) => ({
        id: svc.id,
        slug: svc.id,
        nombre: svc.nombre,
        descripcion: null,
        precio: null,
        duracionMinutos: null,
        activo: true,
        orden: 0,
      })),
    })
  );
}

export default function Services() {
  const [allEspecialidades, setAllEspecialidades] = useState<EspecialidadDTO[]>(() =>
    mapFallbackToDTO(fallbackData)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getEspecialidades();
        if (mounted && data?.length) {
          setAllEspecialidades(data.map(ensureDefaultImage));
        }
      } catch {
        // Fallback ya cargado
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ SOLO mostrar especialidades ACTIVAS en el home
  const especialidades = allEspecialidades.filter((e) => e.activo !== false);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <section id="servicios" className="bg-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black text-primary sm:text-5xl">Nuestros Servicios</h2>
            <p className="mt-4 text-lg text-foreground/70">Servicios integrales de imagenologia diagnostica con tecnologia de ultima generacion</p>
          </div>
          <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-primary/5" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="servicios" className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-black text-primary sm:text-5xl">Nuestros Servicios</h2>
          <p className="mt-4 text-lg text-foreground/70">Servicios integrales de imagenologia diagnostica con tecnologia de ultima generacion</p>
        </MotionDiv>

        <MotionDiv
          className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {especialidades.map((especialidad) => {
            const IconComponent = iconMap[especialidad.icon] || HiOutlineViewList;
            const isExpanded = expandedId === especialidad.slug;
            const servicios = especialidad.servicios ?? [];

            return (
              <MotionDiv
                key={especialidad.slug}
                variants={cardVariants}
                className="group h-fit self-start overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg"
              >
                <div
                  className={`relative overflow-hidden ${
                    especialidad.color === "primary"
                      ? "bg-linear-to-br from-primary to-primary/70"
                      : especialidad.color === "secondary"
                      ? "bg-linear-to-br from-secondary to-secondary/70"
                      : "bg-linear-to-br from-accent to-accent/70"
                  } p-6 transition-all duration-300`}
                >
                  {especialidad.imagen && (
                    <div
                      className="pointer-events-none absolute inset-0 bg-cover rounded-xl bg-right opacity-60 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                      style={{
                        backgroundImage: `url(${
                          especialidad.imagen.startsWith('/uploads/')
                            ? `${API_BASE_URL}${especialidad.imagen}`
                            : especialidad.imagen
                        })`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/40" aria-hidden="true" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="relative flex-1">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm text-white">
                        {IconComponent && <IconComponent size={24} />}
                      </div>
                      <h3 className="text-xl font-bold text-white">{especialidad.nombre}</h3>
                      <p className="mt-1 text-sm text-white/80">{servicios.length} servicios disponibles</p>
                    </div>
                  </div>

                  <MotionButton
                    onClick={() => toggleExpanded(especialidad.slug)}
                    className="relative z-10 mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{isExpanded ? "Ocultar" : "Ver"} servicios</span>
                    <MotionDiv
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white"
                    >
                      <HiChevronDown size={18} />
                    </MotionDiv>
                  </MotionButton>
                </div>

                <MotionDiv
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={servicesPanelTransition}
                  className="overflow-hidden bg-white"
                  aria-hidden={!isExpanded}
                >
                  <MotionDiv
                    animate={{ y: isExpanded ? 0 : -8 }}
                    transition={servicesPanelTransition}
                    className="space-y-2 px-6 py-4"
                  >
                    {servicios.map((servicio) => (
                      <MotionDiv
                        key={servicio.slug}
                        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -8 }}
                        transition={{ duration: 0.28 }}
                        className="group/item flex items-center justify-between rounded-lg border border-primary/10 bg-primary/5 p-3 transition-all duration-200 hover:border-primary/30 hover:bg-primary/10"
                      >
                        <span className="text-sm font-medium text-foreground">{servicio.nombre}</span>
                        <MotionButton
                          animate={{ opacity: isExpanded ? 1 : 0, scale: isExpanded ? 1 : 0.95 }}
                          transition={{ duration: 0.22 }}
                          className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs font-bold text-white opacity-0 transition-all duration-200 hover:bg-secondary group-hover/item:opacity-100"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          tabIndex={isExpanded ? 0 : -1}
                        >
                          <HiOutlineCalendar size={14} />
                          <span>Agendar</span>
                        </MotionButton>
                      </MotionDiv>
                    ))}
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      </div>
    </section>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";

type MotionDivProps = React.ComponentPropsWithoutRef<"div"> & MotionProps;
const MotionDiv = motion.div as React.FC<MotionDivProps>;
type MotionSpanProps = React.ComponentPropsWithoutRef<"span"> & MotionProps;
const MotionSpan = motion.span as React.FC<MotionSpanProps>;
type MotionPProps = React.ComponentPropsWithoutRef<"p"> & MotionProps;
const MotionP = motion.p as React.FC<MotionPProps>;
type MotionH1Props = React.ComponentPropsWithoutRef<"h1"> & MotionProps;
const MotionH1 = motion.h1 as React.FC<MotionH1Props>;
type MotionUlProps = React.ComponentPropsWithoutRef<"ul"> & MotionProps;
const MotionUl = motion.ul as React.FC<MotionUlProps>;
type MotionLiProps = React.ComponentPropsWithoutRef<"li"> & MotionProps;
const MotionLi = motion.li as React.FC<MotionLiProps>;

const slides = [
  {
    id: "doctora",
    gradient: "from-[#01155a] via-[#0a2a7a] to-[#155bb3]",
    badge: "Conoce a quien te cuida",
    badgeBg: "bg-white/15",
    name: "Dra. Evelia Martínez",
    title: "Máster en Ultrasonografía",
    bullets: [
      "Especialista en Cirugía General",
      "Diagnóstico preciso por imagen",
      "Atención en CDMX · Benito Juárez",
    ],
    cta1: { label: "Agenda tu cita", href: "#contacto", style: "accent" },
    cta2: null,
  },
  {
    id: "mujer",
    gradient: "from-[#8a1a5e] via-[#c4287a] to-[#e85d9a]",
    badge: "Para ella",
    badgeBg: "bg-white/15",
    name: null,
    title: "Tu salud femenina, protegida desde adentro",
    subtitle: "Estudios especializados para el cuidado integral de la mujer en cada etapa de su vida.",
    bullets: [
      "Colposcopía",
      "Citología Cérvico Vaginal (Papanicolau)",
      "Ecografía Pélvica / Ginecológica",
      "Ecografía Transvaginal",
      "Monitoreo y Seguimiento Folicular",
    ],
    cta1: { label: "Agenda tu cita", href: "#contacto", style: "pink" },
    cta2: { label: "Ver todos los servicios", href: "#servicios", style: "ghost" },
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative h-screen overflow-hidden  text-white">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <MotionDiv
              key={slide.id}
              initial={isActive ? { opacity: 0 } : {}}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
              aria-hidden={!isActive}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} `} />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.06] blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-3xl" />
                <div className="absolute left-[20%] top-[60%] h-48 w-48 rounded-full bg-white/[0.03] blur-2xl" />
              </div>

              <div
                className="pointer-events-none absolute inset-y-0  left-45 z-0 w-[88vw] sm:w-[62vw] lg:hidden"
                style={{ maxWidth: 460 }}
              >
                <div className="absolute inset-0 bg-linear-to-l from-black/20 via-black/50 to-transparent" aria-hidden="true" />
                <Image
                  src={slide.id === "doctora" ? "/image/banners/dra_evelia.webp" : "/image/banners/utero.webp"}
                  alt={slide.id === "doctora" ? "Dra. Evelia Martínez" : "Salud femenina"}
                  fill
                  sizes="(max-width: 639px) 78vw, 62vw"
                  className="object-contain object-bottom-right opacity-95 drop-shadow-2xl"
                  priority={isActive}
                />
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(1,21,90,0.82) 0%, rgba(1,21,90,0.62) 42%, rgba(1,21,90,0.28) 72%, rgba(1,21,90,0.08) 100%)",
                }}
              />

              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }} />

              {/* Sombra inferior con desvanecimiento progresivo */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black/50 pointer-events-none z-20" />

              <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="flex h-full flex-col justify-center lg:relative lg:flex-row lg:items-center lg:justify-between">
                  <div className="z-10 max-w-2xl lg:max-w-xl lg:py-16">
                    <MotionSpan
                      initial={isActive ? { opacity: 0, y: 12 } : {}}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={`inline-flex items-center gap-2 rounded-full ${slide.badgeBg} backdrop-blur-md px-4 py-2 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white/95 border border-white/15 shadow-lg`}
                    >
                      <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(0,183,250,0.7)]" />
                      {slide.badge}
                    </MotionSpan>

                    {slide.name && (
                      <MotionP
                        initial={isActive ? { opacity: 0, y: 16 } : {}}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white/90"
                      >
                        {slide.name}
                      </MotionP>
                    )}

                    <MotionH1
                      initial={isActive ? { opacity: 0, y: 18 } : {}}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: slide.name ? 0.3 : 0.2 }}
                      className={`mt-2 font-bold leading-tight tracking-tight text-balance ${
                        slide.name ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-accent" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                      }`}
                    >
                      {slide.title}
                    </MotionH1>

                    {slide.subtitle && (
                      <MotionP
                        initial={isActive ? { opacity: 0, y: 14 } : {}}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-4 max-w-xl text-base sm:text-lg leading-7 text-white/80"
                      >
                        {slide.subtitle}
                      </MotionP>
                    )}

                    <MotionUl
                      initial={isActive ? { opacity: 0, y: 16 } : {}}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.35 }}
                      className="mt-5 space-y-2.5"
                    >
                      {slide.bullets.map((bullet, i) => (
                        <MotionLi
                          key={i}
                          initial={isActive ? { opacity: 0, x: -12 } : {}}
                          animate={isActive ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.35, delay: 0.4 + i * 0.08 }}
                          className="flex items-start gap-3 text-sm sm:text-base text-white/85"
                        >
                          <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(0,183,250,0.5)]" />
                          {bullet}
                        </MotionLi>
                      ))}
                    </MotionUl>

                    <MotionDiv
                      initial={isActive ? { opacity: 0, y: 16 } : {}}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-8 flex flex-wrap items-center gap-4"
                    >
                      <a
                        href={slide.cta1.href}
                        className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl ${
                          slide.cta1.style === "accent"
                            ? "bg-accent text-primary shadow-accent/40"
                            : slide.cta1.style === "pink"
                            ? "bg-white text-[#8a1a5e] shadow-white/30"
                            : "bg-accent text-primary"
                        }`}
                      >
                        {slide.cta1.label}
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>

                      {slide.cta2 && (
                        <a
                          href={slide.cta2.href}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50"
                        >
                          {slide.cta2.label}
                        </a>
                      )}
                    </MotionDiv>
                  </div>

                  <MotionDiv
                    initial={isActive ? { opacity: 0, scale: 0.85, x: 40 } : {}}
                    animate={isActive ? { opacity: 1, scale: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="relative hidden w-full flex-1 lg:flex lg:items-end lg:overflow-visible lg:pl-12 lg:-mr-20"
                  >
                    {/* Glow externo — centrado detrás del torso */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <MotionDiv
                        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className={`h-[55vh] w-[55vh] rounded-full blur-3xl -translate-y-[10%] ${
                          slide.id === "doctora"
                            ? "bg-[#00b7fa]/20"
                            : "bg-[#e85d9a]/20"
                        }`}
                      />
                    </div>

                    {/* Círculo decorativo grande — centrado */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                      <div className={`h-[58vh] w-[58vh] rounded-full border border-white/10 -translate-y-[8%] ${
                        slide.id === "doctora" ? "bg-white/[0.04]" : "bg-white/[0.04]"
                      }`} />
                    </div>

                    {/* Círculo decorativo interior — centrado */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                      <div className={`h-[32vh] w-[32vh] rounded-full border border-white/10 -translate-y-[5%] ${
                        slide.id === "doctora" ? "bg-white/[0.06]" : "bg-white/[0.06]"
                      }`} />
                    </div>

                    {/* Partículas flotantes — por encima de la imagen */}
                    {slide.id === "doctora" && (
                      <>
                        <MotionDiv
                          animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                          className="absolute right-12 top-[15%] h-2 w-2 rounded-full bg-accent/40"
                        />
                        <MotionDiv
                          animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                          className="absolute left-8 top-[20%] h-3 w-3 rounded-full bg-white/20"
                        />
                        <MotionDiv
                          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                          className="absolute left-1/3 top-[10%] h-1.5 w-1.5 rounded-full bg-accent/30"
                        />
                      </>
                    )}

                    {slide.id === "mujer" && (
                      <>
                        <MotionDiv
                          animate={{ y: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                          className="absolute right-12 top-[15%] h-2.5 w-2.5 rounded-full bg-pink-300/40"
                        />
                        <MotionDiv
                          animate={{ y: [0, -14, 0], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
                          className="absolute left-8 top-[20%] h-2 w-2 rounded-full bg-pink-200/30"
                        />
                        <MotionDiv
                          animate={{ y: [0, -8, 0], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                          className="absolute left-1/3 top-[10%] h-1.5 w-1.5 rounded-full bg-pink-300/50"
                        />
                      </>
                    )}

                    {/* Imagen protagonista — anclada al borde inferior */}
                    <MotionDiv
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative h-screen z-10 flex items-end self-stretch w-full"
                    >
                      <div className="relative w-full flex items-end justify-center mt-[25px]">
                        <Image
                          src={slide.id === "doctora" ? "/image/banners/dra_evelia.webp" : "/image/banners/utero.webp"}
                          alt={slide.id === "doctora" ? "Dra. Evelia Martínez" : "Salud femenina"}
                          width={480}
                          height={600}
                          className="h-[90vh] w-auto object-contain object-bottom drop-shadow-2xl"
                          priority={isActive}
                        />
                      </div>
                    </MotionDiv>
                  </MotionDiv>
                </div>
              </div>
            </MotionDiv>
          );
        })}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeSlide ? "w-10 bg-white" : "w-2.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>

      
    </section>
  );
}
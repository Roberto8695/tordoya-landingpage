"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import { HiOutlineEye, HiOutlineLightBulb, HiSparkles } from "react-icons/hi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

export default function AboutUs() {
  return (
    <section id="nosotros" className="bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv
          className="grid gap-10 md:grid-cols-2 md:items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <MotionDiv variants={itemVariants}>
            <h2 className="text-3xl font-black text-light sm:text-4xl" >
              Quiénes somos
            </h2>
            <p className="mt-4 max-w-xl text-lg text-light">
              En Tordoya combinamos experiencia clínica y tecnología para ofrecer
              diagnósticos precisos y un trato humano. Nuestra misión y visión
              guían cada decisión estratégica y operativa.
            </p>

            <MotionDiv className="mt-8 grid gap-4 sm:grid-cols-2" variants={containerVariants}>
                <article className="group flex gap-4 rounded-lg border border-primary/8 bg-accent/80 p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer" >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-light">
                  <HiOutlineLightBulb size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-light">Misión</h3>
                  <p className="mt-1 text-sm text-light">
                    Ofrecer servicios de ultrasonido e imagen diagnóstica con el rigor de la alta especialidad y la accesibilidad que cada paciente merece.
                  </p>
                </div>
              </article>

              <article className="group flex gap-4 rounded-lg border border-primary/8 bg-white/80 p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer" >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <HiOutlineEye size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary">Visión</h3>
                  <p className="mt-1 text-sm text-foreground/80">
                    Liderar el diagnóstico por imagen en Bolivia, Perú y México, siendo el aliado que conecta a médicos y pacientes con la información que necesitan para actuar a tiempo.
                  </p>
                </div>
              </article>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv className="relative flex items-center justify-center" variants={itemVariants}>
            

            <MotionDiv className="z-10 w-full max-w-md rounded-2xl bg-white/90 p-6 shadow-lg" whileHover={{ scale: 1.05 }}>
              <h4 className="text-lg font-extrabold text-primary" >Nuestros valores</h4>
              <p className="mt-3 text-foreground/80" >
                Compromiso, excelencia y cercanía. Trabajamos con calidad
                humana y protocolos que garantizan resultados reproducibles.
              </p>

              <ul className="mt-6 grid gap-3" >
                <li className="group flex items-start gap-3 transition-transform duration-200 hover:translate-x-1" >
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                    <HiSparkles size={20} />
                  </span>
                  <div>
                    <strong className="block text-sm text-primary">Calidad</strong>
                    <span className="block text-sm text-foreground/80">Protocolos validados</span>
                  </div>
                </li>

                <li className="group flex items-start gap-3 transition-transform duration-200 hover:translate-x-1" >
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <HiOutlineEye size={20} />
                  </span>
                  <div>
                    <strong className="block text-sm text-primary">Precisión</strong>
                    <span className="block text-sm text-foreground/80">Lecturas confiables</span>
                  </div>
                </li>

                <li className="group flex items-start gap-3 transition-transform duration-200 hover:translate-x-1" >
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
                    <HiOutlineLightBulb size={20} />
                  </span>
                  <div>
                    <strong className="block text-sm text-primary">Innovación</strong>
                    <span className="block text-sm text-foreground/80">Mejora continua</span>
                  </div>
                </li>
              </ul>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}

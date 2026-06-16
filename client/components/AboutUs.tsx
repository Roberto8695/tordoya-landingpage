"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineLightBulb,
  HiSparkles,
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
  HiOutlineGlobe,
  HiOutlineHand,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { useNosotros } from "@/features/nosotros/nosotros-context";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  HiOutlineEye,
  HiOutlineLightBulb,
  HiSparkles,
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
  HiOutlineGlobe,
  HiOutlineHand,
  HiOutlineClipboardList,
};

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

function IconRenderer({ iconName, className }: { iconName: string; className?: string }) {
  const Icon = iconMap[iconName];
  if (!Icon) return <HiSparkles size={20} className={className} />;
  return <Icon size={20} className={className} />;
}

export default function AboutUs() {
  const { config } = useNosotros();

  const MisionIcon = iconMap[config.misionIcono] || HiOutlineLightBulb;
  const VisionIcon = iconMap[config.visionIcono] || HiOutlineEye;

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
            <h2 className="text-3xl font-black text-light sm:text-4xl">
              {config.titulo}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-light">
              {config.descripcion}
            </p>

            <MotionDiv className="mt-8 grid gap-4 sm:grid-cols-2" variants={containerVariants}>
              <article className="group flex gap-4 rounded-lg border border-primary/8 bg-accent/80 p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-light">
                  <MisionIcon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-light">{config.misionTitulo}</h3>
                  <p className="mt-1 text-sm text-light">
                    {config.misionDescripcion}
                  </p>
                </div>
              </article>

              <article className="group flex gap-4 rounded-lg border border-primary/8 bg-white/80 p-4 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <VisionIcon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary">{config.visionTitulo}</h3>
                  <p className="mt-1 text-sm text-foreground/80">
                    {config.visionDescripcion}
                  </p>
                </div>
              </article>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv className="relative flex items-center justify-center" variants={itemVariants}>
            <MotionDiv className="z-10 w-full max-w-md rounded-2xl bg-white/90 p-6 shadow-lg" whileHover={{ scale: 1.05 }}>
              <h4 className="text-lg font-extrabold text-primary">{config.valoresTitulo}</h4>
              <p className="mt-3 text-foreground/80">
                {config.valoresDescripcion}
              </p>

              <ul className="mt-6 grid gap-3">
                {config.valores.map((valor, index) => (
                  <li
                    key={index}
                    className="group flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                  >
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <IconRenderer iconName={valor.icono} />
                    </span>
                    <div>
                      <strong className="block text-sm text-primary">{valor.titulo}</strong>
                      <span className="block text-sm text-foreground/80">{valor.subtitulo}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}

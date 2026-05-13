"use client";

import React, { useState } from "react";
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
import { especialidades } from "@/data/especialidades";

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

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
          <h2 className="text-4xl font-black text-primary sm:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Servicios integrales de imagenología diagnóstica con tecnología de última generación
          </p>
        </MotionDiv>

        <MotionDiv
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {especialidades.map((especialidad) => {
            const IconComponent = iconMap[especialidad.icon];
            const isExpanded = expandedId === especialidad.id;

            return (
              <MotionDiv
                key={especialidad.id}
                variants={cardVariants}
                className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div 
                  className={`${
                    especialidad.color === "primary"
                      ? "bg-linear-to-br from-primary to-primary/70"
                      : especialidad.color === "secondary"
                      ? "bg-linear-to-br from-secondary to-secondary/70"
                      : "bg-linear-to-br from-accent to-accent/70"
                  } p-6 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm text-white">
                        {IconComponent && <IconComponent size={24} />}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {especialidad.nombre}
                      </h3>
                      <p className="mt-1 text-sm text-white/80">
                        {especialidad.servicios.length} servicios disponibles
                      </p>
                    </div>
                  </div>

                  <MotionButton
                    onClick={() => toggleExpanded(especialidad.id)}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/30"
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
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={servicesPanelTransition}
                  className="overflow-hidden bg-white"
                  aria-hidden={!isExpanded}
                >
                  <MotionDiv
                    animate={{ y: isExpanded ? 0 : -8 }}
                    transition={servicesPanelTransition}
                    className="space-y-2 px-6 py-4"
                  >
                    {especialidad.servicios.map((servicio) => (
                      <MotionDiv
                        key={servicio.id}
                        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -8 }}
                        transition={{ duration: 0.28 }}
                        className="group/item flex items-center justify-between rounded-lg border border-primary/10 bg-primary/5 p-3 transition-all duration-200 hover:border-primary/30 hover:bg-primary/10"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {servicio.nombre}
                        </span>
                        <MotionButton
                          animate={{ opacity: isExpanded ? 1 : 0, scale: isExpanded ? 1 : 0.95 }}
                          transition={{ duration: 0.22 }}
                          className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs font-bold text-white opacity-0 transition-all duration-200 hover:bg-secondary group-hover/item:opacity-100"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          tabIndex={isExpanded ? 0 : -1}
                        >
                          <span className="text-white">
                            <HiOutlineCalendar size={14} />
                          </span>
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
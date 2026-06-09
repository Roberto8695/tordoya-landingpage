"use client";

import React from "react";
import Image from "next/image";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import SpecialtyStatusBadge from "./SpecialtyStatusBadge";
import type { EspecialidadDTO } from "@/services/especialidades.service";

type MotionDivProps = React.ComponentPropsWithoutRef<"div"> & MotionProps;
const MotionDiv = motion.div as React.FC<MotionDivProps>;

interface SpecialtyCardProps {
  especialidad: EspecialidadDTO;
  /** Variante de diseño */
  variant?: "default" | "compact" | "dashboard";
  onClick?: () => void;
}

const colorMap: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

/**
 * Tarjeta visual moderna para representar una especialidad médica.
 * Diseño tipo SaaS premium con glassmorphism y hover elegante.
 */
export default function SpecialtyCard({
  especialidad,
  variant = "default",
  onClick,
}: SpecialtyCardProps) {
  const serviciosCount = especialidad.servicios?.length ?? 0;
  const headerBg = colorMap[especialidad.color] || "bg-primary";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      onClick();
    }
  };

  return (
    <MotionDiv
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300",
        "hover:shadow-lg hover:border-primary/20",
        onClick && "cursor-pointer",
        variant === "compact" && "rounded-xl",
        variant === "dashboard" && "rounded-xl"
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      {/* Header con imagen de fondo */}
      <div
        className={cn(
          "relative overflow-hidden",
          variant === "compact" ? "h-24" : "h-40 sm:h-48"
        )}
      >
        <div className={cn("absolute inset-0", headerBg)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {especialidad.imagen && (
          <Image
            src={especialidad.imagen}
            alt={especialidad.nombre}
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            sizes={variant === "compact" ? "200px" : "400px"}
          />
        )}

        {/* Etiqueta de servicios */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {serviciosCount} servicios
          </span>
        </div>
      </div>

      {/* Cuerpo */}
      <div className={cn("space-y-3", variant === "compact" ? "p-4" : "p-5")}>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-bold text-primary leading-tight",
              variant === "compact" ? "text-sm" : "text-base"
            )}
          >
            {especialidad.nombre}
          </h3>
          <SpecialtyStatusBadge active={especialidad.activo} size="sm" />
        </div>

        {/* Slugs de servicios como chips */}
        {variant !== "compact" && serviciosCount > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {especialidad.servicios.slice(0, 3).map((svc) => (
              <span
                key={svc.id || svc.slug}
                className="inline-flex rounded-md bg-primary/[0.04] px-2 py-0.5 text-[11px] font-medium text-foreground/60"
              >
                {svc.nombre}
              </span>
            ))}
            {serviciosCount > 3 && (
              <span className="inline-flex rounded-md bg-primary/[0.04] px-2 py-0.5 text-[11px] font-medium text-foreground/40">
                +{serviciosCount - 3} más
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 text-[11px] text-foreground/40">
          <span>Orden: {especialidad.orden}</span>
          <span className="h-1 w-1 rounded-full bg-foreground/20" aria-hidden="true" />
          <span className="truncate">{especialidad.slug}</span>
        </div>
      </div>
    </MotionDiv>
  );
}
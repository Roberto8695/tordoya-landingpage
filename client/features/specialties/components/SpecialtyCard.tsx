"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/constants";
import SpecialtyStatusBadge from "./SpecialtyStatusBadge";
import type { EspecialidadDTO } from "@/services/especialidades.service";
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
} from "react-icons/hi";

type MotionDivProps = React.ComponentPropsWithoutRef<"div"> & MotionProps;
const MotionDiv = motion.div as React.FC<MotionDivProps>;

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

interface SpecialtyCardProps {
  especialidad: EspecialidadDTO;
  /** Variante de diseño */
  variant?: "default" | "compact" | "dashboard";
  onClick?: () => void;
}

const colorGradients: Record<string, string> = {
  primary: "bg-linear-to-br from-primary to-primary/70",
  secondary: "bg-linear-to-br from-secondary to-secondary/70",
  accent: "bg-linear-to-br from-accent to-accent/70",
};

/**
 * Tarjeta visual idéntica al diseño de Services.tsx para el home.
 */
export default function SpecialtyCard({
  especialidad,
  variant = "default",
  onClick,
}: SpecialtyCardProps) {
  const serviciosCount = especialidad.servicios?.length ?? 0;
  const headerBg = colorGradients[especialidad.color] || "bg-linear-to-br from-primary to-primary/70";
  const IconComponent = iconMap[especialidad.icon] || HiOutlineViewList;

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
        "group h-fit self-start overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg",
        onClick && "cursor-pointer",
        variant === "compact" && "rounded-xl",
        variant === "dashboard" && "rounded-xl"
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      {/* Header — mismo diseño exacto que Services.tsx */}
      <div className={cn("relative overflow-hidden p-6 transition-all duration-300", headerBg)}>
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
            <p className="mt-1 text-sm text-white/80">{serviciosCount} servicios disponibles</p>
          </div>
          <SpecialtyStatusBadge active={especialidad.activo} size="sm" />
        </div>

        <div className="relative z-10 mt-4 inline-flex items-center gap-2 rounded-lg  px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/30">
          
          
        </div>
      </div>

      {/* Footer info compacto */}
      <div className="flex items-center justify-between px-6 py-3 text-[11px] text-foreground/40">
        <span>Orden: {especialidad.orden}</span>
        <span className="truncate ml-2">{especialidad.slug}</span>
      </div>
    </MotionDiv>
  );
}
"use client";

import { cn } from "@/lib/utils";

interface SpecialtyStatusBadgeProps {
  /** Si la especialidad está activa o inactiva */
  active?: boolean;
  /** Tamaño del badge */
  size?: "sm" | "md";
}

/**
 * Badge reutilizable para mostrar el estado de una especialidad.
 * Diseño minimalista tipo SaaS profesional.
 */
export default function SpecialtyStatusBadge({
  active = true,
  size = "sm",
}: SpecialtyStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium leading-none transition-all duration-200",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
        active
          ? "bg-success/10 text-success"
          : "bg-foreground/5 text-foreground/45"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-success" : "bg-foreground/25"
        )}
        aria-hidden="true"
      />
      {active ? "Activa" : "Inactiva"}
    </span>
  );
}
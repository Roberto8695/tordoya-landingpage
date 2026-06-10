"use client";

import { cn } from "@/lib/utils";

interface ServicioStatusBadgeProps {
  active?: boolean;
  size?: "sm" | "md";
}

export default function ServicioStatusBadge({
  active = true,
  size = "sm",
}: ServicioStatusBadgeProps) {
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
      {active ? "Activo" : "Inactivo"}
    </span>
  );
}
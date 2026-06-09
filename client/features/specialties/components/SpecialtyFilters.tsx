"use client";

import React, { useState } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionButtonProps = React.ComponentPropsWithoutRef<"button"> & MotionProps;
const MotionButton = motion.button as React.FC<MotionButtonProps>;

interface SpecialtyFiltersProps {
  /** Valor actual de búsqueda */
  searchQuery: string;
  /** Callback al cambiar búsqueda */
  onSearchChange: (query: string) => void;
  /** Filtro por estado */
  statusFilter: "all" | "active" | "inactive";
  /** Callback al cambiar filtro de estado */
  onStatusFilterChange: (status: "all" | "active" | "inactive") => void;
  /** Callback al crear nueva especialidad */
  onCreateNew: () => void;
}

/**
 * Barra superior de filtros y acciones para la gestión de especialidades.
 * Diseño compacto, limpio y responsive tipo SaaS profesional.
 */
export default function SpecialtyFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onCreateNew,
}: SpecialtyFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Búsqueda y filtros */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        {/* Input de búsqueda */}
        <div className="relative flex-1 sm:max-w-xs">
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 transition-colors duration-200",
              isSearchFocused ? "text-accent" : "text-foreground/40"
            )}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar especialidad..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={cn(
              "h-10 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/35",
              "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10"
            )}
            aria-label="Buscar especialidad"
          />
        </div>

        {/* Filtro por estado */}
        <div className="flex items-center gap-1 rounded-xl border border-primary/10 bg-white p-1">
          {[
            { value: "all" as const, label: "Todas" },
            { value: "active" as const, label: "Activas" },
            { value: "inactive" as const, label: "Inactivas" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onStatusFilterChange(option.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                statusFilter === option.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/50 hover:text-foreground/80 hover:bg-primary/5"
              )}
              aria-pressed={statusFilter === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botón crear */}
      <MotionButton
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCreateNew}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary active:scale-[0.97]"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Nueva Especialidad
      </MotionButton>
    </div>
  );
}
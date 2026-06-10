"use client";

import React, { useState } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionButtonProps = React.ComponentPropsWithoutRef<"button"> & MotionProps;
const MotionButton = motion.button as React.FC<MotionButtonProps>;

interface ServicioFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  especialidadFilter: string;
  onEspecialidadFilterChange: (val: string) => void;
  especialidadOptions: { slug: string; nombre: string }[];
  onCreateNew: () => void;
}

export default function ServicioFilters({
  searchQuery,
  onSearchChange,
  especialidadFilter,
  onEspecialidadFilterChange,
  especialidadOptions,
  onCreateNew,
}: ServicioFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <div className={cn(
            "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 transition-colors duration-200",
            isSearchFocused ? "text-accent" : "text-foreground/40"
          )}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar servicio..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={cn(
              "h-10 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/35",
              "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10"
            )}
            aria-label="Buscar servicio"
          />
        </div>

        <div className="relative">
          <select
            value={especialidadFilter}
            onChange={(e) => onEspecialidadFilterChange(e.target.value)}
            className="h-10 w-full appearance-none rounded-xl border border-primary/10 bg-white px-4 pr-10 text-sm text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10 sm:w-56"
            aria-label="Filtrar por especialidad"
          >
            <option value="all">Todas las especialidades</option>
            {especialidadOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug}>{opt.nombre}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <MotionButton
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCreateNew}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary active:scale-[0.97]"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Nuevo Servicio
      </MotionButton>
    </div>
  );
}
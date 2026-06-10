"use client";

import React, { useState } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ServicioStatusBadge from "./ServicioStatusBadge";
import type { ServicioDTO } from "@/services/servicios.service";

type MotionDivProps = React.ComponentPropsWithoutRef<"div"> & MotionProps;
const MotionDiv = motion.div as React.FC<MotionDivProps>;

const ITEMS_PER_PAGE = 7;

interface ServiciosTableProps {
  servicios: ServicioDTO[];
  onEdit: (servicio: ServicioDTO) => void;
  onDelete: (servicio: ServicioDTO) => void;
  isLoading?: boolean;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/[0.04]">
        <svg className="h-8 w-8 text-primary/30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">No hay servicios</h3>
      <p className="mt-1 text-xs text-foreground/50">Crea tu primer servicio para comenzar.</p>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number; totalPages: number; onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-primary/5 px-6 py-3">
      <span className="text-xs text-foreground/40">Página {currentPage} de {totalPages}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-foreground/50 transition-colors hover:bg-primary/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
          aria-label="Página anterior">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => totalPages <= 7 || p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
          .reduce<(number | "ellipsis")[]>((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis");
            acc.push(p); return acc;
          }, [])
          .map((item, i) =>
            item === "ellipsis" ? (
              <span key={`e${i}`} className="flex h-8 w-4 items-center justify-center text-xs text-foreground/30">...</span>
            ) : (
              <button key={item} onClick={() => onPageChange(item)}
                className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200",
                  currentPage === item ? "bg-primary text-white shadow-sm" : "text-foreground/50 hover:bg-primary/5 hover:text-foreground"
                )}
                aria-label={`Página ${item}`} aria-current={currentPage === item ? "page" : undefined}>{item}</button>
            )
          )}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-foreground/50 transition-colors hover:bg-primary/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
          aria-label="Página siguiente">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

function ActionMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/40 transition-colors hover:bg-primary/5 hover:text-foreground/70" aria-label="Acciones">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
            <MotionDiv initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -4 }} transition={{ duration: 0.12 }}
              className="absolute right-0 z-20 w-44 origin-top-right overflow-hidden rounded-xl border border-primary/10 bg-white shadow-lg">
              <button onClick={() => { onEdit(); setIsOpen(false); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-primary/5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>Editar
              </button>
              <button onClick={() => { onDelete(); setIsOpen(false); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-danger/80 transition-colors hover:bg-danger/5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>Eliminar
              </button>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiciosTable({ servicios, onEdit, onDelete, isLoading = false }: ServiciosTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(servicios.length / ITEMS_PER_PAGE));
  if (currentPage > totalPages && totalPages > 0) setCurrentPage(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = servicios.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
        <div className="divide-y divide-primary/5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-4 px-6 py-4">
              <div className="h-10 w-10 rounded-lg bg-primary/5" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 rounded bg-primary/5" />
                <div className="h-3 w-24 rounded bg-primary/5" />
              </div>
              <div className="h-5 w-16 rounded-full bg-primary/5" />
              <div className="h-3 w-20 rounded bg-primary/5" />
              <div className="h-8 w-20 rounded-lg bg-primary/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (servicios.length === 0) return <EmptyState />;

  const colorMap: Record<string, string> = { primary: "bg-primary/10 text-primary", secondary: "bg-secondary/10 text-secondary", accent: "bg-accent/10 text-accent" };

  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      <div className="hidden  md:grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-10 border-b border-primary/5 bg-primary/[0.02] px-1 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/40  ">
        <span>Servicio</span><span>Especialidad</span><span>Estado</span><span>Orden</span><span className="w-20 text-center">Acciones</span>
      </div>
      <div className="divide-y divide-primary/5">
        {paginated.map((svc, i) => {
          const espColor = colorMap[svc.especialidad?.color || "primary"] || "bg-primary/10 text-primary";
          return (
            <MotionDiv key={svc.id || svc.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.03 }}
              className="group transition-colors duration-150 hover:bg-primary/[0.02] md:grid md:grid-cols-[1fr_auto_auto_auto_auto_auto] md:gap-14 md:items-center md:px-6"
            >
              <div className="flex items-center gap-4 px-4 py-4 md:px-0 md:py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="truncate text-lg font-bold text-foreground">{svc.nombre}</span>
                    <span className="md:hidden"><ServicioStatusBadge active={svc.activo} size="sm" /></span>
                  </div>
                  <p className="truncate text-[11px] text-foreground/40">{svc.slug}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <span className={cn("inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium", espColor)}>{svc.especialidad?.nombre || "—"}</span>
              </div>
              <div className="hidden md:block"><ServicioStatusBadge active={svc.activo} size="sm" /></div>
              
              <div className="hidden md:block text-sm text-foreground/60">{svc.orden}</div>
              <div className="hidden md:flex items-center justify-center"><ActionMenu onEdit={() => onEdit(svc)} onDelete={() => onDelete(svc)} /></div>
              <div className="flex items-center gap-2 border-t border-primary/5 px-4 pb-3 pt-2 md:hidden">
                <div className="flex-1"><ServicioStatusBadge active={svc.activo} size="sm" /></div>
                <button onClick={() => onEdit(svc)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary/10 px-3 py-1.5 text-[11px] font-medium text-foreground/60 transition-colors hover:bg-primary/5">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>Editar
                </button>
                <button onClick={() => onDelete(svc)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-danger/10 px-3 py-1.5 text-[11px] font-medium text-danger/60 transition-colors hover:bg-danger/5">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>Eliminar
                </button>
              </div>
            </MotionDiv>
          );
        })}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
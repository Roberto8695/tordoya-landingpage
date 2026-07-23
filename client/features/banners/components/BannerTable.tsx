"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BannerPreview, { type BannerData } from "./BannerPreview";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

const MotionTr = motion.tr as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLTableRowElement> & MotionProps>
>;

const THEME_BADGES: Record<string, { label: string; class: string }> = {
  corporate: { label: "Corp", class: "bg-primary/10 text-primary" },
  "dark-blue": { label: "AzOsc", class: "bg-[#01155a]/10 text-[#01155a]" },
  "light-blue": { label: "AzClr", class: "bg-[#155bb3]/10 text-[#155bb3]" },
  dark: { label: "Osc", class: "bg-[#1A1A2E]/10 text-[#1A1A2E]" },
  light: { label: "Clr", class: "bg-amber-100 text-amber-800" },
};

const LAYOUT_LABELS: Record<string, string> = {
  "text-left-image-right": "Texto < Imagen",
  "image-left-text-right": "Imagen > Texto",
  "text-centered": "Centrado",
  "content-bottom": "Inferior",
};

interface BannerTableProps {
  banners: BannerData[];
  onEdit: (banner: BannerData) => void;
  onDelete: (banner: BannerData) => void;
  onToggleActive: (banner: BannerData) => void;
  onDuplicate: (banner: BannerData) => void;
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 8;

export default function BannerTable({
  banners,
  onEdit,
  onDelete,
  onToggleActive,
  onDuplicate,
  isLoading = false,
}: BannerTableProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const menuRef = useRef<HTMLDivElement>(null);

  const sorted = [...banners].sort((a, b) => a.order - b.order);
  const pageCount = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [currentPage, pageCount]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(null), []);

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="divide-y divide-primary/5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-16 animate-pulse rounded-lg bg-primary/5" />
              <div className="h-4 flex-1 animate-pulse rounded bg-primary/5" />
              <div className="h-4 w-16 animate-pulse rounded bg-primary/5" />
              <div className="h-4 w-12 animate-pulse rounded bg-primary/5" />
              <div className="h-4 w-8 animate-pulse rounded bg-primary/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/10 bg-white px-6 py-14">
        <svg className="mb-4 h-10 w-10 text-foreground/20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 22v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-sm font-medium text-foreground/40">
          No hay slides aún
        </p>
        <p className="mt-1 text-xs text-foreground/30">
          Crea tu primer slide para empezar
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/5 bg-light/50">
              <th className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                Slide
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                Título
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                Estado
              </th>
              <th className="hidden sm:table-cell whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                Tema
              </th>
              <th className="hidden md:table-cell whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                Layout
              </th>
              <th className="hidden lg:table-cell whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                Orden
              </th>
              <th className="hidden lg:table-cell whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                Actualizado
              </th>
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            <AnimatePresence>
              {paginated.map((banner) => (
                <BannerRow
                  key={banner.id}
                  banner={banner}
                  onEdit={() => { closeMenu(); onEdit(banner); }}
                  onDelete={() => { closeMenu(); onDelete(banner); }}
                  onToggleActive={() => { closeMenu(); onToggleActive(banner); }}
                  onDuplicate={() => { closeMenu(); onDuplicate(banner); }}
                  menuOpen={menuOpen === banner.id}
                  onMenuToggle={() => setMenuOpen(menuOpen === banner.id ? null : banner.id)}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between border-t border-primary/5 bg-light/30 px-4 py-3">
          <span className="text-xs text-foreground/40">
            Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sorted.length)} de {sorted.length} slides
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-foreground/50 transition-colors hover:bg-primary/5 hover:text-foreground/80 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Página anterior"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200",
                  page === currentPage
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground/50 hover:bg-primary/5 hover:text-foreground/80"
                )}
                aria-label={`Página ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-foreground/50 transition-colors hover:bg-primary/5 hover:text-foreground/80 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Página siguiente"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface BannerRowProps {
  banner: BannerData;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  onDuplicate: () => void;
  menuOpen: boolean;
  onMenuToggle: () => void;
}

function BannerRow({
  banner,
  onEdit,
  onDelete,
  onToggleActive,
  onDuplicate,
  menuOpen,
  onMenuToggle,
}: BannerRowProps) {
  const themeBadge = THEME_BADGES[banner.theme] ?? THEME_BADGES.corporate;
  const layoutLabel = LAYOUT_LABELS[banner.layout] ?? banner.layout;

  return (
    <MotionTr
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="group transition-colors duration-150 hover:bg-primary/[0.02]"
    >
      <td className="px-4 py-4">
        <div className="h-14 w-24 overflow-hidden rounded-lg border border-primary/5 shadow-sm">
          <BannerPreview banner={banner} compact className="h-full w-full rounded-none" />
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="min-w-0 max-w-56">
          <p className="truncate text-sm font-semibold text-foreground">
            {banner.title || "Slide sin título"}
          </p>
          {banner.badge && (
            <p className="truncate text-xs text-foreground/40 mt-0.5">
              {banner.badge}
            </p>
          )}
        </div>
      </td>

      <td className="px-4 py-4">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            banner.active
              ? "bg-success/10 text-success"
              : "bg-foreground/10 text-foreground/50"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              banner.active ? "bg-success" : "bg-foreground/30"
            )}
          />
          {banner.active ? "Activo" : "Inactivo"}
        </span>
      </td>

      <td className="hidden sm:table-cell px-4 py-4">
        <span className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
          themeBadge.class
        )}>
          {themeBadge.label}
        </span>
      </td>

      <td className="hidden md:table-cell px-4 py-4">
        <span className="text-xs text-foreground/60">
          {layoutLabel}
        </span>
      </td>

      <td className="hidden lg:table-cell px-4 py-4">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/5 text-xs font-bold text-foreground/50">
          {banner.order}
        </span>
      </td>

      <td className="hidden lg:table-cell px-4 py-4">
        <span className="text-xs text-foreground/40">
          {banner.updatedAt
            ? new Date(banner.updatedAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "-"}
        </span>
      </td>

      <td className="px-4 py-4 relative">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/30 opacity-0 transition-all duration-200 hover:bg-primary/5 hover:text-foreground/60 group-hover:opacity-100"
          aria-label="Acciones"
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute right-2 top-full z-50 mt-1 w-48 origin-top-right overflow-hidden rounded-xl border border-primary/10 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <MenuButton onClick={onEdit} icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }>
                  Editar
                </MenuButton>

                <MenuButton onClick={onDuplicate} icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }>
                  Duplicar
                </MenuButton>

                <div className="border-t border-primary/5" />

                <MenuButton
                  onClick={onToggleActive}
                  icon={
                    banner.active ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M10 18l4-4m0 0l4-4m-4 4l-4-4m4 4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  }
                >
                  {banner.active ? "Desactivar" : "Activar"}
                </MenuButton>

                <div className="border-t border-primary/5" />

                <MenuButton onClick={onDelete} danger icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }>
                  Eliminar
                </MenuButton>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </td>
    </MotionTr>
  );
}

function MenuButton({
  children,
  onClick,
  icon,
  danger = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-150",
        danger
          ? "text-danger hover:bg-danger/5"
          : "text-foreground/70 hover:bg-primary/5 hover:text-foreground"
      )}
    >
      <span className="shrink-0">{icon}</span>
      {children}
    </button>
  );
}

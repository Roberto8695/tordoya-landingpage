"use client";

import React from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import BannerPreview, { getImageUrl, type BannerData } from "./BannerPreview";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

const MotionButton = motion.button as React.ComponentType<
  React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps>
>;

interface DeleteBannerDialogProps {
  banner: BannerData | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (banner: BannerData) => void;
  isDeleting?: boolean;
}

export default function DeleteBannerDialog({
  banner,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteBannerDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && banner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-2xl"
          >
            <div className="relative h-32 w-full bg-primary/5">
              <BannerPreview
                banner={banner}
                compact
                className="absolute inset-0 rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col gap-2 px-6 pb-2 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-primary">
                  Eliminar slide
                </h2>
                <span className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  banner.active
                    ? "bg-success/10 text-success"
                    : "bg-foreground/10 text-foreground/50"
                )}>
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    banner.active ? "bg-success" : "bg-foreground/30"
                  )} />
                  {banner.active ? "Activo" : "Inactivo"}
                </span>
              </div>

              <p className="text-sm font-medium text-foreground">
                {banner.title || "Slide sin título"}
              </p>

              <div className="mt-1 rounded-xl bg-danger/5 border border-danger/10 px-4 py-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-danger">
                      ¿Estás seguro?
                    </p>
                    <p className="mt-0.5 text-xs text-danger/80">
                      Esta acción eliminará permanentemente este slide del Hero. No se puede deshacer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-primary/5 px-6 py-4">
              <MotionButton
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="flex h-10 items-center justify-center rounded-xl border border-primary/10 bg-white px-5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-primary/5 hover:text-foreground disabled:opacity-50"
              >
                Cancelar
              </MotionButton>

              <MotionButton
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={() => onConfirm(banner)}
                disabled={isDeleting}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-danger px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Eliminar
                  </>
                )}
              </MotionButton>
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
}

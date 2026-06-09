"use client";

import React, { useState } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EspecialidadDTO } from "@/services/especialidades.service";

type MotionDivProps = React.ComponentPropsWithoutRef<"div"> & MotionProps;
const MotionDiv = motion.div as React.FC<MotionDivProps>;
type MotionButtonProps = React.ComponentPropsWithoutRef<"button"> & MotionProps;
const MotionButton = motion.button as React.FC<MotionButtonProps>;

interface DeleteSpecialtyDialogProps {
  especialidad: EspecialidadDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (especialidad: EspecialidadDTO) => void;
  isDeleting?: boolean;
}

/**
 * Modal de confirmación profesional para eliminar especialidades.
 * Diseño minimalista tipo SaaS con advertencia clara sin ser alarmista.
 */
export default function DeleteSpecialtyDialog({
  especialidad,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteSpecialtyDialogProps) {
  const serviciosCount = especialidad?.servicios?.length ?? 0;

  return (
    <AnimatePresence>
      {isOpen && especialidad && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-primary/10 bg-white p-6 shadow-2xl sm:p-8"
            role="alertdialog"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            {/* Icono */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
              <svg className="h-6 w-6 text-danger" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Título */}
            <h2
              id="delete-dialog-title"
              className="mt-4 text-center text-lg font-bold text-foreground"
            >
              Eliminar especialidad
            </h2>

            {/* Descripción */}
            <div id="delete-dialog-description" className="mt-2 text-center text-sm text-foreground/60">
              <p>
                ¿Estás seguro de eliminar <strong className="text-foreground">{especialidad.nombre}</strong>?
              </p>
              {serviciosCount > 0 && (
                <p className="mt-2 rounded-xl bg-danger/5 px-4 py-3 text-xs font-medium text-danger">
                  Esta especialidad tiene <strong>{serviciosCount} servicios</strong> asociados que también serán eliminados. Esta acción no se puede deshacer.
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <MotionButton
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onClose}
                disabled={isDeleting}
                className="flex h-10 items-center justify-center rounded-xl border border-primary/10 bg-white px-5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-primary/5 hover:text-foreground disabled:opacity-50"
              >
                Cancelar
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onConfirm(especialidad)}
                disabled={isDeleting}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-danger px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-danger/90 disabled:opacity-50"
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
                  <>Eliminar</>
                )}
              </MotionButton>
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
}
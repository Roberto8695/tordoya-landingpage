"use client";

import React, { useState, useEffect } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = React.ComponentPropsWithoutRef<"div"> & MotionProps;
const MotionDiv = motion.div as React.FC<MotionDivProps>;
type MotionButtonProps = React.ComponentPropsWithoutRef<"button"> & MotionProps;
const MotionButton = motion.button as React.FC<MotionButtonProps>;

export interface ServicioFormData {
  slug: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionMinutos: number;
  activo: boolean;
  orden: number;
  especialidadSlug: string;
}

interface ServicioFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServicioFormData) => void;
  initialData?: Partial<ServicioFormData>;
  isSaving?: boolean;
  title?: string;
  especialidadOptions: { slug: string; nombre: string }[];
}

export default function ServicioForm({
  isOpen, onClose, onSave, initialData, isSaving = false,
  title = "Nuevo Servicio", especialidadOptions,
}: ServicioFormProps) {
  const [form, setForm] = useState<ServicioFormData>({
    slug: "", nombre: "", descripcion: "", precio: 0, duracionMinutos: 30, activo: true, orden: 0, especialidadSlug: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ServicioFormData, string>>>({});

  useEffect(() => {
    setForm({
      slug: initialData?.slug ?? "",
      nombre: initialData?.nombre ?? "",
      descripcion: initialData?.descripcion ?? "",
      precio: initialData?.precio ?? 0,
      duracionMinutos: initialData?.duracionMinutos ?? 30,
      activo: initialData?.activo ?? true,
      orden: initialData?.orden ?? 0,
      especialidadSlug: initialData?.especialidadSlug ?? (especialidadOptions[0]?.slug ?? ""),
    });
    setErrors({});
  }, [initialData, isOpen, especialidadOptions]);

  const handleChange = (field: keyof ServicioFormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (field === "nombre") {
      const slug = (value as string).toLowerCase()
        .replace(/[^a-záéíóúñ\s0-9]/g, "")
        .replace(/[áéíóú]/g, (c: string) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] || c)
        .replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.slug.trim()) newErrors.slug = "El slug es obligatorio";
    if (!form.especialidadSlug) newErrors.especialidadSlug = "Selecciona una especialidad";
    if (form.duracionMinutos < 0) newErrors.duracionMinutos = "Duración inválida";
    if (form.orden < 0) newErrors.orden = "El orden debe ser 0 o mayor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) onSave(form); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <MotionDiv initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl border border-primary/10 bg-white shadow-2xl">
            <div className="shrink-0 rounded-t-2xl bg-accent px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30" aria-label="Cerrar">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Nombre</label>
                <input type="text" placeholder="Ej: Ecografía abdominal completa" value={form.nombre} onChange={(e) => handleChange("nombre", e.target.value)}
                  className={cn("h-10 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30",
                    errors.nombre ? "border-danger ring-4 ring-danger/10" : "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10")} />
                {errors.nombre && <p className="text-xs font-medium text-danger">{errors.nombre}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Slug</label>
                <div className="flex h-10 items-center gap-2 rounded-xl border border-primary/10 bg-primary/[0.02] px-4 text-sm text-foreground/50">
                  <span className="text-foreground/30">/admin/servicios/</span>
                  <span className="font-medium text-foreground/70">{form.slug || "..."}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Especialidad</label>
                <select value={form.especialidadSlug} onChange={(e) => handleChange("especialidadSlug", e.target.value)}
                  className={cn("h-10 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 appearance-none",
                    errors.especialidadSlug ? "border-danger ring-4 ring-danger/10" : "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10")}>
                  <option value="">Seleccionar especialidad</option>
                  {especialidadOptions.map((opt) => <option key={opt.slug} value={opt.slug}>{opt.nombre}</option>)}
                </select>
                {errors.especialidadSlug && <p className="text-xs font-medium text-danger">{errors.especialidadSlug}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Estado</label>
                <div className="flex h-10 items-center gap-3 rounded-xl border border-primary/10 bg-white px-4">
                  <button type="button" onClick={() => handleChange("activo", true)}
                    className={cn("rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                      form.activo ? "bg-success text-white shadow-sm" : "text-foreground/50 hover:text-foreground/80")}>Activo</button>
                  <button type="button" onClick={() => handleChange("activo", false)}
                    className={cn("rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                      !form.activo ? "bg-foreground/10 text-foreground/70 shadow-sm" : "text-foreground/50 hover:text-foreground/80")}>Inactivo</button>
                </div>
              </div>
              {/* <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/70">Duración (min)</label>
                  <input type="number" min={0} value={form.duracionMinutos} onChange={(e) => handleChange("duracionMinutos", parseInt(e.target.value) || 0)}
                    className={cn("h-10 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none transition-all duration-200",
                      errors.duracionMinutos ? "border-danger ring-4 ring-danger/10" : "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10")} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/70">Precio ($)</label>
                  <input type="number" min={0} step="0.01" value={form.precio} onChange={(e) => handleChange("precio", parseFloat(e.target.value) || 0)}
                    className="h-10 w-full rounded-xl border border-primary/10 bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/70">Orden</label>
                  <input type="number" min={0} value={form.orden} onChange={(e) => handleChange("orden", parseInt(e.target.value) || 0)}
                    className={cn("h-10 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none transition-all duration-200",
                      errors.orden ? "border-danger ring-4 ring-danger/10" : "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10")} />
                </div>
              </div> */}
              {/* <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Descripción (opcional)</label>
                <textarea rows={2} placeholder="Breve descripción del servicio..." value={form.descripcion} onChange={(e) => handleChange("descripcion", e.target.value)}
                  className="h-20 w-full resize-none rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-4 focus:ring-accent/10" />
              </div> */}
              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <MotionButton whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="button" onClick={onClose} disabled={isSaving}
                  className="flex h-10 items-center justify-center rounded-xl border border-primary/10 bg-white px-5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-primary/5 hover:text-foreground disabled:opacity-50">Cancelar</MotionButton>
                <MotionButton whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={isSaving}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary disabled:opacity-50">
                  {isSaving ? <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" /><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Guardando...</> : "Guardar"}
                </MotionButton>
              </div>
            </form>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
}
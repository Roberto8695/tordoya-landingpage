"use client";

import React, { useState, useEffect } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = React.ComponentPropsWithoutRef<"div"> & MotionProps;
const MotionDiv = motion.div as React.FC<MotionDivProps>;
type MotionButtonProps = React.ComponentPropsWithoutRef<"button"> & MotionProps;
const MotionButton = motion.button as React.FC<MotionButtonProps>;

export interface SpecialtyFormData {
  nombre: string;
  slug: string;
  icon: string;
  color: string;
  imagen: string;
  activo: boolean;
  orden: number;
}

interface SpecialtyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SpecialtyFormData) => void;
  initialData?: Partial<SpecialtyFormData>;
  isSaving?: boolean;
  title?: string;
}

const COLOR_OPTIONS = [
  { value: "primary", label: "Azul", class: "bg-primary" },
  { value: "secondary", label: "Azul medio", class: "bg-secondary" },
  { value: "accent", label: "Cian", class: "bg-accent" },
];

/**
 * Formulario moderno tipo modal para crear/editar especialidades.
 * Se sincroniza con initialData cada vez que cambia (editar diferente especialidad).
 */
export default function SpecialtyForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  isSaving = false,
  title = "Nueva Especialidad",
}: SpecialtyFormProps) {
  const [form, setForm] = useState<SpecialtyFormData>({
    nombre: "",
    slug: "",
    icon: "HiOutlineViewList",
    color: "primary",
    imagen: "",
    activo: true,
    orden: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SpecialtyFormData, string>>>({});
  const [previewUrl, setPreviewUrl] = useState("");

  // Sincronizar estado cuando cambia initialData (al editar diferente especialidad)
  useEffect(() => {
    setForm({
      nombre: initialData?.nombre ?? "",
      slug: initialData?.slug ?? "",
      icon: initialData?.icon ?? "HiOutlineViewList",
      color: initialData?.color ?? "primary",
      imagen: initialData?.imagen ?? "",
      activo: initialData?.activo ?? true,
      orden: initialData?.orden ?? 0,
    });
    setPreviewUrl(initialData?.imagen ?? "");
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (field: keyof SpecialtyFormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));

    if (field === "nombre") {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-záéíóúñ\s]/g, "")
        .replace(/[áéíóú]/g, (c: string) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] || c)
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.slug.trim()) newErrors.slug = "El slug es obligatorio";
    if (form.orden < 0) newErrors.orden = "El orden debe ser 0 o mayor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  const selectedColorClass = COLOR_OPTIONS.find((c) => c.value === form.color)?.class ?? "bg-primary";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl border border-primary/10 bg-white shadow-2xl"
          >
            <div className={cn("rounded-t-2xl px-6 py-5 sm:px-8", selectedColorClass)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-white">{title}</h2>
                  <span className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    form.activo ? "bg-success/20 text-success" : "bg-white/20 text-white/70"
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", form.activo ? "bg-success" : "bg-white/50")} />
                    {form.activo ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                  aria-label="Cerrar"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Ecografía Abdominal"
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className={cn(
                    "h-10 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30",
                    errors.nombre ? "border-danger ring-4 ring-danger/10" : "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10"
                  )}
                  aria-label="Nombre de la especialidad"
                />
                {errors.nombre && <p className="text-xs font-medium text-danger">{errors.nombre}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Slug</label>
                <div className="flex h-10 items-center gap-2 rounded-xl border border-primary/10 bg-primary/[0.02] px-4 text-sm text-foreground/50">
                  <span className="text-foreground/30">/admin/especialidades/</span>
                  <span className="font-medium text-foreground/70">{form.slug || "..."}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Estado</label>
                <div className="flex h-10 items-center gap-3 rounded-xl border border-primary/10 bg-white px-4">
                  <button
                    type="button"
                    onClick={() => handleChange("activo", true)}
                    className={cn(
                      "rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                      form.activo
                        ? "bg-success text-white shadow-sm"
                        : "text-foreground/50 hover:text-foreground/80"
                    )}
                  >
                    Activo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("activo", false)}
                    className={cn(
                      "rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                      !form.activo
                        ? "bg-foreground/10 text-foreground/70 shadow-sm"
                        : "text-foreground/50 hover:text-foreground/80"
                    )}
                  >
                    Inactivo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/70">Color</label>
                  <div className="flex gap-2">
                    {COLOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleChange("color", opt.value)}
                        className={cn(
                          "h-8 w-8 rounded-full transition-all duration-200",
                          opt.class,
                          form.color === opt.value ? "ring-2 ring-primary ring-offset-2 scale-110" : "opacity-60 hover:opacity-100"
                        )}
                        aria-label={opt.label}
                        title={opt.label}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/70">Orden</label>
                  <input
                    type="number"
                    min={0}
                    value={form.orden}
                    onChange={(e) => handleChange("orden", parseInt(e.target.value) || 0)}
                    className="h-10 w-full rounded-xl border border-primary/10 bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
                    aria-label="Orden de visualización"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">URL de imagen</label>
                <input
                  type="url"
                  placeholder="/image/especialidades/ejemplo.webp"
                  value={form.imagen}
                  onChange={(e) => { handleChange("imagen", e.target.value); setPreviewUrl(e.target.value); }}
                  className="h-10 w-full rounded-xl border border-primary/10 bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-4 focus:ring-accent/10"
                  aria-label="URL de la imagen"
                />
                {previewUrl && (
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/[0.02] p-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", selectedColorClass)}>
                      <span className="text-lg font-black text-white">T</span>
                    </div>
                    <span className="truncate text-xs text-foreground/50">{previewUrl}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <MotionButton
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="flex h-10 items-center justify-center rounded-xl border border-primary/10 bg-white px-5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-primary/5 hover:text-foreground disabled:opacity-50"
                >
                  Cancelar
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSaving}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    "Guardar"
                  )}
                </MotionButton>
              </div>
            </form>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
}
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/constants";

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
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        .toLowerCase().replace(/[^a-záéíóúñ\s]/g, "")
        .replace(/[áéíóú]/g, (c: string) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] || c)
        .replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const uploadImage = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE_URL}/upload/especialidad`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir imagen");
      const data = await res.json();
      setForm((prev) => ({ ...prev, imagen: data.url }));
      setPreviewUrl(data.url);
    } catch {
      setErrors((prev) => ({ ...prev, imagen: "Error al subir la imagen" }));
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    const allowed = ["image/webp", "image/png", "image/jpeg", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, imagen: "Formato no permitido. Usa: webp, png, jpg, gif, svg" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, imagen: "La imagen no debe superar 5MB" }));
      return;
    }
    uploadImage(file);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file ?? null);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileSelect(file ?? null);
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, imagen: "" }));
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.slug.trim()) newErrors.slug = "El slug es obligatorio";
    if (form.orden < 0) newErrors.orden = "El orden debe ser 0 o mayor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) onSave(form); };

  const selectedColorClass = COLOR_OPTIONS.find((c) => c.value === form.color)?.class ?? "bg-primary";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <MotionDiv initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl border border-primary/10 bg-white shadow-2xl">
            <div className={cn("shrink-0 rounded-t-2xl px-6 py-4 sm:px-8", selectedColorClass)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-white">{title}</h2>
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    form.activo ? "bg-success/20 text-success" : "bg-white/20 text-white/70")}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", form.activo ? "bg-success" : "bg-white/50")} />
                    {form.activo ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30" aria-label="Cerrar">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Nombre</label>
                <input type="text" placeholder="Ej: Ecografía Abdominal" value={form.nombre} onChange={(e) => handleChange("nombre", e.target.value)}
                  className={cn("h-10 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30",
                    errors.nombre ? "border-danger ring-4 ring-danger/10" : "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10")} />
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
                  <button type="button" onClick={() => handleChange("activo", true)}
                    className={cn("rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                      form.activo ? "bg-success text-white shadow-sm" : "text-foreground/50 hover:text-foreground/80")}>Activo</button>
                  <button type="button" onClick={() => handleChange("activo", false)}
                    className={cn("rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                      !form.activo ? "bg-foreground/10 text-foreground/70 shadow-sm" : "text-foreground/50 hover:text-foreground/80")}>Inactivo</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/70">Color</label>
                  <div className="flex gap-2">
                    {COLOR_OPTIONS.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => handleChange("color", opt.value)}
                        className={cn("h-8 w-8 rounded-full transition-all duration-200", opt.class,
                          form.color === opt.value ? "ring-2 ring-primary ring-offset-2 scale-110" : "opacity-60 hover:opacity-100")} aria-label={opt.label} title={opt.label} />
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/70">Orden</label>
                  <input type="number" min={0} value={form.orden} onChange={(e) => handleChange("orden", parseInt(e.target.value) || 0)}
                    className="h-10 w-full rounded-xl border border-primary/10 bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10" />
                </div>
              </div>

              {/* Imagen con Drag & Drop */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/70">Imagen</label>
                {previewUrl ? (
                  <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-primary/[0.02]">
                    <div className="relative h-40 w-full">
                      <Image src={previewUrl.startsWith("/") ? `${API_BASE_URL}${previewUrl}` : previewUrl}
                        alt="Vista previa" fill className="object-cover" unoptimized />
                    </div>
                    <div className="absolute right-2 top-2">
                      <button type="button" onClick={removeImage}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70" aria-label="Eliminar imagen">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                    <div className="px-3 py-2 text-[11px] text-foreground/50 truncate">{previewUrl.split("/").pop()}</div>
                  </div>
                ) : (
                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn("flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition-all duration-200",
                      isDragging ? "border-accent bg-accent/5" : "border-primary/20 bg-primary/[0.02] hover:border-primary/30 hover:bg-primary/[0.04]")}>
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <svg className="h-8 w-8 animate-spin text-accent" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" /><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        <span className="text-xs font-medium text-foreground/50">Subiendo imagen...</span>
                      </div>
                    ) : (
                      <>
                        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200",
                          isDragging ? "bg-accent/10 text-accent" : "bg-primary/5 text-foreground/40")}>
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground/70">{isDragging ? "Suelta la imagen aquí" : "Arrastra una imagen o haz clic"}</p>
                          <p className="mt-1 text-[11px] text-foreground/40">PNG, JPG, WebP, GIF, SVG — Máx 5MB</p>
                        </div>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml" onChange={handleInputChange} className="hidden" aria-label="Seleccionar imagen" />
                  </div>
                )}
                {errors.imagen && <p className="text-xs font-medium text-danger">{errors.imagen}</p>}
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <MotionButton whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="button" onClick={onClose} disabled={isSaving || isUploading}
                  className="flex h-10 items-center justify-center rounded-xl border border-primary/10 bg-white px-5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-primary/5 hover:text-foreground disabled:opacity-50">Cancelar</MotionButton>
                <MotionButton whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={isSaving || isUploading}
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
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/constants";
import BannerPreview, { getImageUrl, type BannerData, type BannerTheme, type BannerLayout, type CtaStyle, type BannerBullet } from "./BannerPreview";
import BannerThemeSelector from "./BannerThemeSelector";
import BannerLayoutSelector from "./BannerLayoutSelector";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

const MotionButton = motion.button as React.ComponentType<
  React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps>
>;

const CTA_STYLE_OPTIONS: { value: CtaStyle; label: string }[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "ghost", label: "Ghost" },
  { value: "outline", label: "Outline" },
];

function generateId(): string {
  return `banner-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function createEmptyBanner(overrides?: Partial<BannerData>): BannerData {
  return {
    id: generateId(),
    badge: "",
    title: "",
    subtitle: "",
    description: "",
    bullets: [],
    cta1: { label: "Agenda tu cita", href: "#contacto", style: "primary" },
    cta2: null,
    imageDesktop: "",
    imageMobile: "",
    theme: "corporate",
    layout: "text-left-image-right",
    active: true,
    order: 0,
    ...overrides,
  };
}

export type BannerFormData = BannerData;

interface BannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BannerFormData) => void;
  initialData?: Partial<BannerData>;
  isSaving?: boolean;
  title?: string;
}

export default function BannerForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  isSaving = false,
  title = "Nuevo Slide",
}: BannerFormProps) {
  const [form, setForm] = useState<BannerFormData>(createEmptyBanner);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [activeTab, setActiveTab] = useState("general");
  const [newBulletText, setNewBulletText] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingDesktop, setIsUploadingDesktop] = useState(false);
  const [isUploadingMobile, setIsUploadingMobile] = useState(false);

  useEffect(() => {
    setForm(createEmptyBanner(initialData ?? {}));
    setErrors({});
    setActiveTab("general");
    setNewBulletText("");
    setPreviewOpen(false);
  }, [initialData, isOpen]);

  const updateField = useCallback(<K extends keyof BannerFormData>(
    field: K,
    value: BannerFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const updateCTA1 = useCallback(<K extends keyof BannerData["cta1"]>(
    field: K,
    value: BannerData["cta1"][K]
  ) => {
    setForm((prev) => ({
      ...prev,
      cta1: { ...prev.cta1, [field]: value },
    }));
  }, []);

  const updateCTA2 = useCallback(<K extends keyof NonNullable<BannerData["cta2"]>>(
    field: K,
    value: NonNullable<BannerData["cta2"]>[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      cta2: prev.cta2 ? { ...prev.cta2, [field]: value } : { label: "", href: "#", style: "secondary", [field]: value },
    }));
  }, []);

  const addBullet = useCallback(() => {
    const text = newBulletText.trim();
    if (!text) return;
    const bullet: BannerBullet = { id: `bullet-${Date.now()}`, text };
    setForm((prev) => ({ ...prev, bullets: [...prev.bullets, bullet] }));
    setNewBulletText("");
  }, [newBulletText]);

  const removeBullet = useCallback((id: string) => {
    setForm((prev) => ({ ...prev, bullets: prev.bullets.filter((b) => b.id !== id) }));
  }, []);

  const moveBullet = useCallback((fromIndex: number, toIndex: number) => {
    setForm((prev) => {
      const bullets = [...prev.bullets];
      const [moved] = bullets.splice(fromIndex, 1);
      bullets.splice(toIndex, 0, moved);
      return { ...prev, bullets };
    });
  }, []);

  const uploadImage = useCallback(async (file: File, type: "desktop" | "mobile") => {
    const setter = type === "desktop" ? setIsUploadingDesktop : setIsUploadingMobile;
    setter(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE_URL}/upload/banner`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir imagen");
      const data = await res.json();
      if (type === "desktop") {
        updateField("imageDesktop", data.url);
      } else {
        updateField("imageMobile", data.url);
      }
    } catch {
      setErrors((prev) => ({ ...prev, [type === "desktop" ? "imageDesktop" : "imageMobile"]: "Error al subir la imagen" }));
    } finally {
      setter(false);
    }
  }, [updateField]);

  const handleFileSelect = useCallback((
    file: File | null,
    type: "desktop" | "mobile"
  ) => {
    if (!file) return;
    const allowed = ["image/webp", "image/png", "image/jpeg", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [type === "desktop" ? "imageDesktop" : "imageMobile"]: "Formato no permitido",
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [type === "desktop" ? "imageDesktop" : "imageMobile"]: "Máximo 5MB",
      }));
      return;
    }
    uploadImage(file, type);
  }, [uploadImage]);

  const validate = useCallback((): boolean => {
    const newErrors: typeof errors = {};
    if (!form.title.trim()) newErrors.title = "El título es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form.title]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  }, [validate, onSave, form]);

  const tabs = [
    { id: "general", label: "General" },
    { id: "content", label: "Contenido" },
    { id: "bullets", label: "Bullets" },
    { id: "buttons", label: "Botones" },
    { id: "image", label: "Imagen" },
    { id: "design", label: "Diseño" },
    { id: "settings", label: "Config" },
  ];

  const renderDropZone = (type: "desktop" | "mobile") => {
    const field = type === "desktop" ? "imageDesktop" : "imageMobile";
    const value = form[field];
    const uploading = type === "desktop" ? isUploadingDesktop : isUploadingMobile;
    const inputRef = type === "desktop" ? desktopInputRef : mobileInputRef;

    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground/70">
          {type === "desktop" ? "Imagen Desktop" : "Imagen Mobile"}
          {type === "mobile" && <span className="text-foreground/30 font-normal"> (opcional)</span>}
        </label>

        {value ? (
          <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-primary/[0.02]">
            <div className={cn(
              "relative w-full",
              type === "desktop" ? "h-40" : "h-28"
            )}>
              <Image
                src={getImageUrl(value)}
                alt={type === "desktop" ? "Desktop preview" : "Mobile preview"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute right-2 top-2">
              <button
                type="button"
                onClick={() => updateField(field, "")}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                aria-label="Eliminar imagen"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="px-3 py-2 text-[11px] text-foreground/50 truncate">
              {value.split("/").pop()}
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={(e) => {
              e.preventDefault();
              handleFileSelect(e.dataTransfer.files?.[0] ?? null, type);
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 transition-all duration-200",
              type === "desktop"
                ? "border-primary/20 hover:border-primary/30"
                : "border-primary/10 hover:border-primary/20"
            )}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <svg className="h-6 w-6 animate-spin text-accent" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-xs font-medium text-foreground/50">Subiendo...</span>
              </div>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-foreground/40">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground/50">
                  {type === "desktop" ? "Arrastra o haz clic" : "Opcional"}
                </span>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml"
              onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null, type)}
              className="hidden"
              aria-label={`Seleccionar imagen ${type}`}
            />
          </div>
        )}
        {errors[field] && <p className="text-xs font-medium text-danger">{errors[field]}</p>}
      </div>
    );
  };

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
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-primary/10 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between rounded-t-2xl border-b border-primary/5 bg-gradient-to-r from-primary to-secondary px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <p className="text-xs text-white/70 mt-0.5">
                  Completa los campos para configurar este slide del Hero
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                aria-label="Cerrar"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1 border-b border-primary/5 bg-light px-6 py-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
                    activeTab === tab.id
                      ? "text-accent"
                      : "text-foreground/40 hover:text-foreground/70"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <MotionDiv
                      layoutId="formTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6">
                <div className="md:hidden mb-4">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="h-10 w-full rounded-xl border border-primary/10 bg-white px-4 text-sm text-foreground outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>{tab.label}</option>
                    ))}
                  </select>
                </div>

                <AnimatePresence mode="wait">
                  <MotionDiv
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-5"
                  >
                    {/* GENERAL */}
                    {activeTab === "general" && (
                      <>
                        <CardSection title="Información General" description="Identificación y visibilidad del slide">
                          <FieldGroup>
                            <InputField
                              label="Título *"
                              value={form.title}
                              onChange={(v) => updateField("title", v)}
                              placeholder="Ej: Tu salud femenina, protegida"
                              error={errors.title}
                            />
                            <InputField
                              label="Badge"
                              value={form.badge}
                              onChange={(v) => updateField("badge", v)}
                              placeholder="Ej: Para ella"
                            />
                          </FieldGroup>
                        </CardSection>

                        <CardSection title="Subtítulo y Descripción">
                          <div className="space-y-3">
                            <InputField
                              label="Subtítulo"
                              value={form.subtitle}
                              onChange={(v) => updateField("subtitle", v)}
                              placeholder="Ej: Estudios especializados para el cuidado integral"
                            />
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-foreground/70">Descripción</label>
                              <textarea
                                value={form.description}
                                onChange={(e) => updateField("description", e.target.value)}
                                placeholder="Descripción opcional del slide..."
                                rows={3}
                                className="h-20 w-full resize-none rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-4 focus:ring-accent/10"
                              />
                            </div>
                          </div>
                        </CardSection>

                      </>
                    )}

                    {/* CONTENT */}
                    {activeTab === "content" && (
                      <CardSection title="Contenido" description="Texto principal del slide">
                        <InputField
                          label="Título principal"
                          value={form.title}
                          onChange={(v) => updateField("title", v)}
                          placeholder="Título del slide"
                          error={errors.title}
                        />
                        <InputField
                          label="Badge / Etiqueta"
                          value={form.badge}
                          onChange={(v) => updateField("badge", v)}
                          placeholder="Ej: Nuevo, Promoción, Para ella"
                        />
                        <InputField
                          label="Subtítulo"
                          value={form.subtitle}
                          onChange={(v) => updateField("subtitle", v)}
                          placeholder="Subtítulo opcional"
                        />
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70">Descripción</label>
                          <textarea
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Descripción del slide..."
                            rows={4}
                            className="h-24 w-full resize-none rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-4 focus:ring-accent/10"
                          />
                        </div>
                      </CardSection>
                    )}

                    {/* BULLETS */}
                    {activeTab === "bullets" && (
                      <CardSection
                        title="Características (Bullets)"
                        description="Agrega, elimina o reordena los puntos destacados"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newBulletText}
                            onChange={(e) => setNewBulletText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addBullet(); } }}
                            placeholder="Escribe un bullet y presiona Enter..."
                            className="h-10 flex-1 rounded-xl border border-primary/10 bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-4 focus:ring-accent/10"
                          />
                          <MotionButton
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={addBullet}
                            disabled={!newBulletText.trim()}
                            className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary disabled:opacity-40"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Agregar
                          </MotionButton>
                        </div>

                        <div className="mt-3 space-y-2">
                          {form.bullets.length === 0 && (
                            <p className="py-6 text-center text-sm text-foreground/40">
                              No hay bullets. Agrega el primero.
                            </p>
                          )}
                          <AnimatePresence>
                            {form.bullets.map((bullet, index) => (
                              <MotionDiv
                                key={bullet.id}
                                initial={{ opacity: 0, x: -8, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                exit={{ opacity: 0, x: 8, height: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-2 overflow-hidden"
                              >
                                <button
                                  type="button"
                                  onClick={() => moveBullet(index, Math.max(0, index - 1))}
                                  disabled={index === 0}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground/30 transition-colors hover:bg-primary/5 hover:text-foreground/60 disabled:opacity-20"
                                  aria-label="Mover arriba"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveBullet(index, Math.min(form.bullets.length - 1, index + 1))}
                                  disabled={index === form.bullets.length - 1}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground/30 transition-colors hover:bg-primary/5 hover:text-foreground/60 disabled:opacity-20"
                                  aria-label="Mover abajo"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>

                                <div className="flex flex-1 items-center gap-2 rounded-xl border border-primary/10 bg-primary/[0.02] px-3 py-2">
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                                    {index + 1}
                                  </span>
                                  <span className="text-sm text-foreground/80">{bullet.text}</span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeBullet(bullet.id)}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground/30 transition-colors hover:bg-danger/10 hover:text-danger"
                                  aria-label="Eliminar bullet"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
                              </MotionDiv>
                            ))}
                          </AnimatePresence>
                        </div>

                      </CardSection>
                    )}

                    {/* BUTTONS */}
                    {activeTab === "buttons" && (
                      <>
                        <CardSection title="Botón principal" description="CTA principal del slide">
                          <InputField
                            label="Texto"
                            value={form.cta1.label}
                            onChange={(v) => updateCTA1("label", v)}
                            placeholder="Agenda tu cita"
                          />
                          <InputField
                            label="URL"
                            value={form.cta1.href}
                            onChange={(v) => updateCTA1("href", v)}
                            placeholder="#contacto"
                          />
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground/70">Estilo</label>
                            <div className="flex flex-wrap gap-2">
                              {CTA_STYLE_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => updateCTA1("style", opt.value)}
                                  className={cn(
                                    "rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                                    form.cta1.style === opt.value
                                      ? "bg-primary text-white shadow-sm"
                                      : "border border-primary/10 text-foreground/50 hover:border-primary/20 hover:text-foreground/80"
                                  )}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </CardSection>

                        <CardSection title="Botón secundario (opcional)">
                          <div className="flex items-center gap-3 mb-4">
                            <button
                              type="button"
                              onClick={() => updateField("cta2", form.cta2 ? null : { label: "Ver más", href: "#", style: "ghost" })}
                              className={cn(
                                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200",
                                form.cta2
                                  ? "bg-accent/10 text-accent"
                                  : "border border-primary/10 text-foreground/50 hover:border-primary/20"
                              )}
                            >
                              {form.cta2 ? (
                                <>
                                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Secundario activo
                                </>
                              ) : (
                                <>
                                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Agregar botón secundario
                                </>
                              )}
                            </button>
                          </div>

                          {form.cta2 && (
                            <AnimatePresence>
                              <MotionDiv
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3 overflow-hidden"
                              >
                                <InputField
                                  label="Texto"
                                  value={form.cta2.label}
                                  onChange={(v) => updateCTA2("label", v)}
                                  placeholder="Ver todos los servicios"
                                />
                                <InputField
                                  label="URL"
                                  value={form.cta2.href}
                                  onChange={(v) => updateCTA2("href", v)}
                                  placeholder="#servicios"
                                />
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-foreground/70">Estilo</label>
                                  <div className="flex flex-wrap gap-2">
                                    {CTA_STYLE_OPTIONS.map((opt) => (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => updateCTA2("style", opt.value)}
                                        className={cn(
                                          "rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                                          form.cta2!.style === opt.value
                                            ? "bg-primary text-white shadow-sm"
                                            : "border border-primary/10 text-foreground/50 hover:border-primary/20 hover:text-foreground/80"
                                        )}
                                      >
                                        {opt.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </MotionDiv>
                            </AnimatePresence>
                          )}
                        </CardSection>
                      </>
                    )}

                    {/* IMAGE */}
                    {activeTab === "image" && (
                      <CardSection title="Imágenes" description="Personaliza las imágenes del slide">
                        <div className="grid gap-4 sm:grid-cols-2">
                          {renderDropZone("desktop")}
                          {renderDropZone("mobile")}
                        </div>
                      </CardSection>
                    )}

                    {/* DESIGN */}
                    {activeTab === "design" && (
                      <>
                        <CardSection title="Tema de colores" description="Selecciona un tema predefinido para el slide">
                          <BannerThemeSelector
                            value={form.theme}
                            onChange={(theme: BannerTheme) => updateField("theme", theme)}
                          />
                        </CardSection>

                        <CardSection title="Layout" description="Elige la disposición del contenido">
                          <BannerLayoutSelector
                            value={form.layout}
                            onChange={(layout: BannerLayout) => updateField("layout", layout)}
                          />
                        </CardSection>

                      </>
                    )}

                    {/* SETTINGS */}
                    {activeTab === "settings" && (
                      <CardSection title="Configuración" description="Estado y orden del slide">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70">Estado</label>
                          <div className="flex h-10 items-center gap-3 rounded-xl border border-primary/10 bg-white px-4">
                            <button
                              type="button"
                              onClick={() => updateField("active", true)}
                              className={cn(
                                "rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                                form.active
                                  ? "bg-success text-white shadow-sm"
                                  : "text-foreground/50 hover:text-foreground/80"
                              )}
                            >
                              Activo
                            </button>
                            <button
                              type="button"
                              onClick={() => updateField("active", false)}
                              className={cn(
                                "rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-200",
                                !form.active
                                  ? "bg-foreground/10 text-foreground/70 shadow-sm"
                                  : "text-foreground/50 hover:text-foreground/80"
                              )}
                            >
                              Inactivo
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70">Orden</label>
                          <input
                            type="number"
                            min={0}
                            value={form.order}
                            onChange={(e) => updateField("order", parseInt(e.target.value) || 0)}
                            className="h-10 w-full max-w-32 rounded-xl border border-primary/10 bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
                          />
                        </div>
                      </CardSection>
                    )}
                  </MotionDiv>
                </AnimatePresence>
              </div>

            <div className="flex items-center justify-between border-t border-primary/5 bg-light px-6 py-4">
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setPreviewOpen(true)}
                disabled={isSaving}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-primary/10 bg-white px-4 text-sm font-medium text-foreground/60 transition-all duration-200 hover:border-primary/20 hover:text-foreground/80 disabled:opacity-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Vista previa
              </MotionButton>

              <div className="flex items-center gap-2">
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
                    <>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Guardar
                    </>
                  )}
                </MotionButton>
              </div>
            </div>
            </form>
          </MotionDiv>

          <AnimatePresence>
            {previewOpen && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <MotionDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setPreviewOpen(false)}
                  aria-hidden="true"
                />
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-primary/5 bg-gradient-to-r from-primary to-secondary px-6 py-4">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-white/70" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      <div>
                        <h3 className="text-base font-bold text-white">Vista previa del slide</h3>
                        <p className="text-xs text-white/60">{form.title || "Slide sin título"}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPreviewOpen(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                      aria-label="Cerrar vista previa"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="overflow-hidden bg-primary/[0.02]">
                    <BannerPreview banner={form} />
                  </div>
                </MotionDiv>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}

function CardSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-foreground/50">{description}</p>
        )}
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-foreground/70">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-10 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30",
          error
            ? "border-danger ring-4 ring-danger/10"
            : "border-primary/10 focus:border-accent focus:ring-4 focus:ring-accent/10"
        )}
      />
      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import BannerTable from "@/features/banners/components/BannerTable";
import BannerForm, { type BannerFormData } from "@/features/banners/components/BannerForm";
import BannerSortableList from "@/features/banners/components/BannerSortableList";
import DeleteBannerDialog from "@/features/banners/components/DeleteBannerDialog";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BannerData } from "@/features/banners/components/BannerPreview";
import {
  fetchBanners,
  createBanner,
  updateBanner,
  deleteBanner as deleteBannerApi,
  reorderBanners as reorderBannersApi,
} from "@/services/banners.service";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

type ViewMode = "table" | "list";

export default function BannersPage() {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [formOpen, setFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteBanner, setDeleteBanner] = useState<BannerData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const showSuccess = useCallback((msg: string) => {
    setSuccessMsg(msg);
    window.setTimeout(() => setSuccessMsg(""), 2500);
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await fetchBanners();
      setBanners(data);
    } catch {
      showSuccess("Error al cargar banners desde el servidor");
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreateNew = useCallback(() => {
    setEditingBanner(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((banner: BannerData) => {
    setEditingBanner(banner);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback((banner: BannerData) => {
    setDeleteBanner(banner);
  }, []);

  const handleToggleActive = useCallback(async (banner: BannerData) => {
    try {
      const toggled = { ...banner, active: !banner.active };
      await updateBanner(toggled);
      setBanners((prev) => prev.map((b) => (b.id === banner.id ? toggled : b)));
      showSuccess(`Slide ${banner.active ? "desactivado" : "activado"} correctamente`);
    } catch {
      showSuccess("Error al cambiar estado del slide");
    }
  }, [showSuccess]);

  const handleDuplicate = useCallback(async (banner: BannerData) => {
    try {
      const duplicated: BannerData = {
        ...banner,
        id: "",
        title: `${banner.title} (copia)`,
        order: banners.length,
        active: false,
      };
      const created = await createBanner(duplicated);
      setBanners((prev) => [...prev, created]);
      showSuccess("Slide duplicado correctamente");
    } catch {
      showSuccess("Error al duplicar el slide");
    }
  }, [banners.length, showSuccess]);

  const handleSaveForm = useCallback(async (data: BannerFormData) => {
    setIsSaving(true);
    try {
      if (editingBanner) {
        const updated = await updateBanner({ ...data, id: editingBanner.id, order: editingBanner.order });
        setBanners((prev) => prev.map((b) => (b.id === editingBanner.id ? updated : b)));
        showSuccess("Slide actualizado correctamente");
      } else {
        const created = await createBanner({ ...data, id: "", order: banners.length });
        setBanners((prev) => [...prev, created]);
        showSuccess("Slide creado correctamente");
      }
      setFormOpen(false);
      setEditingBanner(null);
    } catch {
      showSuccess("Error al guardar el slide");
    } finally {
      setIsSaving(false);
    }
  }, [banners.length, editingBanner, showSuccess]);

  const handleDeleteConfirm = useCallback(async (banner: BannerData) => {
    setIsDeleting(true);
    try {
      await deleteBannerApi(banner.id);
      setBanners((prev) => prev.filter((b) => b.id !== banner.id));
      setDeleteBanner(null);
      showSuccess("Slide eliminado correctamente");
    } catch {
      showSuccess("Error al eliminar el slide");
    } finally {
      setIsDeleting(false);
    }
  }, [showSuccess]);

  const handleReorder = useCallback(async (reordered: BannerData[]) => {
    try {
      const ids = reordered.map((b) => b.id);
      const updated = await reorderBannersApi(ids);
      setBanners(updated);
      showSuccess("Orden actualizado");
    } catch {
      showSuccess("Error al reordenar");
    }
  }, [showSuccess]);

  const activeCount = banners.filter((b) => b.active).length;
  const inactiveCount = banners.filter((b) => !b.active).length;

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar currentPath="/admin/banners" />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-primary/10 bg-white/80 p-6 shadow-[0_12px_30px_rgba(1,21,90,0.05)] backdrop-blur md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary/70">
               Hero Section
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                Administrar Banners
              </h1>
              <p className="mt-3 text-base leading-7 text-foreground/70 max-w-2xl">
                Gestiona los slides del Hero principal. Cada slide representa una diapositiva del carrusel de inicio.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 rounded-xl border border-primary/10 bg-white p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "rounded-lg p-2 transition-all duration-200",
                    viewMode === "table"
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground/40 hover:text-foreground/70"
                  )}
                  aria-label="Vista tabla"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-lg p-2 transition-all duration-200",
                    viewMode === "list"
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground/40 hover:text-foreground/70"
                  )}
                  aria-label="Vista lista"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary hover:shadow-md"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Nuevo Slide
              </button>
            </div>
          </div>

          <AnimatePresence>
            {successMsg && (
              <MotionDiv
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm"
              >
                <svg className="mr-2 inline h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {successMsg}
              </MotionDiv>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4 text-xs text-foreground/50">
            <span>
              <strong className="text-foreground">{banners.length}</strong> slides
            </span>
            <span className="h-1 w-1 rounded-full bg-foreground/20" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" />
              <strong className="text-foreground">{activeCount}</strong> activos
            </span>
            {inactiveCount > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-foreground/20" aria-hidden="true" />
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-foreground/30" />
                  <strong className="text-foreground">{inactiveCount}</strong> inactivos
                </span>
              </>
            )}
          </div>

          {viewMode === "table" && (
            <BannerTable
              banners={banners}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              onDuplicate={handleDuplicate}
              isLoading={isLoading}
            />
          )}

          {viewMode === "list" && (
            <div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
              <BannerSortableList
                banners={banners}
                onChange={handleReorder}
                onEdit={handleEdit}
              />
            </div>
          )}

          {!isLoading && banners.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/10 bg-white px-6 py-16">
              <svg className="mb-4 h-12 w-12 text-foreground/20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 22v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base font-medium text-foreground/40">
                No hay slides
              </p>
              <p className="mt-1 text-sm text-foreground/30">
                Crea tu primer slide para empezar a construir el Hero
              </p>
              <button
                onClick={handleCreateNew}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Crear primer slide
              </button>
            </div>
          )}
        </div>
      </main>

      <BannerForm
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingBanner(null);
        }}
        onSave={handleSaveForm}
        initialData={editingBanner ?? undefined}
        isSaving={isSaving}
        title={editingBanner ? `Editar: ${editingBanner.title || "Slide"}` : "Nuevo Slide"}
      />

      <DeleteBannerDialog
        banner={deleteBanner}
        isOpen={deleteBanner !== null}
        onClose={() => setDeleteBanner(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}

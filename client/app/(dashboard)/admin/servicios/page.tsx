"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ServicioFilters from "@/features/servicios/components/ServicioFilters";
import ServiciosTable from "@/features/servicios/components/ServiciosTable";
import ServicioForm from "@/features/servicios/components/ServicioForm";
import DeleteServicioDialog from "@/features/servicios/components/DeleteServicioDialog";
import { getServicios, getServicioBySlug, type ServicioDTO, type CreateServicioPayload } from "@/services/servicios.service";
import { getEspecialidades, type EspecialidadDTO } from "@/services/especialidades.service";
import type { ServicioFormData } from "@/features/servicios/components/ServicioForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ServiciosPage() {
  const [servicios, setServicios] = useState<ServicioDTO[]>([]);
  const [especialidades, setEspecialidades] = useState<EspecialidadDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [especialidadFilter, setEspecialidadFilter] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingSvc, setEditingSvc] = useState<ServicioDTO | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteSvc, setDeleteSvc] = useState<ServicioDTO | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [svcs, esps] = await Promise.all([getServicios(), getEspecialidades()]);
        if (mounted) { setServicios(svcs); setEspecialidades(esps); }
      } catch { /* ignore */ } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = servicios.filter((svc) => {
    const matchesSearch = svc.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEsp = especialidadFilter === "all" || svc.especialidad?.slug === especialidadFilter;
    return matchesSearch && matchesEsp;
  });

  const especialidadOptions = especialidades.map((e) => ({ slug: e.slug, nombre: e.nombre }));

  const handleCreateNew = () => { setEditingSvc(null); setFormOpen(true); };
  const handleEdit = (svc: ServicioDTO) => { setEditingSvc(svc); setFormOpen(true); };
  const handleDelete = (svc: ServicioDTO) => { setDeleteSvc(svc); };

  const handleSave = async (data: ServicioFormData) => {
    setIsSaving(true);
    try {
      const payload: CreateServicioPayload = {
        slug: data.slug,
        nombre: data.nombre,
        descripcion: data.descripcion || undefined,
        precio: data.precio || undefined,
        duracionMinutos: data.duracionMinutos || undefined,
        activo: data.activo,
        orden: data.orden,
        especialidadSlug: data.especialidadSlug,
      };

      if (editingSvc) {
        await fetch(`${API_URL}/servicios/${editingSvc.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/servicios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setFormOpen(false);
      setEditingSvc(null);
      const updated = await getServicios();
      setServicios(updated);
    } catch (err) {
      console.error("Error saving servicio:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async (svc: ServicioDTO) => {
    setIsDeleting(true);
    try {
      await fetch(`${API_URL}/servicios/${svc.slug}`, { method: "DELETE" });
      setDeleteSvc(null);
      const updated = await getServicios();
      setServicios(updated);
    } catch (err) {
      console.error("Error deleting servicio:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar currentPath="/admin/servicios" />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary/70">Gestión</p>
            <h1 className="mt-1 text-3xl font-semibold text-primary">Servicios</h1>
            <p className="mt-1 text-base text-foreground/70">Administra los servicios médicos de cada especialidad.</p>
          </div>

          <ServicioFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            especialidadFilter={especialidadFilter}
            onEspecialidadFilterChange={setEspecialidadFilter}
            especialidadOptions={especialidadOptions}
            onCreateNew={handleCreateNew}
          />

          <div className="flex items-center gap-6 text-xs text-foreground/50">
            <span><strong className="text-foreground">{servicios.length}</strong> servicios</span>
            <span className="h-1 w-1 rounded-full bg-foreground/20" aria-hidden="true" />
            <span><strong className="text-foreground">{especialidades.length}</strong> especialidades</span>
          </div>

          <ServiciosTable
            servicios={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </main>

      <ServicioForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingSvc(null); }}
        onSave={handleSave}
        initialData={editingSvc ? {
          slug: editingSvc.slug,
          nombre: editingSvc.nombre,
          descripcion: editingSvc.descripcion || "",
          precio: editingSvc.precio || 0,
          duracionMinutos: editingSvc.duracionMinutos || 30,
          activo: editingSvc.activo,
          orden: editingSvc.orden,
          especialidadSlug: editingSvc.especialidad?.slug || "",
        } : undefined}
        isSaving={isSaving}
        title={editingSvc ? `Editar: ${editingSvc.nombre}` : "Nuevo Servicio"}
        especialidadOptions={especialidadOptions}
      />

      <DeleteServicioDialog
        servicio={deleteSvc}
        isOpen={deleteSvc !== null}
        onClose={() => setDeleteSvc(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
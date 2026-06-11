"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import SpecialtyFilters from "@/features/specialties/components/SpecialtyFilters";
import SpecialtiesTable from "@/features/specialties/components/SpecialtiesTable";
import SpecialtyCard from "@/features/specialties/components/SpecialtyCard";
import SpecialtyForm from "@/features/specialties/components/SpecialtyForm";
import DeleteSpecialtyDialog from "@/features/specialties/components/DeleteSpecialtyDialog";
import {
  getEspecialidades,
  type EspecialidadDTO,
} from "@/services/especialidades.service";
import type { SpecialtyFormData } from "@/features/specialties/components/SpecialtyForm";
import { API_BASE_URL } from "@/lib/constants";

const API_URL = API_BASE_URL;

type ViewMode = "table" | "grid";

export default function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState<EspecialidadDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [formOpen, setFormOpen] = useState(false);
  const [editingEsp, setEditingEsp] = useState<EspecialidadDTO | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteEsp, setDeleteEsp] = useState<EspecialidadDTO | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getEspecialidades();
        if (mounted) setEspecialidades(data);
      } catch (err) {
        console.error("Error fetching especialidades:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = especialidades.filter((esp) => {
    const matchesSearch = esp.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleCreateNew = () => {
    setEditingEsp(null);
    setFormOpen(true);
  };

  const handleEdit = (esp: EspecialidadDTO) => {
    setEditingEsp(esp);
    setFormOpen(true);
  };

  const handleDelete = (esp: EspecialidadDTO) => {
    setDeleteEsp(esp);
  };

  const saveToApi = async (data: SpecialtyFormData, method: string, url: string) => {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al guardar");
  };

  const handleSaveForm = async (data: SpecialtyFormData) => {
    setIsSaving(true);
    try {
      const url = editingEsp
        ? `${API_URL}/especialidades/${editingEsp.slug}`
        : `${API_URL}/especialidades`;
      await saveToApi(data, editingEsp ? "PUT" : "POST", url);
      setFormOpen(false);
      setEditingEsp(null);
      const updated = await getEspecialidades();
      setEspecialidades(updated);
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async (esp: EspecialidadDTO) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_URL}/especialidades/${esp.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      setDeleteEsp(null);
      const refreshed = await getEspecialidades();
      setEspecialidades(refreshed);
    } catch (err) {
      console.error("Error deleting:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar currentPath="/admin/especialidades" />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary/70">
                Gestión
              </p>
              <h1 className="mt-1 text-3xl font-semibold text-primary">
                Especialidades
              </h1>
              <p className="mt-1 text-base text-foreground/70">
                Administra las especialidades médicas y sus servicios.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-primary/10 bg-white p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`rounded-lg p-2 transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
                aria-label="Vista tabla"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-2 transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
                aria-label="Vista cuadrícula"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 3h4v4H3V3zM10 3h4v4h-4V3zM17 3h4v4h-4V3zM3 10h4v4H3v-4zM10 10h4v4h-4v-4zM17 10h4v4h-4v-4zM3 17h4v4H3v-4zM10 17h4v4h-4v-4zM17 17h4v4h-4v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <SpecialtyFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onCreateNew={handleCreateNew}
          />

          <div className="flex items-center gap-6 text-xs text-foreground/50">
            <span>
              <strong className="text-foreground">{especialidades.length}</strong> especialidades
            </span>
            <span className="h-1 w-1 rounded-full bg-foreground/20" aria-hidden="true" />
            <span>
              <strong className="text-foreground">
                {especialidades.reduce((acc, e) => acc + (e.servicios?.length ?? 0), 0)}
              </strong>{" "}
              servicios
            </span>
          </div>

          {viewMode === "table" && (
            <SpecialtiesTable
              especialidades={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          )}

          {viewMode === "grid" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((esp) => (
                <SpecialtyCard
                  key={esp.id || esp.slug}
                  especialidad={esp}
                  variant="dashboard"
                  onClick={() => handleEdit(esp)}
                />
              ))}
            </div>
          )}

          {!isLoading && filtered.length === 0 && especialidades.length > 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-foreground/50">
                No se encontraron especialidades con &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
          )}
        </div>
      </main>

      <SpecialtyForm
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingEsp(null);
        }}
        onSave={handleSaveForm}
        initialData={
          editingEsp
            ? {
                nombre: editingEsp.nombre,
                slug: editingEsp.slug,
                icon: editingEsp.icon,
                color: editingEsp.color,
                imagen: editingEsp.imagen,
                activo: editingEsp.activo,
                orden: editingEsp.orden,
              }
            : undefined
        }
        isSaving={isSaving}
        title={editingEsp ? `Editar: ${editingEsp.nombre}` : "Nueva Especialidad"}
      />

      <DeleteSpecialtyDialog
        especialidad={deleteEsp}
        isOpen={deleteEsp !== null}
        onClose={() => setDeleteEsp(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { RotateCcw, Save } from "lucide-react";
import { useSiteConfig } from "@/features/configuraciones/site-config-context";
import HeaderConfig from "@/features/configuraciones/HeaderConfig";
import FooterConfig from "@/features/configuraciones/FooterConfig";

export default function ConfiguracionPage() {
  const { config, resetConfig, updateHeader, updateFooter } = useSiteConfig();
  const [savedMessage, setSavedMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateHeader(config.header),
        updateFooter(config.footer),
      ]);
      setSavedMessage("Cambios guardados correctamente.");
    } catch {
      setSavedMessage("Error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
    window.setTimeout(() => setSavedMessage(""), 2500);
  }, [config.header, config.footer, updateHeader, updateFooter]);

  const handleReset = () => {
    resetConfig();
    setSavedMessage("Configuración restaurada a valores por defecto.");
    window.setTimeout(() => setSavedMessage(""), 2500);
  };

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar currentPath="/admin/configuracion" />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 rounded-[2rem] border border-primary/10 bg-white/80 p-6 shadow-[0_12px_30px_rgba(1,21,90,0.05)] backdrop-blur md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary/70">
                Personalización
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                Editar Encabezado y Pie de página
              </h1>
              <p className="mt-3 text-base leading-7 text-foreground/70">
                Modifica los elementos del encabezado y pie de página del sitio web. Los cambios se
                reflejarán inmediatamente.
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/5"
              >
                <RotateCcw className="h-4 w-4" />
                Restablecer
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>

          {/* Success message */}
          {savedMessage && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <Save className="mr-2 inline h-4 w-4" />
              {savedMessage}
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-2">
            <HeaderConfig />
            <FooterConfig />
          </div>
        </div>
      </main>
    </div>
  );
}
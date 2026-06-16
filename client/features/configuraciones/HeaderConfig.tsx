"use client";

import { useRef, useState } from "react";
import { ImagePlus, Upload, ArrowUpDown } from "lucide-react";
import { useSiteConfig } from "@/features/configuraciones/site-config-context";
import { EditableNavList, SectionCard } from "@/features/configuraciones/config-ui";

export default function HeaderConfig() {
  const {
    config,
    updateHeader,
    updateHeaderNavItem,
    addHeaderNavItem,
    removeHeaderNavItem,
    moveHeaderNavItem,
  } = useSiteConfig();

  const headerLogoInputRef = useRef<HTMLInputElement>(null);
  const [headerLogoPreview, setHeaderLogoPreview] = useState<string | null>(null);

  const handleHeaderLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setHeaderLogoPreview(url);
    updateHeader({ logo: url });
  };

  return (
    <SectionCard
      title="Header — Encabezado"
      description="Configura el logo, los enlaces de navegación y el botón de llamada a la acción."
      icon={ArrowUpDown}
    >
      <div className="space-y-5">
        {/* Logo */}
        <div className="rounded-2xl border border-dashed border-primary/20 bg-light/60 p-4 transition-colors hover:bg-white">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <ImagePlus className="h-4 w-4" />
            Logo del Header
          </div>
          <p className="mt-1 text-xs text-foreground/60">
            Ruta actual: <code className="rounded bg-primary/5 px-1.5 py-0.5 font-mono text-xs">{config.header.logo}</code>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">
              <Upload className="h-4 w-4" />
              Subir logo
              <input
                ref={headerLogoInputRef}
                type="file"
                accept="image/*"
                onChange={handleHeaderLogoChange}
                className="hidden"
              />
            </label>
            {headerLogoPreview && (
              <img
                src={headerLogoPreview}
                alt="Vista previa"
                className="h-10 w-auto rounded-lg border border-primary/10 bg-white object-contain p-1"
              />
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Texto del botón CTA</span>
            <input
              value={config.header.ctaText}
              onChange={(e) => updateHeader({ ctaText: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Enlace del botón CTA</span>
            <input
              value={config.header.ctaLink}
              onChange={(e) => updateHeader({ ctaLink: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
        </div>

        {/* Nav items */}
        <EditableNavList
          items={config.header.navItems}
          onUpdate={updateHeaderNavItem}
          onAdd={addHeaderNavItem}
          onRemove={removeHeaderNavItem}
          onReorder={moveHeaderNavItem}
          title="Enlaces de navegación"
        />
      </div>
    </SectionCard>
  );
}
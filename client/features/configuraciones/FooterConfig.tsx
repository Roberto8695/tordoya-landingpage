"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Plus, Trash2, ImagePlus, Upload, ArrowUpDown } from "lucide-react";
import { useSiteConfig } from "@/features/configuraciones/site-config-context";
import { EditableNavList, SectionCard } from "@/features/configuraciones/config-ui";

export default function FooterConfig() {
  const {
    config,
    updateFooter,
    updateFooterNavItem,
    addFooterNavItem,
    removeFooterNavItem,
    moveFooterNavItem,
    addFooterTag,
    removeFooterTag,
    updateFooterTag,
  } = useSiteConfig();

  const footerLogoInputRef = useRef<HTMLInputElement>(null);
  const [footerLogoPreview, setFooterLogoPreview] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");

  const handleFooterLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFooterLogoPreview(url);
    updateFooter({ logo: url });
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (!tag) return;
    addFooterTag(tag);
    setNewTag("");
  };

  return (
    <SectionCard
      title="Footer — Pie de página"
      description="Configura la información institucional, contacto, enlaces y derechos."
      icon={ArrowUpDown}
    >
      <div className="space-y-5">
        {/* Logo */}
        <div className="rounded-2xl border border-dashed border-primary/20 bg-light/60 p-4 transition-colors hover:bg-white">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <ImagePlus className="h-4 w-4" />
            Logo del Footer
          </div>
          <p className="mt-1 text-xs text-foreground/60">
            Ruta actual: <code className="rounded bg-primary/5 px-1.5 py-0.5 font-mono text-xs">{config.footer.logo}</code>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">
              <Upload className="h-4 w-4" />
              Subir logo
              <input
                ref={footerLogoInputRef}
                type="file"
                accept="image/*"
                onChange={handleFooterLogoChange}
                className="hidden"
              />
            </label>
            {footerLogoPreview && (
              <Image
                src={footerLogoPreview}
                alt="Vista previa"
                width={180}
                height={40}
                className="h-10 w-auto rounded-lg border border-primary/10 bg-white object-contain p-1"
              />
            )}
          </div>
        </div>

        {/* Description */}
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground/80">Descripción</span>
          <textarea
            value={config.footer.description}
            onChange={(e) => updateFooter({ description: e.target.value })}
            rows={3}
            className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
          />
        </label>

        {/* Contact */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground/80">Información de contacto</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs text-foreground/60">Dirección</span>
              <input
                value={config.footer.contact.address}
                onChange={(e) =>
                  updateFooter({
                    contact: { ...config.footer.contact, address: e.target.value },
                  })
                }
                className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs text-foreground/60">Teléfono</span>
              <input
                value={config.footer.contact.phone}
                onChange={(e) =>
                  updateFooter({
                    contact: { ...config.footer.contact, phone: e.target.value },
                  })
                }
                className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-xs text-foreground/60">Correo electrónico</span>
              <input
                value={config.footer.contact.email}
                onChange={(e) =>
                  updateFooter({
                    contact: { ...config.footer.contact, email: e.target.value },
                  })
                }
                className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
            </label>
          </div>
        </div>

        {/* Redes Sociales */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground/80">Redes Sociales</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-xs text-foreground/60">
                <FaFacebook className="h-4 w-4 text-[#1877F2]" />
                Facebook URL
              </span>
              <input
                value={config.footer.facebookUrl}
                onChange={(e) => updateFooter({ facebookUrl: e.target.value })}
                className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
            </label>
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-xs text-foreground/60">
                <FaInstagram className="h-4 w-4 text-[#E4405F]" />
                Instagram URL
              </span>
              <input
                value={config.footer.instagramUrl}
                onChange={(e) => updateFooter({ instagramUrl: e.target.value })}
                className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
            </label>
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-xs text-foreground/60">
                <FaTiktok className="h-4 w-4 text-black" />
                TikTok URL
              </span>
              <input
                value={config.footer.tiktokUrl}
                onChange={(e) => updateFooter({ tiktokUrl: e.target.value })}
                className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
            </label>
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground/80">Etiquetas (tags)</p>
          <div className="flex flex-wrap gap-2">
            {config.footer.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
              >
                <input
                  value={tag}
                  onChange={(e) => updateFooterTag(index, e.target.value)}
                  className="max-w-[140px] bg-transparent text-center text-xs text-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeFooterTag(index)}
                  className="text-primary/50 hover:text-rose-600"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Nueva etiqueta..."
              className="flex-1 rounded-2xl border border-primary/15 bg-white px-4 py-2.5 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
            >
              <Plus className="h-4 w-4" />
              Añadir
            </button>
          </div>
        </div>

        {/* Nav items */}
        <EditableNavList
          items={config.footer.navItems}
          onUpdate={updateFooterNavItem}
          onAdd={addFooterNavItem}
          onRemove={removeFooterNavItem}
          onReorder={moveFooterNavItem}
          title="Enlaces del footer"
        />

        {/* Copyright */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">
              Texto de copyright
            </span>
            <p className="text-[11px] text-foreground/50">
              Usa {"{year}"} para que se reemplace automáticamente.
            </p>
            <input
              value={config.footer.copyrightText}
              onChange={(e) => updateFooter({ copyrightText: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Subtexto</span>
            <input
              value={config.footer.copyrightSubtext}
              onChange={(e) => updateFooter({ copyrightSubtext: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
        </div>
      </div>
    </SectionCard>
  );
}
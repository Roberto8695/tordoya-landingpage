"use client";

import {
  Users, HeartHandshake, Eye, Lightbulb, Sparkles,
  ShieldCheck, BadgeCheck, Globe, Hand, ClipboardList, Star, Heart,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SectionCard } from "@/features/configuraciones/config-ui";
import { useNosotros } from "@/features/nosotros/nosotros-context";
import ValorList from "@/features/nosotros/components/ValorList";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  HiSparkles: Sparkles,
  HiOutlineEye: Eye,
  HiOutlineLightBulb: Lightbulb,
  HiOutlineHeart: Heart,
  HiOutlineStar: Star,
  HiOutlineShieldCheck: ShieldCheck,
  HiOutlineBadgeCheck: BadgeCheck,
  HiOutlineGlobe: Globe,
  HiOutlineHand: Hand,
  HiOutlineClipboardList: ClipboardList,
};

const iconLabels: Record<string, string> = {
  Sparkles: "Destellos",
  Eye: "Visión",
  LightBulb: "Innovación",
  Heart: "Compromiso",
  Star: "Excelencia",
  Shield: "Confianza",
  Badge: "Calidad",
  Globe: "Cobertura",
  Hand: "Servicio",
  Clipboard: "Gestión",
};

const iconOptions = [
  { value: "HiSparkles", label: "Sparkles" },
  { value: "HiOutlineEye", label: "Eye" },
  { value: "HiOutlineLightBulb", label: "LightBulb" },
  { value: "HiOutlineHeart", label: "Heart" },
  { value: "HiOutlineStar", label: "Star" },
  { value: "HiOutlineShieldCheck", label: "Shield" },
  { value: "HiOutlineBadgeCheck", label: "Badge" },
  { value: "HiOutlineGlobe", label: "Globe" },
  { value: "HiOutlineHand", label: "Hand" },
  { value: "HiOutlineClipboardList", label: "Clipboard" },
];

function IconSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = iconOptions.find((o) => o.value === value);
  const SelectedIcon = selected ? iconMap[selected.value] : null;
  const displayLabel = selected ? iconLabels[selected.label] ?? selected.label : "Seleccionar";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
      >
        {SelectedIcon && <SelectedIcon className="h-4 w-4 text-primary" />}
        <span className="flex-1 text-left">{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 text-foreground/40 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-2xl border border-primary/10 bg-white py-1 shadow-lg">
          {iconOptions.map((opt) => {
            const Icon = iconMap[opt.value];
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition hover:bg-primary/5 ${
                  opt.value === value ? "bg-primary/10 font-semibold text-primary" : "text-foreground"
                }`}
              >
                {Icon && <Icon className="h-4 w-4 text-primary" />}
                <span>{iconLabels[opt.label] ?? opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function NosotrosConfig() {
  const {
    config,
    updateConfig,
    updateValor,
    addValor,
    removeValor,
    reorderValor,
  } = useNosotros();

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Sección principal */}
      <SectionCard
        title="Sección Principal"
        description="Título y descripción general de la sección Quiénes somos."
        icon={Users}
      >
        <div className="space-y-5">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Título</span>
            <input
              value={config.titulo}
              onChange={(e) => updateConfig({ titulo: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Descripción</span>
            <textarea
              value={config.descripcion}
              onChange={(e) => updateConfig({ descripcion: e.target.value })}
              rows={4}
              className="w-full resize-y rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
        </div>
      </SectionCard>

      {/* Misión */}
      <SectionCard
        title="Misión"
        description="Configura el contenido de la tarjeta de Misión."
        icon={Lightbulb}
      >
        <div className="space-y-5">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Título</span>
            <input
              value={config.misionTitulo}
              onChange={(e) => updateConfig({ misionTitulo: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Descripción</span>
            <textarea
              value={config.misionDescripcion}
              onChange={(e) => updateConfig({ misionDescripcion: e.target.value })}
              rows={4}
              className="w-full resize-y rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Icono</span>
            <IconSelect
              value={config.misionIcono}
              onChange={(value) => updateConfig({ misionIcono: value })}
            />
          </label>
        </div>
      </SectionCard>

      {/* Visión */}
      <SectionCard
        title="Visión"
        description="Configura el contenido de la tarjeta de Visión."
        icon={Eye}
      >
        <div className="space-y-5">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Título</span>
            <input
              value={config.visionTitulo}
              onChange={(e) => updateConfig({ visionTitulo: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Descripción</span>
            <textarea
              value={config.visionDescripcion}
              onChange={(e) => updateConfig({ visionDescripcion: e.target.value })}
              rows={4}
              className="w-full resize-y rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Icono</span>
            <IconSelect
              value={config.visionIcono}
              onChange={(value) => updateConfig({ visionIcono: value })}
            />
          </label>
        </div>
      </SectionCard>

      {/* Valores */}
      <SectionCard
        title="Valores"
        description="Configura el título, descripción y la lista de valores."
        icon={HeartHandshake}
      >
        <div className="space-y-5">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Título de la sección</span>
            <input
              value={config.valoresTitulo}
              onChange={(e) => updateConfig({ valoresTitulo: e.target.value })}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">Descripción</span>
            <textarea
              value={config.valoresDescripcion}
              onChange={(e) => updateConfig({ valoresDescripcion: e.target.value })}
              rows={3}
              className="w-full resize-y rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
            />
          </label>

          <ValorList
            items={config.valores}
            onUpdate={updateValor}
            onAdd={addValor}
            onRemove={removeValor}
            onReorder={reorderValor}
            title="Lista de valores"
          />
        </div>
      </SectionCard>
    </div>
  );
}
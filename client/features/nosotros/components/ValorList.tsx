"use client";

import {
  Plus, Trash2, GripVertical, ChevronDown,
  Sparkles, Eye, Lightbulb, Heart, Star,
  ShieldCheck, BadgeCheck, Globe, Hand, ClipboardList,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Valor } from "@/features/nosotros/nosotros-context";

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

function IconPicker({
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

  const SelectedIcon = iconMap[value];

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary transition hover:bg-primary/5 hover:border-primary/30"
      >
        {SelectedIcon ? <SelectedIcon className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-foreground/40" />}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-2xl border border-primary/10 bg-white p-1.5 shadow-lg">
          <div className="grid grid-cols-5 gap-1">
            {iconOptions.map((opt) => {
              const Icon = iconMap[opt.value];
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-center rounded-xl p-2 transition ${
                    isActive
                      ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                      : "text-foreground/60 hover:bg-primary/5 hover:text-primary"
                  }`}
                  title={opt.label}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ValorList({
  items,
  onUpdate,
  onAdd,
  onRemove,
  onReorder,
  title,
}: {
  items: Valor[];
  onUpdate: (index: number, item: Partial<Valor>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  title: string;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIndex(index);
  };

  const handleDragLeave = () => {
    setOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== index) {
      onReorder(dragIndex, index);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground/80">{title}</p>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20"
        >
          <Plus className="h-3.5 w-3.5" />
          Añadir
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => {
          const isDragging = dragIndex === index;
          const isOver = overIndex === index && dragIndex !== index;

          return (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 rounded-2xl border px-3 py-2 shadow-sm transition-all duration-150 ${
                isDragging
                  ? "border-primary/40 bg-primary/5 opacity-50 shadow-md"
                  : isOver
                    ? "border-primary/50 bg-primary/10 -translate-y-0.5"
                    : "border-primary/10 bg-light/60"
              }`}
            >
              <span className="cursor-grab active:cursor-grabbing">
                <GripVertical className="h-4 w-4 shrink-0 text-foreground/30" />
              </span>
              <IconPicker
                value={item.icono}
                onChange={(value) => onUpdate(index, { icono: value })}
              />
              <input
                value={item.titulo}
                onChange={(e) => onUpdate(index, { titulo: e.target.value })}
                placeholder="Título"
                className="min-w-0 flex-1 rounded-xl border border-primary/10 bg-white px-3 py-2 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
              <input
                value={item.subtitulo}
                onChange={(e) => onUpdate(index, { subtitulo: e.target.value })}
                placeholder="Subtítulo"
                className="min-w-0 flex-1 rounded-xl border border-primary/10 bg-white px-3 py-2 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-rose-500 transition hover:bg-rose-50 hover:text-rose-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
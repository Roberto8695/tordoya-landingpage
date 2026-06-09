"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";

export function EditableNavList({
  items,
  onUpdate,
  onAdd,
  onRemove,
  onReorder,
  title,
}: {
  items: { label: string; href: string }[];
  onUpdate: (index: number, item: Partial<{ label: string; href: string }>) => void;
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
              <input
                value={item.label}
                onChange={(e) => onUpdate(index, { label: e.target.value })}
                placeholder="Etiqueta"
                className="min-w-0 flex-1 rounded-xl border border-primary/10 bg-white px-3 py-2 text-sm text-foreground outline-none ring-primary/20 transition focus:ring"
              />
              <input
                value={item.href}
                onChange={(e) => onUpdate(index, { href: e.target.value })}
                placeholder="Enlace"
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

export function SectionCard({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.5rem] border border-primary/10 bg-white p-6 shadow-[0_10px_30px_rgba(1,21,90,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(1,21,90,0.1)] ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          <p className="mt-1 text-sm text-foreground/60">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
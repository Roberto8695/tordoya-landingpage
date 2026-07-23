"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { type BannerData } from "./BannerPreview";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

interface BannerSortableListProps {
  banners: BannerData[];
  onChange: (banners: BannerData[]) => void;
  onEdit: (banner: BannerData) => void;
  className?: string;
}

export default function BannerSortableList({
  banners,
  onChange,
  onEdit,
  className,
}: BannerSortableListProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  const sorted = [...banners].sort((a, b) => a.order - b.order);

  const handleDragStart = useCallback((index: number) => {
    dragItem.current = index;
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragItem.current !== index) {
      setOverIndex(index);
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragItem.current !== null && overIndex !== null && dragItem.current !== overIndex) {
      const reordered = [...sorted];
      const [moved] = reordered.splice(dragItem.current, 1);
      reordered.splice(overIndex, 0, moved);
      const updated = reordered.map((b, i) => ({ ...b, order: i }));
      onChange(updated);
    }
    setDragIndex(null);
    setOverIndex(null);
    dragItem.current = null;
  }, [sorted, overIndex, onChange]);

  const sortedActive = sorted.filter((b) => b.active);
  const sortedInactive = sorted.filter((b) => !b.active);

  return (
    <div className={cn("space-y-3", className)}>
      {sortedActive.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success/70">
            Activos ({sortedActive.length})
          </p>
          <div className="space-y-2">
            {sortedActive.map((banner, index) => (
              <SortableItem
                key={banner.id}
                banner={banner}
                index={index}
                isDragging={dragIndex === index}
                isOver={overIndex === index}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onClick={() => onEdit(banner)}
              />
            ))}
          </div>
        </div>
      )}

      {sortedInactive.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/40">
            Inactivos ({sortedInactive.length})
          </p>
          <div className="space-y-2">
            {sortedInactive.map((banner, index) => {
              const actualIndex = sortedActive.length + index;
              return (
                <SortableItem
                  key={banner.id}
                  banner={banner}
                  index={actualIndex}
                  isDragging={dragIndex === actualIndex}
                  isOver={overIndex === actualIndex}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onClick={() => onEdit(banner)}
                  inactive
                />
              );
            })}
          </div>
        </div>
      )}

      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/10 px-6 py-10">
          <svg className="mb-3 h-8 w-8 text-foreground/30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM4 21a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm font-medium text-foreground/40">
            No hay slides
          </p>
          <p className="mt-1 text-xs text-foreground/30">
            Arrastra o crea un nuevo slide para empezar
          </p>
        </div>
      )}
    </div>
  );
}

interface SortableItemProps {
  banner: BannerData;
  index: number;
  isDragging: boolean;
  isOver: boolean;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onClick: () => void;
  inactive?: boolean;
}

function SortableItem({
  banner,
  index,
  isDragging,
  isOver,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
  inactive = false,
}: SortableItemProps) {
  return (
    <MotionDiv
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isDragging ? 1.02 : 1,
        borderColor: isOver ? "var(--color-accent)" : undefined,
      }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "group flex cursor-grab items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm transition-all duration-200",
        isDragging
          ? "border-accent shadow-lg shadow-accent/10 opacity-90 cursor-grabbing"
          : isOver
          ? "border-accent/50 bg-accent/5"
          : inactive
          ? "border-primary/5 opacity-60 hover:opacity-90"
          : "border-primary/10 hover:border-primary/20 hover:shadow-md"
      )}
    >
      <div className="flex shrink-0 items-center justify-center text-foreground/20 group-hover:text-foreground/40 transition-colors duration-200">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 6h.01M12 6h.01M16 6h.01M8 12h.01M12 12h.01M16 12h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
          banner.active
            ? "bg-accent/10 text-accent"
            : "bg-foreground/5 text-foreground/40"
        )}>
          {index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <p className={cn(
            "truncate text-sm font-medium",
            banner.active ? "text-foreground" : "text-foreground/50"
          )}>
            {banner.title || "Slide sin título"}
          </p>
          <p className="truncate text-xs text-foreground/40">
            {banner.badge || "Sin badge"}
          </p>
        </div>
      </div>

      {isOver && (
        <div className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-accent" />
      )}
    </MotionDiv>
  );
}

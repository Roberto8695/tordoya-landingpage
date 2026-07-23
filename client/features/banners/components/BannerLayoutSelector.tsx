"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { type BannerLayout } from "./BannerPreview";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

interface LayoutOption {
  value: BannerLayout;
  label: string;
  description: string;
}

const layouts: LayoutOption[] = [
  {
    value: "text-left-image-right",
    label: "Texto izquierda",
    description: "Imagen derecha",
  },
  {
    value: "image-left-text-right",
    label: "Imagen izquierda",
    description: "Texto derecha",
  },
  {
    value: "text-centered",
    label: "Texto centrado",
    description: "Imagen de fondo",
  },
  {
    value: "content-bottom",
    label: "Contenido inferior",
    description: "Imagen de fondo",
  },
];

interface LayoutThumbnailProps {
  layout: BannerLayout;
  selected: boolean;
}

function LayoutThumbnail({ layout, selected }: LayoutThumbnailProps) {
  const cell = (className: string, dark: boolean) => (
    <div className={cn(
      "rounded-sm transition-all duration-200",
      dark ? "bg-primary" : "bg-primary/20",
      selected ? "bg-accent" : "",
      className
    )} />
  );

  switch (layout) {
    case "text-left-image-right":
      return (
        <div className="flex h-10 items-center gap-1.5 px-2">
          <div className="flex flex-1 flex-col gap-1">
            {cell("h-1.5 w-8 rounded-full", false)}
            {cell("h-2 w-12 rounded-sm", true)}
            <div className="flex gap-0.5">
              {cell("h-1 w-2 rounded-full", false)}
              {cell("h-1 w-2 rounded-full", false)}
            </div>
          </div>
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/30">
            <svg className="h-4 w-4 text-white/60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      );
    case "image-left-text-right":
      return (
        <div className="flex h-10 items-center gap-1.5 px-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/30">
            <svg className="h-4 w-4 text-white/60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="flex flex-1 flex-col items-end gap-1">
            {cell("h-1.5 w-8 rounded-full", false)}
            {cell("h-2 w-12 rounded-sm", true)}
            <div className="flex gap-0.5">
              {cell("h-1 w-2 rounded-full", false)}
              {cell("h-1 w-2 rounded-full", false)}
            </div>
          </div>
        </div>
      );
    case "text-centered":
      return (
        <div className="flex h-10 items-center justify-center px-2">
          <div className="flex flex-col items-center gap-1">
            {cell("h-1.5 w-6 rounded-full", false)}
            {cell("h-2 w-10 rounded-sm", true)}
            <div className="flex gap-0.5">
              {cell("h-1 w-2 rounded-full", false)}
              {cell("h-1 w-2 rounded-full", false)}
            </div>
          </div>
        </div>
      );
    case "content-bottom":
      return (
        <div className="flex h-10 flex-col justify-end px-2 pb-1.5">
          <div className="flex flex-col items-center gap-0.5">
            {cell("h-1.5 w-6 rounded-full", false)}
            {cell("h-2 w-10 rounded-sm", true)}
            <div className="flex gap-0.5">
              {cell("h-1 w-2 rounded-full", false)}
              {cell("h-1 w-2 rounded-full", false)}
            </div>
          </div>
        </div>
      );
  }
}

interface BannerLayoutSelectorProps {
  value: BannerLayout;
  onChange: (layout: BannerLayout) => void;
}

export default function BannerLayoutSelector({ value, onChange }: BannerLayoutSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {layouts.map((layout) => {
        const selected = value === layout.value;

        return (
          <MotionDiv
            key={layout.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(layout.value)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200",
              selected
                ? "border-accent ring-2 ring-accent/20 bg-accent/5 shadow-lg shadow-accent/10"
                : "border-primary/10 hover:border-primary/30 bg-white hover:shadow-md"
            )}
          >
            <div className={cn(
              "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5",
              selected && "from-accent/10 via-accent/5 to-accent/10"
            )}>
              <LayoutThumbnail layout={layout.value} selected={selected} />
            </div>

            <div className="border-t border-primary/5 px-2.5 py-2">
              <p className="text-xs font-semibold text-foreground/80">
                {layout.label}
              </p>
              <p className="text-[10px] text-foreground/50">
                {layout.description}
              </p>
            </div>

            {selected && (
              <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent shadow-sm">
                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </MotionDiv>
        );
      })}
    </div>
  );
}

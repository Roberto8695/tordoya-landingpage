"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { THEME_CONFIG, type BannerTheme } from "./BannerPreview";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

const themeKeys: BannerTheme[] = ["corporate", "dark-blue", "light-blue", "dark", "light"];

interface BannerThemeSelectorProps {
  value: BannerTheme;
  onChange: (theme: BannerTheme) => void;
}

export default function BannerThemeSelector({ value, onChange }: BannerThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {themeKeys.map((key) => {
        const theme = THEME_CONFIG[key];
        const selected = value === key;
        const isLight = key === "light";

        return (
          <MotionDiv
            key={key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(key)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200",
              selected
                ? "border-accent ring-2 ring-accent/20 shadow-lg shadow-accent/10"
                : "border-primary/10 hover:border-primary/30 hover:shadow-md"
            )}
          >
            <div className="h-20 w-full" style={{ background: theme.background }}>
              <div className="flex h-full items-end p-2.5">
                <div className="flex w-full flex-col gap-1.5">
                  <span className={cn(
                    "self-start rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider",
                    theme.previewBadge,
                    isLight ? "text-primary" : "text-white"
                  )}>
                    badge
                  </span>
                  <span className={cn(
                    "block text-xs font-bold leading-tight",
                    isLight ? "text-gray-900" : "text-white"
                  )}>
                    Título
                  </span>
                  <div className="flex gap-1">
                    <span className={cn(
                      "h-1 w-3 rounded-full",
                      isLight ? "bg-gray-400" : "bg-white/40"
                    )} />
                    <span className={cn(
                      "h-1 w-3 rounded-full",
                      isLight ? "bg-gray-400" : "bg-white/40"
                    )} />
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(
              "px-2.5 py-2 text-center border-t",
              selected ? "bg-accent/5 border-accent/10" : "bg-white border-primary/5"
            )}>
              <span className={cn(
                "text-xs font-semibold",
                selected ? "text-accent" : "text-foreground/70"
              )}>
                {theme.label}
              </span>
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

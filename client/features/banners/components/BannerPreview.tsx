"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/constants";

export type CtaStyle = "primary" | "secondary" | "ghost" | "outline";

export interface BannerCTA {
  label: string;
  href: string;
  style: CtaStyle;
}

export interface BannerBullet {
  id: string;
  text: string;
}

export type BannerTheme =
  | "corporate"
  | "dark-blue"
  | "light-blue"
  | "dark"
  | "light";

export type BannerLayout =
  | "text-left-image-right"
  | "image-left-text-right"
  | "text-centered"
  | "content-bottom";

export interface BannerData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: BannerBullet[];
  cta1: BannerCTA;
  cta2: BannerCTA | null;
  imageDesktop: string;
  imageMobile: string;
  theme: BannerTheme;
  layout: BannerLayout;
  active: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export const THEME_CONFIG: Record<BannerTheme, {
  label: string;
  background: string;
  badgeBg: string;
  textColor: string;
  mutedColor: string;
  accentClass: string;
  overlay: string;
  previewBadge: string;
  previewTitle: string;
  previewMuted: string;
}> = {
  corporate: {
    label: "Corporativo",
    background: "linear-gradient(135deg, #01155a, #0a2a7a, #155bb3)",
    badgeBg: "bg-white/15",
    textColor: "text-white",
    mutedColor: "text-white/70",
    accentClass: "bg-accent text-primary",
    overlay: "linear-gradient(90deg, rgba(1,21,90,0.8), rgba(1,21,90,0.4), transparent)",
    previewBadge: "bg-white/20",
    previewTitle: "text-white",
    previewMuted: "text-white/50",
  },
  "dark-blue": {
    label: "Azul Oscuro",
    background: "linear-gradient(135deg, #01155a, #01155a, #0a2a7a)",
    badgeBg: "bg-white/15",
    textColor: "text-white",
    mutedColor: "text-white/70",
    accentClass: "bg-accent text-primary",
    overlay: "linear-gradient(90deg, rgba(1,21,90,0.9), rgba(1,21,90,0.5), transparent)",
    previewBadge: "bg-white/20",
    previewTitle: "text-white",
    previewMuted: "text-white/50",
  },
  "light-blue": {
    label: "Azul Claro",
    background: "linear-gradient(135deg, #155bb3, #1a6dc4, #00b7fa)",
    badgeBg: "bg-white/15",
    textColor: "text-white",
    mutedColor: "text-white/70",
    accentClass: "bg-primary text-white",
    overlay: "linear-gradient(90deg, rgba(21,91,179,0.8), rgba(21,91,179,0.4), transparent)",
    previewBadge: "bg-white/20",
    previewTitle: "text-white",
    previewMuted: "text-white/50",
  },
  dark: {
    label: "Oscuro",
    background: "linear-gradient(135deg, #1A1A2E, #16213e, #0f3460)",
    badgeBg: "bg-white/10",
    textColor: "text-white",
    mutedColor: "text-white/70",
    accentClass: "bg-accent text-primary",
    overlay: "linear-gradient(90deg, rgba(26,26,46,0.9), rgba(26,26,46,0.5), transparent)",
    previewBadge: "bg-white/20",
    previewTitle: "text-white",
    previewMuted: "text-white/50",
  },
  light: {
    label: "Claro",
    background: "linear-gradient(135deg, #F8F9FA, #e9ecef, #dee2d6)",
    badgeBg: "bg-primary/10",
    textColor: "text-gray-900",
    mutedColor: "text-gray-500",
    accentClass: "bg-primary text-white",
    overlay: "linear-gradient(90deg, rgba(248,249,250,0.8), rgba(248,249,250,0.2), transparent)",
    previewBadge: "bg-primary/15",
    previewTitle: "text-gray-900",
    previewMuted: "text-gray-400",
  },
};

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

const MotionSpan = motion.span as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement> & MotionProps>
>;

const MotionH2 = motion.h2 as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement> & MotionProps>
>;

const MotionP = motion.p as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement> & MotionProps>
>;

const DARK_STYLES: Record<CtaStyle, string> = {
  primary: "bg-primary text-white shadow-md hover:bg-secondary",
  secondary: "bg-accent text-primary shadow-md hover:brightness-110",
  ghost: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
  outline: "border-2 border-white text-white hover:bg-white hover:text-primary",
};

const LIGHT_STYLES: Record<CtaStyle, string> = {
  primary: "bg-primary text-white shadow-md hover:bg-secondary",
  secondary: "bg-accent text-white shadow-md hover:brightness-110",
  ghost: "bg-primary/5 text-gray-700 border border-primary/20 hover:bg-primary/10 backdrop-blur-sm",
  outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
};

interface BannerPreviewProps {
  banner: BannerData;
  compact?: boolean;
  className?: string;
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE_URL}${path}`;
  return path;
}

export default function BannerPreview({ banner, compact = false, className }: BannerPreviewProps) {
  const theme = THEME_CONFIG[banner.theme] ?? THEME_CONFIG.corporate;
  const isLight = banner.theme === "light";
  const buttonStyles = isLight ? LIGHT_STYLES : DARK_STYLES;
  const hasImage = banner.imageDesktop || banner.imageMobile;

  const content = (
    <div className="relative h-full w-full overflow-hidden" style={{ background: theme.background }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      {hasImage && (banner.layout === "text-centered" || banner.layout === "content-bottom") && (
        <div className="absolute inset-0 opacity-30">
          <Image
            src={getImageUrl(banner.imageDesktop)}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className={cn(
        "relative z-10 mx-auto flex h-full",
        compact ? "px-3 py-4" : "px-4 py-6 sm:px-8",
        banner.layout === "text-centered" && "flex-col items-center justify-center text-center",
        banner.layout === "content-bottom" && "flex-col items-center justify-end text-center pb-4",
        banner.layout === "text-left-image-right" && "flex-row items-center justify-between gap-4",
        banner.layout === "image-left-text-right" && "flex-row-reverse items-center justify-between gap-4",
      )}>
        <div className={cn(
          banner.layout === "text-left-image-right" || banner.layout === "image-left-text-right"
            ? "flex-1 min-w-0"
            : "w-full max-w-lg"
        )}>
          {banner.badge && (
            <MotionSpan
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                theme.badgeBg,
                theme.textColor,
                compact ? "mb-2" : "mb-3"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(0,183,250,0.5)]" />
              {banner.badge}
            </MotionSpan>
          )}

          <MotionH2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={cn(
              "font-bold leading-tight",
              theme.textColor,
              compact
                ? "text-sm"
                : "text-lg sm:text-xl md:text-2xl"
            )}
          >
            {banner.title || "Título del slide"}
          </MotionH2>

          {banner.subtitle && (
            <MotionP
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={cn(
                theme.mutedColor,
                compact ? "mt-1 text-[10px]" : "mt-1.5 text-xs sm:text-sm"
              )}
            >
              {banner.subtitle}
            </MotionP>
          )}

          {banner.description && !compact && (
            <MotionP
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
               className={cn("mt-1.5 text-xs leading-relaxed line-clamp-2", theme.mutedColor)}
            >
              {banner.description}
            </MotionP>
          )}

          {banner.bullets.length > 0 && !compact && (
            <MotionDiv
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="mt-2 space-y-1"
            >
              {banner.bullets.slice(0, 3).map((bullet) => (
                <div key={bullet.id} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(0,183,250,0.4)]" />
                  <span className={cn("text-[11px]", theme.mutedColor)}>
                    {bullet.text}
                  </span>
                </div>
              ))}
            </MotionDiv>
          )}

          <MotionDiv
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className={cn("flex flex-wrap gap-2", compact ? "mt-2" : "mt-3")}
          >
            <span className={cn(
              "inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all",
              buttonStyles[banner.cta1.style],
              compact && "px-2 py-1 text-[9px]"
            )}>
              {banner.cta1.label || "CTA Principal"}
            </span>
            {banner.cta2 && (
              <span className={cn(
                "inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all",
                buttonStyles[banner.cta2.style],
                compact && "px-2 py-1 text-[9px]"
              )}>
                {banner.cta2.label || "CTA Secundario"}
              </span>
            )}
          </MotionDiv>
        </div>

        {(banner.layout === "text-left-image-right" || banner.layout === "image-left-text-right") && hasImage && (
          <div className={cn(
            "relative shrink-0",
            compact ? "h-16 w-16" : "h-20 w-20 sm:h-28 sm:w-28"
          )}>
            <Image
              src={getImageUrl(banner.imageDesktop)}
              alt=""
              fill
              className="object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className={cn("h-32 w-full overflow-hidden rounded-lg shadow-sm", className)}>
        {content}
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full overflow-hidden rounded-xl shadow-lg",
      "aspect-[21/9] min-h-[420px] max-h-[400px]",
      className
    )}>
      {content}
    </div>
  );
}

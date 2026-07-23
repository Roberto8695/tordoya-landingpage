import { API_BASE_URL } from "@/lib/constants";
import type { BannerData, BannerBullet, BannerCTA } from "@/features/banners/components/BannerPreview";

interface BannerSlideDTO {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string;
  cta1: string;
  cta2: string | null;
  imageDesktop: string;
  imageMobile: string;
  theme: string;
  layout: string;
  active: boolean;
  orden: number;
  createdAt: string;
  updatedAt: string;
}

function parseJsonField<T>(val: string | null | undefined, fallback: T): T {
  if (!val) return fallback;
  try { return JSON.parse(val) as T; } catch { return fallback; }
}

function toDTO(banner: BannerData): Record<string, unknown> {
  return {
    badge: banner.badge,
    title: banner.title,
    subtitle: banner.subtitle,
    description: banner.description,
    bullets: JSON.stringify(banner.bullets),
    cta1: JSON.stringify(banner.cta1),
    cta2: banner.cta2 ? JSON.stringify(banner.cta2) : null,
    imageDesktop: banner.imageDesktop,
    imageMobile: banner.imageMobile,
    theme: banner.theme,
    layout: banner.layout,
    active: banner.active,
    orden: banner.order,
  };
}

function fromDTO(dto: BannerSlideDTO): BannerData {
  return {
    id: dto.id,
    badge: dto.badge,
    title: dto.title,
    subtitle: dto.subtitle,
    description: dto.description,
    bullets: parseJsonField<BannerBullet[]>(dto.bullets, []),
    cta1: parseJsonField<BannerCTA>(dto.cta1, { label: "", href: "#", style: "primary" }),
    cta2: dto.cta2 ? parseJsonField<BannerCTA | null>(dto.cta2, null) : null,
    imageDesktop: dto.imageDesktop,
    imageMobile: dto.imageMobile,
    theme: dto.theme as BannerData["theme"],
    layout: dto.layout as BannerData["layout"],
    active: dto.active,
    order: dto.orden,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export async function fetchBanners(): Promise<BannerData[]> {
  const res = await fetch(`${API_BASE_URL}/banners`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  const data = (await res.json()) as BannerSlideDTO[];
  return data.map(fromDTO);
}

export async function createBanner(banner: BannerData): Promise<BannerData> {
  const res = await fetch(`${API_BASE_URL}/banners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDTO(banner)),
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return fromDTO((await res.json()) as BannerSlideDTO);
}

export async function updateBanner(banner: BannerData): Promise<BannerData> {
  const res = await fetch(`${API_BASE_URL}/banners/${banner.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toDTO(banner)),
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return fromDTO((await res.json()) as BannerSlideDTO);
}

export async function deleteBanner(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/banners/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
}

export async function reorderBanners(ids: string[]): Promise<BannerData[]> {
  const res = await fetch(`${API_BASE_URL}/banners/reorder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  const data = (await res.json()) as BannerSlideDTO[];
  return data.map(fromDTO);
}

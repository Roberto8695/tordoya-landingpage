const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface NavItemDTO {
  label: string;
  href: string;
}

export interface ConfigHeaderDTO {
  id: string;
  logo: string;
  ctaText: string;
  ctaLink: string;
  navItems: NavItemDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface ConfigFooterDTO {
  id: string;
  logo: string;
  description: string;
  tags: string[];
  navItems: NavItemDTO[];
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  copyrightText: string;
  copyrightSubtext: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function getHeader(): Promise<ConfigHeaderDTO> {
  const res = await fetch(`${API_URL}/configuracion/header`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function updateHeader(
  data: Partial<{
    logo: string;
    ctaText: string;
    ctaLink: string;
    navItems: NavItemDTO[];
  }>
): Promise<ConfigHeaderDTO> {
  const res = await fetch(`${API_URL}/configuracion/header`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function resetHeader(): Promise<ConfigHeaderDTO> {
  const res = await fetch(`${API_URL}/configuracion/header/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function getFooter(): Promise<ConfigFooterDTO> {
  const res = await fetch(`${API_URL}/configuracion/footer`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function updateFooter(
  data: Partial<{
    logo: string;
    description: string;
    tags: string[];
    navItems: NavItemDTO[];
    contactAddress: string;
    contactPhone: string;
    contactEmail: string;
    copyrightText: string;
    copyrightSubtext: string;
    facebookUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
  }>
): Promise<ConfigFooterDTO> {
  const res = await fetch(`${API_URL}/configuracion/footer`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function resetFooter(): Promise<ConfigFooterDTO> {
  const res = await fetch(`${API_URL}/configuracion/footer/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}
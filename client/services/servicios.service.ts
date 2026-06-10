const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ServicioDTO {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string | null;
  precio: number | null;
  duracionMinutos: number | null;
  activo: boolean;
  orden: number;
  especialidadId: string;
  especialidad?: {
    id: string;
    slug: string;
    nombre: string;
    color: string;
  };
}

export interface EspecialidadOption {
  id: string;
  slug: string;
  nombre: string;
}

export async function getServicios(): Promise<ServicioDTO[]> {
  const res = await fetch(`${API_URL}/servicios`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function getServicioBySlug(slug: string): Promise<ServicioDTO> {
  const res = await fetch(`${API_URL}/servicios/${slug}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export interface CreateServicioPayload {
  slug: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  duracionMinutos?: number;
  activo?: boolean;
  orden?: number;
  especialidadSlug?: string;
}
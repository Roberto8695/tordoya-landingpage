const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface ServicioDTO {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string | null;
  precio: number | null;
  duracionMinutos: number | null;
  activo: boolean;
  orden: number;
}

export interface EspecialidadDTO {
  id: string;
  slug: string;
  nombre: string;
  icon: string;
  color: string;
  imagen: string;
  activo: boolean;
  orden: number;
  servicios: ServicioDTO[];
}

export async function getEspecialidades(): Promise<EspecialidadDTO[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${API_URL}/especialidades`, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const text = await response.text();
    if (!text) return [];
    return JSON.parse(text) as EspecialidadDTO[];
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("API no disponible:", err);
    throw err;
  }
}

export async function getEspecialidadBySlug(
  slug: string,
): Promise<EspecialidadDTO> {
  const response = await fetch(`${API_URL}/especialidades/${slug}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return (await response.json()) as EspecialidadDTO;
}
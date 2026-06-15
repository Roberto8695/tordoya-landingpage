const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ValorDTO {
  icono: string;
  titulo: string;
  subtitulo: string;
}

export interface ConfigNosotrosDTO {
  id: string;
  titulo: string;
  descripcion: string;
  misionTitulo: string;
  misionDescripcion: string;
  misionIcono: string;
  visionTitulo: string;
  visionDescripcion: string;
  visionIcono: string;
  valoresTitulo: string;
  valoresDescripcion: string;
  valores: ValorDTO[];
  createdAt: string;
  updatedAt: string;
}

export async function getNosotros(): Promise<ConfigNosotrosDTO> {
  const res = await fetch(`${API_URL}/configuracion/nosotros`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function updateNosotros(
  data: Partial<{
    titulo: string;
    descripcion: string;
    misionTitulo: string;
    misionDescripcion: string;
    misionIcono: string;
    visionTitulo: string;
    visionDescripcion: string;
    visionIcono: string;
    valoresTitulo: string;
    valoresDescripcion: string;
    valores: ValorDTO[];
  }>
): Promise<ConfigNosotrosDTO> {
  const res = await fetch(`${API_URL}/configuracion/nosotros`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}

export async function resetNosotros(): Promise<ConfigNosotrosDTO> {
  const res = await fetch(`${API_URL}/configuracion/nosotros/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}
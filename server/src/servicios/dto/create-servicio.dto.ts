export class CreateServicioDto {
  slug: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  duracionMinutos?: number;
  activo?: boolean;
  orden?: number;
  especialidadId?: string;
  especialidadSlug?: string;
}
export class CreateEspecialidadDto {
  slug: string;
  nombre: string;
  icon?: string;
  color?: string;
  imagen: string;
  activo?: boolean;
  orden?: number;
}

export class CreateServicioDto {
  slug: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  duracionMinutos?: number;
  activo?: boolean;
  orden?: number;
}

export class CreateEspecialidadWithServiciosDto {
  slug: string;
  nombre: string;
  icon?: string;
  color?: string;
  imagen: string;
  activo?: boolean;
  orden?: number;
  servicios?: CreateServicioDto[];
}
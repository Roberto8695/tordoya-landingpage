export class UpdateNosotrosDto {
  titulo?: string;
  descripcion?: string;
  misionTitulo?: string;
  misionDescripcion?: string;
  misionIcono?: string;
  visionTitulo?: string;
  visionDescripcion?: string;
  visionIcono?: string;
  valoresTitulo?: string;
  valoresDescripcion?: string;
  valores?: { icono: string; titulo: string; subtitulo: string }[];
}
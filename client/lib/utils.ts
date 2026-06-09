/**
 * Utilidad para concatenar clases de Tailwind CSS de forma condicional.
 * Versión ligera sin dependencias externas (clsx / class-variance-authority).
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function toTrimLower(value: string): string {
  return value.trim().toLowerCase();
}
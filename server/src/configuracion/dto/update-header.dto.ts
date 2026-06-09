export class UpdateHeaderDto {
  logo?: string;
  ctaText?: string;
  ctaLink?: string;
  navItems?: { label: string; href: string }[];
}
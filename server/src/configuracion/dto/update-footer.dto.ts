export class UpdateFooterDto {
  logo?: string;
  description?: string;
  tags?: string[];
  navItems?: { label: string; href: string }[];
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  copyrightText?: string;
  copyrightSubtext?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

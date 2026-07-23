export class CreateBannerDto {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  bullets?: string;
  cta1?: string;
  cta2?: string | null;
  imageDesktop?: string;
  imageMobile?: string;
  theme?: string;
  layout?: string;
  active?: boolean;
  orden?: number;
}

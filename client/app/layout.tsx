import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteConfigProvider } from "@/features/configuraciones/site-config-context";

const manrope = localFont({
  src: [
    {
      path: "../public/fonts/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const dDin = localFont({
  src: [
    {
      path: "../public/fonts/D-DIN.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/D-DIN-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-d-din",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tordoya | Diagnóstico por Ultrasonido",
  description: "Empresa líder en soluciones integrales para tu negocio",
  icons: [
    { rel: 'icon', url: '/image/icono.webp?v=2', type: 'image/webp' },
    { rel: 'shortcut icon', url: '/image/icono.webp?v=2', type: 'image/webp' },
    { rel: 'apple-touch-icon', url: '/image/icono.webp?v=2', sizes: '180x180' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${dDin.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-foreground">
        <SiteConfigProvider>{children}</SiteConfigProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "Tordoya | Soluciones Integrales",
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
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

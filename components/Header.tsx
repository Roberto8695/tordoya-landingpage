"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Contáctanos", href: "#contacto" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Principal">
        <div className="grid h-16 sm:h-20 md:h-28 grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <a href="#inicio" className="flex min-w-0 items-center gap-3 justify-self-start">
            <Image
              src="/image/logo_h.webp"
              alt="Isotipo Tordoya"
              width={1920}
              height={1920}
              className="h-10 w-auto shrink-0 sm:h-12 md:h-16 lg:h-20"
              priority
            />
           
          </a>

          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-sm md:text-base font-light text-primary transition-colors duration-200 hover:text-secondary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-secondary after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden min-w-42.5 justify-self-end md:inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-secondary hover:shadow-secondary/30"
          >
            Agenda tu cita
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto rounded-md p-2 text-primary transition-colors hover:bg-primary/5 md:hidden"
            aria-label="Menú"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="border-t border-primary/10 pb-5 pt-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md px-2 py-2 text-lg font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 hover:text-secondary"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-bold text-white transition-colors duration-200 hover:bg-secondary"
              >
                Agenda tu cita
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

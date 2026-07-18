"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteConfig } from "@/features/configuraciones/site-config-context";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { config } = useSiteConfig();
  const { header } = config;
  const headerLogo = header.logo || "/image/logo_h.svg";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Principal">
        <div className="grid h-16 sm:h-20 md:h-22 grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <a href={header.navItems[0]?.href || "#inicio"} className="flex min-w-0 items-center gap-3 justify-self-start">
            <Image
              src={headerLogo}
              alt="Isotipo Tordoya"
              width={4623}
              height={1023}
              quality={100}
              sizes="(min-width: 1024px) 217px, (min-width: 768px) 192px, 160px"
              className="h-10 w-auto shrink-0 sm:h-12 md:h-16 lg:h-12"
              priority
            />
          </a>

          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 xl:gap-10">
            {header.navItems.map((item) => (
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
            href={header.ctaLink}
            className="hidden min-w-42.5 justify-self-end md:inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-secondary hover:shadow-secondary/30"
          >
            {header.ctaText}
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
        <div
          id="mobile-menu"
          aria-hidden={!isMenuOpen}
          className={`overflow-hidden border-t border-primary/10 transition-[max-height,opacity,transform] duration-300 ease-out md:hidden ${
            isMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-3 pb-5 pt-4">
            {header.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-2 py-2 text-base font-light text-primary transition-colors duration-200 hover:bg-primary/5 hover:text-secondary"
              >
                {item.label}
              </a>
            ))}
            <a
              href={header.ctaLink}
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-bold text-white transition-colors duration-200 hover:bg-secondary"
            >
              {header.ctaText}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

import {
  getHeader as apiGetHeader,
  getFooter as apiGetFooter,
  updateHeader as apiUpdateHeader,
  updateFooter as apiUpdateFooter,
  resetHeader as apiResetHeader,
  resetFooter as apiResetFooter,
  type NavItemDTO,
} from "@/services/configuracion.service";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  header: {
    logo: string;
    navItems: NavItem[];
    ctaText: string;
    ctaLink: string;
  };
  footer: {
    logo: string;
    description: string;
    tags: string[];
    navItems: NavItem[];
    contact: {
      address: string;
      phone: string;
      email: string;
    };
    copyrightText: string;
    copyrightSubtext: string;
    facebookUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
  };
}

const DEFAULT_CONFIG: SiteConfig = {
  header: {
    logo: "/image/logo_h.webp",
    navItems: [
      { label: "Inicio", href: "#inicio" },
      { label: "Nosotros", href: "#nosotros" },
      { label: "Servicios", href: "#servicios" },
      { label: "Contáctanos", href: "#contacto" },
    ],
    ctaText: "Agenda tu cita",
    ctaLink: "#contacto",
  },
  footer: {
    logo: "/image/logo-white.webp",
    description:
      "Servicios avanzados de imagenología médica y diagnóstico con tecnología de vanguardia",
    tags: ["Calidad", "Precisión", "Confianza"],
    navItems: [
      { label: "Inicio", href: "#inicio" },
      { label: "Nosotros", href: "#nosotros" },
      { label: "Servicios", href: "#servicios" },
      { label: "Contáctanos", href: "#contacto" },
    ],
    contact: {
      address:
        "Av. Río Mixcoac 39, esq. Calle Ceres, CP 03940, Col. Crédito Constructor, Benito Juárez, CDMX.",
      phone: "+52 1 55 4715 7971",
      email: "diagnosticoultrasonidotordoya@gmail.com",
    },
    copyrightText: "© {year} Tordoya. Todos los derechos reservados.",
    copyrightSubtext: "Soluciones integrales en diagnóstico por ultrasonido.",
    facebookUrl: "https://www.facebook.com/Centromedicotordoya",
    instagramUrl: "https://www.instagram.com/diagnosticoultrasonidotordoya",
    tiktokUrl: "https://www.tiktok.com/@diagnosticotordoya",
  },
};

interface SiteConfigContextType {
  config: SiteConfig;
  loading: boolean;
  error: string | null;
  updateHeader: (header: Partial<SiteConfig["header"]>) => Promise<void>;
  updateFooter: (footer: Partial<SiteConfig["footer"]>) => Promise<void>;
  updateHeaderNavItem: (index: number, item: Partial<NavItem>) => Promise<void>;
  addHeaderNavItem: () => Promise<void>;
  removeHeaderNavItem: (index: number) => Promise<void>;
  moveHeaderNavItem: (fromIndex: number, toIndex: number) => Promise<void>;
  updateFooterNavItem: (index: number, item: Partial<NavItem>) => Promise<void>;
  addFooterNavItem: () => Promise<void>;
  removeFooterNavItem: (index: number) => Promise<void>;
  moveFooterNavItem: (fromIndex: number, toIndex: number) => Promise<void>;
  addFooterTag: (tag: string) => Promise<void>;
  removeFooterTag: (index: number) => Promise<void>;
  updateFooterTag: (index: number, tag: string) => Promise<void>;
  resetConfig: () => Promise<void>;
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

function apiToSiteConfig(
  header: { logo: string; ctaText: string; ctaLink: string; navItems: NavItemDTO[] },
  footer: {
    logo: string;
    description: string;
    tags: string[];
    navItems: NavItemDTO[];
    contactAddress: string;
    contactPhone: string;
    contactEmail: string;
    copyrightText: string;
    copyrightSubtext: string;
    facebookUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
  }
): SiteConfig {
  return {
    header: {
      logo: header.logo,
      ctaText: header.ctaText,
      ctaLink: header.ctaLink,
      navItems: header.navItems,
    },
    footer: {
      logo: footer.logo,
      description: footer.description,
      tags: footer.tags,
      navItems: footer.navItems,
      contact: {
        address: footer.contactAddress,
        phone: footer.contactPhone,
        email: footer.contactEmail,
      },
      copyrightText: footer.copyrightText,
      copyrightSubtext: footer.copyrightSubtext,
      facebookUrl: footer.facebookUrl,
      instagramUrl: footer.instagramUrl,
      tiktokUrl: footer.tiktokUrl,
    },
  };
}

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from API on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [headerRes, footerRes] = await Promise.all([
          apiGetHeader(),
          apiGetFooter(),
        ]);
        if (cancelled) return;
        setConfig(apiToSiteConfig(headerRes, footerRes));
        setError(null);
      } catch (err) {
        console.warn("No se pudo cargar la configuración desde la API:", err);
        if (!cancelled) {
          setError("Usando valores locales. La API no está disponible.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateHeader = useCallback(
    async (header: Partial<SiteConfig["header"]>) => {
      const nextHeader = { ...config.header, ...header };
      setConfig((prev) => ({ ...prev, header: nextHeader }));
      try {
        await apiUpdateHeader({
          logo: nextHeader.logo,
          ctaText: nextHeader.ctaText,
          ctaLink: nextHeader.ctaLink,
          navItems: nextHeader.navItems,
        });
        setError(null);
      } catch {
        setError("Error al guardar los cambios del header.");
      }
    },
    [config.header]
  );

  const updateFooter = useCallback(
    async (footer: Partial<SiteConfig["footer"]>) => {
      const nextFooter = { ...config.footer, ...footer };
      setConfig((prev) => ({ ...prev, footer: nextFooter }));
      try {
        await apiUpdateFooter({
          logo: nextFooter.logo,
          description: nextFooter.description,
          tags: nextFooter.tags,
          navItems: nextFooter.navItems,
          contactAddress: nextFooter.contact.address,
          contactPhone: nextFooter.contact.phone,
          contactEmail: nextFooter.contact.email,
          copyrightText: nextFooter.copyrightText,
          copyrightSubtext: nextFooter.copyrightSubtext,
          facebookUrl: nextFooter.facebookUrl,
          instagramUrl: nextFooter.instagramUrl,
          tiktokUrl: nextFooter.tiktokUrl,
        });
        setError(null);
      } catch {
        setError("Error al guardar los cambios del footer.");
      }
    },
    [config.footer]
  );

  const updateHeaderNavItem = useCallback(
    async (index: number, item: Partial<NavItem>) => {
      const navItems = [...config.header.navItems];
      navItems[index] = { ...navItems[index], ...item };
      await updateHeader({ navItems });
    },
    [config.header.navItems, updateHeader]
  );

  const addHeaderNavItem = useCallback(async () => {
    const navItems = [...config.header.navItems, { label: "Nuevo", href: "#" }];
    await updateHeader({ navItems });
  }, [config.header.navItems, updateHeader]);

  const removeHeaderNavItem = useCallback(
    async (index: number) => {
      const navItems = config.header.navItems.filter((_, i) => i !== index);
      await updateHeader({ navItems });
    },
    [config.header.navItems, updateHeader]
  );

  const moveHeaderNavItem = useCallback(
    async (fromIndex: number, toIndex: number) => {
      const navItems = [...config.header.navItems];
      const [moved] = navItems.splice(fromIndex, 1);
      navItems.splice(toIndex, 0, moved);
      await updateHeader({ navItems });
    },
    [config.header.navItems, updateHeader]
  );

  const updateFooterNavItem = useCallback(
    async (index: number, item: Partial<NavItem>) => {
      const navItems = [...config.footer.navItems];
      navItems[index] = { ...navItems[index], ...item };
      await updateFooter({ navItems });
    },
    [config.footer.navItems, updateFooter]
  );

  const addFooterNavItem = useCallback(async () => {
    const navItems = [...config.footer.navItems, { label: "Nuevo", href: "#" }];
    await updateFooter({ navItems });
  }, [config.footer.navItems, updateFooter]);

  const removeFooterNavItem = useCallback(
    async (index: number) => {
      const navItems = config.footer.navItems.filter((_, i) => i !== index);
      await updateFooter({ navItems });
    },
    [config.footer.navItems, updateFooter]
  );

  const moveFooterNavItem = useCallback(
    async (fromIndex: number, toIndex: number) => {
      const navItems = [...config.footer.navItems];
      const [moved] = navItems.splice(fromIndex, 1);
      navItems.splice(toIndex, 0, moved);
      await updateFooter({ navItems });
    },
    [config.footer.navItems, updateFooter]
  );

  const addFooterTag = useCallback(
    async (tag: string) => {
      const tags = [...config.footer.tags, tag];
      await updateFooter({ tags });
    },
    [config.footer.tags, updateFooter]
  );

  const removeFooterTag = useCallback(
    async (index: number) => {
      const tags = config.footer.tags.filter((_, i) => i !== index);
      await updateFooter({ tags });
    },
    [config.footer.tags, updateFooter]
  );

  const updateFooterTag = useCallback(
    async (index: number, tag: string) => {
      const tags = [...config.footer.tags];
      tags[index] = tag;
      await updateFooter({ tags });
    },
    [config.footer.tags, updateFooter]
  );

  const resetConfig = useCallback(async () => {
    try {
      const [headerRes, footerRes] = await Promise.all([
        apiResetHeader(),
        apiResetFooter(),
      ]);
      setConfig(apiToSiteConfig(headerRes, footerRes));
      setError(null);
    } catch {
      setConfig(DEFAULT_CONFIG);
      setError("No se pudo conectar con el servidor. Se usaron valores por defecto.");
    }
  }, []);

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        loading,
        error,
        updateHeader,
        updateFooter,
        updateHeaderNavItem,
        addHeaderNavItem,
        removeHeaderNavItem,
        moveHeaderNavItem,
        updateFooterNavItem,
        addFooterNavItem,
        removeFooterNavItem,
        moveFooterNavItem,
        addFooterTag,
        removeFooterTag,
        updateFooterTag,
        resetConfig,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return ctx;
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebarCounts } from "@/hooks/use-sidebar-counts";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { clearAuthToken } from "@/lib/auth";

import {
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCash,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineChevronLeft,
  HiOutlineMenu,
  HiOutlineBell,
  HiOutlineQuestionMarkCircle,
  HiOutlineShieldCheck,
  HiOutlinePencilAlt,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import type { IconType } from "react-icons";

/* ==========================================================================
   INTERFACES Y TIPOS
   ========================================================================== */

export interface SidebarNavItem {
  label: string;
  icon: IconType;
  href: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarUser {
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  role: string;
}

/* ==========================================================================
   DATOS DE NAVEGACIÓN
   ========================================================================== */

function useNavItems(counts: { especialidades: number; servicios: number }): {
  mainNavItems: SidebarNavItem[];
  secondaryNavItems: SidebarNavItem[];
  tertiaryNavItems: SidebarNavItem[];
} {
  return {
    mainNavItems: [
      { label: "Dashboard", icon: HiOutlineViewGrid, href: "/admin" },
      { label: "Especialidades", icon: HiOutlineViewList, href: "/admin/especialidades", badge: counts.especialidades },
      { label: "Servicios", icon: HiOutlineDocumentText, href: "/admin/servicios", badge: counts.servicios },
      { label: "Nosotros", icon: HiOutlineInformationCircle, href: "/admin/nosotros" },
    ],
    secondaryNavItems: [
      { label: "Configuración", icon: HiOutlineCog, href: "/admin/configuracion" },
    ],
    tertiaryNavItems: [
      { label: "Bitácora", icon: HiOutlinePencilAlt, href: "/admin/bitacora" },
    ],
  };
}

/* ==========================================================================
   SUBCOMPONENTES
   ========================================================================== */

interface SidebarLogoProps {
  collapsed: boolean;
  onToggle: () => void;
}

function SidebarLogo({ collapsed, onToggle }: SidebarLogoProps) {
  return (
    <div
      className={cn(
        "flex h-16 items-center border-b border-white/10 px-4 transition-all duration-300",
        collapsed ? "justify-center px-0" : "justify-between"
      )}
    >
      <Link
        href="/admin"
        className={cn(
          "flex items-center gap-3 overflow-hidden transition-all duration-300",
          collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}
      >
        <Image
          src="/image/logo-white.webp"
          alt="Tordoya"
          width={120}
          height={30}
          className="h-7 w-auto shrink-0"
          priority
        />
      </Link>

      <Link
        href="/admin"
        className={cn(
          "flex items-center justify-center overflow-hidden transition-all duration-300",
          collapsed ? "w-auto opacity-100" : "w-0 opacity-0"
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-xs font-black text-accent">
          T
        </span>
      </Link>

      <button
        onClick={onToggle}
        className={cn(
          "hidden md:flex items-center justify-center rounded-lg p-1.5 text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white/80",
          collapsed ? "mx-auto" : ""
        )}
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        title={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        <HiOutlineChevronLeft
          size={18}
          className={cn(
            "transition-transform duration-300",
            collapsed ? "rotate-180" : ""
          )}
        />
      </button>
    </div>
  );
}

interface NotificationBadgeProps {
  collapsed: boolean;
}

function NotificationBadge({ collapsed }: NotificationBadgeProps) {
  return (
    <div
      className={cn(
        "border-b border-white/10 transition-all duration-300",
        collapsed ? "px-0 py-3" : "px-4 py-3"
      )}
    >
      <button
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.08] hover:text-white/90",
          collapsed ? "justify-center px-0" : ""
        )}
        aria-label="Notificaciones"
      >
        <span className="relative inline-flex">
          <HiOutlineBell size={20} />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white ring-2 ring-primary">
            3
          </span>
        </span>
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap transition-all duration-300",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          3 pendientes
        </span>
      </button>
    </div>
  );
}

interface NavItemProps {
  item: SidebarNavItem;
  collapsed: boolean;
  currentPath: string;
}

function NavItem({ item, collapsed, currentPath }: NavItemProps) {
  const active = currentPath === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.disabled ? "#" : item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        collapsed ? "mx-2 h-10 w-10 justify-center gap-0 px-0" : "",
        active
          ? "bg-white/10 text-accent shadow-[inset_3px_0_0_var(--color-accent)]"
          : "text-white/60 hover:bg-white/[0.06] hover:text-white/85",
        item.disabled && "pointer-events-none opacity-40"
      )}
      title={collapsed ? item.label : undefined}
      aria-current={active ? "page" : undefined}
    >
      <Icon
        size={20}
        className={cn(
          "shrink-0 transition-colors duration-200",
          active ? "text-accent" : "text-white/50 group-hover:text-white/75"
        )}
      />

      <span
        className={cn(
          "overflow-hidden whitespace-nowrap transition-all duration-300",
          collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}
      >
        {item.label}
      </span>

      {!collapsed && item.badge && (
        <span
          className={cn(
            "ml-auto flex shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold leading-none transition-all duration-300",
            active
              ? "bg-accent/20 text-accent"
              : "bg-white/10 text-white/70"
          )}
        >
          {item.badge}
        </span>
      )}

      {collapsed && (
        <div className="pointer-events-none absolute left-full z-50 ml-3 rounded-lg bg-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
          {item.label}
        </div>
      )}
    </Link>
  );
}

interface NavSectionProps {
  title?: string;
  items: SidebarNavItem[];
  collapsed: boolean;
  currentPath: string;
  showTitle?: boolean;
}

function NavSection({
  title,
  items,
  collapsed,
  currentPath,
  showTitle = true,
}: NavSectionProps) {
  return (
    <div className="px-3 py-1">
      {title && showTitle && (
        <span
          className={cn(
            "flex px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35 transition-all duration-300",
            collapsed ? "justify-center px-0" : ""
          )}
        >
          {collapsed ? (
            <span className="h-px w-4 bg-white/20" aria-hidden="true" />
          ) : (
            title
          )}
        </span>
      )}
      <div className="space-y-0.5">
        {items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            currentPath={currentPath}
          />
        ))}
      </div>
    </div>
  );
}

interface UserProfileProps {
  user: SidebarUser;
  collapsed: boolean;
  onLogout?: () => void;
}

function UserProfile({ user, collapsed, onLogout }: UserProfileProps) {
  return (
    <div className="border-t border-white/10 p-3">
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-white/[0.06]",
          collapsed ? "justify-center px-0" : ""
        )}
      >
        {/* Avatar */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent ring-2 ring-white/10">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            user.initials
          )}
        </div>

        {/* Info del usuario */}
        <div
          className={cn(
            "flex-1 overflow-hidden transition-all duration-300",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          <p className="truncate text-sm font-semibold text-white/90">
            {user.name}
          </p>
          <p className="truncate text-[11px] text-white/50">{user.role}</p>
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <button
        onClick={onLogout}
        className={cn(
          "mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-all duration-200 hover:bg-white/[0.08] hover:text-danger",
          collapsed ? "justify-center px-0" : ""
        )}
        aria-label="Cerrar sesión"
        title={collapsed ? "Cerrar sesión" : undefined}
      >
        <HiOutlineLogout size={18} className="shrink-0" />
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap transition-all duration-300",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          Cerrar sesión
        </span>
      </button>
    </div>
  );
}

/* ==========================================================================
   COMPONENTE PRINCIPAL SIDEBAR
   ========================================================================== */

interface SidebarProps {
  user?: SidebarUser;
  currentPath?: string;
  onLogout?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const DEFAULT_USER: SidebarUser = {
  name: "Dr. Tordoya",
  email: "diagnosticoultrasonidotordoya@gmail.com",
  initials: "RL",
  role: "Administrador",
};

export default function Sidebar({
  user = DEFAULT_USER,
  currentPath = "/admin",
  onLogout,
  collapsed: externalCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const router = useRouter();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCollapsed = externalCollapsed ?? internalCollapsed;

  const { especialidades, servicios } = useSidebarCounts();
  const { mainNavItems, secondaryNavItems, tertiaryNavItems } = useNavItems({ especialidades, servicios });

  const handleToggle = () => {
    const next = !isCollapsed;
    if (onToggleCollapse) {
      onToggleCollapse(next);
    } else {
      setInternalCollapsed(next);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    setMobileOpen(false);

    if (onLogout) {
      onLogout();
      return;
    }

    router.replace("/portal-auth");
    router.refresh();
  };

  return (
    <>
      {/* OVERLAY MÓVIL */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* BOTÓN HAMBURGUESA MÓVIL */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg md:hidden"
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={mobileOpen}
      >
        <HiOutlineMenu size={22} />
      </button>

      {/* SIDEBAR ESCRITORIO */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex flex-col bg-primary text-white shadow-2xl shadow-black/20",
          "transition-all duration-300 ease-in-out",
          "h-screen",
          "hidden md:flex",
          isCollapsed ? "w-16" : "w-64",
          "translate-x-0"
        )}
        aria-label="Panel de navegación principal"
      >
        <SidebarLogo collapsed={isCollapsed} onToggle={handleToggle} />
        <NotificationBadge collapsed={isCollapsed} />

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          <NavSection
            title="Principal"
            items={mainNavItems}
            collapsed={isCollapsed}
            currentPath={currentPath}
          />
          <NavSection
            title="Administración"
            items={secondaryNavItems}
            collapsed={isCollapsed}
            currentPath={currentPath}
          />
          <NavSection
            title="Sistema"
            items={tertiaryNavItems}
            collapsed={isCollapsed}
            currentPath={currentPath}
            showTitle={false}
          />
        </nav>

        <UserProfile
          user={user}
          collapsed={isCollapsed}
          onLogout={handleLogout}
        />
      </aside>

      {/* SIDEBAR MÓVIL (overlay) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-primary text-white shadow-2xl shadow-black/20",
          "transition-all duration-300 ease-in-out",
          "md:hidden",
          mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full"
        )}
        aria-label="Panel de navegación móvil"
        aria-hidden={!mobileOpen}
      >
        {/* Logo móvil */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/image/logo-white.webp"
              alt="Tordoya"
              width={120}
              height={30}
              className="h-7 w-auto"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white/80"
            aria-label="Cerrar menú"
          >
            <HiOutlineChevronLeft size={20} />
          </button>
        </div>

        <NotificationBadge collapsed={false} />

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          <NavSection
            title="Principal"
            items={mainNavItems}
            collapsed={false}
            currentPath={currentPath}
          />
          <NavSection
            title="Administración"
            items={secondaryNavItems}
            collapsed={false}
            currentPath={currentPath}
          />
          <NavSection
            title="Sistema"
            items={tertiaryNavItems}
            collapsed={false}
            currentPath={currentPath}
            showTitle={false}
          />
        </nav>

        <UserProfile user={user} collapsed={false} onLogout={handleLogout} />
      </aside>

      {/* ESPACIADOR PARA CONTENIDO PRINCIPAL */}
      <div
        className={cn(
          "hidden md:block shrink-0 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
        aria-hidden="true"
      />
    </>
  );
}
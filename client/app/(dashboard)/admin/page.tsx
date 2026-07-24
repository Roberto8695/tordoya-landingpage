"use client";

import { useState, useEffect } from "react";
import { motion, type MotionProps, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import { cn } from "@/lib/utils";
import { getEspecialidades, type EspecialidadDTO } from "@/services/especialidades.service";
import { getServicios } from "@/services/servicios.service";
import { fetchBanners } from "@/services/banners.service";
import {
  Image as ImageIcon,
  Stethoscope,
  ClipboardList,
  Grid3X3,
  ArrowRight,
  FolderKanban,
  FileText,
  Activity,
} from "lucide-react";

const MotionDiv = motion.div as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & MotionProps>
>;

type DashboardData = {
  banners: { total: number; active: number };
  especialidades: EspecialidadDTO[];
  serviciosCount: number;
  loading: boolean;
};

const colorConfig = {
  banner: { bg: "from-violet-500 to-purple-600", light: "bg-violet-50", icon: "text-violet-600", badge: "bg-violet-100 text-violet-700" },
  especialidad: { bg: "from-blue-500 to-indigo-600", light: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
  servicio: { bg: "from-emerald-500 to-teal-600", light: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
  cms: { bg: "from-amber-500 to-orange-600", light: "bg-amber-50", icon: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
};

function StatCard({
  label,
  value,
  subtext,
  badge,
  icon,
  color,
}: {
  label: string;
  value: React.ReactNode;
  subtext?: string;
  badge?: string;
  icon: React.ReactNode;
  color: keyof typeof colorConfig;
}) {
  const cfg = colorConfig[color];
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-primary/5 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-[0.06] blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.12]" style={{ background: `linear-gradient(135deg, ${cfg.bg.split(" ")[0]?.replace("from-", "") ?? "#667eea"}, ${cfg.bg.split(" ")[1]?.replace("to-", "") ?? "#764ba2"})` }} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", cfg.light)}>
            <div className={cn("transition-transform duration-300 group-hover:scale-110", cfg.icon)}>
              {icon}
            </div>
          </div>
          {badge && (
            <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", cfg.badge)}>
              {badge}
            </span>
          )}
        </div>
        <p className="mt-4 text-2xl font-bold text-primary">{value}</p>
        <p className="text-sm font-medium text-foreground/60">{label}</p>
        {subtext && <p className="mt-0.5 text-xs text-foreground/40">{subtext}</p>}
      </div>
    </MotionDiv>
  );
}

const quickLinks = [
  {
    href: "/admin/banners",
    label: "Hero",
    desc: "Administrar slides",
    color: colorConfig.banner,
    icon: ImageIcon,
  },
  {
    href: "/admin/especialidades",
    label: "Especialidades",
    desc: "Gestionar servicios",
    color: colorConfig.especialidad,
    icon: Stethoscope,
  },
  {
    href: "/admin/servicios",
    label: "Servicios",
    desc: "Ver listado completo",
    color: colorConfig.servicio,
    icon: ClipboardList,
  },
  {
    href: "/admin/nosotros",
    label: "Nosotros",
    desc: "Misión y valores",
    color: colorConfig.cms,
    icon: FileText,
  },
];

export default function AdminPage() {
  const [data, setData] = useState<DashboardData>({
    banners: { total: 0, active: 0 },
    especialidades: [],
    serviciosCount: 0,
    loading: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const [banners, especialidades, servicios] = await Promise.all([
          fetchBanners(),
          getEspecialidades(),
          getServicios(),
        ]);
        setData({
          banners: { total: banners.length, active: banners.filter((b) => b.active).length },
          especialidades,
          serviciosCount: servicios.length,
          loading: false,
        });
      } catch {
        setData((prev) => ({ ...prev, loading: false }));
      }
    }
    load();
  }, []);

  const especialidadesActivas = data.especialidades.filter((e) => e.activo).length;
  const serviciosTotales = data.serviciosCount;
  const promedio = serviciosTotales > 0 && data.especialidades.length > 0
    ? Math.round(serviciosTotales / data.especialidades.length)
    : 0;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-light via-white to-light">
      <Sidebar currentPath="/admin" />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
          <MotionDiv
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-secondary/70">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(0,183,250,0.5)]" />
                  CMS
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary">Dashboard</h1>
                <p className="mt-1 text-base text-foreground/70">
                  Resumen general del sitio administrable.
                </p>
              </div>
              <span className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                data.loading
                  ? "border-foreground/10 bg-foreground/5 text-foreground/40"
                  : "border-success/20 bg-success/10 text-success"
              )}>
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  data.loading ? "bg-foreground/30" : "bg-success shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                )} />
                {data.loading ? "Cargando..." : "Todo en orden"}
              </span>
            </div>
          </MotionDiv>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Slides del Hero"
              value={data.loading ? <span className="animate-pulse">...</span> : data.banners.total}
              subtext={`${data.banners.active} publicados`}
              badge={data.banners.active === data.banners.total ? "Completo" : "Pendiente"}
              icon={<ImageIcon size={22} />}
              color="banner"
            />
            <StatCard
              label="Especialidades"
              value={data.loading ? <span className="animate-pulse">...</span> : data.especialidades.length}
              subtext={`${especialidadesActivas} activas`}
              badge={especialidadesActivas === data.especialidades.length ? "Sincronizado" : "Revisar"}
              icon={<Stethoscope size={22} />}
              color="especialidad"
            />
            <StatCard
              label="Servicios"
              value={data.loading ? <span className="animate-pulse">...</span> : serviciosTotales}
              subtext={`Promedio ${promedio} por especialidad`}
              badge={`${data.especialidades.length} áreas`}
              icon={<ClipboardList size={22} />}
              color="servicio"
            />
            <StatCard
              label="Secciones CMS"
              value={6}
              subtext="Header, Hero, Nosotros, Servicios, Especialidades, Footer"
              badge="Administrable"
              icon={<Grid3X3 size={22} />}
              color="cms"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <MotionDiv
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/[0.06] text-primary">
                    <Activity size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-primary">Estado del contenido</h2>
                    <p className="text-xs text-foreground/40">Distribución del sitio</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="group rounded-xl bg-primary/[0.02] px-4 py-3.5 transition-colors hover:bg-violet-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                        <ImageIcon size={14} />
                      </div>
                      <span className="text-sm font-medium text-foreground">Hero Slides</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground/50">
                      {data.banners.active}/{data.banners.total}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary/5">
                    <MotionDiv
                      initial={{ width: 0 }}
                      animate={{ width: data.banners.total > 0 ? `${(data.banners.active / data.banners.total) * 100}%` : "0%" }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                    />
                  </div>
                </div>
                <div className="group rounded-xl bg-primary/[0.02] px-4 py-3.5 transition-colors hover:bg-blue-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <Stethoscope size={14} />
                      </div>
                      <span className="text-sm font-medium text-foreground">Especialidades</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground/50">
                      {especialidadesActivas}/{data.especialidades.length}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary/5">
                    <MotionDiv
                      initial={{ width: 0 }}
                      animate={{ width: data.especialidades.length > 0 ? `${(especialidadesActivas / data.especialidades.length) * 100}%` : "0%" }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FolderKanban size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-primary">Accesos rápidos</h2>
                    <p className="text-xs text-foreground/40">Secciones del panel</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-2.5">
                {quickLinks.map((link, i) => (
                  <MotionDiv
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center gap-3.5 rounded-xl border border-primary/5 bg-white px-4 py-3.5 transition-all duration-200 hover:border-primary/10 hover:shadow-md"
                    >
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110", link.color.light)}>
                        <link.icon size={18} className={link.color.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{link.label}</p>
                        <p className="text-xs text-foreground/40">{link.desc}</p>
                      </div>
                      <ArrowRight size={16} className="text-foreground/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground/50" />
                    </a>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          </div>
        </div>
      </main>
    </div>
  );
}

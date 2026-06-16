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
  getNosotros as apiGetNosotros,
  updateNosotros as apiUpdateNosotros,
  resetNosotros as apiResetNosotros,
  type ValorDTO,
} from "@/services/nosotros.service";

export interface Valor {
  icono: string;
  titulo: string;
  subtitulo: string;
}

export interface NosotrosConfig {
  titulo: string;
  descripcion: string;
  misionTitulo: string;
  misionDescripcion: string;
  misionIcono: string;
  visionTitulo: string;
  visionDescripcion: string;
  visionIcono: string;
  valoresTitulo: string;
  valoresDescripcion: string;
  valores: Valor[];
}

const DEFAULT_CONFIG: NosotrosConfig = {
  titulo: "Quiénes somos",
  descripcion:
    "En Tordoya combinamos experiencia clínica y tecnología para ofrecer diagnósticos precisos y un trato humano. Nuestra misión y visión guían cada decisión estratégica y operativa.",
  misionTitulo: "Misión",
  misionDescripcion:
    "Ofrecer servicios de ultrasonido e imagen diagnóstica con el rigor de la alta especialidad y la accesibilidad que cada paciente merece.",
  misionIcono: "HiOutlineLightBulb",
  visionTitulo: "Visión",
  visionDescripcion:
    "Liderar el diagnóstico por imagen en Bolivia, Perú y México, siendo el aliado que conecta a médicos y pacientes con la información que necesitan para actuar a tiempo.",
  visionIcono: "HiOutlineEye",
  valoresTitulo: "Nuestros valores",
  valoresDescripcion:
    "Compromiso, excelencia y cercanía. Trabajamos con calidad humana y protocolos que garantizan resultados reproducibles.",
  valores: [
    { icono: "HiSparkles", titulo: "Calidad", subtitulo: "Protocolos validados" },
    { icono: "HiOutlineEye", titulo: "Precisión", subtitulo: "Lecturas confiables" },
    { icono: "HiOutlineLightBulb", titulo: "Innovación", subtitulo: "Mejora continua" },
  ],
};

interface NosotrosContextType {
  config: NosotrosConfig;
  loading: boolean;
  error: string | null;
  updateConfig: (data: Partial<NosotrosConfig>) => Promise<void>;
  updateValor: (index: number, valor: Partial<Valor>) => Promise<void>;
  addValor: () => Promise<void>;
  removeValor: (index: number) => Promise<void>;
  reorderValor: (fromIndex: number, toIndex: number) => Promise<void>;
  resetConfig: () => Promise<void>;
}

const NosotrosContext = createContext<NosotrosContextType | null>(null);

export function NosotrosProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<NosotrosConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await apiGetNosotros();
        if (cancelled) return;
        setConfig({
          titulo: res.titulo,
          descripcion: res.descripcion,
          misionTitulo: res.misionTitulo,
          misionDescripcion: res.misionDescripcion,
          misionIcono: res.misionIcono,
          visionTitulo: res.visionTitulo,
          visionDescripcion: res.visionDescripcion,
          visionIcono: res.visionIcono,
          valoresTitulo: res.valoresTitulo,
          valoresDescripcion: res.valoresDescripcion,
          valores: res.valores as Valor[],
        });
        setError(null);
      } catch (err) {
        console.warn("No se pudo cargar la configuración de Nosotros:", err);
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

  const updateConfig = useCallback(
    async (data: Partial<NosotrosConfig>) => {
      const next = { ...config, ...data };
      setConfig(next);
      try {
        await apiUpdateNosotros(next);
        setError(null);
      } catch {
        setError("Error al guardar los cambios.");
      }
    },
    [config]
  );

  const updateValor = useCallback(
    async (index: number, valor: Partial<Valor>) => {
      const valores = [...config.valores];
      valores[index] = { ...valores[index], ...valor };
      await updateConfig({ valores });
    },
    [config.valores, updateConfig]
  );

  const addValor = useCallback(async () => {
    const valores = [
      ...config.valores,
      { icono: "HiSparkles", titulo: "Nuevo valor", subtitulo: "Descripción" },
    ];
    await updateConfig({ valores });
  }, [config.valores, updateConfig]);

  const removeValor = useCallback(
    async (index: number) => {
      const valores = config.valores.filter((_, i) => i !== index);
      await updateConfig({ valores });
    },
    [config.valores, updateConfig]
  );

  const reorderValor = useCallback(
    async (fromIndex: number, toIndex: number) => {
      const valores = [...config.valores];
      const [moved] = valores.splice(fromIndex, 1);
      valores.splice(toIndex, 0, moved);
      await updateConfig({ valores });
    },
    [config.valores, updateConfig]
  );

  const resetConfig = useCallback(async () => {
    try {
      const res = await apiResetNosotros();
      setConfig({
        titulo: res.titulo,
        descripcion: res.descripcion,
        misionTitulo: res.misionTitulo,
        misionDescripcion: res.misionDescripcion,
        misionIcono: res.misionIcono,
        visionTitulo: res.visionTitulo,
        visionDescripcion: res.visionDescripcion,
        visionIcono: res.visionIcono,
        valoresTitulo: res.valoresTitulo,
        valoresDescripcion: res.valoresDescripcion,
        valores: res.valores as Valor[],
      });
      setError(null);
    } catch {
      setConfig(DEFAULT_CONFIG);
      setError("No se pudo conectar con el servidor. Se usaron valores por defecto.");
    }
  }, []);

  return (
    <NosotrosContext.Provider
      value={{
        config,
        loading,
        error,
        updateConfig,
        updateValor,
        addValor,
        removeValor,
        reorderValor,
        resetConfig,
      }}
    >
      {children}
    </NosotrosContext.Provider>
  );
}

export function useNosotros() {
  const ctx = useContext(NosotrosContext);
  if (!ctx) {
    throw new Error("useNosotros must be used within a NosotrosProvider");
  }
  return ctx;
}
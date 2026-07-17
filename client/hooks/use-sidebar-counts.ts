"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/constants";

interface SidebarCounts {
  especialidades: number;
  servicios: number;
  loading: boolean;
}

export function useSidebarCounts(): SidebarCounts {
  const [counts, setCounts] = useState<SidebarCounts>({
    especialidades: 0,
    servicios: 0,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchCounts() {
      try {
        const [espRes, servRes] = await Promise.all([
          fetch(`${API_BASE_URL}/especialidades`, {
            signal: AbortSignal.timeout(5000),
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`${API_BASE_URL}/servicios`, {
            signal: AbortSignal.timeout(5000),
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        if (cancelled) return;

        let especialidades = 0;
        let servicios = 0;

        if (espRes.ok) {
          const data = await espRes.json();
          especialidades = Array.isArray(data) ? data.length : 0;
        }

        if (servRes.ok) {
          const data = await servRes.json();
          servicios = Array.isArray(data) ? data.length : 0;
        }

        if (!cancelled) {
          setCounts({ especialidades, servicios, loading: false });
        }
      } catch {
        if (!cancelled) {
          setCounts({ especialidades: 0, servicios: 0, loading: false });
        }
      }
    }

    fetchCounts();

    return () => {
      cancelled = true;
    };
  }, []);

  return counts;
}
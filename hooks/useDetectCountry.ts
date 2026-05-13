"use client";

import { useEffect, useState } from "react";

export type DetectedCountry = "mexico" | "bolivia" | "peru" | null;

export default function useDetectCountry(): DetectedCountry {
  const [detected, setDetected] = useState<DetectedCountry>(null);

  useEffect(() => {
    let mounted = true;

    async function tryProviders() {
      // Provider 1: ipapi.co
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const json = await res.json();
          const code = (json.country_code || "").toString().toLowerCase();
          const name = (json.country_name || "").toString().toLowerCase();

          if (code === "mx" || name.includes("mexic")) {
            if (mounted) setDetected("mexico");
            return;
          }
          if (code === "bo" || name.includes("boliv")) {
            if (mounted) setDetected("bolivia");
            return;
          }
          if (code === "pe" || name.includes("peru")) {
            if (mounted) setDetected("peru");
            return;
          }
        }
      } catch (e) {
        // ignore and try next provider
      }

      // Provider 2: ipwho.is
      try {
        const res2 = await fetch("https://ipwho.is/");
        if (res2.ok) {
          const j2: any = await res2.json();
          const code2 = (j2.country_code || "").toString().toLowerCase();
          const name2 = (j2.country || "").toString().toLowerCase();

          if (code2 === "mx" || name2.includes("mexic")) {
            if (mounted) setDetected("mexico");
            return;
          }
          if (code2 === "bo" || name2.includes("boliv")) {
            if (mounted) setDetected("bolivia");
            return;
          }
          if (code2 === "pe" || name2.includes("peru")) {
            if (mounted) setDetected("peru");
            return;
          }
        }
      } catch (e) {
        // all providers failed
      }
    }

    tryProviders();

    return () => {
      mounted = false;
    };
  }, []);

  return detected;
}

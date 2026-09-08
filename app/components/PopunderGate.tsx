"use client";

import { useEffect } from "react";

const SRC = "https://pl31224702.profitableratecpmnetwork.com/b6/1b/7c/b61b7c108f4bb722951d8eb5186cf118.js";
const CLAVE_LOCALSTORAGE = "vikingo_popunder_ultimo";
const VEINTICUATRO_HORAS_MS = 24 * 60 * 60 * 1000;

/**
 * Limita el Popunder a una vez cada 24h por navegador (localStorage), aparte
 * del frequency cap que Adsterra pueda tener configurado en el panel de la
 * zona. Se registra el momento en que se decide cargar, no cuando el script
 * efectivamente dispara el popunder (no hay callback de Adsterra para eso) —
 * es una aproximación suficiente: en incógnito o con el storage bloqueado no
 * carga nada, para no arriesgar mostrarlo de más.
 */
export default function PopunderGate() {
  useEffect(() => {
    try {
      const ultimo = Number(localStorage.getItem(CLAVE_LOCALSTORAGE) ?? "0");
      if (Date.now() - ultimo < VEINTICUATRO_HORAS_MS) return;

      localStorage.setItem(CLAVE_LOCALSTORAGE, String(Date.now()));
      const script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      document.body.appendChild(script);
    } catch {
      // localStorage no disponible: no cargar para no arriesgar mostrarlo de más.
    }
  }, []);

  return null;
}

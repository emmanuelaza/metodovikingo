"use client";

import { useState } from "react";

export default function CompartirRacha({ racha, dia }: { racha: number; dia: number }) {
  const [estado, setEstado] = useState<"idle" | "cargando" | "listo">("idle");
  const url = `/api/og/racha?racha=${racha}&dia=${dia}`;
  const texto = `🔥 Llevo ${racha} ${racha === 1 ? "día" : "días"} de racha en el Reto Vikingo. ¿Te animas?`;

  async function compartir() {
    setEstado("cargando");
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const archivo = new File([blob], `racha-vikingo-${racha}.png`, { type: "image/png" });

      if (navigator.canShare?.({ files: [archivo] })) {
        await navigator.share({ files: [archivo], text: texto });
      } else {
        window.open(url, "_blank", "noopener");
      }
    } catch {
      // Cancelado por el usuario o sin soporte: abrir la imagen es suficiente.
      window.open(url, "_blank", "noopener");
    } finally {
      setEstado("listo");
    }
  }

  return (
    <button
      type="button"
      onClick={compartir}
      disabled={estado === "cargando"}
      className="w-full rounded-lg border border-line px-4 py-2.5 text-sm text-ink-dim transition hover:border-ember/50 hover:text-ink disabled:opacity-60"
    >
      {estado === "cargando" ? "Generando imagen…" : "Compartir mi racha"}
    </button>
  );
}

"use client";

import { useState, useSyncExternalStore } from "react";
import { activarNotificaciones } from "@/lib/push/client";

const CLAVE_LS = "vk_push_prompt_visto";

const SIN_SUSCRIPCION = () => () => {};

/** true solo después de hidratar en el cliente — evita desajuste con el HTML del servidor. */
function useMontado(): boolean {
  return useSyncExternalStore(SIN_SUSCRIPCION, () => true, () => false);
}

function debeMostrarse(habilitado: boolean): boolean {
  if (!habilitado) return false;
  if (typeof window === "undefined" || typeof Notification === "undefined") return false;
  if (Notification.permission !== "default") return false;
  try {
    return !localStorage.getItem(CLAVE_LS);
  } catch {
    return false;
  }
}

/** Se muestra una sola vez, tras completar el día 1, si el navegador soporta push y no se ha decidido antes. */
export default function NotificacionesPrompt({ habilitado }: { habilitado: boolean }) {
  const montado = useMontado();
  const [cerrado, setCerrado] = useState(false);
  const [pidiendo, setPidiendo] = useState(false);

  function cerrar() {
    try {
      localStorage.setItem(CLAVE_LS, "1");
    } catch {
      // Sin localStorage (modo privado, etc.): simplemente no se vuelve a mostrar esta sesión.
    }
    setCerrado(true);
  }

  async function activar() {
    setPidiendo(true);
    await activarNotificaciones();
    cerrar();
  }

  if (!montado || cerrado || !debeMostrarse(habilitado)) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-bg-2 p-4 text-sm">
      <p className="text-ink-dim">¿Quieres que te avisemos cuando tengas contenido nuevo?</p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={activar}
          disabled={pidiendo}
          className="rounded-lg bg-ember px-4 py-2 font-semibold text-bg hover:bg-ember-deep disabled:opacity-60"
        >
          Sí, avísame
        </button>
        <button type="button" onClick={cerrar} className="rounded-lg border border-line px-4 py-2 text-ink-dim hover:text-ink">
          Ahora no
        </button>
      </div>
    </div>
  );
}

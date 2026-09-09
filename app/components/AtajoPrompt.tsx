"use client";

import { useState, useSyncExternalStore } from "react";
import { track } from "@vercel/analytics";

const CLAVE_LS = "vk_atajo_prompt_visto";
/** La escribe NotificacionesPrompt al resolverse; aquí se usa para no solapar avisos. */
const CLAVE_PUSH = "vk_push_prompt_visto";

const SIN_SUSCRIPCION = () => () => {};

/** true solo después de hidratar — evita desajuste con el HTML del servidor. */
function useMontado(): boolean {
  return useSyncExternalStore(SIN_SUSCRIPCION, () => true, () => false);
}

type Plataforma = "ios" | "android";

function detectarPlataforma(): Plataforma | null {
  if (typeof navigator === "undefined") return null;
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return "ios";
  if (/Android/i.test(navigator.userAgent)) return "android";
  return null; // en escritorio el atajo no aporta nada
}

function debeMostrarse(habilitado: boolean, plataforma: Plataforma | null): boolean {
  if (!habilitado || plataforma === null || typeof window === "undefined") return false;

  // Si ya entró desde el atajo, no hay nada que ofrecer.
  const comoApp =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (comoApp) return false;

  try {
    if (localStorage.getItem(CLAVE_LS)) return false;

    const permiso = typeof Notification !== "undefined" ? Notification.permission : "sin_soporte";
    // Con notificaciones activas ya tiene un camino de regreso: no insistir.
    if (permiso === "granted") return false;
    // Si todavía no ha contestado lo de las notificaciones, esperar: no se
    // muestran dos avisos a la vez.
    if (permiso === "default" && !localStorage.getItem(CLAVE_PUSH)) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Ofrece guardar el atajo en la pantalla de inicio, con los pasos del
 * teléfono que esté usando la persona. Se muestra solo a quien se quedó
 * SIN notificaciones, porque es justo quien no tiene ninguna forma de
 * volver: sin esto, depende de recordar la URL.
 */
export default function AtajoPrompt({ habilitado }: { habilitado: boolean }) {
  const montado = useMontado();
  const [cerrado, setCerrado] = useState(false);
  const plataforma = montado ? detectarPlataforma() : null;

  if (!montado || cerrado || !debeMostrarse(habilitado, plataforma)) return null;

  const pasos =
    plataforma === "ios"
      ? ["Toca el botón de Compartir de Safari (el cuadrito con la flecha hacia arriba).", "Baja en la lista y elige “Añadir a pantalla de inicio”."]
      : ["Abre el menú del navegador (los tres puntos, arriba a la derecha).", "Elige “Añadir a pantalla de inicio”."];

  function cerrar() {
    try {
      localStorage.setItem(CLAVE_LS, "1");
    } catch {
      // Sin localStorage: al menos no se repite en esta sesión.
    }
    track("atajo_prompt", { accion: "cerrado", plataforma: plataforma ?? "desconocida" });
    setCerrado(true);
  }

  return (
    <div className="mt-6 rounded-lg border border-line bg-bg-2 p-4 text-sm">
      <p className="font-semibold text-ink">Deja el reto a un toque</p>
      <p className="mt-1 text-ink-dim">
        Guarda el ícono en tu pantalla de inicio y vuelves mañana sin buscar nada.
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-ink-dim">
        {pasos.map((paso) => (
          <li key={paso}>{paso}</li>
        ))}
      </ol>
      <button
        type="button"
        onClick={cerrar}
        className="mt-3 rounded-lg border border-line px-4 py-2 text-ink-dim hover:text-ink"
      >
        Entendido
      </button>
    </div>
  );
}

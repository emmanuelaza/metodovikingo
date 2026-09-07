import { guardarSuscripcion } from "@/lib/push/actions";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export type ResultadoActivacion = "activadas" | "rechazadas" | "no_soportado";

/** Registra el service worker y suscribe al navegador a Web Push. Solo se llama tras un click explícito del usuario. */
export async function activarNotificaciones(): Promise<ResultadoActivacion> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "no_soportado";
  }

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) return "no_soportado";

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") return "rechazadas";

  const registro = await navigator.serviceWorker.register("/sw.js");
  const suscripcion = await registro.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
  });

  await guardarSuscripcion(suscripcion.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } });
  return "activadas";
}

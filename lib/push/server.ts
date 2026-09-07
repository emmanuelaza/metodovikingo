import webpush from "web-push";

let configurado = false;

/** Configura VAPID una sola vez. Solo se usa server-side (cron de notificaciones). */
export function webpushConfigurado() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) return null;

  if (!configurado) {
    webpush.setVapidDetails(subject, publicKey, privateKey);
    configurado = true;
  }
  return webpush;
}

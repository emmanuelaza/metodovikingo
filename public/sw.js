// Service worker mínimo: solo maneja push y clicks en la notificación.
// No hace cache de la app (no es un PWA offline-first, solo push).

self.addEventListener("push", (event) => {
  let datos = { titulo: "Reto Vikingo", cuerpo: "Tienes contenido nuevo disponible.", url: "/" };
  try {
    if (event.data) datos = { ...datos, ...event.data.json() };
  } catch {
    // Payload no era JSON: se usa el texto por defecto.
  }

  event.waitUntil(
    self.registration.showNotification(datos.titulo, {
      body: datos.cuerpo,
      icon: "/favicon.ico",
      data: { url: datos.url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((lista) => {
      const abierta = lista.find((c) => c.url.includes(self.location.origin));
      if (abierta) return abierta.focus().then(() => abierta.navigate(url));
      return self.clients.openWindow(url);
    }),
  );
});

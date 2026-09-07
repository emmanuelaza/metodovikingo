import { AD_SLOTS, type AdSlotName } from "@/lib/adsConfig";

/**
 * Los banners "iframe" de Adsterra (highrevenueformat.com) usan document.write,
 * lo que no convive bien con el árbol de React. Aislarlos en su propio <iframe>
 * -apuntando a esta ruta, que sirve un HTML mínimo y estático- evita el
 * conflicto por completo y deja el tamaño exacto reservado (cero CLS).
 *
 * El slot se resuelve server-side desde `lib/adsConfig.ts`: nunca se acepta
 * key/ancho/alto directo por query string, para no convertir esta ruta en un
 * cargador de scripts arbitrarios.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slot = searchParams.get("slot") as AdSlotName | null;
  const config = slot ? AD_SLOTS[slot] : undefined;

  if (!config || config.tipo !== "iframe") {
    return new Response("Slot inválido", { status: 400 });
  }

  const html = `<!doctype html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;overflow:hidden;background:transparent">
<script>
atOptions = { key: ${JSON.stringify(config.key)}, format: "iframe", height: ${config.height}, width: ${config.width}, params: {} };
</script>
<script src="https://www.highrevenueformat.com/${config.key}/invoke.js"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

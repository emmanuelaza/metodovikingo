import { ImageResponse } from "next/og";

function clamp(valor: string | null, min: number, max: number, def: number): number {
  const n = Number.parseInt(valor ?? "", 10);
  if (!Number.isFinite(n)) return def;
  return Math.max(min, Math.min(max, n));
}

/** Imagen compartible de la racha: /api/og/racha?racha=12&dia=12 (1080x1080). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const racha = clamp(searchParams.get("racha"), 0, 999, 0);
  const dia = clamp(searchParams.get("dia"), 0, 30, 0);
  const llamas = Math.min(5, Math.max(1, Math.ceil(racha / 6)));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0B0C0F 0%, #111318 60%, #181B21 100%)",
          color: "#F2EFE9",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 64,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: 8,
          }}
        >
          <span style={{ color: "#FF8A3D" }}>⚔</span>
          <span>RETO VIKINGO</span>
        </div>

        <div style={{ display: "flex", fontSize: 140, marginBottom: 8 }}>{"🔥".repeat(llamas)}</div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 20,
            fontSize: 260,
            fontWeight: 900,
            lineHeight: 1,
            color: "#FF8A3D",
          }}
        >
          {racha}
          <span style={{ fontSize: 72, color: "#F2EFE9", fontWeight: 700 }}>{racha === 1 ? "día" : "días"}</span>
        </div>

        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, marginTop: 8 }}>de racha</div>

        {dia > 0 && (
          <div
            style={{
              display: "flex",
              marginTop: 48,
              padding: "16px 40px",
              borderRadius: 999,
              border: "4px solid #FF8A3D",
              fontSize: 40,
              fontWeight: 700,
              color: "#FF8A3D",
            }}
          >
            Día {dia} de 30 completado
          </div>
        )}

        <div style={{ position: "absolute", bottom: 64, display: "flex", fontSize: 34, color: "#9AA0A8" }}>
          Reto gratuito de 30 días · Método Vikingo
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Content-Disposition": `inline; filename="racha-vikingo-${racha}.png"`,
      },
    },
  );
}

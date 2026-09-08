import { ImageResponse } from "next/og";

/** Imagen OG genérica del sitio (1200x630) para compartir enlaces sin contexto de usuario. */
export async function GET() {
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 800, letterSpacing: 6 }}>
          <span style={{ color: "#FF8A3D" }}>⚔</span>
          <span>RETO VIKINGO</span>
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 900, marginTop: 24, color: "#FF8A3D" }}>30 días</div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 16, color: "#9AA0A8" }}>
          Curso gratuito de nutrición y entrenamiento
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

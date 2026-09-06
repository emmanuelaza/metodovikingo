export type AdProvider = "adsense" | "adsterra";

/** Un solo interruptor para apagar todos los anuncios del sitio. */
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export const AD_PROVIDER: AdProvider =
  process.env.NEXT_PUBLIC_AD_PROVIDER === "adsterra" ? "adsterra" : "adsense";

export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
export const ADSTERRA_ZONE_ID = process.env.NEXT_PUBLIC_ADSTERRA_ZONE_ID ?? "";

/** IDs de slot de AdSense por posición (opcional; si no hay, se usa formato auto). */
export const ADSENSE_SLOTS: Record<string, string | undefined> = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  "mid-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
};

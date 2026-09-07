/**
 * Los 4 slots de Adsterra en uso (de los 7 códigos aprobados, se descartan el
 * banner 468x60 y los dos skyscraper 160x600/160x300: no encajan en un layout
 * mobile-first de una sola columna y solo suman peso sin aportar más que estos 4).
 */
export type AdSlotConfig =
  | {
      tipo: "native";
      key: string;
      /** Adsterra no publica una altura exacta para banners nativos; es una reserva estimada para minimizar CLS. */
      minHeight: number;
    }
  | {
      tipo: "iframe";
      key: string;
      width: number;
      height: number;
    };

export const AD_SLOTS = {
  /** Dentro de cada lección, entre la introducción/concepto y la rutina del día. */
  nativeBannerLeccion: {
    tipo: "native",
    key: "e0639d9b5cb03ec4baa6f5ed3b97f119",
    minHeight: 100,
  },
  /** En el temario y cerca (no pegado) del botón "Continúa donde quedaste". */
  banner300x250Dashboard: {
    tipo: "iframe",
    key: "15655d6c4b13ac96645fd23f329cc18d",
    width: 300,
    height: 250,
  },
  /** Footer fijo, solo móvil. */
  banner320x50FooterMobile: {
    tipo: "iframe",
    key: "05b6c58e768313262da9b102b6828829",
    width: 320,
    height: 50,
  },
  /** Footer, solo escritorio. Mutuamente excluyente con el de 320x50 por breakpoint. */
  banner728x90HeaderDesktop: {
    tipo: "iframe",
    key: "17ef6c90850ec5f7a02e722b879a2c86",
    width: 728,
    height: 90,
  },
} as const satisfies Record<string, AdSlotConfig>;

export type AdSlotName = keyof typeof AD_SLOTS;

import { ADS_ENABLED } from "@/lib/ads";
import { AD_SLOTS, type AdSlotName } from "@/lib/adsConfig";
import NativeAdSlot from "@/app/components/NativeAdSlot";

/**
 * Slot de anuncio Adsterra. Se apaga por completo con NEXT_PUBLIC_ADS_ENABLED=false.
 * Nunca colocar pegado al checkbox de "marcar como completado" ni a los botones
 * de navegación entre días — riesgo de clicks accidentales.
 */
export default function AdSlot({ slot, className = "" }: { slot: AdSlotName; className?: string }) {
  if (!ADS_ENABLED) return null;
  const config = AD_SLOTS[slot];

  if (config.tipo === "native") {
    return (
      <div className={className}>
        <NativeAdSlot
          containerId={`container-${config.key}`}
          src={`https://pl31219369.profitableratecpmnetwork.com/${config.key}/invoke.js`}
          minHeight={config.minHeight}
        />
      </div>
    );
  }

  // Formato iframe (document.write): aislado en su propia ruta estática, ver app/api/ads/frame.
  return (
    <div className={`flex justify-center overflow-hidden ${className}`} style={{ width: config.width, height: config.height }}>
      <iframe
        src={`/api/ads/frame?slot=${slot}`}
        width={config.width}
        height={config.height}
        style={{ border: 0 }}
        loading="lazy"
        title="Publicidad"
      />
    </div>
  );
}

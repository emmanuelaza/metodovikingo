"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { palabrasCoinciden } from "@/lib/texto";

export type EstadoAuth =
  | { paso: "palabra"; error?: string }
  | { paso: "contacto"; error?: string }
  | { paso: "codigo"; email: string; error?: string };

const PALABRA_ENTRADA = process.env.NEXT_PUBLIC_PALABRA_ENTRADA || "VIKINGO";

async function siteUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

/** Paso 1: la palabra que dice el creador en TikTok. */
export async function validarPalabraEntrada(
  _prev: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const palabra = String(formData.get("palabra") ?? "");
  if (!palabrasCoinciden(palabra, PALABRA_ENTRADA)) {
    return { paso: "palabra", error: "Esa no es la palabra. Está en el video 👀" };
  }
  return { paso: "contacto" };
}

/** Paso 2: captura de contacto → envía magic link + código por email. */
export async function enviarMagicLink(_prev: EstadoAuth, formData: FormData): Promise<EstadoAuth> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const nombre = String(formData.get("nombre") ?? "").trim().slice(0, 60);
  const whatsapp = String(formData.get("whatsapp") ?? "")
    .replace(/[^\d+]/g, "")
    .slice(0, 20);
  const objetivoRaw = String(formData.get("objetivo") ?? "");
  const objetivo = ["bajar_grasa", "ganar_musculo", "ambos"].includes(objetivoRaw)
    ? objetivoRaw
    : undefined;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { paso: "contacto", error: "Escribe un correo válido." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${await siteUrl()}/auth/callback`,
      data: { nombre, whatsapp, objetivo },
    },
  });

  if (error) {
    return { paso: "contacto", error: "No pudimos enviar el correo. Intenta de nuevo." };
  }
  return { paso: "codigo", email };
}

/** Paso 3 (alternativo al link): código de 6 dígitos del email. */
export async function verificarCodigo(_prev: EstadoAuth, formData: FormData): Promise<EstadoAuth> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const token = String(formData.get("codigo") ?? "").replace(/\D/g, "");

  if (token.length < 6) {
    return { paso: "codigo", email, error: "El código tiene 6 dígitos." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) {
    return { paso: "codigo", email, error: "Código incorrecto o vencido. Pide uno nuevo." };
  }
  redirect("/dashboard");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

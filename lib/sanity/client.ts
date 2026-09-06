import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** true si hay un proyecto de Sanity configurado; si no, se usa el contenido local. */
export const SANITY_CONFIGURADO = Boolean(projectId);

let cliente: SanityClient | null = null;

export function sanityClient(): SanityClient {
  if (!projectId) throw new Error("Sanity no está configurado (NEXT_PUBLIC_SANITY_PROJECT_ID).");
  if (!cliente) {
    cliente = createClient({
      projectId,
      dataset,
      apiVersion: "2024-10-01",
      useCdn: !process.env.SANITY_API_TOKEN,
      token: process.env.SANITY_API_TOKEN,
      perspective: "published",
    });
  }
  return cliente;
}

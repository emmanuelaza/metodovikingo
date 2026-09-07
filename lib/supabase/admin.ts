import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente con service_role: ignora RLS. Uso exclusivo del cron de
 * notificaciones (app/api/cron/notificar), que necesita leer perfiles y
 * suscripciones de todos los usuarios. Nunca importar desde código que
 * corra en el cliente ni desde una ruta accesible por un usuario normal.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY para el cliente admin.");
  }
  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

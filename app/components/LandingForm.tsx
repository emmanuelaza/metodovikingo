"use client";

import { useActionState } from "react";
import {
  enviarMagicLink,
  validarPalabraEntrada,
  verificarCodigo,
  type EstadoAuth,
} from "@/app/auth/actions";

async function siguientePaso(prev: EstadoAuth, formData: FormData): Promise<EstadoAuth> {
  const paso = formData.get("paso");
  if (paso === "palabra") return validarPalabraEntrada(prev, formData);
  if (paso === "contacto") return enviarMagicLink(prev, formData);
  return verificarCodigo(prev, formData);
}

const inputCls =
  "w-full rounded-lg border border-vk-border bg-vk-bg px-4 py-3 text-base outline-none focus:border-vk-gold";
const btnCls =
  "w-full rounded-lg bg-vk-gold px-4 py-3 font-bold text-vk-bg transition hover:bg-vk-gold-dark disabled:opacity-60";

export default function LandingForm() {
  const [estado, dispatch, pending] = useActionState(siguientePaso, { paso: "palabra" } as EstadoAuth);

  return (
    <div className="rounded-2xl border border-vk-border bg-vk-surface p-5">
      {estado.paso === "palabra" && (
        <form action={dispatch} className="space-y-3">
          <input type="hidden" name="paso" value="palabra" />
          <label className="block text-sm font-semibold">Escribe la palabra del video para entrar</label>
          <input
            name="palabra"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="LA PALABRA"
            className={`${inputCls} text-center text-xl font-bold uppercase tracking-widest ${estado.error ? "anim-shake border-vk-red" : ""}`}
            required
          />
          {estado.error && <p className="text-sm text-vk-red">{estado.error}</p>}
          <button type="submit" disabled={pending} className={btnCls}>
            {pending ? "Verificando…" : "Entrar al reto"}
          </button>
        </form>
      )}

      {estado.paso === "contacto" && (
        <form action={dispatch} className="space-y-3 anim-rise">
          <input type="hidden" name="paso" value="contacto" />
          <p className="text-sm font-semibold text-vk-green">✓ Palabra correcta. Último paso:</p>
          <input name="nombre" placeholder="Tu nombre" className={inputCls} maxLength={60} />
          <input
            name="email"
            type="email"
            inputMode="email"
            placeholder="Tu correo (aquí llega el acceso)"
            className={inputCls}
            required
          />
          <input
            name="whatsapp"
            type="tel"
            inputMode="tel"
            placeholder="WhatsApp (opcional, para recordatorios)"
            className={inputCls}
          />
          <select name="objetivo" className={inputCls} defaultValue="">
            <option value="" disabled>
              ¿Cuál es tu objetivo?
            </option>
            <option value="bajar_grasa">Bajar grasa</option>
            <option value="ganar_musculo">Ganar músculo</option>
            <option value="ambos">Ambos</option>
          </select>
          {estado.error && <p className="text-sm text-vk-red">{estado.error}</p>}
          <button type="submit" disabled={pending} className={btnCls}>
            {pending ? "Enviando…" : "Empezar el día 1"}
          </button>
          <p className="text-xs text-vk-muted">Sin contraseña. Te enviamos un link y un código de acceso al correo.</p>
        </form>
      )}

      {estado.paso === "codigo" && (
        <div className="space-y-3 anim-rise">
          <p className="font-semibold">📬 Revisa tu correo</p>
          <p className="text-sm text-vk-muted">
            Enviamos un link a <span className="text-vk-text">{estado.email}</span>. Toca el link o escribe aquí el
            código de 6 dígitos.
          </p>
          <form action={dispatch} className="space-y-3">
            <input type="hidden" name="paso" value="codigo" />
            <input type="hidden" name="email" value={estado.email} />
            <input
              name="codigo"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              maxLength={6}
              className={`${inputCls} text-center text-2xl tracking-[0.5em]`}
              required
            />
            {estado.error && <p className="text-sm text-vk-red">{estado.error}</p>}
            <button type="submit" disabled={pending} className={btnCls}>
              {pending ? "Verificando…" : "Entrar"}
            </button>
          </form>
          <form action={dispatch}>
            <input type="hidden" name="paso" value="contacto" />
            <input type="hidden" name="email" value={estado.email} />
            <button type="submit" disabled={pending} className="text-xs text-vk-muted underline">
              Reenviar correo
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

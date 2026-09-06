"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fechaCorta } from "@/lib/fecha";

export type PuntoProgreso = { fecha: string; peso: number | null; cintura: number | null };

// Colores validados contra la superficie oscura (#141922) con el validador de dataviz.
const COLOR_PESO = "#b8831a";
const COLOR_CINTURA = "#47a86f";
const INK_MUTED = "#97a2b3";
const GRID = "#2a3442";

type TooltipPayload = { value?: number | string | null; payload?: PuntoProgreso }[];

function TooltipVK({
  active,
  payload,
  unidad,
}: {
  active?: boolean;
  payload?: TooltipPayload;
  unidad: string;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  const valor = p.value;
  const fecha = p.payload?.fecha;
  if (valor === null || valor === undefined || !fecha) return null;
  return (
    <div className="rounded-lg border border-vk-border bg-vk-bg px-3 py-2 text-sm shadow-lg">
      <p className="text-xs text-vk-muted">{fechaCorta(fecha)}</p>
      <p className="font-semibold">
        {valor} {unidad}
      </p>
    </div>
  );
}

function Serie({
  datos,
  clave,
  color,
  unidad,
  titulo,
}: {
  datos: PuntoProgreso[];
  clave: "peso" | "cintura";
  color: string;
  unidad: string;
  titulo: string;
}) {
  const conDatos = datos.filter((d) => d[clave] !== null);
  if (conDatos.length === 0) return null;

  const primero = conDatos[0][clave] as number;
  const ultimo = conDatos[conDatos.length - 1][clave] as number;
  const delta = Math.round((ultimo - primero) * 10) / 10;

  return (
    <div className="rounded-2xl border border-vk-border bg-vk-surface p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-sm font-bold">{titulo}</p>
        <p className="text-sm text-vk-muted">
          <span className="text-lg font-black text-vk-text">
            {ultimo} {unidad}
          </span>
          {conDatos.length > 1 && (
            <span className="ml-2">
              {delta > 0 ? "+" : ""}
              {delta} {unidad} desde el inicio
            </span>
          )}
        </p>
      </div>

      {conDatos.length < 2 ? (
        <p className="py-6 text-center text-sm text-vk-muted">Registra un segundo dato para ver la tendencia.</p>
      ) : (
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conDatos} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
              <CartesianGrid stroke={GRID} strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="fecha"
                tickFormatter={fechaCorta}
                tick={{ fill: INK_MUTED, fontSize: 11 }}
                axisLine={{ stroke: GRID }}
                tickLine={false}
                minTickGap={24}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: INK_MUTED, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip
                content={<TooltipVK unidad={unidad} />}
                cursor={{ stroke: INK_MUTED, strokeWidth: 1, strokeDasharray: "3 3" }}
              />
              <Line
                type="monotone"
                dataKey={clave}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4, fill: color, stroke: "#141922", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: color, stroke: "#141922", strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/** Dos gráficas independientes (peso y cintura tienen unidades distintas: nunca doble eje). */
export default function GraficaProgreso({ datos }: { datos: PuntoProgreso[] }) {
  return (
    <div className="space-y-4">
      <Serie datos={datos} clave="peso" color={COLOR_PESO} unidad="kg" titulo="Peso" />
      <Serie datos={datos} clave="cintura" color={COLOR_CINTURA} unidad="cm" titulo="Cintura" />
    </div>
  );
}

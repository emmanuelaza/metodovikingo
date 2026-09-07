import { defineField, defineType } from "sanity";

/** Copiar a tu proyecto de Sanity Studio (ver sanity/README.md). Agrupa el temario en 5 bloques. */
export const fase = defineType({
  name: "fase",
  title: "Fase",
  type: "document",
  fields: [
    defineField({ name: "numero", title: "Número", type: "number", validation: (R) => R.required().min(1).max(5).integer() }),
    defineField({ name: "nombre", title: "Nombre", type: "string", validation: (R) => R.required() }),
    defineField({ name: "descripcion", title: "Descripción (una línea)", type: "string", validation: (R) => R.required() }),
    defineField({ name: "diaInicio", title: "Día de inicio", type: "number", validation: (R) => R.required().min(1).max(30).integer() }),
    defineField({ name: "diaFin", title: "Día final", type: "number", validation: (R) => R.required().min(1).max(30).integer() }),
  ],
  orderings: [{ title: "Por número", name: "porNumero", by: [{ field: "numero", direction: "asc" }] }],
  preview: {
    select: { numero: "numero", nombre: "nombre" },
    prepare: ({ numero, nombre }) => ({ title: `Fase ${numero} — ${nombre ?? ""}` }),
  },
});

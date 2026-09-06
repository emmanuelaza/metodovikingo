import { defineField, defineType } from "sanity";

/** Copiar a tu proyecto de Sanity Studio (ver sanity/README.md). */
export const leccionDiaria = defineType({
  name: "leccionDiaria",
  title: "Lección Diaria",
  type: "document",
  fields: [
    defineField({
      name: "diaNumero",
      title: "Día",
      type: "number",
      validation: (R) => R.required().min(1).max(30).integer(),
    }),
    defineField({ name: "titulo", title: "Título", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "palabraDelDia",
      title: "Palabra del día (para desbloquear)",
      type: "string",
      description: "Se compara sin tildes ni mayúsculas.",
      validation: (R) => R.required(),
    }),
    defineField({ name: "contenido", title: "Contenido", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "imagen", title: "Imagen", type: "image", options: { hotspot: true } }),
    defineField({ name: "tipAccionable", title: "Tip accionable del día", type: "text", rows: 3 }),
    defineField({ name: "cliffhanger", title: "Cierre / gancho al día siguiente", type: "text", rows: 2 }),
    defineField({
      name: "esDiaDePieza",
      title: "¿Desbloquea pieza del método?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Por día", name: "porDia", by: [{ field: "diaNumero", direction: "asc" }] }],
  preview: {
    select: { dia: "diaNumero", titulo: "titulo" },
    prepare: ({ dia, titulo }) => ({ title: `Día ${dia} — ${titulo ?? ""}` }),
  },
});

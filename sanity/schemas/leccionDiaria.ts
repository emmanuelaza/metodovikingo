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
    defineField({
      name: "fase",
      title: "Fase",
      type: "number",
      description: "1 al 5. Agrupa el temario visualmente.",
      validation: (R) => R.required().min(1).max(5).integer(),
    }),
    defineField({ name: "titulo", title: "Título", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "introduccion",
      title: "Introducción (100-150 palabras)",
      type: "text",
      rows: 4,
      description: "Por qué importa este día específico.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "concepto",
      title: "Concepto (150-200 palabras)",
      type: "text",
      rows: 6,
      description: "Explicación de la idea central del día.",
      validation: (R) => R.required(),
    }),
    defineField({ name: "rutinaTitulo", title: "Título de la rutina/plan", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "rutinaItems",
      title: "Rutina o plan concreto (lista)",
      type: "array",
      of: [{ type: "string" }],
      description: "Ejercicios con series/repeticiones, o plan de comidas con horarios. Accionable, no teoría.",
      validation: (R) => R.required().min(1),
    }),
    defineField({ name: "tipAccionable", title: "Tip accionable de cierre (1-2 líneas)", type: "text", rows: 2 }),
    defineField({
      name: "previewSiguiente",
      title: "Preview del día siguiente (1 línea)",
      type: "string",
    }),
    defineField({
      name: "esDiaDePieza",
      title: "¿Desbloquea runa del Método Secreto?",
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

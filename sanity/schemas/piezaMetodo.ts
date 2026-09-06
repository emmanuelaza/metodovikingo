import { defineField, defineType } from "sanity";

/** Las 4 piezas del Método Secreto (días 7, 14, 21 y 30). */
export const piezaMetodo = defineType({
  name: "piezaMetodo",
  title: "Pieza del Método",
  type: "document",
  fields: [
    defineField({
      name: "numero",
      title: "Número de pieza",
      type: "number",
      validation: (R) => R.required().min(1).max(4).integer(),
    }),
    defineField({
      name: "dia",
      title: "Día en que se desbloquea",
      type: "number",
      options: { list: [7, 14, 21, 30] },
      validation: (R) => R.required(),
    }),
    defineField({ name: "titulo", title: "Título", type: "string", validation: (R) => R.required() }),
    defineField({ name: "texto", title: "Texto de la pieza", type: "text", rows: 5 }),
  ],
  preview: {
    select: { numero: "numero", titulo: "titulo" },
    prepare: ({ numero, titulo }) => ({ title: `Pieza ${numero} — ${titulo ?? ""}` }),
  },
});

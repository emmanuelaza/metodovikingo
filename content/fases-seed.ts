export type Fase = {
  numero: number;
  nombre: string;
  descripcion: string;
  diaInicio: number;
  diaFin: number;
};

/** Fallback local. En Sanity: tipo `fase`. */
export const FASES_SEED: Fase[] = [
  {
    numero: 1,
    nombre: "Los Fundamentos del Vikingo",
    descripcion: "Aquí sientas las bases que van a sostener todo el reto.",
    diaInicio: 1,
    diaFin: 7,
  },
  {
    numero: 2,
    nombre: "El Forjado",
    descripcion: "Aquí tu cuerpo empieza a transformarse de verdad.",
    diaInicio: 8,
    diaFin: 14,
  },
  {
    numero: 3,
    nombre: "La Aplicación",
    descripcion: "Aquí pasas de aprender a ejecutar sin excusas.",
    diaInicio: 15,
    diaFin: 21,
  },
  {
    numero: 4,
    nombre: "La Anticipación",
    descripcion: "Aquí afinas los detalles que separan un buen resultado de uno extraordinario.",
    diaInicio: 22,
    diaFin: 29,
  },
  {
    numero: 5,
    nombre: "La Revelación",
    descripcion: "El Método Vikingo, completo.",
    diaInicio: 30,
    diaFin: 30,
  },
];

export function faseDelDia(dia: number, fases: Fase[] = FASES_SEED): Fase | undefined {
  return fases.find((f) => dia >= f.diaInicio && dia <= f.diaFin);
}

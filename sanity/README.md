# Sanity — contenido del reto

La app **no** embebe el Studio (para mantener el bundle liviano). Los schemas de esta carpeta se copian a un proyecto de Sanity Studio independiente.

## Crear el Studio

```bash
npm create sanity@latest -- --template clean --create-project "Metodo Vikingo" --dataset production
cd <carpeta-del-studio>
```

Copia `schemas/leccionDiaria.ts`, `schemas/piezaMetodo.ts` y `schemas/fase.ts` a `schemaTypes/` del Studio y regístralos:

```ts
// schemaTypes/index.ts
import { leccionDiaria } from "./leccionDiaria";
import { piezaMetodo } from "./piezaMetodo";
import { fase } from "./fase";
export const schemaTypes = [leccionDiaria, piezaMetodo, fase];
```

## Conectar la app

En `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<projectId>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<token de lectura, opcional>
```

Mientras `NEXT_PUBLIC_SANITY_PROJECT_ID` esté vacío, la app usa el contenido local de `content/lecciones-seed.ts` y `content/piezas-seed.ts`.

## Documentos necesarios

- 30 documentos `leccionDiaria` (días 1 a 30), cada uno con introducción, concepto, rutina/plan (`rutinaTitulo` + `rutinaItems`), tip accionable y preview del día siguiente. Marca `esDiaDePieza` en los días 7, 14, 21 y 30.
- 4 documentos `piezaMetodo` (numero 1–4, dias 7/14/21/30) — las Runas del Método Secreto.
- 5 documentos `fase` (numero 1–5) — agrupan el temario visualmente. Ver `content/fases-seed.ts` para los nombres/descripciones/rangos exactos.

Si falta la lección de un día en Sanity, la app cae al seed local para ese día — el reto nunca se rompe por un documento faltante.

Los cambios en Sanity tardan hasta 5 minutos en verse (revalidate: 300).

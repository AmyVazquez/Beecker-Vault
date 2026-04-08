---
tags: [glendale, feature, ingesta, estados]
up: "[[00 - Índice]]"
---

# F1 – Ingesta Diaria y Segmentación de Estados

## Qué hace el Agente

Lee la tabla MySQL de returns de Glendale **una vez por día hábil (lunes–viernes), al cierre del día**. Todas las solicitudes, independientemente de si llegaron por formulario web o por llamada telefónica atendida por CS, ya están normalizadas en esta tabla.

> El Agente **no valida completitud** — esa responsabilidad es del equipo de Glendale antes de que el Agente procese.

## Trigger

Una vez por día hábil (lunes–viernes), al final del día.

## Lógica de procesamiento

### 1. Consulta inicial
El Agente recupera todos los registros cuyo status sea:
- `Pending – Complete Info`
- `Needs Attention`

Todos los demás estados se ignoran.

---

### 2. Registros con status `Pending – Complete Info`

Para cada registro:
- El Agente lee el **valor monetario** del return.
- Compara contra el **umbral de auto-aprobación ($150 – TBD)**.

| Valor vs. Umbral | Acción |
|---|---|
| **Por debajo** del umbral | Status → `Approved` (auto-aprobado) |
| **Igual o por encima** del umbral | Status → `Needs Attention` (revisión humana) |

> El umbral aplica **solo** a: Damaged Goods, Wrong Item, Manufacturer Defect.  
> Refund y Missing Item **nunca** tienen auto-aprobación.

---

### 3. Registros con status `Needs Attention`

Para cada registro, el Agente verifica si el equipo de Glendale agregó comentarios:

| Comentarios presentes | Acción |
|---|---|
| **Sí** | Genera email al cliente (vía LLM con los comentarios como contexto) → envía en horario laboral → status permanece `Needs Attention` |

> **Pendiente:** El rango exacto de horas del horario laboral no ha sido definido. Pendiente de alineación con Glendale.
| **No** | Notificación interna al equipo de Glendale para que tome acción → sin email al cliente → status permanece `Needs Attention` |

---

### 4. Registros con status `Rejected`

| Comentarios presentes | Acción |
|---|---|
| **Sí** | Genera email al cliente → envía en horario laboral → registro archivado/eliminado de `Rejected` |
| **No** | Notificación interna al equipo → sin email al cliente → status cambia a `Needs Attention` |

---

### 5. Integridad de estados

- El Agente **no modifica ni sobreescribe** decisiones del equipo.
- Cada return se procesa **una sola vez** por ejecución diaria.

## Criterios de éxito

- [ ] El Agente ingesta correctamente todos los returns nuevos y actualizados cada día hábil.
- [ ] Ningún registro con status `Pending – Complete Info` o `Needs Attention` es omitido.
- [ ] No se procesa el mismo registro dos veces en un mismo día.
- [ ] 100% de los returns bajo el umbral se auto-aprueban sin intervención humana.
- [ ] 100% de los returns sobre el umbral se enrutan a `Needs Attention` en el mismo día hábil.
- [ ] Ningún return elude la lógica del umbral.

---
← [[03 - Sistemas Involucrados]] | → [[F2 - Comunicaciones al Cliente]]

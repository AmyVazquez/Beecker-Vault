---
tags: [overall, funcionalidad, comparacion, personal-activo]
up: "[[00 - Índice]]"
---

# F6 – Comparar Perfil vs BD

## Descripción

Antes de proceder al agendamiento de la entrevista, el agente verifica si el postulante aprobado ya se encuentra laborando dentro de Overall. Esta validación evita generar una entrevista para un candidato que ya es empleado activo.

## Flujo

1. El sistema consulta la **BD Personal Activo** con el DNI o número de documento del postulante.
2. Resultado:

| Caso | Estado | Acción |
|---|---|---|
| El postulante ya trabaja en Overall | `Activo en Overall` | Fin del flujo; no se agenda entrevista |
| El postulante no trabaja en Overall | Perfil aprobado confirmado | Continúa a Etapa 3 (Agendamiento) |

3. Si continúa → se actualiza el registro en BD Postulantes con el estado final.

## Bases de datos involucradas

- **BD Personal Activo** (lectura) – dueño: Overall
- **BD Postulantes** (escritura) – actualización del registro

## Nota

Esta validación es la última de la Etapa 2. Un candidato que pasa esta validación con estado `Perfil aprobado` entra directamente a [[F7 - Notificar Reclutador]] y al agendamiento de entrevista.

---
← [[F5 - Resguardar Información]] | → [[F7 - Notificar Reclutador]]

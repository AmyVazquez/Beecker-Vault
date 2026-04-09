---
tags: [overall, funcionalidad, lista-negra, antecedentes]
up: "[[00 - Índice]]"
---

# F2 – Validar Lista Negra y Antecedentes

## Descripción

Antes de evaluar la experiencia del candidato, el agente valida que el postulante no tenga restricciones en la lista negra de Overall ni antecedentes registrados. Esta validación ocurre durante la Etapa 2 (Evaluación candidato), después de que el postulante selecciona el puesto de interés.

## Flujo de validación

### 1. Consulta BD Lista Negra

- Parámetro de búsqueda: **DNI o número de documento**
- Dueño de la BD: Overall
- Resultado:
  - Aparece en LN → estado `Lista Negra`. Fin del flujo para el postulante.
  - No aparece → continúa.

### 2. Consulta API de Antecedentes

- Endpoint: API de Overall
- Parámetro de búsqueda: **DNI o número de documento**
- Dueño: Overall
- Resultado:
  - Tiene antecedentes → estado `Antecedentes`. Fin del flujo.
  - Sin antecedentes → estado `Pre-filtro`. Continúa a F3.

## Comportamiento ante errores de API

> **Pendiente:** Confirmar el comportamiento del agente si la API de Antecedentes no responde o devuelve error. ¿Se suspende la sesión? ¿Se reintenta? ¿Se continúa con advertencia?

## Estados posibles al terminar F2

| Estado | Significado |
|---|---|
| `Lista Negra` | El postulante está en la lista negra; se rechaza la postulación |
| `Antecedentes` | El postulante tiene antecedentes registrados; se rechaza la postulación |
| `Pre-filtro` | Pasó ambas validaciones; continúa a evaluación de experiencia |

---
← [[F1 - Preguntar Datos Generales]] | → [[F3 - Evaluar Experiencia]]

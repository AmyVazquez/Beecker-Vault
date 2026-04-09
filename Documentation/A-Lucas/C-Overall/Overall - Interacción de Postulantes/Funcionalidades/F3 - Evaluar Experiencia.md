---
tags:
  - overall
  - funcionalidad
  - evaluacion
  - experiencia
up: "[[Beecker-Vault/Documentation/A-Ryan/C-Glendale/Glendale - Returns Automation/00 - Índice]]"
---

# F3 – Evaluar Experiencia

## Descripción

Después de validar que el postulante no está en lista negra ni tiene antecedentes, el agente evalúa si su perfil (experiencia) cumple con los requisitos del puesto seleccionado.

## Flujo de evaluación

### 1. Selección del puesto de interés

- El agente presenta los **puestos activos disponibles** consultados desde BD Puestos Activos.
- Si no hay vacantes activas en ese momento → estado `Sin vacantes activas`. Fin del flujo.
- El postulante selecciona el puesto de su interés.

### 2. Presentación de requisitos y beneficios

El agente presenta al postulante:
- Requisitos y resumen de actividades del puesto
- Beneficios del puesto

### 3. Preguntas de evaluación

El agente hace las **3 preguntas de experiencia** definidas en BD Puestos Activos para ese puesto específico.

- Cada pregunta tiene respuestas correctas predefinidas en la BD.
- El sistema compara las respuestas del postulante contra las respuestas correctas.

### 4. Resultado de la evaluación

| Resultado | Estado | Siguiente paso |
|---|---|---|
| Cumple los requisitos de experiencia | `Perfil aprobado` | Continúa a F5 (almacenamiento) → F6 → Etapa 3 |
| No tiene experiencia suficiente | `Sin experiencia` | Ver [[F4 - Gestionar Sin Experiencia]] |
| Perfil no aplica al puesto | `Perfil descartado` | Fin del flujo |
| Abandona durante la evaluación | `Abandono` | Fin del flujo |

## Bases de datos involucradas

- **BD Puestos Activos** (lectura): puestos disponibles, requisitos, beneficios, preguntas de evaluación, respuestas correctas

---
← [[F2 - Validar Lista Negra y Antecedentes]] | → [[F4 - Gestionar Sin Experiencia]]

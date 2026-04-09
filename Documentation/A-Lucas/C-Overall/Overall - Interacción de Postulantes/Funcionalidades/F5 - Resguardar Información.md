---
tags:
  - overall
  - funcionalidad
  - base-de-datos
  - almacenamiento
up: "[[Beecker-Vault/Documentation/A-Ryan/C-Glendale/Glendale - Returns Automation/00 - Índice]]"
---

# F5 – Resguardar Información

## Descripción

Tras completar la evaluación del candidato, el agente guarda o actualiza el registro del postulante en la BD Postulantes. Esta actividad ocurre independientemente del resultado de la evaluación.

## Lógica de escritura en BD Postulantes

| Caso | Acción |
|---|---|
| **Candidato no existe** | Crear nueva línea con **toda** la información del candidato |
| **Candidato existe (misma vacante)** | Actualizar: puntaje de evaluación, preguntas respondidas, fecha de postulación |
| **Candidato no apto** | Guardar igualmente (con el resultado de no apto) |
| **Candidato en Lista Negra o Antecedentes** | Guardar con el tipo correspondiente en la columna "tipo" |
| **Candidato activo en Overall** | Registrar que se encuentra laborando actualmente en Overall |

## Campos que se guardan

Los 15 campos de la BD Postulantes documentados en el PDD OVS.002 (ver documento fuente `[Confidencial] OVS.002_PDD.pdf`).

Campos principales confirmados:
- Nombre completo
- Edad
- DNI / CE
- Número de teléfono
- Distrito
- Puesto de interés
- Resultado de evaluación (apto / no apto)
- Puntaje
- Respuestas a preguntas de evaluación
- Fecha de postulación
- Tipo (LN / antecedentes / activo en Overall, si aplica)

## Bases de datos involucradas

- **BD Postulantes** (escritura) – dueño: Overall
- **BD Beecker** (escritura) – información operativa del proceso

---
← [[F4 - Gestionar Sin Experiencia]] | → [[F6 - Comparar Perfil vs BD]]

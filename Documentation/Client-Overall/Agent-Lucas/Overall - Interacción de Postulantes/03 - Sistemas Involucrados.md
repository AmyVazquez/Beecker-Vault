---
tags: [overall, sistemas, integraciones]
up: "[[00 - Índice]]"
---

# Sistemas Involucrados

## Canal de comunicación

| Sistema | Rol | Dueño |
|---|---|---|
| WhatsApp | Canal principal de interacción con el postulante | Overall |
| Outlook | Envío de notificaciones al reclutador | Overall |

## Bases de datos

| BD | Extracción | Escritura | Dueño |
|---|---|---|---|
| **BD Postulantes** | Verificar si el postulante ya aplicó al puesto (compara DNI + puesto). Validar si DNI existe con teléfono diferente (para actualización de datos sin re-preguntar todo) | Candidato nuevo: crear registro completo. Candidato existente: actualizar puntaje, respuestas y fecha. En todos los casos guarda: si es apto, si está en LN/antecedentes, si está activo en Overall | Overall |
| **BD Lista Negra** | Verificar si el postulante aparece por DNI o número de documento | — | Overall |
| **BD Antecedentes** | Verificar antecedentes del postulante por DNI o número de documento vía API de Overall | — | Overall |
| **BD Personal Activo** | Verificar si el postulante ya trabaja actualmente en Overall | — | Overall |
| **BD Puestos Activos** | 1. Puestos activos disponibles, 2. Requisitos y resumen de actividades, 3. Beneficios del puesto, 4. Preguntas de evaluación (3 preguntas + respuestas correctas), 5. Reclutador responsable de la vacante, 6. Correo del reclutador | — | Overall |
| **BD Distritos** | Determinar el distrito al que hace referencia el postulante al escribirlo | — | Por definir (pendiente) |
| **BD Beecker** | — | Guardar información operativa del proceso | Beecker |

## Run History (Plataforma Beecker)

La plataforma registra cada transacción con las siguientes columnas:

| Columna | Descripción |
|---|---|
| Hora de inicio de solicitud | Timestamp del primer mensaje del postulante |
| Etapa actual | Etapa 1, 2 o 3 del proceso |
| Estado | Estado actual de la transacción (ver [[04 - Flujo de Estados]]) |
| Distrito | Distrito capturado del postulante |
| Edad | Edad del postulante |
| Puesto | Puesto de interés seleccionado |
| Nombre del candidato | Nombre completo |
| DNI / CE | Número de documento de identidad o carné de extranjería |
| No. Teléfono | Número de WhatsApp del postulante |

Funcionalidades de la vista Run History:
- Búsqueda global por todas las columnas
- Filtro por mes (`Selecciona mes`)
- Descarga de datos en CSV

---
← [[02 - Comportamiento del Agente]] | → [[04 - Flujo de Estados]]

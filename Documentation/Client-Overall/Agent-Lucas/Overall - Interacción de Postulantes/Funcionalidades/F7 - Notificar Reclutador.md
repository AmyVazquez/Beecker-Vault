---
tags: [overall, funcionalidad, notificacion, reclutador, outlook]
up: "[[00 - Índice]]"
---

# F7 – Notificar Reclutador

## Descripción

Una vez que el postulante ha agendado su entrevista, el agente envía automáticamente un correo electrónico al reclutador responsable de la vacante con el resumen del candidato y los datos de la entrevista.

## Flujo de la Etapa 3

### 1. Selección de horario

- El agente presenta al postulante los horarios disponibles para la entrevista.
- El postulante elige un horario.
  - Si selecciona horario → estado `Entrevista agendada`. Continúa.
  - Si abandona → estado `Abandono`. Fin del flujo.

> **Pendiente:** Confirmar cómo se gestiona la disponibilidad de horarios y quién la administra (¿Google Calendar, lista manual en BD, otro?).

### 2. Envío de notificación al reclutador

- **Canal:** Outlook (email)
- **Destinatario:** reclutador responsable de la vacante (correo obtenido de BD Puestos Activos)
- **Contenido del email:** datos completos del postulante + hora y fecha de la entrevista agendada

Resultado:
- Email enviado correctamente → estado `Exitoso`.
- Error en el envío del email → estado `Notificación pendiente`.

### 3. Encuesta de satisfacción

- Al cerrar la conversación, el agente captura una encuesta de satisfacción al postulante.

> **Pendiente:** Confirmar si la encuesta es obligatoria o puede ser omitida.

## Bases de datos involucradas

- **BD Puestos Activos** (lectura) – obtener el correo del reclutador de la vacante

## Estados posibles al terminar F7

| Estado | Significado |
|---|---|
| `Exitoso` | Entrevista agendada y reclutador notificado correctamente |
| `Notificación pendiente` | Error al enviar el email; requiere atención manual |
| `Abandono` | El postulante no confirmó el horario |

---
← [[F6 - Comparar Perfil vs BD]] | [[00 - Índice]]

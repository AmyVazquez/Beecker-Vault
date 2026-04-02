---
tags: [glendale, feature, comunicaciones, email]
up: "[[00 - Índice]]"
---

# F2 – Comunicaciones al Cliente

## Qué hace el Agente

Envía emails al cliente en cada etapa del proceso de devolución. Los mensajes deben ser **profesionales, empáticos y no robóticos**. Si el cliente responde con una consulta compleja, el Agente escala al equipo humano.

## Eventos de email

| Evento | Contenido del email | Tono |
|---|---|---|
| **Needs Attention** (info faltante) | "Notamos que falta información en tu solicitud de return. Por favor provee [X] para continuar." | Útil, no acusatorio |
| **Aprobado** | "Tu solicitud de return fue aprobada. [Próximos pasos según tipo de return]." | Positivo, pasos claros |
| **Etiqueta de envío emitida** (donde aplica) | "Encuentra adjunta tu etiqueta de envío prepagada. [Instrucciones]." | Claro, orientado a la acción |
| **Rechazado** | "Tras revisión, no pudimos aprobar tu solicitud por la siguiente razón: [razón]. Contáctanos si tienes preguntas." | Respetuoso, con opción de recurso |

## Reglas operativas

- Los emails **no se envían en horario nocturno** — solo en horas laborales normales.
- El contenido de los emails de rechazo y Needs Attention se **genera con LLM** usando los comentarios del equipo de Glendale como contexto.
- El email del cliente se extrae del mismo registro de la tabla MySQL.
- Se requiere una cuenta de email estilo `noreply@...` con credenciales para el Agente.
- El contenido final de los templates debe ser aprobado por Glendale. *(Ver [[06 - Pendientes y Supuestos]] – ítem #5)*

## Escalación

Si el cliente responde con una consulta compleja que el Agente no puede manejar:
- Se registra un **flag en el historial de ejecución**.
- Se incluye en el **resumen de notificación al equipo de Glendale** al finalizar la ejecución.

---
← [[F1 - Ingesta Diaria y Segmentación de Estados]] | → [[F3 - Mercancía Dañada y Defecto de Fabricante]]

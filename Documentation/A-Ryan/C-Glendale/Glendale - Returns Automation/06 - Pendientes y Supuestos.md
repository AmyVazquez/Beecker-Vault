---
tags:
  - glendale
  - pendientes
  - open-items
  - TBD
up: "[[Beecker-Vault/Documentation/A-Ryan/C-Glendale/Glendale - Returns Automation/00 - Índice]]"
---

# Pendientes y Supuestos

Los siguientes ítems requieren confirmación **antes de iniciar el desarrollo**.

| #   | Ítem                                | Detalle                                                                                                                      | Owner                        | Fecha objetivo |
| --- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| 1   | **Umbral de auto-aprobación**       | Negociación del CFO en progreso. Rango: $150–$200. Se necesita el valor final antes del desarrollo.                          | Jose Barreto / CFO           | TBD            |
| 2   | **Método de integración con MOM**   | Evaluar Opción A (CSV nocturno) vs. Opción B (API/DB directa). Decisión requerida antes del sprint.                          | Jose Barreto / Equipo        | ASAP           |
| 3   | **Acceso a UPS Web API**            | Jose Barreto en reunión con rep de UPS para confirmar disponibilidad de acceso y costo de llamadas a la API.                 | Jose Barreto / UPS Rep       | ASAP           |
| 4   | *(reservado)*                       | —                                                                                                                            | —                            | —              |
| 5   | **Contenido de templates de email** | El copy específico para cada evento (envío, aprobación, rechazo, etiqueta, etc.) debe ser redactado y aprobado por Glendale. | Jose Barreto / Jonathan Piza | TBD            |
| 6   | **Campos de BD para devoluciones** | Confirmar los códigos de status (`Needs Attention`, `Pending`, `Approved`), el campo USD válido y el campo que se usará para gestionar el `return type`. `return_for` no está en uso. | Equipo Glendale / DB | ASAP            |

## Supuestos activos

- El formulario web en `glendale.com` ya normaliza todas las solicitudes en la tabla MySQL (incluyendo las capturadas por CS vía teléfono).
- Las credenciales de MySQL serán provistas por **Vishal**.
- Se proveerá una cuenta de email estilo `noreply@...` con credenciales para el Agente.
- Se está pendiente de recibir las credenciales de `noreply@glendale` para avanzar con pruebas de correo.
- Se está pendiente de que Glendale confirme los códigos de status, el input USD y el campo que deberemos usar como `return type` en la BD.
- Julian (almacén) es el responsable de verificación física para Missing Items y Refunds.

---
← [[Beecker-Vault/Documentation/A-Ryan/C-Glendale/Glendale - Returns Automation/05 - Fuera de Alcance]] | → [[Beecker-Vault/Documentation/A-Ryan/C-Glendale/Glendale - Returns Automation/07 - Aprobaciones]]

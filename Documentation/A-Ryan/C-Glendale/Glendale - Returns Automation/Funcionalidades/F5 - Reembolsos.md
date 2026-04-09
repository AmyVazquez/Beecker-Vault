---
tags:
  - glendale
  - feature
  - refund
  - MOM
up: "[[Beecker-Vault/Documentation/A-Ryan/C-Glendale/Glendale - Returns Automation/00 - Índice]]"
---

# F5 – Reembolsos (Refund)

## Contexto

Un Refund aplica cuando el cliente recibió el artículo correcto pero **ya no lo quiere** (ej. cambio de opinión). A diferencia de Damaged/Wrong Item:
- Glendale **NO provee etiqueta de envío** — el cliente corre con el costo de devolución.
- **No hay auto-aprobación** — el artículo debe revisarse físicamente al llegar antes de procesar el reembolso.

> **Auto-aprobación:** ❌ No aplica.  
> **UPS Web API:** ❌ No se llama.

## Pasos de ejecución

| Paso | Actor | Descripción |
|---|---|---|
| 1 – Trigger | Cliente / CS | Solicitud llega con status `Pending – Complete Info`; el Agente **no auto-aprueba**. |
| 2 – Notificación al cliente | Agente | Email indicando que el cliente debe enviar el artículo a Glendale **a su propio costo**, sin etiqueta prepagada. |
| 3 – Recepción y revisión física | Julian (almacén) | El equipo de almacén revisa el artículo al llegar para confirmar que está en condiciones. Paso manual, no automatizable. |
| 4a – Artículo pasa revisión | Aprobador | Cambia status a `Approved`. |
| 4b – Artículo NO pasa revisión | Aprobador | Cambia status a `Rejected` y agrega comentarios con la razón. |
| 5 – Acción en MOM | Agente | Ejecuta el proceso RMA en MOM: Order Edits → Return Merchandise Authorization → ingresa cantidad → reason `Changed Their Mind` → agrega notas → guarda (genera número RMA) → procesa para emitir el reembolso y retornar el artículo al inventario. |

## MOM Reason Code

| Tipo de Return | Reason Code en MOM |
|---|---|
| Refund | `Changed Their Mind` |

## Criterios de éxito

- [ ] Cliente notificado de la aprobación e instrucciones de envío sin etiqueta prepagada.
- [ ] Artículo revisado manualmente al llegar antes de procesar el reembolso.
- [ ] Reembolso emitido en MOM y artículo retornado al inventario.

---
← [[F4 - Artículo Incorrecto]] | → [[F6 - Artículo Faltante]]

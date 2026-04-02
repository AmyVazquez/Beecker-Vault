---
tags: [glendale, feature, missing-item, MOM]
up: "[[00 - Índice]]"
---

# F6 – Artículo Faltante (Missing Item)

## Contexto

Un Missing Item ocurre cuando el cliente reporta que recibió **menos artículos de los pedidos**. Incluye una verificación manual obligatoria en almacén antes de tomar cualquier acción.

> **Auto-aprobación:** ❌ No aplica.  
> **UPS Web API:** ❌ No se llama. El artículo de reemplazo se envía como un nuevo outbound order desde el almacén de Glendale.

## Pasos de ejecución

| Paso | Actor | Descripción |
|---|---|---|
| 1 – Trigger | Cliente / CS | Formulario con artículo(s) faltante(s), cantidad y número de factura. Aprobación manual requerida por almacén (Julian). |
| 2 – Conteo en almacén | Julian (almacén) | Va físicamente al almacén, localiza el bin del SKU relevante y cuenta el inventario disponible para verificar el reclamo. |
| 3a – Conteo confirma faltante | Julian | Si se confirma la discrepancia, Julian marca el request como `Approved`. El Agente procede al Paso 4. |
| 3b – Conteo no confirma | Julian | Si el inventario está correcto, Julian marca como `Rejected` y agrega comentarios. El Agente envía email al cliente solicitando re-verificación: *"¿Podrías revisar de nuevo? A veces los artículos vienen en cajas separadas."* — **La política de Glendale es nunca negarle al cliente de manera tajante.** |
| 4 – Acción en MOM | Agente | Ejecuta vía integración backend (NO UI): navegar a la orden → seleccionar el line item faltante → `Item is an Exchange` → reason `Missing Item`. Esto ubica el artículo en inventario para reenvío inmediato. |

## MOM Reason Code

| Tipo de Return | Reason Code en MOM |
|---|---|
| Missing Item | `Missing Item` |

## Criterios de éxito

- [ ] Verificación de inventario completada antes de cualquier acción.
- [ ] Artículo de reemplazo enviado como nuevo outbound order.
- [ ] Si se rechaza: cliente recibe comunicación empática (no una negación tajante).

---
← [[F5 - Reembolsos]] | → [[04 - Flujo de Estados]]

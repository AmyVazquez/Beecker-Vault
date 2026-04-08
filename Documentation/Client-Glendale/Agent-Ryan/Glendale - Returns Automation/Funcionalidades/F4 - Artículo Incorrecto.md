---
tags: [glendale, feature, wrong-item, UPS, MOM]
up: "[[00 - Índice]]"
---

# F4 – Artículo Incorrecto (Wrong Item)

## Contexto

El proceso de Wrong Item es casi idéntico a [[F3 - Mercancía Dañada y Defecto de Fabricante]], con una **diferencia clave en el reason code de MOM**: el artículo incorrecto regresa al inventario activo (en lugar de ser marcado como dañado) para que pueda redistribuirse.

> **Auto-aprobación:** Sí, si el valor está por debajo del umbral. Ver [[F1 - Ingesta Diaria y Segmentación de Estados]].

## Pasos de ejecución

1. **Generar etiqueta de envío** vía UPS Web API → guardar como PDF.
2. **Enviar la etiqueta PDF** al cliente por email.
3. **Ejecutar acciones en MOM** vía integración backend:
   - Navegar a la orden.
   - Seleccionar el line item y cantidad afectados.
   - Marcar `Item is an Exchange`.
   - Seleccionar reason code `Wrong Item Shipped`.
   - Esto **devuelve el artículo al inventario activo** y dispara inmediatamente el reenvío del artículo correcto.
4. **Imprimir el pick ticket** en MOM para activar el reenvío.

## MOM Reason Code

| Tipo de Return | Reason Code en MOM |
|---|---|
| Wrong Item | `Wrong Item Shipped` |

## Diferencia clave vs. Damaged Goods

| Aspecto | Wrong Item | Damaged Goods |
|---|---|---|
| Reason Code | `Wrong Item Shipped` | `Damage Not Usable` |
| Artículo regresa a inventario | **Sí** | No |
| Reenvío inmediato | **Sí** (pick ticket) | No |

---
← [[F3 - Mercancía Dañada y Defecto de Fabricante]] | → [[F5 - Reembolsos]]

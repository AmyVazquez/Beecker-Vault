---
tags: [glendale, feature, damaged-goods, manufacturer-defect, UPS, MOM]
up: "[[00 - Índice]]"
---

# F3 – Mercancía Dañada y Defecto de Fabricante

## Contexto

Damaged Goods y Manufacturer Defect siguen un **proceso idéntico**. Una vez aprobados (manual o auto-aprobados por el umbral), el Agente ejecuta los siguientes pasos.

> **Auto-aprobación:** Sí, si el valor está por debajo del umbral. Ver [[F1 - Ingesta Diaria y Segmentación de Estados]].

## Pasos de ejecución

1. **Generar etiqueta de envío** vía UPS Web API (reemplaza el proceso manual con WorldShip). La etiqueta se guarda como PDF.
2. **Enviar la etiqueta PDF** al cliente por email, para que devuelva el artículo dañado/defectuoso a Glendale.
3. **Ejecutar acciones en MOM** vía integración backend (ERP):
   - Navegar a la orden.
   - Seleccionar el line item y cantidad afectados.
   - Marcar `Item is an Exchange`.
   - Seleccionar reason code correspondiente.
   - Esto **evita que el artículo dañado regrese al inventario activo** y lo marca para revisión de devolución al proveedor.

## MOM Reason Codes

| Tipo de Return | Reason Code en MOM |
|---|---|
| Damaged Goods | `Damage Not Usable` |
| Manufacturer Defect | `Damage Not Usable` |

> *(TBD: Confirmar reason codes finales con el equipo de MOM)*

## Flags / Errores

| Escenario | Acción del Agente |
|---|---|
| Fallo en llamada a UPS API | Loguea el error y alerta al equipo humano para generar la etiqueta manualmente |
| Fallo en acción de MOM | Loguea el error y alerta al equipo humano |

## Criterios de éxito

- [ ] Etiqueta de envío generada vía UPS API y enviada al cliente.
- [ ] MOM actualizado con el reason code correcto.
- [ ] Artículo marcado como committed para revisión (no regresa a inventario activo).

---
← [[F2 - Comunicaciones al Cliente]] | → [[F4 - Artículo Incorrecto]]

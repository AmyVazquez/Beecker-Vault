---
tags: [glendale, alcance, objetivos]
up: "[[00 - Índice]]"
---

# Alcance y Objetivos

## Problema actual

El flujo de devoluciones de Glendale Parade Store es altamente ineficiente:
- **90% de los casos** llegan con información incompleta.
- Customer Service pierde tiempo significativo contactando clientes por teléfono y email para obtener datos faltantes.

## Objetivo del Agente

Eliminar esta fricción mediante:

1. **Centralización** – todas las solicitudes de devolución ingresan por un único formulario web en `glendale.com`.
2. **Automatización selectiva** – ejecución automática para solicitudes por debajo de un umbral monetario definido.
3. **Comunicaciones profesionales** – emails no robóticos al cliente en cada etapa del proceso.
4. **Integración con sistemas** – acciones automáticas en MOM (ERP/Inventario) y UPS (etiquetas de envío vía Web API).

## Lo que el Agente NO hace

- **No sobreescribe aprobaciones** – una vez aprobado, la ejecución es final e irreversible.
- **No toma decisiones de inventario** – MOM gestiona todos los cambios de inventario.
- **No automatiza RMA/Exchanges** – este proceso permanece manual por su complejidad.

## Tipos de devolución en scope

| Tipo | Descripción |
|---|---|
| Damaged Goods | Artículo recibido dañado |
| Manufacturer Defect | Defecto de fábrica |
| Wrong Item | Se envió el artículo incorrecto |
| Refund | Cliente recibió el artículo correcto pero ya no lo quiere |
| Missing Item | Cliente reporta que faltaron artículos en el pedido |

---
← [[00 - Índice]] | → [[02 - Comportamiento del Agente]]

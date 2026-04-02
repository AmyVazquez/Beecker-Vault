---
tags: [proyecto, glendale, returns-automation, MOC]
cliente: Glendale Parade Store LLC
documento: GLEN_US_SAAS_02_PDD_V1_20260224
version: 1.0
fecha: 2026-02-24
estado: En revisión
---

# Glendale – Returns Automation Agent

**Preparado por:** Beecker  
**Cliente:** Glendale Parade Store LLC  
**Versión:** 1.0 | 24 de febrero de 2026

> El Agente automatiza el proceso de devoluciones de extremo a extremo: lectura de solicitudes desde MySQL, enrutamiento por umbral, comunicaciones al cliente vía email y ejecución de acciones en MOM ERP y UPS Web API.

---

## Navegación del Proyecto

### Contexto
- [[01 - Alcance y Objetivos]]
- [[02 - Comportamiento del Agente]]
- [[03 - Sistemas Involucrados]]

### Funcionalidades
- [[F1 - Ingesta Diaria y Segmentación de Estados]]
- [[F2 - Comunicaciones al Cliente]]
- [[F3 - Mercancía Dañada y Defecto de Fabricante]]
- [[F4 - Artículo Incorrecto]]
- [[F5 - Reembolsos]]
- [[F6 - Artículo Faltante]]

### Definiciones y Gobierno
- [[04 - Flujo de Estados]]
- [[05 - Fuera de Alcance]]
- [[06 - Pendientes y Supuestos]]
- [[07 - Aprobaciones]]

---

## Resumen Ejecutivo

| Elemento | Detalle |
|---|---|
| Trigger | Una vez al día (lunes–viernes), al cierre |
| Fuente de datos | MySQL returns table (glendale.com backend) |
| Umbral de auto-aprobación | $150 (TBD – rango $150–$200) |
| ERP | MOM (Opción A: CSV nocturno / Opción B: API directa) |
| Etiquetas UPS | UPS Web API (reemplaza WorldShip desktop) |
| Email | Outlook (tono profesional, no robótico) |

## Tipos de Retorno

| Tipo | Auto-aprobación | Label UPS | MOM Reason Code |
|---|---|---|---|
| Damaged Goods | Sí (< umbral) | Sí | Damage Not Usable |
| Manufacturer Defect | Sí (< umbral) | Sí | Damage Not Usable |
| Wrong Item | Sí (< umbral) | Sí | Wrong Item Shipped |
| Refund | No (siempre manual) | No | Changed Their Mind |
| Missing Item | No (siempre manual) | No | Missing Item |

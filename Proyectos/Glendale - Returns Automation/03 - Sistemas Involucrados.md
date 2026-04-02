---
tags: [glendale, sistemas, integraciones]
up: "[[00 - Índice]]"
---

# Sistemas Involucrados

| Sistema | Rol | Método de Integración |
|---|---|---|
| **Glendale Website** (`glendale.com`) | Ingreso de formulario de returns y admin backend | Acceso DB de solo lectura (credenciales MySQL – provistas por Vishal) |
| **MySQL Returns Table** | Fuente de verdad de todas las solicitudes de return | Lectura directa via SQL Workbench / conector del Agente |
| **MOM ERP** | Gestión de inventario, procesamiento de órdenes, generación de RMA | Ver opciones A/B abajo |
| **UPS Web API** | Generación y entrega de etiquetas de envío prepagadas (reemplaza WorldShip desktop) | API web de UPS *(pendiente confirmación de acceso y pricing)* |
| **Email (Outlook)** | Comunicaciones al cliente (confirmaciones, aprobaciones, etiquetas) | Gestionado por el Agente; se requiere cuenta `noreply@...` con credenciales |

---

## Detalle: MOM ERP – Opciones de Integración

### Opción A – CSV Nocturno *(menor riesgo técnico)*
- El Agente genera un CSV con las acciones aprobadas al final del día.
- MOM lo ingesta overnight.
- Los emails al cliente se envían a la mañana siguiente.

### Opción B – API/DB Directa *(mayor valor, más complejo)*
- El Agente llama la API de MOM en tiempo real.
- Ejecución y comunicaciones el mismo día.

> **FLAG:** Confirmar cuál opción es técnicamente factible y preferida. Decisión requerida antes del inicio del sprint de desarrollo.  
> **Owner:** Jose Barreto / Equipo | **Prioridad:** ASAP

---

## Detalle: UPS Web API

- Reemplaza completamente el proceso manual con WorldShip desktop.
- Se utiliza para generar etiquetas PDF de devolución prepagadas.
- **No aplica** para returns de tipo Refund ni Missing Item.
- Costo de llamadas a la API pendiente de confirmar con el rep de UPS.

> **FLAG:** Jose Barreto en reunión con rep de UPS para confirmar disponibilidad de acceso web/API y pricing.

---
← [[02 - Comportamiento del Agente]] | → [[F1 - Ingesta Diaria y Segmentación de Estados]]

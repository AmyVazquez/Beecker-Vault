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

## Detalle: Base de datos de Glendale

- Base de datos: `glendale_app`
- Host: `107.180.115.249`
- Port: `3306`
- User: `agent_user`
- Pass: `+HzYh6S9n!{[q2$GT`
- Tabla `tbl_return_form_users`: contiene la información de la devolución.
- Tabla `tbl_item_list`: contiene la información del item a devolver (que se usará en el ERP) y la información de la razón de la devolución. Esta tabla es muy importante para el procesamiento.
- El vínculo entre ambas tablas se realiza mediante la columna `user_id`.
- El campo `return_for` ya no está en uso. Se había considerado como posible campo del monto de devolución, pero queda pendiente identificar en qué campo está ese dato real para la auto-aprobación de $150 USD.
- Consulta de ejemplo: `SELECT * FROM glendale_app.tbl_return_form_users LIMIT 10;`

## Detalle: SSH tunnel / VM Azure

- Host: `40.76.118.187`
- Port: `22`
- User: `azureuser`
- Key pair: `vm-glendale-001_key.pem`

---

## Detalle: MOM ERP – Opciones de Integración

### Opción A – CSV Nocturno *(menor riesgo técnico)*
- El Agente genera un CSV con las acciones aprobadas al final del día.
- El CSV se compartirá usando un servidor SFTP en nuestra infraestructura; este archivo equivale al body de la petición.
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

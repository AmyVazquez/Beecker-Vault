---
tags: [glendale, dashboard, vistas, ui]
up: "[[00 - Índice]]"
---

# Vistas de la Plataforma

Esta página describe las vistas principales que debe incluir el dashboard para el Agente de Devoluciones de Glendale.

## Contexto

No existe un diseño previo ni versiones similares para este dashboard. La definición debe ser flexible, pero contiene información esencial:

- Se debe tomar como referencia el formato del agente de ejemplo enviado: tarjeta de KPIs en la parte superior, gráfica de tendencia, etapas del proceso, lista de transacciones activas y detalle de transacción con chat y documentos.
- Las capturas proporcionadas son la referencia visual a seguir para el layout.

- KPIs sobre devoluciones procesadas por el agente.
- Tabla de devoluciones con datos de la base de datos y su estado actual.
- Tabla de run history con acciones diarias sobre devoluciones activas y procesadas.

El agente se ejecuta una vez al día y procesa todas las devoluciones en la bandeja de returns de la base de datos. Según el estado de cada devolución, puede:

- auto-aprobar si cumple reglas y está por debajo del umbral,
- solicitar información faltante por correo,
- enviar a aprobación interna si excede el monto o requiere revisión,
- completar el ciclo con guía, ERP y notificación cuando está aprobada.

---

## Draft de la interfase (wireframe)

Este borrador describe el layout recomendado para la plataforma usando un enfoque tipo "Pencil":

1. Header superior
   - Nombre del dashboard: `Glendale Returns Agent`
   - Botones de acción: `Historial de ejecución`, `Seleccionar mes`, `Exportar CSV`
2. Sección de KPIs principales (cinta de cards)
   - 5 cards con métricas clave: procesadas hoy, aprobadas, needs attention, auto-aprobadas, pendientes.
3. Gráfica principal de tendencia
   - Línea de tiempo con devoluciones por día/mes y comparación de estados.
4. Panel de proceso / etapas
   - Etapas del proceso alineadas horizontalmente con iconos.
   - Texto corto bajo cada etapa y flag de estado actual.
5. Panel de transacciones activas
   - Lista de devoluciones en proceso, con estado, orden y etapa actual.
   - Botón `Mostrar más` o paginación.
6. Sección secundaria: transacciones mensuales
   - Mini-panel con conteo mensual y porcentaje de completados vs. pendientes.

> Este draft está pensado como referencia para Pencil: cards + gráfico + timeline + lista activa en una sola vista.

---

## Vistas principales

### Summary

La vista principal del dashboard resume el estado actual de las devoluciones y el comportamiento diario.

Debe incluir:

- Hasta 5 KPIs principales.
  - Ejemplos: devoluciones procesadas hoy, devoluciones aprobadas, devoluciones en `Needs Attention`, devoluciones auto-aprobadas, devoluciones pendientes.
- Gráfica de líneas.
  - Evolución temporal de devoluciones, aprobaciones o volumen por día/mes.
- KPIs extras (opcional).
  - Pueden ser métricas secundarias como tasa de aprobación, tiempo medio de resolución, porcentaje de returns por tipo.
- Etapas del proceso.
  - Deben hacer match con `Transaction details` y mostrar el flujo de cada devolución: solicitud, missing info, revisión interna, aprobación, completado.
- Transacciones mensuales.
  - Panel o mini-tabla con conteo de devoluciones por mes.
- Transacciones activas.
  - Conteo o lista de devoluciones que aún están en proceso y no han sido completadas.

> Este layout sigue el ejemplo proporcionado: cards arriba, gráfico central, etapas de proceso y panel de transacciones activas en la misma pantalla.

### Run history

Esta vista muestra el histórico de ejecuciones del agente y permite explorar cada transacción.

Debe incluir:

- Selector de mes / filtro de fecha por mes.
- Descarga de CSV.
- Búsqueda por columnas.
- Tabla de resultados con todas las columnas y los datos necesarios para visualizar cada devolución.

> Similar al ejemplo, debe combinar filtro superior + botón CSV + tabla expandida para revisar el historial de ejecuciones.

#### Columnas recomendadas

- `user_id`
- `order_no`
- `invoice_no`
- `return_current_date`
- `status` / `status` numérico
- `return type` (tipo de devolución)
- `item_name`
- `reason_for_return`
- `quantity_returned`
- `created_at`
- `updated_at`
- `comments`
- `email_address`
- `address`

> Nota: la tabla debe reflejar el modelo de datos (base de datos) y ser lo suficientemente completa para que el equipo de plataforma pueda construirla sin perder información.

### Transaction details

Al hacer clic en una fila del `Run history`, se abre la vista de detalle de la transacción.

Debe contener:

- Sección con la misma información que aparece en `Run history` para la devolución seleccionada.
- Sección de etapas de proceso con sus respectivas flags.
  - Por ejemplo: `Requested`, `Missing Info`, `Sent for Approval`, `Approved`, `Completed`.
- Comentarios (opcional).
  - Chat o hilo de comentarios que documente qué se pidió, qué respondió el cliente y qué decisiones se tomaron.
- Documentos (opcional).
  - Adjuntos relacionados con la devolución: fotos, comprobantes, guías, etc.

> Esta vista debe replicar el estilo del ejemplo: header con resumen de la transacción, timeline de etapas, panel de conversación y sección de documentos.

---

## Datos disponibles desde la BD

La información de devolución se puede obtener de las tablas principales de Glendale:

- `tbl_return_form_users`: datos generales de la devolución.
- `tbl_item_list`: datos del/los item(s) a devolver, incluido `reason_for_return`.
- Vínculo entre tablas por `user_id`.

### Ejemplo de datos de `tbl_return_form_users`

- `user_id`
- `return_current_date`
- `first_name`, `last_name`
- `email_address`
- `order_no`, `invoice_no`
- `return_for` (campo actualmente vacío / no en uso)
- `status` (valor numérico 0-3)
- `created_at`, `updated_at`

### Ejemplo de datos de `tbl_item_list`

- `item_name`
- `quantity_returned`
- `reason_for_return`
- `exchange_item`

---

## Recomendación de enfoque

Dado que no hay diseño acordado con el cliente, la propuesta debe priorizar claridad sobre el estado de las devoluciones y la trazabilidad diaria del agente.

- `Summary` debe ser la entrada rápida para el negocio.
- `Run history` debe ser la referencia operativa para auditoría y seguimiento.
- `Transaction details` debe mostrar la historia completa de una devolución y su avance en el proceso.

Con esto el equipo de plataforma puede construir un dashboard de agente útil aunque el estilo final quede por definir.

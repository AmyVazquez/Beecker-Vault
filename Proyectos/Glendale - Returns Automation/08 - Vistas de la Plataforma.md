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

La vista principal del dashboard es la entrada rápida para el negocio. No debe incluir controles de exportación CSV; ese tipo de acción corresponde a `Run history`.

Debe incluir:

- Cards de KPI en la parte superior.
  - Cada card es un KPI principal y debe ser visible desde el primer vistazo.
  - Ejemplos: `Total Returns`, `Auto-approved`, `Manual review`, `Active Returns`, `Error rate`.
  - Cálculos sugeridos:
    - `Total Returns`: conteo de registros en `tbl_return_form_users` dentro del período seleccionado.
    - `Auto-approved`: conteo de devoluciones que el agente finalizó automáticamente según las reglas de negocio.
      - Si el dato no está en `tbl_return_form_users`, debe obtenerse de la lógica del agente o de una tabla de eventos de ejecución.
    - `Manual review`: conteo de devoluciones que requieren coordinación humana o revisión interna.
    - `Active Returns`: conteo de devoluciones aún no completadas (`status` distinto de `Completed` / estado final).
    - `Error rate`: porcentaje de devoluciones con resultado `error` sobre el total procesado en el periodo.
- Gráfica de tendencia central.
  - Línea de evolución de devoluciones recibidas, procesadas y aprobadas por día/mes.
- Panel de métricas secundarias.
  - Ejemplos: `Auto-approval rate`, `Manual review rate`, `Average processing time`.
  - Cálculos sugeridos:
    - `Auto-approval rate` = `Auto-approved` / `Total Returns` * 100.
    - `Manual review rate` = `Manual review` / `Total Returns` * 100.
    - `Average processing time` = promedio del tiempo entre `created_at` y `updated_at` para devoluciones completadas.
- Panel de proceso / etapas de la devolución.
  - Debe ser un flujo visual con los estados del proceso y, donde sea posible, con los conteos actuales de devoluciones en cada etapa.
  - Etapas: `Request submitted`, `Information review`, `Needs Attention`, `Approval decision`, `Processing & Execution`, `Completed`.
- Transacciones activas.
  - Lista o tarjetas con devoluciones en curso, estado actual y etapa; puede indicar quién está a cargo o si es revisión automática vs. manual.
- Transacciones mensuales.
  - Donut o mini-panel con conteo de devoluciones completadas, pendientes y sobre límite.

> El dashboard debe seguir el ejemplo visual: cards KPI arriba, trend chart al centro, proceso de flujo intermedio y paneles de transacciones activas / mensuales a la derecha o abajo.

#### Definición de métricas de KPI

- `Total Returns`
  - Conteo de registros en `tbl_return_form_users` dentro del periodo seleccionado.
- `Auto-approved`
  - Conteo de devoluciones que el agente marcó como aprobadas automáticamente según reglas de negocio.
  - Fuente: resultado de la ejecución del agente o tabla de eventos, si no está disponible directamente en `tbl_return_form_users`.
- `Manual review`
  - Conteo de devoluciones que requieren intervención humana o revisión interna.
- `Active Returns`
  - Conteo de devoluciones con estado distinto de `Completed` / estado final.
- `Error rate`
  - Porcentaje de devoluciones con resultado `error` sobre el total procesado en el periodo.
- `Auto-approval rate`
  - `Auto-approved` / `Total Returns` * 100.
- `Manual review rate`
  - `Manual review` / `Total Returns` * 100.
- `Average processing time`
  - Promedio de tiempo entre `created_at` y `updated_at` para devoluciones completadas.

Visualmente, el `Summary` podría representarse así:

```mermaid
flowchart TD
  A[KPI cards] --> B[Gráfica de tendencia]
  B --> C[Panel de etapas de proceso]
  C --> D[Transacciones activas]
  C --> E[Mini-panel mensual (donut)]
```

En este contexto, "panel de proceso de estado con conteos actuales" significa:

- Un panel horizontal o de pasos donde cada etapa muestra su nombre y el número de devoluciones que están en esa etapa ahora.
- Ejemplo: `Request submitted (20)`, `Information review (10)`, `Needs Attention (2)`, `Approval decision (15)`, `Processing & Execution (4)`, `Completed (6)`.

El "mini-panel mensual tipo donut" es un gráfico secundario que muestra la distribución mensual, por ejemplo:

- `Completed`: 450
- `Pending`: 50
- `Over limit`: 0

Este mini-panel sirve para ver al instante la proporción de casos resueltos vs. pendientes sin salir del `Summary`.

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

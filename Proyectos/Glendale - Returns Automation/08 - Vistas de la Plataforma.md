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

La vista principal del dashboard es la entrada rápida para el negocio.

#### Header

- Nombre del agente: `Ryan` con subtítulo `Returns Automation` y avatar.
- Botones visibles: `Run History` y `Select Month`.
- No incluye botón de exportación CSV; esa acción pertenece a `Run history`.

#### Cards de KPI

Cuatro cards en fila horizontal, cada una con icono, etiqueta y valor:

| Card | Valor mostrado | Cálculo |
|---|---|---|
| `Total Returns` | Número absoluto (ej. 142) | Conteo de registros en `tbl_return_form_users` dentro del período seleccionado. |
| `Auto-approved` | Porcentaje (ej. 78%) | `Auto-approved` / `Total Returns` * 100. Si el dato no está en `tbl_return_form_users`, obtener de la lógica del agente o tabla de eventos. |
| `Manual review` | Porcentaje (ej. 18%) | `Manual review` / `Total Returns` * 100. Devoluciones que requieren intervención humana. |
| `Active Returns` | Número absoluto (ej. 32) | Devoluciones con status `Pending`, `Needs Attention` o `Approved`. Se omite `Completed`. |

#### Gráfica de tendencia

- Título: **Returns volume over time**
- Subtítulo: *Daily return activity and processing trends*
- Tipo: línea con 3 series: `Received`, `Processed`, `Approved`.
- Eje X: días de la semana (o días del mes según filtro activo).
- Ocupa el ancho central de la vista, con el panel de métricas secundarias a la derecha.

#### Panel de métricas secundarias

Ubicado a la derecha de la gráfica de tendencia. Tres métricas con barra de progreso y valor porcentual:

| Métrica | Cálculo |
|---|---|
| `Auto-approval rate` | `Auto-approved` / `Total Returns` * 100 |
| `Manual review rate` | `Manual review` / `Total Returns` * 100 |
| `Average processing time` | Promedio del tiempo entre `created_at` y `updated_at` para devoluciones completadas, expresado en minutos (ej. "45 min"). |

#### Return process flow

- Título: **Return process flow**
- Subtítulo: *End-to-end lifecycle of a return request*
- Tipo: timeline horizontal con 3 nodos conectados por línea.
- Los títulos coinciden exactamente con las etapas definidas en `Transaction Details`.

| Etapa | Mini descripción |
|---|---|
| **Return in queue** | ej. "5 returns pending" |
| **Return in validation** | ej. "3 returns under review" |
| **Approved & In execution** | ej. "2 returns in process" |


#### Active transaction

- Título: **Active transaction**
- Subtítulo: *Actualmente en proceso*
- Lista de devoluciones activas. Cada ítem muestra:
  - Número de transacción (ej. `RTN-001042`)
  - Nombre del usuario (ej. Mariana Gonzales Béjar)
  - `Return type` (ej. Damage goods)
  - Badge de etapa actual (ej. `Return in validation`, `Return in queue`) — mismo naming que el panel de proceso.
  - Barra de progreso.
  - Flecha `→` para abrir el detalle de la transacción.
- Botón `Mostrar más` al final de la lista — redirige a la vista `Run history`.

#### Donut chart — Tipo de devolución

- Título: **Tipo de devolución**
- Tipo: gráfica de dona (donut), no pie chart.
- El centro muestra el tipo seleccionado / destacado y su conteo (ej. "025 / Damaged goods").
- Leyenda debajo con conteo por tipo:
  - `Damaged goods`
  - `Manufacturer defect`
  - `Wrong item`
  - `Refund`
  - `Missing item`
- No muestra desglose por status; solo conteo absoluto por tipo de devolución.

### Run history

> Referencia visual: captura de diseño de la plataforma (Ryan – Run history).

Esta vista muestra el histórico de todas las devoluciones registradas y permite explorar cada transacción.

#### Layout y controles

- Botón `← Back to agent Ryan` en la esquina superior izquierda para regresar a la vista del agente.
- Barra de búsqueda global en el centro del header.
- Botón `Select month` en la esquina superior derecha — filtro de período, igual que en la vista Summary.
- Botón `CSV` para exportar la tabla.
- Selector `Items per page` (10 por defecto) en la esquina superior izquierda de la tabla.
- Paginación numérica en la esquina superior derecha de la tabla.
- Tabla de ancho completo con filas de fondo alternado.

#### Columnas de la tabla

| #   | Columna BD                 | Etiqueta visual | Ejemplo                       | Posibles valores / Notas                                                                                                                                                             |
| --- | -------------------------- | --------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `user_id`                  | User ID         | RTN-00-001                    | formato `RTN-XX-XXX`                                                                                                                                                                 |
| 2   | `first_name` + `last_name` | User Name       | Mariana Gonzales Béjar        | concatenación de ambos campos de `tbl_return_form_users`                                                                                                                             |
| 3   | `order_no`                 | No Order        | 123456                        | texto/número de orden                                                                                                                                                                |
| 4   | `return_current_date`      | Return Date     | 2026-03-30                    | fecha (`YYYY-MM-DD`)                                                                                                                                                                 |
| 5   | `status` numérico          | Status          | badge coloreado               | 0 = Pending – Missing Info;<br>1 = Pending – Complete Info;<br>2 = Needs Attention;<br>3 = Approved;<br>Rejected = sin valor numérico mapeado aún (asignado por almacén o aprobador) |
| 6   | `return_for`               | Return For      | N/A                           | campo actualmente sin uso / pendiente de definición                                                                                                                                  |
| 7   | `return_type`              | Return Type     | Damaged goods                 | Damaged Goods / Manufacturer Defect / Wrong Item / Refund / Missing Item                                                                                                             |
| 8   | `email_address`            | Email Address   | cliente@correo.com            | correo electrónico válido                                                                                                                                                            |
| 9   | `address`                  | Address         | 742 Evergreen Terrace, Apt 62 | dirección física del cliente                                                                                                                                                         |
| 10  | `comments`                 | Comments        | Cliente no quiere cambio      | texto libre                                                                                                                                                                          |

> Columnas excluidas de esta vista (disponibles en Transaction Details): `invoice_no`, `item_name`, `reason_for_return`, `quantity_returned`, `exchange_item`, `created_at`, `updated_at`.

#### Color de badges por estado

| Estado                    | Color del badge | Hex       |
| ------------------------- | --------------- | --------- |
| `Pending – Missing Info`  | Naranja         | `#B8511D` |
| `Pending – Complete Info` | Morado          | `#803FE0` |
| `Needs Attention`         | Rojo            | `#BC2A2A` |
| `Approved`                | Verde           | `#217E25` |
| `Rejected`                | Rojo            | `#BC2A2A` |

> **Sobre el status `Rejected`:** No corresponde a un valor numérico en la BD — es un estado que puede asignarse manualmente por el equipo de almacén o por un aprobador interno de Glendale cuando una devolución no cumple los criterios de aceptación. Se incluye en esta tabla como referencia visual para cuando se implemente su mapeo en el sistema.

> Nota: el orden de columnas refleja el diseño observado en la captura de la plataforma y debe respetarse en la implementación.


### Transaction details

Al hacer clic en una fila del `Run history`, se abre la vista de detalle de la transacción.

#### Header de la vista

- Botón `← Back to run history` en la esquina superior izquierda.
- Badge de estado (`status`) en la esquina superior derecha, con el mismo color definido en Run history.

La vista contiene cuatro secciones:

1. **Transaction details** — campos principales de la devolución seleccionada.
2. **Processing timeline** — timeline con las 3 etapas del proceso y sus flags de estado.
3. **Email communications** — bandeja de correos enviados relacionados a la devolución.
4. **Return photos** — archivos adjuntos de la devolución.

---

#### 1. Transaction details

Muestra los campos principales en formato de grid de lectura. El `status` no aparece como campo dentro de la ficha — se muestra en el header de la vista.

| Campo BD                   | Etiqueta visual | Ejemplo                       |
| -------------------------- | --------------- | ----------------------------- |
| `user_id`                  | User ID         | RTN-001042                    |
| `first_name` + `last_name` | User Name       | Mariana Gonzales Béjar        |
| `order_no`                 | No Order        | 123456                        |
| `return_current_date`      | Return Date     | 2026-03-30                    |
| `return_for`               | Return For      | N/A                           |
| `return_type`              | Return Type     | Damaged Goods                 |
| `exchange_item`            | Exchange Item   | Camiseta alterna              |
| `created_at`               | Created At      | 2026-03-30 14:50:55           |
| `updated_at`               | Updated At      | 2026-03-30 13:40:50           |
| `email_address`            | Email Address   | mariana@gmail.com             |
| `address`                  | Address         | 742 Evergreen Terrace, Apt 62 |
| `comments`                 | Comments        | Cliente no quiere cambio      |

> Campos excluidos de esta ficha: `invoice_no` (no visible en diseño), `status` (aparece en header).

##### Sub-sección: Items

Sección separada dentro de Transaction details que lista los artículos de la devolución. Soporta múltiples ítems por transacción.

| Campo BD            | Etiqueta visual   | Ejemplo             |
| ------------------- | ----------------- | ------------------- |
| `item_name`         | Item Name         | Camiseta deportiva  |
| `quantity_returned` | Quantity Returned | 2                   |

> Cada fila corresponde a un ítem en `tbl_item_list` vinculado al `user_id`. El campo `reason_for_return` no se muestra en esta sub-sección.

---

#### 2. Processing timeline

Timeline horizontal con 3 etapas. Cada etapa muestra sus flags (sub-estados) indicando en cuál se encuentra actualmente la devolución.

**Etapa 1 — Devolución en bandeja / Return in Queue** *(status: Pending)*

Siempre se muestra exactamente uno de los dos flags siguientes — nunca ambos al mismo tiempo:

- Devolución nueva con información incompleta / New return with incomplete information.
- Devolución nueva con información completa, pendiente de que inicie el flujo del día / New return with complete information, awaiting daily flow initiation.

**Etapa 2 — Devolución en validación / Return in Validation** *(status: Needs Attention)*

- En validación de monto (automática o manual según umbral) / Amount validation in progress (automatic or manual, subject to threshold).
- Pendiente de revisión por humano — notificación levantada al equipo de Glendale / Pending human review — notification raised to the Glendale team.
- Pendiente de que el cliente envíe nueva información — correo de seguimiento enviado / Awaiting additional information from the client — follow-up email sent.
- Devolución validada (o en todo caso rechazada — fin del proceso) / Return validated (or rejected — end of process).

**Etapa 3 — Devolución aprobada y en ejecución / Return Approved & In Execution** *(status: Approved)*

- Generar etiqueta de envío UPS / Generate UPS shipping label *(solo aplica para algunos tipos de return — checar PDD)*.

> **Nota:** El agente genera la etiqueta vía UPS Web API, la guarda como PDF y la envía al cliente por correo. Aplica únicamente para Damaged Goods y Manufacturer Defect (ver [[F3 - Mercancía Dañada y Defecto de Fabricante]]) y Wrong Item (ver [[F4 - Artículo Incorrecto]]). Para los demás tipos la transacción no se cancela: en **Refund** (ver [[F5 - Reembolsos]]), el cliente devuelve el artículo a su propio costo sin etiqueta prepagada; en **Missing Item** (ver [[F6 - Artículo Faltante]]), no hay devolución del cliente — Glendale envía el artículo faltante como nuevo outbound order desde el almacén.

- Ingresar devolución al ERP/MOM / Enter return into ERP/MOM.
- Email enviado al cliente / Email sent to client.
- Devolución resuelta / Return resolved.

---

#### 3. Email communications

Sección tipo bandeja de entrada que muestra los correos enviados por el agente relacionados a esta devolución. Ver referencia completa en [[F2 - Comunicaciones al Cliente]].

##### Layout

- Subtítulo fijo: *"Send communications related to this return"*
- Lista vertical de ítems, uno por correo enviado, ordenados del más reciente al más antiguo.
- Cada ítem está colapsado por defecto y muestra en una sola línea:
  - **Nombre del cliente** (ej. `Mariana Gonzales`)
  - **Badge de tipo de evento** (ej. `Shipping label`, `Approved`, `Needs Attention`, `Rejected`)
  - **Asunto o preview del correo** (ej. `Prepaid Shipping Label fo...`)
  - **Timestamp** (ej. `6:05 PM`, `Yesterday`, `Oct 24`)
- Al expandir el ítem, se muestra el cuerpo completo del correo enviado, incluyendo archivos adjuntos si aplica (ej. etiqueta UPS en PDF).

##### Tipos de correo que pueden aparecer

| Tipo de evento | Cuándo se envía | Generado por |
| -------------- | --------------- | ------------ |
| `Needs Attention` | El cliente debe proveer información faltante para continuar. | LLM con contexto de comentarios de Glendale |
| `Approved` | La devolución fue aprobada; incluye próximos pasos según tipo de return. | Template aprobado por Glendale |
| `Shipping label` | Se adjunta la etiqueta de envío prepagada UPS. *(Solo para Damaged Goods, Manufacturer Defect y Wrong Item.)* | Template aprobado por Glendale |
| `Rejected` | La devolución fue rechazada; incluye razón y opción de contacto. | LLM con contexto de comentarios de Glendale |

##### Reglas de comportamiento

- Los correos solo se envían en **horario laboral** (no en horario nocturno).

> **Pendiente:** El rango exacto de horas del horario laboral no ha sido definido. Pendiente de alineación con Glendale.

- Si el cliente responde con una consulta compleja, el agente **no responde** — registra un flag en el historial y lo incluye en el resumen de notificación al equipo de Glendale.
- El email del cliente se obtiene del campo `email_address` de `tbl_return_form_users`.

---

#### 4. Return photos

Sección que muestra las imágenes adjuntas enviadas por el cliente relacionadas a la devolución.

##### Propósito

Permitir al equipo de Glendale visualizar evidencia visual del artículo (ej. fotos del daño, defecto o artículo incorrecto) sin salir de la vista de detalle de la transacción.

##### Tipos de return que aplican

| Return type           | Fotos esperadas                                    |
| --------------------- | -------------------------------------------------- |
| `Damaged Goods`       | Fotos del artículo dañado enviadas por el cliente. |
| `Manufacturer Defect` | Fotos del defecto de fabricación.                  |
| `Wrong Item`          | Fotos del artículo recibido incorrecto.            |
| `Missing Item`        | No aplica — no hay artículo que fotografiar.       |
| `Refund`              | No aplica por definición del proceso.              |

##### Layout

- Botón `↓ Download` en la esquina superior derecha de la sección — descarga los archivos seleccionados.
- Tabla con las siguientes columnas:

| Columna          | Descripción                                              | Ejemplo          |
| ---------------- | -------------------------------------------------------- | ---------------- |
| *(checkbox)*     | Selección individual del archivo para descarga.          | ☐                |
| Document name    | Nombre del archivo adjunto.                              | Foto Ejemplo.png |
| Date of processing | Fecha en que se procesó o adjuntó el archivo.          | 25/12/2026       |

- Si no hay archivos adjuntos, mostrar estado vacío con mensaje: *"No photos attached to this return."*

##### Pendientes de definición técnica

> - **Origen de las imágenes:** aún no definido cómo el cliente adjunta las fotos (ej. formulario web, email, portal). Pendiente de alineación con Glendale.
> - **Almacenamiento:** no definido dónde se guardan (ej. base de datos, bucket de archivos, servidor).
> - **Vínculo al registro:** no definido cómo se relacionan las imágenes al `user_id` o `order_no` en `tbl_return_form_users`.

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

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
  - Cards: `Total Returns`, `Auto-approved`, `Manual review`, `Active Returns`.
  - Cálculos sugeridos:
    - `Total Returns`: conteo de registros en `tbl_return_form_users` dentro del período seleccionado.
    - `Auto-approved`: conteo de devoluciones que el agente finalizó automáticamente según las reglas de negocio.
      - Si el dato no está en `tbl_return_form_users`, debe obtenerse de la lógica del agente o de una tabla de eventos de ejecución.
    - `Manual review`: conteo de devoluciones que requieren intervención humana o revisión interna.
    - `Active Returns`: número absoluto de devoluciones con status `Pending`, `Needs Attention` o `Approved` (ej. "18 Active Returns"). Se omite `Completed` por ser un estado independiente. Se muestra como conteo, no como porcentaje.
- Gráfica de tendencia central.
  - Línea de evolución de devoluciones recibidas, procesadas y aprobadas por día/mes.
- Panel de métricas secundarias.
  - Métricas: `Auto-approval rate`, `Manual review rate`, `Average processing time`.
  - Cálculos sugeridos:
    - `Auto-approval rate` = `Auto-approved` / `Total Returns` * 100.
    - `Manual review rate` = `Manual review` / `Total Returns` * 100.
    - `Average processing time` = promedio del tiempo entre `created_at` y `updated_at` para devoluciones completadas, expresado por devolución (ej. "2 min por devolución").
- Panel de proceso / etapas de la devolución.
  - Debe ser un flujo visual con los estados del proceso y, donde sea posible, con los conteos actuales de devoluciones en cada etapa.
  - Etapas: `Request submitted`, `Information review`, `Needs Attention`, `Approval decision`, `Processing & Execution`.
  - El estado `Completed` se omite de este panel por ser un estado independiente.
- Transacciones activas.
  - Lista o tarjetas con devoluciones en curso, estado actual y etapa; puede indicar quién está a cargo o si es revisión automática vs. manual.
- Pie chart de tipo de devolución.
  - Distribución de devoluciones por tipo dentro del período seleccionado.
  - Tipos (según PDD): `Damaged Goods`, `Manufacturer Defect`, `Wrong Item`, `Refund`, `Missing Item`.
- Transacciones mensuales.
  - Donut o mini-panel con conteo de devoluciones completadas, pendientes y sobre límite.

> El dashboard debe seguir el ejemplo visual: cards KPI arriba, trend chart al centro, proceso de flujo intermedio y paneles de transacciones activas / mensuales a la derecha o abajo.

### Run history

> Referencia visual: `Lucas - Run history.png`

Esta vista muestra el histórico de todas las devoluciones registradas y permite explorar cada transacción.

#### Layout y controles (según diseño de Lucas)

- Botón `< Returns List` en la esquina superior izquierda para regresar a la vista principal.
- Barra de búsqueda global en la esquina superior derecha del header.
- Paginación numérica en la esquina superior derecha de la tabla.
- Tabla de ancho completo con filas de fondo alternado.

#### Columnas de la tabla

| #   | Columna BD                 | Etiqueta visual   | Ejemplo                  | Posibles valores / Notas                                                                                                                                                             |
| --- | -------------------------- | ----------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `user_id`                  | User ID           | 001                      | numérico único                                                                                                                                                                       |
| 2   | `first_name` + `last_name` | User Name         | Juan Pérez               | concatenación de ambos campos de `tbl_return_form_users`                                                                                                                             |
| 3   | `order_no`                 | No Order          | 123456                   | texto/número de orden                                                                                                                                                                |
| 4   | `invoice_no`               | No Invoice        | INV-2026-001             | texto/número de factura                                                                                                                                                              |
| 5   | `return_current_date`      | Return Date       | 2026-04-02               | fecha (`YYYY-MM-DD`)                                                                                                                                                                 |
| 6   | `status` numérico          | Status            | badge coloreado          | 0 = Pending – Missing Info;<br>1 = Pending – Complete Info;<br>2 = Needs Attention;<br>3 = Approved;<br>Rejected = sin valor numérico mapeado aún (asignado por almacén o aprobador) |
| 7   | `return_for`               | Return For        | —                        | campo actualmente sin uso / pendiente de definición                                                                                                                                  |
| 8   | `return_type`              | Return Type       | Refund                   | Damaged Goods / Manufacturer Defect / Wrong Item / Refund / Missing Item                                                                                                             |
| 9   | `item_name`                | Item Name         | Camiseta                 | texto descriptivo del producto (`tbl_item_list`)                                                                                                                                     |
| 10  | `reason_for_return`        | Reason for Return | Defectuoso               | Defectuoso / Incorrecto / Faltante / Otro (`tbl_item_list`)                                                                                                                          |
| 11  | `quantity_returned`        | Quantity Returned | 1                        | entero positivo (`tbl_item_list`)                                                                                                                                                    |
| 12  | `email_address`            | Email Address     | cliente@correo.com       | correo electrónico válido                                                                                                                                                            |
| 13  | `comments`                 | Comments          | Cliente no quiere cambio | texto libre                                                                                                                                                                          |

> Columnas excluidas de esta vista (disponibles en Transaction Details): `exchange_item`, `address`, `created_at`, `updated_at`.

#### Color de badges por estado

| Estado                    | Color del badge | Hex       |
| ------------------------- | --------------- | --------- |
| `Pending – Missing Info`  | Naranja         | `#B8511D` |
| `Pending – Complete Info` | Morado          | `#803FE0` |
| `Needs Attention`         | Rojo            | `#BC2A2A` |
| `Approved`                | Verde           | `#217E25` |
| `Rejected`                | Rojo            | `#BC2A2A` |

> Nota: el orden de columnas en esta tabla refleja el orden observado en el diseño de Lucas (`Lucas - Run history.png`) y debe respetarse en la implementación.


### Transaction details

Al hacer clic en una fila del `Run history`, se abre la vista de detalle de la transacción.

Debe contener:

- **Header / resumen**: misma información que aparece en `Run history` para la devolución seleccionada, incluyendo los campos excluidos de esa tabla (`exchange_item`, `address`, `created_at`, `updated_at`).
- **Banderas del proceso**: timeline con 3 etapas principales, cada una con sus sub-estados.
- **Seguimiento de comunicaciones por correo**: bandeja colapsable con los correos enviados relacionados a la devolución. → Darle una segunda revisión este tema. (Tony)
- **Fotos de la devolución**: espacio para mostrar imágenes adjuntas relacionadas (pendiente de definición técnica). 

#### Banderas del proceso

Las 3 etapas principales y sus sub-estados son:

**1. Devolución en bandeja** *(status: Pending)*
- Devolución recién ingresada, sin procesar.
- Devolución con información incompleta (pendiente de completar por el cliente).
- Devolución con información completa, pendiente de que inicie el flujo del día.

**2. Devolución en validación** *(status: Needs Attention)*
- En validación de monto (automática o manual según umbral).
- Pendiente de revisión por humano — notificación levantada al equipo de Glendale.
- Pendiente de nueva información del cliente — correo de seguimiento enviado.
- Devolución validada (o rechazada — fin del proceso).

**3. Devolución aprobada y en ejecución** *(status: Approved)*
- Generar shipping label UPS *(solo aplica para: Damaged Goods, Manufacturer Defect, Wrong Item — no aplica para Refund ni Missing Item)*.
- Ingresar devolución al ERP/MOM.
- Email enviado al cliente.
- Devolución resuelta.

#### Seguimiento de comunicaciones por correo

Sección tipo "bandeja de entrada" que muestra los correos enviados relacionados a esta devolución:

- Cada correo aparece como un ítem colapsable con asunto, fecha y destinatario visibles.
- Al expandir, muestra el cuerpo completo del correo enviado.
- Reemplaza el enfoque de chat; documenta las comunicaciones reales del agente hacia el cliente o el equipo.

#### Fotos de la devolución

- Espacio reservado para mostrar imágenes adjuntas a la devolución (ej. fotos del artículo dañado).
- Pendiente de definición técnica: origen de las imágenes y cómo se vinculan al registro.

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

---
tags:
  - overall
  - plataforma
  - dashboard
  - UI
up: "[[Beecker-Vault/Documentation/A-Lucas/C-Overall/Overall - Interacción de Postulantes/00 - Índice]]"
---

# Vistas de la Plataforma

> Referencia de diseño: [Figma – Dashboard Overall/Lucas](https://www.figma.com/proto/CQMuS8UwmOhzkwTQxU8xvx/Dashboard-2025?node-id=17560-7965&p=f&viewport=-4945%2C-6598%2C0.47&t=IEdNUs9yyMPfEEAw-1&scaling=contain&content-scaling=fixed&starting-point-node-id=17560%3A7965&page-id=17505%3A4447&show-proto-sidebar=1)

---

## Vista principal (Summary / Dashboard)

![[Pasted image 20260408201612.png]]
### Header

- **Card del agente:** foto de Lucas + nombre "Lucas" + subtítulo "Contratación y selección" + chevron desplegable.
- **Botones de acción:** "Historial de ejecución" y "Seleccionar mes" — ambos con estilo outline morado.

---

### KPI Cards (5 tarjetas)

Fila superior de la vista. Cada card muestra ícono + nombre + valor porcentual.

| # | Nombre | Fórmula | Ejemplo | Más info |
|---|---|---|---|---|
| 1 | Tasa de conversión a entrevista | Estados "Entrevista agendada" en Run History / total transacciones | 82% | [[F7 - Notificar Reclutador]] |
| 2 | Tasa de abandono | Estados "Abandono" / total transacciones | 24% | [[Beecker-Vault/Documentation/A-Lucas/C-Overall/Overall - Interacción de Postulantes/04 - Flujo de Estados]] |
| 3 | Tasa de rechazo por LN o antecedentes | Estados "Lista Negra" + "Antecedentes" / total transacciones | 14% | [[F2 - Validar Lista Negra y Antecedentes]] |
| 4 | Tasa de rechazo por distrito | Estados "Descartado por distrito" / total transacciones | 5% | [[F1 - Preguntar Datos Generales]] |
| 5 | Tasa de candidatos sin experiencia | Estados "Sin experiencia" / total transacciones | 20% | [[F4 - Gestionar Sin Experiencia]] |

---

### Sección: Etapas del proceso

- **Título:** "Etapas del proceso"
- **Subtítulo:** "Métricas de procesamiento de candidatos de Lucas"
- **Componente:** línea de tiempo horizontal con 3 círculos (uno por etapa), track con relleno morado de izquierda a derecha según el avance.

| Etapa | Descripción de métrica mostrada | Funcionalidades |
|---|---|---|
| **Inicio reclutamiento** | Candidatos en evaluación inicial | [[F1 - Preguntar Datos Generales]] |
| **Evaluación candidato** | Candidatos en proceso de evaluación de historial laboral | [[F2 - Validar Lista Negra y Antecedentes]] · [[F3 - Evaluar Experiencia]] · [[F4 - Gestionar Sin Experiencia]] · [[F5 - Resguardar Información]] · [[F6 - Comparar Perfil vs BD]] |
| **Agendamiento entrevista** | Candidatos en proceso de entrevista | [[F7 - Notificar Reclutador]] |

Ejemplo de datos mostrados:
- Inicio reclutamiento → "20 candidatos se encuentran en evaluación inicial"
- Evaluación candidato → "12 candidatos se encuentran en proceso de evaluación de historial laboral"
- Agendamiento entrevista → "8 candidatos se encuentran en proceso de entrevista"

---

### Sección: Transacción activa

- **Título:** "Transacción activa"
- **Subtítulo:** "Actualmente en proceso"
- Lista de transacciones en curso, con botón "Mostrar más" al pie.

Cada fila muestra:

| Elemento | Descripción |
|---|---|
| Ícono de documento | Indicador visual del tipo de registro |
| Puesto | Nombre del puesto al que aplica el candidato |
| Nombre del candidato | Nombre completo |
| Distrito | Distrito del candidato |
| Badge de etapa | Etapa actual: "Evaluación candidato" / "Inicio reclutamiento" / "Agendamiento entrevista" |
| Barra de progreso | Progreso visual dentro de la etapa actual |
| Flecha → | Navega al detalle de la transacción |

Ejemplo de transacciones mostradas:
- Auxiliar administrativo · Mariana Gonzales Béjar · Cuernavaca · Evaluación candidato
- Ejecutivo de ventas · Juan Pérez López · Monterrey · Inicio reclutamiento

---

### Sección: Transacciones mensuales (panel derecho)

- **Título:** "Transacciones mensuales"
- **Componente principal:** gráfica de dona (donut chart) con el total de transacciones usadas sobre el máximo de 500, mostrando el texto central (ej. "50/500 · Pendientes").

| Segmento del donut | Color | Significado |
|---|---|---|
| Completados | Morado oscuro | Transacciones finalizadas |
| Pendientes | Gris claro | Transacciones en curso |
| Supera el límite | — | Transacciones que exceden las 500 permitidas |

Métricas debajo del donut (tarjetas con borde punteado morado):

| Métrica | Ejemplo |
|---|---|
| Completados | 450 |
| Pendientes | 50 |
| Supera el límite | 0 |

> El total siempre debe sumar ≤ 500. El círculo central muestra los pendientes actuales sobre el máximo contratado.

---

## Vista Run History (Historial de ejecución)
![[Pasted image 20260408201553.png]]

Acceso desde el botón "Historial de ejecución" del dashboard. La vista incluye un botón "← Regresar a Lucas" para volver al summary.

### Controles de la vista

| Control | Descripción |
|---|---|
| Buscador | Campo "Search here..." — búsqueda global por todas las columnas |
| Filtro de mes | "Selecciona mes" — filtra por mes de inicio de solicitud |
| Exportar CSV | Descarga el listado completo en formato CSV |
| Items per page | Selector (ej. 10) para definir cuántos registros se muestran por página |
| Paginación | Navegación numérica con flechas < > (ej. páginas 1–7) |

### Columnas de la tabla

| Columna | Tipo de dato | Ejemplo |
|---|---|---|
| Hora de inicio de solicitud | Timestamp | 2026-03-30 12:50:55 |
| Etapa actual | Texto | Inicio reclutamiento / Evaluación candidato / Agendamiento entrevista |
| Estado | Badge con color | Ver estilos en [[Beecker-Vault/Documentation/A-Lucas/C-Overall/Overall - Interacción de Postulantes/08 - Vistas de la Plataforma#Estilos de badge por estado]] y definiciones en [[Beecker-Vault/Documentation/A-Lucas/C-Overall/Overall - Interacción de Postulantes/04 - Flujo de Estados]] |
| Distrito | Texto | Cuernavaca / CDMX – Benito Juárez / Guadalajara – Zapopan / Monterrey |
| Edad | Número | 20, 24, 29, 31… |
| Puesto | Texto | Auxiliar administrativo / Ejecutivo de ventas / Operador de producción / Diseñador UI/UX |
| Nombre del candidato | Texto | Mariana Gonzales Béjar / Juan Pérez López |
| DNI/CE | Alfanumérico | 12345678 (DNI) / A123456789 (CE) |
| Número de teléfono | Texto | +52.8171184781 |

### Estilos de badge por estado

Todos los badges tienen fondo blanco, borde redondeado (pill) y texto del mismo color que el borde.

| Estado | Color | Hex | Tipo |
|---|---|---|---|
| `En progreso` | Gris | `#595959` | Neutral / Activo |
| `Sin vacantes activas` | Gris | `#595959` | Terminal |
| `Sin experiencia` | Gris | `#595959` | Derivación |
| `Postulación existente` | Azul | `#214ACF` | Informativo |
| `Actualización datos` | Azul | `#214ACF` | Informativo |
| `Actualización puesto` | Azul | `#214ACF` | Informativo |
| `Pre-filtro` | Morado | `#803FE0` | Activo |
| `Activo en Overall` | Morado | `#803FE0` | Terminal |
| `Entrevista agendada` | Morado | `#803FE0` | Terminal positivo |
| `Perfil aprobado` | Verde | `#217E25` | Positivo |
| `Exitoso` | Verde | `#217E25` | Terminal positivo |
| `Notificación pendiente` | Naranja | `#B8511D` | Alerta |
| `Aviso priv. rechazado` | Rojo | `#BC2A2A` | Terminal negativo |
| `Abandono` | Rojo | `#BC2A2A` | Terminal negativo |
| `Lista Negra` | Rojo | `#BC2A2A` | Terminal negativo |
| `Antecedentes` | Rojo | `#BC2A2A` | Terminal negativo |
| `Perfil descartado` | Rojo | `#BC2A2A` | Terminal negativo |

---

## Vista Detalle de Transacción

![[Pasted image 20260408201523.png]]
Acceso desde cualquier fila del Run History. Incluye botón "← Regresar al historial de ejecución".

### Header

- **Estado actual** de la transacción visible en esquina superior derecha (badge, ej. "En progreso").

---

### Sección: Detalles de la transacción

Grid de 4 columnas con los datos del candidato:

| Campo | Ejemplo |
|---|---|
| Hora de inicio de solicitud | 2026-03-30 12:50:55 |
| Etapa actual | Inicio reclutamiento |
| Distrito | Cuernavaca |
| Edad | 24 |
| Puesto | Auxiliar administrativo |
| Nombre del candidato | Mariana Gonzales |
| DNI / CE | 12345678 |
| No. Teléfono | +52 8171184781 |

---

### Sección: Etapas del proceso

Línea de tiempo horizontal con 3 etapas. Cada etapa tiene un ícono circular que refleja su estado y una lista de sub-pasos debajo. El track entre etapas se colorea de morado conforme avanza el proceso (completado = morado, pendiente = gris).

**Estados visuales del círculo:** círculo morado con ✓ = etapa completada · círculo gris con spinner = etapa en curso · círculo gris con ícono de documento = etapa pendiente.

---

**Etapa 1 — Inicio reclutamiento** · Ver [[F1 - Preguntar Datos Generales]]

- **Envío de mensaje de bienvenida** — el agente inicia la conversación en WhatsApp presentándose como "Oscar".
- **Aceptación de aviso de privacidad** — el postulante debe aceptar explícitamente el aviso para continuar.
  - → `En progreso` si acepta.
  - → `Aviso priv. rechazado` si rechaza. Fin del flujo.
- **Captura de ubicación/distrito del candidato** — el agente solicita el distrito del postulante y lo mapea contra la BD de distritos.
  - → `En progreso` si responde.
  - → `Abandono` si no responde. Fin del flujo.
- **Recolección de información personal** — nombre completo, edad, DNI/CE y número de teléfono.
- **Validación de registros previos** — se verifica en BD Postulantes si el candidato ya tiene postulaciones previas (compara DNI + puesto).
  - → `En progreso` si es un registro nuevo, continúa a Etapa 2.
  - → `Postulación existente` si ya aplicó al mismo puesto. Fin del flujo.
  - → `Abandono` si no responde. Fin del flujo.
  - → `Actualización datos` si el DNI existe pero el teléfono cambió; se actualiza sin re-preguntar todo.
  - → `Actualización puesto` si el DNI existe pero aplica a un puesto diferente.

---

**Etapa 2 — Evaluación candidato** · Ver [[F2 - Validar Lista Negra y Antecedentes]] · [[F3 - Evaluar Experiencia]] · [[F4 - Gestionar Sin Experiencia]] · [[F5 - Resguardar Información]] · [[F6 - Comparar Perfil vs BD]]

Al inicio de la etapa: → `Pre-filtro` si continúa · → `Abandono` si el postulante abandona en cualquier punto de esta etapa.

- **Selección del puesto de interés** — el agente presenta los puestos activos disponibles (BD Puestos Activos). Si no hay vacantes activas → `Sin vacantes activas`. Fin del flujo.
- **Presentación de requisitos y beneficios del puesto** — el agente muestra requisitos, resumen de actividades y beneficios del puesto seleccionado. Ver [[F3 - Evaluar Experiencia]].
- **Recolección de información adicional** — se capturan las 3 preguntas de evaluación definidas en BD Puestos Activos para ese puesto específico. Ver [[F3 - Evaluar Experiencia]].
- **Validación lista negra y antecedentes** — consulta BD Lista Negra y API de antecedentes de Overall, ambas por DNI/CE. Ver [[F2 - Validar Lista Negra y Antecedentes]].
  - → `Pre-filtro` si pasa ambas validaciones.
  - → `Lista Negra` si aparece en BD Lista Negra. Fin del flujo.
  - → `Antecedentes` si tiene antecedentes según la API. Fin del flujo.
- **Evaluación de experiencia** — se comparan las respuestas del postulante contra los criterios del puesto. Ver [[F3 - Evaluar Experiencia]].
  - → `Perfil aprobado` si cumple los requisitos.
  - → `Sin experiencia` si no tiene la experiencia requerida. Ver [[F4 - Gestionar Sin Experiencia]].
  - → `Perfil descartado` si el perfil no aplica al puesto. Fin del flujo.
  - → `Abandono` si no responde. Fin del flujo.
- **Almacenamiento de información en base de datos** — se guarda o actualiza el registro completo en BD Postulantes independientemente del resultado. Ver [[F5 - Resguardar Información]].
- **Comparación contra base de datos existente** — se verifica en BD Personal Activo si el candidato ya labora en Overall. Ver [[F6 - Comparar Perfil vs BD]].
  - → `Perfil aprobado` si no trabaja en Overall, continúa a Etapa 3.
  - → `Activo en Overall` si ya es empleado activo. Fin del flujo.
- **Actualización de registros** — se confirma el estado final del candidato en BD antes de continuar.

---

**Etapa 3 — Agendamiento entrevista** · Ver [[F7 - Notificar Reclutador]]

- **Selección de horario disponible para entrevista** — el agente presenta los horarios disponibles y el postulante confirma.
  - → `Entrevista agendada` si selecciona un horario.
  - → `Abandono` si no responde o no confirma. Fin del flujo.
- **Notificación resultados al reclutador** — email automático vía Outlook al reclutador responsable de la vacante (correo obtenido de BD Puestos Activos) con los datos del candidato y la entrevista agendada.
  - → `Exitoso` si el email se envía correctamente.
  - → `Notificación pendiente` si ocurre un error en el envío; requiere atención manual.
- **Captura de encuesta de satisfacción** — al cierre de la conversación, el agente solicita una encuesta de satisfacción al postulante.

---

### Sección: Conversación

Muestra el hilo completo de mensajes de WhatsApp entre el postulante y el agente (Oscar/Lucas).

**Layout:**
- Mensajes del postulante → burbuja izquierda, fondo gris claro, con avatar y nombre del postulante.
- Mensajes del agente → burbuja derecha, fondo morado, texto blanco.
- Cada mensaje muestra hora y fecha (ej. 12:04 PM, Jun 02).
- Campo de entrada "Type your message" con ícono de adjunto y botón de envío al pie.

**Ejemplo de conversación:**

| Hora | Quién | Mensaje |
|---|---|---|
| 12:04 PM | Postulante | "Hola, buenas tardes, soy Carlos Aguilar representante del grupo Codex, necesitaría de su ayuda para resolver una problemática por favor" |
| 12:05 PM | Agente | "Hola, gracias por comunicarte con Soporte Técnico. Lamento los inconvenientes. ¿Podrías proporcionarme tu Nombre y Apellidos por favor?" |
| 12:08 PM | Postulante | "Claro, soy Carlos Aguilar" |
| 12:09 PM | Agente | "Es un placer Carlos Aguilar. ¿Me podrías proporcionar una fotografía? Para asignarla a este canal." |

---

## Roadmap

![[Pasted image 20260408202307.png]]

**Proyecto:** Oscar – Overall
**Período:** 30-mar-2026 al 01-jun-2026

| Fase | Fechas | Notas |
|---|---|---|
| Diseño y aprobaciones | 30-mar → 14-abr | Incluye 2 reuniones con equipo Overall y aprobación por correo |
| Desarrollo mejoras chatbot | 15-abr → ~22-may | Desarrollo principal del agente |
| Desarrollo mejoras plataforma | 15-abr → ~22-may | Desarrollo del dashboard |
| Testing 1 | ~24-abr → 30-abr | Pruebas internas Beecker |
| Testing 2 | ~11-may → 22-may | Pruebas internas Beecker |
| Pruebas UATs | 25-may → 01-jun | Participación equipo Overall |
| Pase a productivo | 01-jun | Chatbot funcional 24/7 |

**Leyenda de colores del roadmap:**

| Color | Significado |
|---|---|
| Azul oscuro | Participación equipo Overall en reunión en línea |
| Verde | Aprobación por correo electrónico del equipo Overall |
| Rosa/Magenta | Pase a productivo (chatbot funcional 24/7) |

---
tags: [glendale, historial, versiones, changelog]
cliente: Glendale Parade Store LLC
documento: GLEN_US_SAAS_02_PDD_V1_20260224
up: "[[00 - Índice]]"
---

# Historial de Versiones – Glendale Returns Automation

Este documento registra la evolución de la documentación del proyecto desde su inicio, incluyendo cambios solicitados, actualizaciones de alcance y notas relevantes por versión.

---

## v1.0 – 2026-04-01 23:57

**Commit:** `7446425` — *"Add files via upload – init"*
**Autor:** Amy Vazquez
**Tipo:** Documentación inicial

### Descripción
Carga inicial del PDD (Product Design Document) completo del proyecto. Se sube la documentación estructurada en 17 archivos que cubren todo el alcance funcional y técnico del agente de automatización de devoluciones.

### Archivos creados
| Archivo | Descripción |
|---|---|
| `00 - Índice.md` | Índice maestro y resumen ejecutivo del proyecto |
| `01 - Alcance y Objetivos.md` | Problema, objetivos y tipos de devolución en alcance |
| `02 - Comportamiento del Agente.md` | Flujo de trabajo paso a paso del agente |
| `03 - Sistemas Involucrados.md` | Integraciones: MySQL, MOM ERP, UPS Web API, Outlook |
| `04 - Flujo de Estados.md` | Tabla de estados y mapeo a base de datos |
| `05 - Fuera de Alcance.md` | RMA, WorldShip, devoluciones históricas excluidas |
| `06 - Pendientes y Supuestos.md` | TBDs previos al inicio de desarrollo |
| `07 - Aprobaciones.md` | Tabla de firmas de aprobación del PDD |
| `Flujo de Estados - Diagrama.canvas` | Diagrama visual del flujo de estados |
| `Funcionalidades/F1 - Ingesta Diaria y Segmentación de Estados.md` | Lógica de procesamiento diario y umbrales |
| `Funcionalidades/F2 - Comunicaciones al Cliente.md` | Eventos de email y reglas de envío |
| `Funcionalidades/F3 - Mercancía Dañada y Defecto de Fabricante.md` | Flujo con UPS label + MOM reason code |
| `Funcionalidades/F4 - Artículo Incorrecto.md` | Flujo con UPS label + reenvío inmediato en MOM |
| `Funcionalidades/F5 - Reembolsos.md` | Flujo manual con revisión física de almacén |
| `Funcionalidades/F6 - Artículo Faltante.md` | Flujo manual con verificación de inventario |
| `PDD - Glendale - Returns Automation.pdf` | PDF fuente del PDD original |
| `CLAUDE.md` | Instrucciones del vault para Claude Code |

### Estado de pendientes en esta versión
- Umbral de auto-aprobación: **TBD** ($150–$200, pendiente CFO)
- Método de integración MOM: **TBD** (Opción A CSV vs. Opción B API directa)
- Acceso UPS Web API: **Pendiente** confirmación con representante UPS
- Plantillas de email: **Pendientes** redacción y aprobación por Glendale
- Campos de base de datos: **Pendiente** confirmación (campo USD, `return_type`, códigos de estado)

---

## v1.1 – 2026-04-02 00:32

**Commit:** `e6bfe72` — *"Add initial draft for Glendale Returns Agent dashboard views documentation"*
**Autor:** Amy Vazquez
**Tipo:** Nuevo documento + actualizaciones

### Descripción
Se agrega el documento de diseño de vistas de la plataforma (dashboard). También se incorporan screenshots de referencia visual proporcionados por Lucas para las tres vistas principales.

### Cambios
- **Nuevo:** `08 - Vistas de la Plataforma.md` — Especificación inicial de las 3 vistas del dashboard (Resumen, Historial de Ejecuciones, Detalles de Transacción)
- **Nuevo:** Imágenes de referencia `Lucas-Summary.png`, `Lucas - Run history.png`, `Lucas - Transaction Details.png` (guardadas en raíz del vault temporalmente)
- **Actualizado:** `00 - Índice.md` — Se agrega enlace a la nueva sección de Diseño de Plataforma
- **Actualizado:** `03 - Sistemas Involucrados.md` — Ampliación de detalles de integración
- **Actualizado:** `04 - Flujo de Estados.md` — Ajustes al flujo
- **Actualizado:** `06 - Pendientes y Supuestos.md` — Nuevos pendientes identificados

---

## v1.2 – 2026-04-02 09:12

**Commit:** `c9aaa27` — *"Remove unused PNG files and update dashboard layout documentation"*
**Autor:** Amy Vazquez
**Tipo:** Refactor de documentación

### Descripción
Limpieza de imágenes y expansión del documento de vistas. Las imágenes de referencia de la raíz se eliminan y la documentación del dashboard se hace más detallada.

### Cambios
- **Eliminado:** `Lucas-Summary.png`, `Lucas - Transaction Details.png`, `Lucas - Run history.png` (de la raíz del vault — eran referencias temporales)
- **Actualizado:** `08 - Vistas de la Plataforma.md` — Expansión significativa del layout y especificaciones de columnas (+70 líneas netas)

---

## v1.3 – 2026-04-02 10:10

**Commit:** `2e37b39` — *"Add initial configuration files for Obsidian and update dashboard view details"*
**Autor:** Amy Vazquez
**Tipo:** Configuración + actualización de documentación

### Descripción
Se agregan archivos de configuración de Obsidian al repositorio y se refina el documento de vistas del dashboard.

### Cambios
- **Nuevo:** `.obsidian/app.json`, `.obsidian/appearance.json`, `.obsidian/core-plugins.json`, `.obsidian/workspace.json` — Configuración del vault Obsidian versionada
- **Actualizado:** `08 - Vistas de la Plataforma.md` — Ajustes en detalles de vistas (+35 líneas)

---

## v1.4 – 2026-04-02 11:27

**Commit:** `f2d5841` — *"chore: consolidate empty code change entries for cleaner history"*
**Autor:** Amy Vazquez
**Tipo:** Refactor + reorganización

### Descripción
Consolidación del documento de vistas: se simplifica la estructura eliminando redundancias y se mueve la imagen de Run History al directorio del proyecto.

### Cambios
- **Actualizado:** `08 - Vistas de la Plataforma.md` — Refactor de contenido (-83 líneas eliminadas, +57 nuevas; simplificación de estructura)
- **Actualizado:** `04 - Flujo de Estados.md` — Ajuste menor
- **Reorganizado:** `Funcionalidades/Lucas - Run history.png` — Imagen movida al directorio correcto del proyecto
- **Actualizado:** `.obsidian/workspace.json`

---

## v1.5 – 2026-04-02 12:10

**Commit:** `dc77d77` — *"Add new graph configuration file and update last open files in workspace"*
**Autor:** Amy Vazquez
**Tipo:** Configuración + actualización de documentación

### Descripción
Se agrega configuración del grafo de Obsidian y se continúa refinando el documento de vistas.

### Cambios
- **Nuevo:** `.obsidian/graph.json` — Configuración del grafo visual de Obsidian
- **Actualizado:** `08 - Vistas de la Plataforma.md` — Reorganización de secciones (net -22 líneas vs. +41 nuevas)
- **Eliminado:** `Funcionalidades/Lucas - Run history.png` — Imagen de referencia removida tras ser incorporada al texto
- **Actualizado:** `.obsidian/workspace.json`

---

## v1.6 – 2026-04-02 12:31

**Commit:** `55820e8` — *"Update references in dashboard documentation for Glendale Returns Agent"*
**Autor:** Amy Vazquez
**Tipo:** Actualización de documentación

### Descripción
Actualización importante del documento de vistas de la plataforma con ajuste de referencias y contenido. Es la versión más reciente del documento `08 - Vistas de la Plataforma.md`.

### Cambios
- **Actualizado:** `08 - Vistas de la Plataforma.md` — Expansión significativa (+95 líneas netas; actualización de referencias e instrucciones detalladas)
- **Actualizado:** `.obsidian/workspace.json`

---

## v1.7 – 2026-04-06 10:43

**Commit:** `0c4498b` — *"Add '09 - Historial de Versiones' document and update index with new version history link"*
**Autor:** Amy Vazquez
**Tipo:** Nuevo documento

### Descripción
Se incorpora el documento de historial de versiones del proyecto (`09 - Historial de Versiones.md`) con registro retroactivo desde la carga inicial (v1.0). También se actualiza el índice maestro con el enlace a la nueva sección.

### Cambios
- **Nuevo:** `09 - Historial de Versiones.md` — Historial completo desde v1.0 hasta v1.6 (180 líneas)
- **Actualizado:** `00 - Índice.md` — Se agrega enlace a la sección de Historial de Versiones
- **Actualizado:** `.obsidian/workspace.json`

---

## v1.8 – 2026-04-06 23:53

**Commit:** `01fc31b` — *"Update dashboard view details for '08 - Vistas de la Plataforma' and adjust last open files in workspace"*
**Autor:** Amy Vazquez
**Tipo:** Actualización de documentación

### Descripción
Expansión y reestructuración significativa del documento de vistas de la plataforma. Se detallan con mayor profundidad los componentes de cada vista del dashboard.

### Cambios
- **Actualizado:** `08 - Vistas de la Plataforma.md` — Reestructuración y expansión mayor (+211 líneas añadidas, -83 eliminadas; net +128 líneas)
- **Actualizado:** `.obsidian/workspace.json`

---

## v1.9 – 2026-04-07 00:08

**Commit:** `a8e8709` — *"Refactor return types table and update layout for image attachments in dashboard"*
**Autor:** Amy Vazquez
**Tipo:** Refactor de documentación

### Descripción
Ajuste menor en el documento de vistas: se refactoriza la tabla de tipos de devolución y se corrige el layout de los adjuntos de imagen en el dashboard.

### Cambios
- **Actualizado:** `08 - Vistas de la Plataforma.md` — Refactor de tabla de tipos de devolución y layout de imágenes (+10 líneas, -9 eliminadas)

---

## Estado Actual del Proyecto

**Versión de documentación:** 1.9 (2026-04-07)
**Estado del PDD:** En revisión (`estado: En revisión` en frontmatter)
**Pendientes bloqueantes antes de desarrollo:**
- [ ] Confirmación umbral de auto-aprobación (Jose Barreto / CFO)
- [ ] Decisión MOM: Opción A (CSV nightly) vs. Opción B (API directa)
- [ ] Confirmación acceso y precio UPS Web API
- [ ] Aprobación de plantillas de email (Jose Barreto / Jonathan Piza)
- [ ] Confirmación campos BD: campo USD, `return_type`, códigos de estado

---

## Plantilla para futuras entradas

Cuando se realice un nuevo cambio, agregar una entrada con el siguiente formato:

```
## v[X.Y] – [YYYY-MM-DD HH:MM]

**Commit:** `hash` — *"mensaje"*
**Autor:** [nombre]
**Tipo:** [Nueva funcionalidad | Cambio de alcance | Corrección | Actualización de documentación | Refactor]

### Descripción
[Qué cambió y por qué]

### Cambios
- **[Nuevo/Actualizado/Eliminado]:** archivo — descripción
```

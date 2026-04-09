---
tags: [proyecto, overall, interaccion-postulantes, MOC]
cliente: Overall
documento: OVS.002
version: 9.0
fecha: 2026-02-27
estado: En desarrollo
---

# Overall – Interacción de Postulantes (Oscar / Lucas)

**Preparado por:** Beecker  
**Cliente:** Overall (Perú)  
**Versión:** v09 | 27 de febrero de 2026

> El Agente automatiza el proceso de atracción de talento: recibe postulantes vía WhatsApp (se presenta como "Oscar"), valida sus datos, evalúa su perfil contra puestos activos, y agenda entrevistas o notifica al reclutador de manera automática.

---

## Navegación del Proyecto

### Contexto
- [[01 - Alcance y Objetivos]]
- [[02 - Comportamiento del Agente]]
- [[03 - Sistemas Involucrados]]

### Funcionalidades
- [[F1 - Preguntar Datos Generales]]
- [[F2 - Validar Lista Negra y Antecedentes]]
- [[F3 - Evaluar Experiencia]]
- [[F4 - Gestionar Sin Experiencia]]
- [[F5 - Resguardar Información]]
- [[F6 - Comparar Perfil vs BD]]
- [[F7 - Notificar Reclutador]]

### Diseño de Plataforma
- [[08 - Vistas de la Plataforma]]

### Definiciones y Gobierno
- [[04 - Flujo de Estados]]
- [[05 - Fuera de Alcance]]
- [[06 - Pendientes y Supuestos]]
- [[07 - Aprobaciones]]
- [[09 - Historial de Versiones]]

---

## Resumen Ejecutivo

| Elemento | Detalle |
|---|---|
| Canal de entrada | WhatsApp |
| Nombre del agente (visible al postulante) | Oscar |
| Nombre del agente (interno Beecker) | Lucas |
| Área cliente | Recursos Humanos – Atracción |
| Trigger | Mensaje entrante del postulante vía WhatsApp |
| Máximo de transacciones | 500 |
| Notificación al reclutador | Email vía Outlook |
| País | Perú |

## KPIs del Dashboard

| # | KPI | Fórmula |
|---|---|---|
| 1 | Tasa de conversión a entrevista (%) | Estados "Entrevista agendada" / total transacciones |
| 2 | Tasa de abandono | Estados "Abandono" / total transacciones |
| 3 | Tasa de rechazo por LN o antecedentes | Estados "Lista Negra" + "Antecedentes" / total transacciones |
| 4 | Tasa de rechazo por distrito | Estados "Descartado por distrito" / total transacciones |
| 5 | Tasa de candidatos sin experiencia | Estados "Sin experiencia" / total transacciones |

> **Nota:** La página principal muestra un círculo con el consumo de transacciones sobre el máximo de 500.

## Etapas del Proceso

| Etapa | Descripción |
|---|---|
| Etapa 1 | Inicio reclutamiento |
| Etapa 2 | Evaluación candidato |
| Etapa 3 | Agendamiento entrevista |

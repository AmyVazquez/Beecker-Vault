---
tags: [glendale, estados, workflow]
up: "[[00 - Índice]]"
---

# Flujo de Estados

Todos los returns fluyen a través de los siguientes estados, gestionados en la columna `Status` del backend MySQL de Glendale.

## Tabla de estados

| Status | Asignado por | Significado |
|---|---|---|
| `Pending` | Sistema (al enviar el formulario) | Return enviado; en espera de revisión de completitud o revisión manual |
| `Needs Attention` | Agente (por encima del umbral) o Aprobador (info faltante + comentarios) | Falta información requerida; email de seguimiento enviado al cliente o solicitud de aprobación enviada al equipo de Glendale |
| `Approved` | Agente (automático) o Aprobador (manual) | Return aprobado; el Agente ejecutará el script de return |
| `Rejected` | Almacén o Aprobador (Missing Item/Refund) | Solicitud rechazada por reglas de negocio; el Agente enviará comunicación al cliente |

## Diagrama de flujo

![[Flujo de Estados - Diagrama.canvas]]

## Regla crítica

> ⚠️ Una vez que un return está en `Approved` y el script comienza la ejecución, la acción es **final e irreversible**.

---
← [[F6 - Artículo Faltante]] | → [[05 - Fuera de Alcance]]

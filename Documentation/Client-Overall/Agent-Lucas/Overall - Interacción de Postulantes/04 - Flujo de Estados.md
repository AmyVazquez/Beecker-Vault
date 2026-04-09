---
tags: [overall, estados, workflow]
up: "[[00 - Índice]]"
---

# Flujo de Estados

Cada transacción (postulante) progresa a través de tres etapas y puede terminar en distintos estados según el resultado de cada validación.

## Etapa 1: Inicio reclutamiento

| Estado | Tipo | Significado |
|---|---|---|
| `En progreso` | Activo | El postulante continúa el flujo en esta etapa |
| `Aviso priv. rechazado` | Terminal | El postulante rechazó el aviso de privacidad |
| `Abandono` | Terminal | El postulante dejó de responder o abandonó la conversación |
| `Postulación existente` | Terminal | Ya existe una postulación activa del mismo DNI para el mismo puesto |
| `Actualización datos` | Informativo | Se detectó el DNI con teléfono diferente; se actualizaron los datos de contacto |
| `Actualización puesto` | Informativo | El postulante ya existe pero está aplicando a un puesto distinto |

## Etapa 2: Evaluación candidato

| Estado | Tipo | Significado |
|---|---|---|
| `Pre-filtro` | Activo | El postulante pasó validación LN/antecedentes; en evaluación de experiencia |
| `Lista Negra` | Terminal | El postulante aparece en la BD Lista Negra (por DNI o número de documento) |
| `Antecedentes` | Terminal | El postulante tiene antecedentes según la API de Overall |
| `Perfil aprobado` | Activo | La experiencia del postulante cumple los requisitos del puesto |
| `Sin experiencia` | Derivación | El postulante no tiene la experiencia requerida (flujo alternativo) |
| `Perfil descartado` | Terminal | El perfil no cumple los requisitos; descartado en esta evaluación |
| `Activo en Overall` | Terminal | El postulante ya labora en Overall actualmente |
| `Abandono` | Terminal | El postulante abandonó durante la evaluación |

## Etapa 3: Agendamiento entrevista

| Estado | Tipo | Significado |
|---|---|---|
| `Entrevista agendada` | Terminal exitoso | El postulante seleccionó horario y la entrevista quedó confirmada |
| `Exitoso` | Terminal exitoso | El reclutador fue notificado correctamente |
| `Notificación pendiente` | Alerta | Error al enviar el email de notificación al reclutador |
| `Abandono` | Terminal | El postulante abandonó antes de confirmar la entrevista |

## Diagrama simplificado

```
Mensaje WhatsApp
     │
     ▼
[Etapa 1: Inicio reclutamiento]
  ├─ Aviso de privacidad ──► Aviso priv. rechazado
  ├─ Distrito ──────────────► Abandono
  └─ Registros previos ─────► Postulación existente / Actualización datos / Actualización puesto
     │
     ▼
[Etapa 2: Evaluación candidato]
  ├─ LN / Antecedentes ─────► Lista Negra / Antecedentes
  ├─ Experiencia ───────────► Sin experiencia / Perfil descartado
  ├─ BD Personal activo ────► Activo en Overall
  └─ Abandono ─────────────► Abandono
     │
     ▼ (Perfil aprobado)
[Etapa 3: Agendamiento entrevista]
  ├─ Horario ───────────────► Entrevista agendada → Exitoso
  └─ Abandono ─────────────► Abandono
```

---
← [[03 - Sistemas Involucrados]] | → [[05 - Fuera de Alcance]]

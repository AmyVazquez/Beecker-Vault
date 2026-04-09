---
tags:
  - overall
  - funcionalidad
  - sin-experiencia
up: "[[Beecker-Vault/Documentation/A-Ryan/C-Glendale/Glendale - Returns Automation/00 - Índice]]"
---

# F4 – Gestionar Sin Experiencia

## Descripción

Cuando el postulante no cumple con los requisitos de experiencia del puesto seleccionado, el agente activa un flujo alternativo para gestionar este escenario de manera apropiada.

## Flujo

1. El sistema detecta que la evaluación de experiencia resultó en `Sin experiencia`.
2. El agente informa al postulante que su perfil no cumple los requisitos de experiencia para el puesto seleccionado.
3. **Estado final:** `Sin experiencia`.

## Comportamiento pendiente de definición

> **Pendiente:** Confirmar con Overall el comportamiento exacto de este flujo:
> - ¿Se ofrece al postulante la opción de seleccionar otro puesto?
> - ¿Se le informa qué requisitos no cumplió?
> - ¿Se le sugiere aplicar en el futuro cuando tenga experiencia?
> - ¿Se guarda el registro en BD Postulantes con estado "sin experiencia"?

## Impacto en BD Postulantes

El registro se guarda en BD Postulantes independientemente del resultado (ver [[F5 - Resguardar Información]]).

## KPI relacionado

Este estado alimenta el KPI:
- **Tasa de candidatos sin experiencia** = total `Sin experiencia` / total transacciones

---
← [[F3 - Evaluar Experiencia]] | → [[F5 - Resguardar Información]]

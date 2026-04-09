---
tags: [overall, funcionalidad, datos-generales]
up: "[[00 - Índice]]"
---

# F1 – Preguntar Datos Generales

## Descripción

El agente ("Oscar") inicia la conversación con el postulante vía WhatsApp y recopila su información personal básica necesaria para el proceso de postulación.

## Flujo detallado

1. **Saludo y bienvenida** – el agente envía un mensaje de bienvenida en nombre de Overall.
2. **Aviso de privacidad** – el agente presenta el aviso de privacidad y solicita la aceptación explícita del postulante.
   - Si acepta → continúa el flujo.
   - Si rechaza → estado `Aviso priv. rechazado`. Fin de la conversación.
3. **Captura de ubicación / distrito** – el agente solicita el distrito donde reside el postulante.
   - El sistema determina el distrito canónico a partir del texto libre ingresado (BD Distritos).
   - Si el postulante abandona → estado `Abandono`.
4. **Recolección de información personal**:
   - Nombre completo
   - Edad
   - DNI o CE (Carné de Extranjería)
   - Número de teléfono

## Validación de registros previos

Antes de continuar, el sistema verifica en BD Postulantes:

| Caso | Acción | Estado resultante |
|---|---|---|
| Mismo DNI + mismo puesto + postulación activa | No se procesa de nuevo | `Postulación existente` |
| Mismo DNI + teléfono diferente | Se actualiza el dato de contacto sin re-preguntar todo | `Actualización datos` |
| Mismo DNI + puesto diferente | Se registra como nueva postulación al nuevo puesto | `Actualización puesto` |
| DNI no existe | Se crea registro nuevo | Continúa flujo |

## Bases de datos involucradas

- **BD Postulantes** (lectura) – verificar registros previos
- **BD Distritos** (lectura) – mapear el texto libre del distrito al valor canónico

## Estados posibles al terminar F1

- `En progreso` → continúa a F2
- `Aviso priv. rechazado` → fin
- `Abandono` → fin
- `Postulación existente` → fin
- `Actualización datos` → continúa flujo con datos actualizados
- `Actualización puesto` → continúa flujo como nueva postulación

---
← [[00 - Índice]] | → [[F2 - Validar Lista Negra y Antecedentes]]

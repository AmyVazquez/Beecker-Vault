---
tags:
  - overall
  - workflow
  - comportamiento
up: "[[Beecker-Vault/Documentation/A-Lucas/C-Overall/Overall - Interacción de Postulantes/00 - Índice]]"
---

# Comportamiento del Agente (High-Level)

## Flujo principal (paso a paso)

### Etapa 1: Inicio reclutamiento

1. **Mensaje de bienvenida** – el agente (como "Oscar") envía el saludo inicial al postulante vía WhatsApp.
2. **Aviso de privacidad** – el postulante debe aceptar el aviso de privacidad para continuar.
   - Si rechaza → estado `Aviso priv. rechazado`. Fin del flujo.
3. **Captura de ubicación / distrito** – el agente solicita el distrito del postulante y determina su ubicación contra la BD de distritos.
   - Si abandona la conversación → estado `Abandono`.
4. **Recolección de información personal** – nombre, edad, DNI/CE, número de teléfono, etc.
5. **Validación de registros previos** – compara el DNI y puesto de interés contra la BD Postulantes:
   - Si ya existe postulación activa para ese puesto → `Postulación existente`.
   - Si el DNI existe pero el teléfono cambió → `Actualización datos` (solo se actualiza sin re-preguntar todo).
   - Si el puesto de interés cambió → `Actualización puesto`.
   - Si abandona en este paso → `Abandono`.

### Etapa 2: Evaluación candidato

6. **Selección del puesto de interés** – el agente presenta los puestos activos disponibles en BD Puestos Activos.
   - Si no hay vacantes activas → estado `Sin vacantes activas`. Fin del flujo.
   - Si abandona → `Abandono`.
7. **Presentación de requisitos y beneficios** – el agente presenta los requisitos del puesto seleccionado, resumen de actividades y beneficios.
8. **Recolección de información adicional** – preguntas específicas del puesto (3 preguntas definidas en BD Puestos Activos).
9. **Validación de lista negra y antecedentes**:
   - Consulta BD Lista Negra por DNI o número de documento.
   - Consulta API de antecedentes de Overall por DNI o número de documento.
   - Si aparece en LN → estado `Lista Negra`. Fin del flujo.
   - Si tiene antecedentes → estado `Antecedentes`. Fin del flujo.
   - Si pasa ambas → continúa en `Pre-filtro`.
10. **Evaluación de experiencia** – el agente evalúa las respuestas del postulante contra los requisitos del puesto:
    - Si cumple experiencia → `Perfil aprobado`.
    - Si no tiene experiencia → `Sin experiencia` (ver [[F4 - Gestionar Sin Experiencia]]).
    - Si el perfil no aplica → `Perfil descartado`.
    - Si abandona → `Abandono`.
11. **Almacenamiento en BD Postulantes** – se guarda o actualiza el registro completo del postulante (ver [[F5 - Resguardar Información]]).
12. **Comparación contra BD existente** – se verifica si el postulante ya labora en Overall (BD Personal Activo):
    - Si ya trabaja en Overall → `Activo en Overall`. Fin del flujo para contratación externa.
    - Si aprobado y no activo → continúa a Etapa 3.

### Etapa 3: Agendamiento entrevista

13. **Selección de horario** – el agente presenta horarios disponibles para la entrevista.
    - Si agenda → `Entrevista agendada`.
    - Si abandona → `Abandono`.
14. **Notificación al reclutador** – email vía Outlook al reclutador responsable de la vacante con datos del postulante y hora de entrevista.
    - Si el email se envía correctamente → `Exitoso`.
    - Si hay problema en el envío → `Notificación pendiente`.
15. **Encuesta de satisfacción** – al cierre de la conversación, el agente captura una encuesta de satisfacción al postulante.

## Regla de límite de transacciones

> ⚠️ El sistema soporta un **máximo de 500 transacciones**. El dashboard muestra el consumo actual vs. el límite mediante un indicador visual circular.

---
← [[Beecker-Vault/Documentation/A-Lucas/C-Overall/Overall - Interacción de Postulantes/01 - Alcance y Objetivos]] | → [[Beecker-Vault/Documentation/A-Lucas/C-Overall/Overall - Interacción de Postulantes/03 - Sistemas Involucrados]]

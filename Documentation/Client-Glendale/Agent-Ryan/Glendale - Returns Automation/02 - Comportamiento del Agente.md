---
tags: [glendale, workflow, comportamiento]
up: "[[00 - Índice]]"
---

# Comportamiento del Agente (High-Level)

## Flujo principal (paso a paso)

1. **Ingreso de solicitud** – el cliente (o CS en su nombre) completa el formulario en `glendale.com`.
2. **Almacenamiento** – la submission popula la tabla MySQL de returns en el backend de Glendale.
3. **Revisión humana de completitud** – el equipo de Glendale verifica si los campos requeridos están presentes. Si falta algo, marca el registro como `Needs Attention`.
4. **Acciones del equipo sobre Needs Attention** – el equipo puede:
   - Aprobar un return
   - Agregar comentarios (razón por la que no puede aprobarse)
   - Rechazar un return
5. **Lectura del Agente** – el Agente lee la tabla una vez al final del día.
6. **Procesamiento de `Pending – Complete Info`**:
   - Si el valor está **por debajo del umbral** [TBD – $150]: el Agente auto-aprueba → status `Approved`.
   - Si el valor está **igual o por encima del umbral**: el Agente mueve a `Needs Attention` para revisión humana.
7. **Procesamiento de `Needs Attention`**:
   - **Con comentarios del equipo** → el Agente genera un email al cliente con el motivo (via LLM), enviado en horario laboral. Status permanece `Needs Attention`.

   > **Pendiente:** El rango exacto de horas del horario laboral no ha sido definido. Pendiente de alineación con Glendale.
   - **Sin comentarios** → el Agente notifica al equipo de Glendale que hay un pending sin acción. Status permanece `Needs Attention`.
8. **Ejecución para `Approved`** – el Agente ejecuta el script correspondiente según el tipo de retorno (ver [[F3 - Mercancía Dañada y Defecto de Fabricante]], [[F4 - Artículo Incorrecto]], [[F5 - Reembolsos]], [[F6 - Artículo Faltante]]).
9. **Integración MOM** – las acciones en MOM se disparan vía:
   - **Opción A**: CSV nocturno (menor riesgo técnico)
   - **Opción B**: API directa en tiempo real (más valor, más complejo) — *pendiente decisión*
10. **Comunicaciones al cliente** – confirmación, aprobación/rechazo, etiqueta de envío (según aplique).
11. **Escalación** – si el Agente encuentra escenarios que no puede manejar (ej. respuestas complejas del cliente):
    - Flag en historial de ejecución
    - Notificación resumen al equipo de Glendale al final de la ejecución

## Regla crítica

> ⚠️ Una vez que un return se marca `Approved` y el script comienza su ejecución, la acción es **final**. No hay reversión posible.

---
← [[01 - Alcance y Objetivos]] | → [[03 - Sistemas Involucrados]]

/**
 * Modelos para el historial de comunicaciones por correo.
 * Representan los emails que el agente envía al cliente en cada etapa del proceso.
 * Ver: 08 - Vistas de la Plataforma → Transaction Details → Email communications.
 *
 * Nota: los correos solo se envían en horario laboral (rango pendiente de definir con Glendale).
 */

/**
 * Tipos de evento que generan un correo al cliente.
 * Cada tipo tiene un template diferente (algunos generados por LLM, otros por template fijo).
 */
export type EmailEventType =
  | 'Needs Attention'  // Cliente debe proveer información faltante — generado por LLM
  | 'Approved'         // Devolución aprobada con próximos pasos — template fijo de Glendale
  | 'Shipping label'   // Etiqueta UPS adjunta en PDF — solo para Damaged, Defect y Wrong Item
  | 'Rejected';        // Devolución rechazada con razón — generado por LLM

/**
 * Registro de un correo enviado por el agente relacionado a una devolución.
 * Se muestra en la sección Email communications de Transaction Details.
 * Los ítems están colapsados por defecto y se pueden expandir para ver el cuerpo.
 */
export interface EmailRecord {
  id: string;                        // ID único del registro de email
  returnId: string;                  // ID de la devolución a la que pertenece (userId)
  clientName: string;                // Nombre del cliente (para mostrar en la lista)
  eventType: EmailEventType;         // Tipo de evento — determina el badge de color
  subject: string;                   // Asunto del correo (se muestra como preview en la lista)
  body: string;                      // Cuerpo completo del correo (visible al expandir)
  sentAt: string;                    // Timestamp de envío (ej: "6:05 PM", "Yesterday", "Oct 24")
  attachments?: EmailAttachment[];   // Archivos adjuntos (ej: etiqueta UPS en PDF)
}

/**
 * Archivo adjunto dentro de un correo enviado.
 * Principalmente usado para las etiquetas de envío UPS en PDF.
 */
export interface EmailAttachment {
  name: string; // Nombre del archivo (ej: "shipping-label-RTN001042.pdf")
  url: string;  // URL para descargar el archivo adjunto
}

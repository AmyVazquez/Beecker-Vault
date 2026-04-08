/**
 * Modelos principales del dominio de devoluciones.
 * Estos tipos representan los datos que vienen de la base de datos de Glendale
 * (tablas: tbl_return_form_users y tbl_item_list).
 *
 * Si en el futuro cambia la estructura de la BD, este es el primer archivo a actualizar.
 */

/**
 * Estados posibles de una devolución.
 * El valor numérico (0-3) corresponde al campo `status` en tbl_return_form_users.
 * 'rejected' no tiene valor numérico en BD — lo asigna manualmente el equipo de Glendale.
 */
export enum ReturnStatus {
  PendingMissingInfo  = 0, // Solicitud recibida con información incompleta
  PendingCompleteInfo = 1, // Solicitud completa, esperando procesamiento del agente
  NeedsAttention      = 2, // Requiere revisión humana o acción del cliente
  Approved            = 3, // Aprobada — el agente ejecutará las acciones correspondientes
  Rejected            = 'rejected' // Rechazada manualmente por el equipo de Glendale
}

/**
 * Tipos de devolución que maneja el sistema.
 * Determina qué acciones ejecuta el agente (etiqueta UPS, entrada en MOM, etc.).
 * Ver documentación: 08 - Vistas de la Plataforma y funcionalidades F3-F6.
 */
export enum ReturnType {
  DamagedGoods       = 'Damaged Goods',       // Artículo recibido dañado — genera etiqueta UPS
  ManufacturerDefect = 'Manufacturer Defect', // Defecto de fábrica — genera etiqueta UPS
  WrongItem          = 'Wrong Item',           // Se envió artículo incorrecto — genera etiqueta UPS
  Refund             = 'Refund',               // Cliente no quiere el artículo — SIN etiqueta UPS
  MissingItem        = 'Missing Item'          // Faltaron artículos — SIN etiqueta UPS, Glendale reenvía
}

/**
 * Datos principales de una devolución (tbl_return_form_users).
 * Se usa en Run History y como base de Transaction Details.
 */
export interface ReturnItem {
  userId: string;            // Identificador único — formato RTN-00-001
  firstName: string;         // Nombre del cliente
  lastName: string;          // Apellido del cliente
  orderNo: string;           // Número de orden
  returnCurrentDate: string; // Fecha de la devolución (YYYY-MM-DD)
  status: ReturnStatus;      // Estado actual (ver enum ReturnStatus)
  returnType: ReturnType;    // Tipo de devolución (ver enum ReturnType)
  emailAddress: string;      // Correo del cliente para notificaciones
  address: string;           // Dirección física del cliente
  comments: string;          // Comentarios del equipo de Glendale (visible en Transaction Details)
  invoiceNo?: string;        // Número de factura (no visible en Run History, solo en detalles)
  returnFor?: string;        // Campo sin uso activo en la BD — pendiente de definición
  createdAt: string;         // Fecha de creación del registro
  updatedAt: string;         // Fecha de última modificación
}

/**
 * Datos extendidos de una devolución para la vista Transaction Details.
 * Extiende ReturnItem agregando los ítems individuales de tbl_item_list.
 */
export interface ReturnItemDetail extends ReturnItem {
  exchangeItem?: string;   // Artículo de reemplazo solicitado (si aplica)
  items: ReturnLineItem[]; // Lista de ítems a devolver (uno o más por transacción)
}

/**
 * Ítem individual dentro de una devolución (tbl_item_list).
 * Se vincula a ReturnItem mediante userId.
 */
export interface ReturnLineItem {
  itemName: string;         // Nombre del artículo
  quantityReturned: number; // Cantidad a devolver
  reasonForReturn: string;  // Razón específica del ítem (texto libre)
}

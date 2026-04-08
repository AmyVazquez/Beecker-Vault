/**
 * Modelo para las fotos adjuntas a una devolución.
 * Se muestran en la sección "Return photos" de Transaction Details.
 *
 * Aplica solo para: Damaged Goods, Manufacturer Defect y Wrong Item.
 * No aplica para: Missing Item ni Refund.
 *
 * Pendiente de definición técnica:
 * - Cómo el cliente adjunta las fotos (formulario, email, portal)
 * - Dónde se almacenan (BD, bucket, servidor)
 * - Cómo se vinculan al user_id / order_no de tbl_return_form_users
 */
export interface ReturnPhoto {
  id: string;                // ID único de la foto
  returnId: string;          // ID de la devolución a la que pertenece (userId)
  documentName: string;      // Nombre del archivo (ej: "Foto Ejemplo.png")
  dateOfProcessing: string;  // Fecha en que se procesó el archivo (DD/MM/YYYY)
  url: string;               // URL para visualizar o descargar la imagen
}

/**
 * Modelos genéricos para respuestas del API backend.
 * Todos los endpoints del servidor deben seguir estos contratos de respuesta.
 * Si el backend cambia su estructura de respuesta, actualizar aquí.
 */

/**
 * Wrapper estándar para respuestas simples del API.
 * El campo `data` contiene el payload tipado según el endpoint.
 */
export interface ApiResponse<T> {
  data: T;          // Payload de la respuesta
  message: string;  // Mensaje descriptivo del resultado
  success: boolean; // Indica si la operación fue exitosa
}

/**
 * Wrapper para respuestas paginadas (listas con paginación).
 * Usado principalmente en Run History donde se pagina la tabla de devoluciones.
 */
export interface PaginatedResponse<T> {
  data: T[];       // Arreglo de items de la página actual
  total: number;   // Total de registros en el servidor (para calcular páginas)
  page: number;    // Página actual (base 1)
  pageSize: number; // Cantidad de registros por página
}

/**
 * Filtros disponibles para la vista Run History.
 * Se envían como query params al endpoint GET /api/returns.
 */
export interface RunHistoryFilter {
  month?: string;    // Formato YYYY-MM — si no se envía, trae todos los registros
  search?: string;   // Búsqueda libre por nombre, orden o ID de transacción
  page: number;      // Página solicitada (base 1)
  pageSize: number;  // Registros por página (default: 10)
}

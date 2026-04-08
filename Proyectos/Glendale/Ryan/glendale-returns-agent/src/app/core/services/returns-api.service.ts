/**
 * Servicio central: ReturnsApiService
 *
 * Único punto de contacto entre el frontend y el backend del proyecto Glendale.
 * Todas las llamadas HTTP deben pasar por aquí — ningún componente llama al API directamente.
 *
 * Está organizado en 3 secciones que corresponden a las 3 vistas del dashboard:
 *   1. Summary     → KPIs, gráfica de tendencia, métricas, etapas, donut chart
 *   2. Run History → Tabla paginada de devoluciones, exportación CSV
 *   3. Transaction Details → Detalle de transacción, emails, fotos
 *
 * Si el backend cambia sus endpoints o estructura de respuesta,
 * este es el único archivo que necesita actualizarse.
 *
 * Todos los métodos incluyen manejo de errores via `handleError`.
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ReturnItem, ReturnItemDetail } from '../../shared/models/return.model';
import { ApiResponse, PaginatedResponse, RunHistoryFilter } from '../../shared/models/api-response.model';
import { KpiData, TrendPoint, SecondaryMetrics, ProcessStageCount, ReturnTypeCount } from '../../shared/models/summary.model';
import { EmailRecord } from '../../shared/models/email.model';
import { ReturnPhoto } from '../../shared/models/photo.model';

@Injectable({
  providedIn: 'root' // Singleton global — se instancia una sola vez en toda la app
})
export class ReturnsApiService {
  private http = inject(HttpClient);

  /** URL base del API — cambiar aquí si el backend cambia de dominio o prefijo */
  private base = '/api';

  // ── 1. SUMMARY ─────────────────────────────────────────────────────────────

  /**
   * Obtiene los datos para las 4 cards de KPI de la vista Summary.
   * @param month Filtro de mes en formato YYYY-MM (opcional)
   */
  getKpis(month?: string): Observable<KpiData> {
    const params = month ? new HttpParams().set('month', month) : undefined;
    return this.http.get<ApiResponse<KpiData>>(`${this.base}/summary/kpis`, { params }).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene los puntos de datos para la gráfica de línea "Returns volume over time".
   * @param month Filtro de mes en formato YYYY-MM (opcional)
   */
  getTrend(month?: string): Observable<TrendPoint[]> {
    const params = month ? new HttpParams().set('month', month) : undefined;
    return this.http.get<ApiResponse<TrendPoint[]>>(`${this.base}/summary/trend`, { params }).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene las métricas del panel secundario a la derecha de la gráfica:
   * tasa de auto-aprobación, tasa de revisión manual y tiempo promedio de procesamiento.
   * @param month Filtro de mes en formato YYYY-MM (opcional)
   */
  getSecondaryMetrics(month?: string): Observable<SecondaryMetrics> {
    const params = month ? new HttpParams().set('month', month) : undefined;
    return this.http.get<ApiResponse<SecondaryMetrics>>(`${this.base}/summary/metrics`, { params }).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene el conteo de devoluciones por etapa del proceso
   * para el timeline horizontal (Return in Queue, In Validation, Approved & In Execution).
   */
  getProcessStageCounts(): Observable<ProcessStageCount> {
    return this.http.get<ApiResponse<ProcessStageCount>>(`${this.base}/summary/stages`).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene las devoluciones activas para la lista "Active transaction".
   * Solo incluye registros con status: Pending, Needs Attention o Approved (excluye Completed).
   */
  getActiveReturns(): Observable<ReturnItem[]> {
    return this.http.get<ApiResponse<ReturnItem[]>>(`${this.base}/summary/active`).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene el conteo de devoluciones agrupadas por tipo para la gráfica de dona.
   * @param month Filtro de mes en formato YYYY-MM (opcional)
   */
  getReturnTypeCounts(month?: string): Observable<ReturnTypeCount[]> {
    const params = month ? new HttpParams().set('month', month) : undefined;
    return this.http.get<ApiResponse<ReturnTypeCount[]>>(`${this.base}/summary/by-type`, { params }).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  // ── 2. RUN HISTORY ─────────────────────────────────────────────────────────

  /**
   * Obtiene la lista paginada de devoluciones para la tabla de Run History.
   * Soporta búsqueda libre, filtro de mes y paginación.
   * @param filter Objeto con page, pageSize, y opcionalmente month y search
   */
  getReturns(filter: RunHistoryFilter): Observable<PaginatedResponse<ReturnItem>> {
    let params = new HttpParams()
      .set('page', filter.page.toString())
      .set('pageSize', filter.pageSize.toString());

    if (filter.month)  params = params.set('month', filter.month);
    if (filter.search) params = params.set('search', filter.search);

    return this.http.get<PaginatedResponse<ReturnItem>>(`${this.base}/returns`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Descarga la tabla de Run History como archivo CSV.
   * Usa los mismos filtros de búsqueda y mes que la tabla, sin paginación.
   * El resultado es un Blob que el componente convierte en descarga del browser.
   */
  exportCsv(filter: Omit<RunHistoryFilter, 'page' | 'pageSize'>): Observable<Blob> {
    let params = new HttpParams();
    if (filter.month)  params = params.set('month', filter.month);
    if (filter.search) params = params.set('search', filter.search);

    return this.http.get(`${this.base}/returns/export`, {
      params,
      responseType: 'blob' // Necesario para descargas de archivos
    }).pipe(
      catchError(this.handleError)
    );
  }

  // ── 3. TRANSACTION DETAILS ─────────────────────────────────────────────────

  /**
   * Obtiene el detalle completo de una devolución incluyendo sus ítems (tbl_item_list).
   * Se usa en Transaction Details — se pre-carga con el resolver antes de entrar a la vista.
   * @param id userId de la devolución (formato RTN-00-001)
   */
  getReturnById(id: string): Observable<ReturnItemDetail> {
    return this.http.get<ApiResponse<ReturnItemDetail>>(`${this.base}/returns/${id}`).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene el historial de correos enviados relacionados a una devolución.
   * Se muestra en la sección "Email communications" de Transaction Details.
   * @param id userId de la devolución
   */
  getEmailHistory(id: string): Observable<EmailRecord[]> {
    return this.http.get<ApiResponse<EmailRecord[]>>(`${this.base}/returns/${id}/emails`).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene las fotos adjuntas de una devolución.
   * Se muestra en la sección "Return photos" de Transaction Details.
   * Solo aplica para: Damaged Goods, Manufacturer Defect y Wrong Item.
   * @param id userId de la devolución
   */
  getReturnPhotos(id: string): Observable<ReturnPhoto[]> {
    return this.http.get<ApiResponse<ReturnPhoto[]>>(`${this.base}/returns/${id}/photos`).pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  // ── MANEJO DE ERRORES ──────────────────────────────────────────────────────

  /**
   * Maneja los errores HTTP y los convierte en mensajes legibles en español.
   * Se usa en todos los métodos mediante el operador catchError de RxJS.
   * Si se agregan nuevos códigos de error, añadir cases aquí.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Error desconocido';

    if (error.status === 0) {
      // Error de red — el servidor no responde o hay problema de CORS
      message = 'Sin conexión al servidor';
    } else if (error.status === 401) {
      message = 'No autorizado — verificar credenciales';
    } else if (error.status === 404) {
      message = 'Recurso no encontrado';
    } else if (error.status >= 500) {
      message = 'Error interno del servidor';
    }

    return throwError(() => new Error(message));
  }
}

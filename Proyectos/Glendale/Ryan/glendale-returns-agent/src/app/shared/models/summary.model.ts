/**
 * Modelos para la vista principal Summary (dashboard del agente Ryan).
 * Estos tipos representan los datos agregados que se muestran en KPIs,
 * gráficas y paneles de la pantalla de inicio.
 * Ver: 08 - Vistas de la Plataforma → Summary.
 */

import { ReturnType } from './return.model';

/**
 * Datos para las 4 tarjetas de KPI en la parte superior del dashboard.
 * Cada card muestra una métrica clave del período seleccionado.
 */
export interface KpiData {
  totalReturns: number;      // Conteo total de devoluciones en el período
  autoApprovedPct: number;   // Porcentaje auto-aprobadas (auto-approved / total * 100)
  manualReviewPct: number;   // Porcentaje en revisión manual (manual / total * 100)
  activeReturns: number;     // Devoluciones activas (status: Pending, Needs Attention o Approved)
}

/**
 * Punto de datos para la gráfica de línea "Returns volume over time".
 * El eje X son los días, las 3 series son Received, Processed y Approved.
 */
export interface TrendPoint {
  date: string;      // Fecha del punto (YYYY-MM-DD)
  received: number;  // Devoluciones recibidas ese día
  processed: number; // Devoluciones procesadas ese día
  approved: number;  // Devoluciones aprobadas ese día
}

/**
 * Métricas del panel secundario a la derecha de la gráfica.
 * Se muestran con barra de progreso y valor porcentual.
 */
export interface SecondaryMetrics {
  autoApprovalRate: number;          // Tasa de auto-aprobación (%)
  manualReviewRate: number;          // Tasa de revisión manual (%)
  avgProcessingTimeMinutes: number;  // Tiempo promedio entre created_at y updated_at en minutos
}

/**
 * Conteo de devoluciones por etapa del proceso.
 * Se usa en el panel "Return process flow" con el timeline horizontal de 3 etapas.
 */
export interface ProcessStageCount {
  inQueue: number;             // Etapa 1: en bandeja (status: Pending)
  inValidation: number;        // Etapa 2: en validación (status: Needs Attention)
  approvedInExecution: number; // Etapa 3: aprobadas y en ejecución (status: Approved)
}

/**
 * Conteo de devoluciones agrupadas por tipo.
 * Se usa en la gráfica de dona (donut chart) de la vista Summary.
 */
export interface ReturnTypeCount {
  type: ReturnType; // Tipo de devolución (ver enum ReturnType)
  count: number;    // Cantidad de devoluciones de ese tipo en el período
}

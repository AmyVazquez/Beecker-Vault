/**
 * Presentational component: TrendChart
 *
 * Gráfica de línea "Returns volume over time" con 3 series:
 *   - Received (devoluciones recibidas)
 *   - Processed (procesadas)
 *   - Approved (aprobadas)
 *
 * El eje X muestra los días del período seleccionado.
 *
 * NOTA: Este componente está preparado para integrar una librería de gráficas.
 * Opciones recomendadas para Angular: ngx-charts, Chart.js (ng2-charts) o ApexCharts.
 * Por ahora renderiza una representación simplificada hasta que se defina la librería.
 *
 * Para integrar la librería definitiva:
 *   1. Instalar: npm install <librería>
 *   2. Reemplazar el contenido del template con el componente de la librería
 *   3. Mapear TrendPoint[] al formato que requiere la librería
 */
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendPoint } from '../../../../shared/models/summary.model';

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trend-chart.component.html',
  styleUrl: './trend-chart.component.scss'
})
export class TrendChartComponent {

  /** Puntos de datos para las 3 series de la gráfica */
  data = input.required<TrendPoint[]>();
}

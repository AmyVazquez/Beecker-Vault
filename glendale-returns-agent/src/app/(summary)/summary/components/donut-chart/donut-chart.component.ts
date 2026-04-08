/**
 * Presentational component: DonutChart
 *
 * Gráfica de dona que muestra el conteo de devoluciones por tipo.
 * El centro muestra el tipo seleccionado y su conteo.
 * La leyenda debajo lista los 5 tipos con sus conteos.
 *
 * NOTA: Al igual que TrendChart, está preparado para integrar una librería.
 * Por ahora muestra una representación de la leyenda sin gráfica visual.
 *
 * Tipos mostrados (según PDD):
 *   - Damaged Goods
 *   - Manufacturer Defect
 *   - Wrong Item
 *   - Refund
 *   - Missing Item
 */
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnTypeCount } from '../../../../shared/models/summary.model';
import { ReturnTypePipe } from '../../../../shared/pipes/return-type.pipe';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule, ReturnTypePipe],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})
export class DonutChartComponent {

  /** Conteo por tipo de devolución provisto por el container Summary */
  data = input.required<ReturnTypeCount[]>();

  /** Calcula el total para mostrar en el centro de la dona */
  get total(): number {
    return this.data().reduce((sum, item) => sum + item.count, 0);
  }
}

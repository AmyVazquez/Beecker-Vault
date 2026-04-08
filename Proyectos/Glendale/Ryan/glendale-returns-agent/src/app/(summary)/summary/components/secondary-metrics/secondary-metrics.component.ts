/**
 * Presentational: SecondaryMetricsComponent
 *
 * Panel con 3 métricas secundarias que aparece a la derecha de la gráfica de tendencia:
 *   - Auto-approval rate (%)
 *   - Manual review rate (%)
 *   - Average processing time (minutos)
 *
 * Cada métrica de porcentaje incluye una barra de progreso visual.
 */
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryMetrics } from '../../../../shared/models/summary.model';

@Component({
  selector: 'app-secondary-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secondary-metrics.component.html',
  styleUrl: './secondary-metrics.component.scss'
})
export class SecondaryMetricsComponent {
  metrics   = input<SecondaryMetrics | null>(null);
  isLoading = input<boolean>(false);
}

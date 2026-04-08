/**
 * Presentational component: SecondaryMetrics
 *
 * Panel con 3 métricas secundarias mostradas con barra de progreso.
 * Se ubica a la derecha de la gráfica de tendencia en la vista Summary.
 *
 * Métricas:
 *   - Auto-approval rate (%)
 *   - Manual review rate (%)
 *   - Average processing time (minutos)
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

  /** Métricas provistas por el container Summary */
  data = input.required<SecondaryMetrics>();
}

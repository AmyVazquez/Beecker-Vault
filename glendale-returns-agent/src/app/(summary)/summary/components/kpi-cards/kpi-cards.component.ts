/**
 * Presentational component: KpiCards
 *
 * Muestra las 4 tarjetas de KPI en la parte superior del dashboard:
 *   - Total Returns: conteo absoluto de devoluciones en el período
 *   - Auto-approved: porcentaje de auto-aprobadas
 *   - Manual review: porcentaje en revisión manual
 *   - Active Returns: devoluciones aún en proceso (no completadas)
 *
 * Este componente NO llama al API — solo recibe datos y los muestra.
 * Los datos los provee el container SummaryComponent.
 */
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiData } from '../../../../shared/models/summary.model';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-cards.component.html',
  styleUrl: './kpi-cards.component.scss'
})
export class KpiCardsComponent {

  /** Datos de KPIs provistos por el container Summary */
  data = input.required<KpiData>();

  /**
   * Configuración de las 4 cards.
   * Computed para recalcularse automáticamente cuando cambian los datos.
   */
  cards = computed(() => [
    {
      label: 'Total Returns',
      value: this.data().totalReturns.toString(),
      icon: '📋',
      description: 'Devoluciones en el período'
    },
    {
      label: 'Auto-approved',
      value: `${this.data().autoApprovedPct}%`,
      icon: '✅',
      description: 'Procesadas automáticamente'
    },
    {
      label: 'Manual review',
      value: `${this.data().manualReviewPct}%`,
      icon: '👤',
      description: 'Requirieron revisión humana'
    },
    {
      label: 'Active Returns',
      value: this.data().activeReturns.toString(),
      icon: '⏳',
      description: 'Pending, Needs Attention o Approved'
    }
  ]);
}

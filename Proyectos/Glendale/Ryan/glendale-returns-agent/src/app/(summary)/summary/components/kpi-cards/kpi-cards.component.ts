/**
 * Presentational: KpiCardsComponent
 *
 * Muestra las 4 tarjetas de métricas principales en la parte superior del dashboard:
 *   1. Total Returns
 *   2. Auto-Approved %
 *   3. Manual Review %
 *   4. Active Returns
 *
 * Recibe los datos como input() y no hace llamadas al API.
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
  kpis      = input<KpiData | null>(null);
  isLoading = input<boolean>(false);
}

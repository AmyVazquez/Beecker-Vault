/**
 * Container component: Summary
 *
 * Vista principal del dashboard del agente Ryan.
 * Es el "container" que orquesta todos los datos y los pasa
 * a los componentes de presentación hijos.
 *
 * Responsabilidades:
 *   - Llamar al API para obtener KPIs, tendencia, métricas, etapas y dona
 *   - Manejar el estado de carga y errores
 *   - Responder al cambio de mes y recargar todos los datos
 *   - Navegar a Run History y Transaction Details
 *
 * NO contiene lógica de UI ni de presentación — eso lo hacen los componentes hijos.
 */
import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReturnsApiService } from '../../core/services/returns-api.service';
import { KpiData, TrendPoint, SecondaryMetrics, ProcessStageCount, ReturnTypeCount } from '../../shared/models/summary.model';
import { ReturnItem } from '../../shared/models/return.model';

// Componentes hijos (presentational)
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { MonthSelectorComponent } from '../../shared/components/month-selector/month-selector.component';
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { TrendChartComponent } from './components/trend-chart/trend-chart.component';
import { SecondaryMetricsComponent } from './components/secondary-metrics/secondary-metrics.component';
import { ProcessFlowComponent } from './components/process-flow/process-flow.component';
import { ActiveTransactionsComponent } from './components/active-transactions/active-transactions.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MonthSelectorComponent,
    KpiCardsComponent,
    TrendChartComponent,
    SecondaryMetricsComponent,
    ProcessFlowComponent,
    ActiveTransactionsComponent,
    DonutChartComponent
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  private api    = inject(ReturnsApiService);
  private router = inject(Router);

  // ── Estado del componente ──────────────────────────────────────────────────

  /** Mes actualmente seleccionado — vacío significa "All time" */
  selectedMonth = signal<string>('');

  /** Indica si alguna carga está en progreso */
  isLoading = signal(false);

  /** Mensaje de error global — se muestra si falla alguna llamada al API */
  error = signal<string | null>(null);

  // ── Datos de los componentes hijos ─────────────────────────────────────────

  kpiData          = signal<KpiData | null>(null);
  trendData        = signal<TrendPoint[]>([]);
  secondaryMetrics = signal<SecondaryMetrics | null>(null);
  stageCounts      = signal<ProcessStageCount | null>(null);
  activeReturns    = signal<ReturnItem[]>([]);
  returnTypeCounts = signal<ReturnTypeCount[]>([]);

  // ── Ciclo de vida ──────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadAllData();
  }

  // ── Manejo de eventos ──────────────────────────────────────────────────────

  /** Responde al cambio de mes desde el MonthSelector y recarga todos los datos */
  onMonthChange(month: string): void {
    this.selectedMonth.set(month);
    this.loadAllData();
  }

  /** Navega a la vista Run History */
  goToRunHistory(): void {
    this.router.navigate(['/run-history']);
  }

  /** Navega al detalle de una transacción desde la lista de activas */
  goToDetail(userId: string): void {
    this.router.navigate(['/run-history', userId]);
  }

  // ── Carga de datos ─────────────────────────────────────────────────────────

  /**
   * Carga todos los datos necesarios para la vista Summary en paralelo.
   * Si cualquier llamada falla, se muestra el mensaje de error.
   */
  private loadAllData(): void {
    this.isLoading.set(true);
    this.error.set(null);
    const month = this.selectedMonth() || undefined;

    // KPIs
    this.api.getKpis(month).subscribe({
      next: data => this.kpiData.set(data),
      error: err => this.error.set(err.message)
    });

    // Gráfica de tendencia
    this.api.getTrend(month).subscribe({
      next: data => this.trendData.set(data),
      error: err => this.error.set(err.message)
    });

    // Métricas secundarias
    this.api.getSecondaryMetrics(month).subscribe({
      next: data => this.secondaryMetrics.set(data),
      error: err => this.error.set(err.message)
    });

    // Conteo por etapas (no depende del mes)
    this.api.getProcessStageCounts().subscribe({
      next: data => this.stageCounts.set(data),
      error: err => this.error.set(err.message)
    });

    // Transacciones activas (no depende del mes)
    this.api.getActiveReturns().subscribe({
      next: data => {
        this.activeReturns.set(data);
        this.isLoading.set(false);
      },
      error: err => {
        this.error.set(err.message);
        this.isLoading.set(false);
      }
    });

    // Conteo por tipo para el donut chart
    this.api.getReturnTypeCounts(month).subscribe({
      next: data => this.returnTypeCounts.set(data),
      error: err => this.error.set(err.message)
    });
  }
}

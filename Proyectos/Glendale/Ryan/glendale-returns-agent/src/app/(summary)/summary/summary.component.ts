/**
 * Container: SummaryComponent
 *
 * Vista principal del dashboard de Glendale Returns Automation.
 *
 * ──────────────────────────────────────────────────────────────────
 * DATOS DUMMY: Actualmente todos los signals están inicializados con
 * datos de ejemplo que coinciden con el diseño Figma.
 *
 * Cuando el backend esté listo, descomentar los bloques marcados con
 * "🔌 CONECTAR API" y eliminar los valores dummy de los signals.
 * ──────────────────────────────────────────────────────────────────
 */
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ReturnsApiService } from '../../core/services/returns-api.service';
import { KpiData, TrendPoint, SecondaryMetrics, ProcessStageCount, ReturnTypeCount } from '../../shared/models/summary.model';
import { ReturnItem, ReturnStatus, ReturnType } from '../../shared/models/return.model';

import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { TrendChartComponent } from './components/trend-chart/trend-chart.component';
import { SecondaryMetricsComponent } from './components/secondary-metrics/secondary-metrics.component';
import { ProcessFlowComponent } from './components/process-flow/process-flow.component';
import { ActiveTransactionsComponent } from './components/active-transactions/active-transactions.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { MonthSelectorComponent } from '../../shared/components/month-selector/month-selector.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
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

  // ── Filtro de mes ──────────────────────────────────────────────────────────
  selectedMonth = signal<string | undefined>(undefined);

  // ── Estado de carga ────────────────────────────────────────────────────────
  isLoadingFiltered = signal(false);
  isLoadingRealtime = signal(false);

  // ──────────────────────────────────────────────────────────────────────────
  // DATOS DUMMY — Reemplazar con llamadas reales al API cuando esté disponible
  // ──────────────────────────────────────────────────────────────────────────

  // 🔌 CONECTAR API: this.api.getKpis(month)
  kpis = signal<KpiData | null>({
    totalReturns: 142,     // 🔌 Dato real: tbl_return_form_users COUNT
    autoApprovedPct: 78,   // 🔌 Dato real: % registros procesados automáticamente
    manualReviewPct: 18,   // 🔌 Dato real: % registros con status NeedsAttention
    activeReturns: 32      // 🔌 Dato real: COUNT status IN (0,1,2,3) activos
  });

  // 🔌 CONECTAR API: this.api.getTrend(month)
  trendData = signal<TrendPoint[]>([
    { date: 'MON', received: 125, processed: 115, approved: 100 },
    { date: 'TUE', received: 175, processed: 160, approved: 130 },
    { date: 'WED', received: 110, processed: 105, approved: 95  },
    { date: 'THU', received: 195, processed: 175, approved: 145 },
    { date: 'FRI', received: 240, processed: 220, approved: 160 },
    { date: 'SAT', received: 75,  processed: 65,  approved: 55  },
    { date: 'SUN', received: 100, processed: 90,  approved: 85  }
  ]);

  // 🔌 CONECTAR API: this.api.getSecondaryMetrics(month)
  secondaryMetrics = signal<SecondaryMetrics | null>({
    autoApprovalRate: 89,            // 🔌 Dato real: % auto-aprobaciones del período
    manualReviewRate: 76,            // 🔌 Dato real: % revisiones manuales
    avgProcessingTimeMinutes: 145    // 🔌 Dato real: AVG(updated_at - created_at) en minutos
  });

  // 🔌 CONECTAR API: this.api.getProcessStageCounts()
  stageCounts = signal<ProcessStageCount | null>({
    inQueue: 5,             // 🔌 Dato real: COUNT status = 0 (Pending Missing) + 1 (Pending Complete)
    inValidation: 3,        // 🔌 Dato real: COUNT status = 2 (NeedsAttention)
    approvedInExecution: 2  // 🔌 Dato real: COUNT status = 3 (Approved)
  });

  // 🔌 CONECTAR API: this.api.getActiveReturns()
  activeReturns = signal<ReturnItem[]>([
    {
      userId: 'RTN-001042',
      firstName: 'Mariana',
      lastName: 'Gonzales Béjar',
      orderNo: '123456',
      returnCurrentDate: '2026-04-01',
      status: ReturnStatus.NeedsAttention,   // 🔌 Dato real: campo status de tbl_return_form_users
      returnType: ReturnType.DamagedGoods,
      emailAddress: 'mariana@example.com',
      address: '123 Main St',
      comments: '',
      createdAt: '2026-04-01',
      updatedAt: '2026-04-01'
    },
    {
      userId: 'RTN-001041',
      firstName: 'Juan',
      lastName: 'Pérez López',
      orderNo: '123455',
      returnCurrentDate: '2026-04-01',
      status: ReturnStatus.PendingCompleteInfo, // 🔌 Dato real: campo status
      returnType: ReturnType.WrongItem,
      emailAddress: 'juan@example.com',
      address: '456 Oak Ave',
      comments: '',
      createdAt: '2026-04-01',
      updatedAt: '2026-04-01'
    },
    {
      userId: 'RTN-001040',
      firstName: 'Carlos',
      lastName: 'Mendez',
      orderNo: '123454',
      returnCurrentDate: '2026-04-01',
      status: ReturnStatus.Approved,            // 🔌 Dato real: campo status
      returnType: ReturnType.ManufacturerDefect,
      emailAddress: 'carlos@example.com',
      address: '789 Pine Rd',
      comments: '',
      createdAt: '2026-03-31',
      updatedAt: '2026-04-01'
    }
  ]);

  // 🔌 CONECTAR API: this.api.getReturnTypeCounts(month)
  returnTypeCounts = signal<ReturnTypeCount[]>([
    { type: ReturnType.DamagedGoods,       count: 48 }, // 🔌 Dato real: COUNT GROUP BY return_type
    { type: ReturnType.WrongItem,          count: 35 },
    { type: ReturnType.ManufacturerDefect, count: 29 },
    { type: ReturnType.Refund,             count: 18 },
    { type: ReturnType.MissingItem,        count: 12 }
  ]);

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    // 🔌 DESCOMENTAR cuando el backend esté listo:
    // this.loadFilteredData();
    // this.loadRealtimeData();
  }

  // ── Métodos de carga (listos para cuando se conecte el API) ────────────────

  loadFilteredData(): void {
    this.isLoadingFiltered.set(true);
    const month = this.selectedMonth();
    forkJoin({
      kpis:    this.api.getKpis(month),
      trend:   this.api.getTrend(month),
      metrics: this.api.getSecondaryMetrics(month),
      types:   this.api.getReturnTypeCounts(month)
    }).subscribe({
      next: ({ kpis, trend, metrics, types }) => {
        this.kpis.set(kpis);
        this.trendData.set(trend);
        this.secondaryMetrics.set(metrics);
        this.returnTypeCounts.set(types);
        this.isLoadingFiltered.set(false);
      },
      error: () => this.isLoadingFiltered.set(false)
    });
  }

  loadRealtimeData(): void {
    this.isLoadingRealtime.set(true);
    forkJoin({
      stages: this.api.getProcessStageCounts(),
      active: this.api.getActiveReturns()
    }).subscribe({
      next: ({ stages, active }) => {
        this.stageCounts.set(stages);
        this.activeReturns.set(active);
        this.isLoadingRealtime.set(false);
      },
      error: () => this.isLoadingRealtime.set(false)
    });
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  onMonthChange(month: string | undefined): void {
    this.selectedMonth.set(month || undefined);
    // 🔌 DESCOMENTAR cuando el backend esté listo:
    // this.loadFilteredData();
  }

  goToRunHistory(): void {
    this.router.navigate(['/run-history']);
  }

  onTransactionClick(id: string): void {
    this.router.navigate(['/run-history', id]);
  }
}

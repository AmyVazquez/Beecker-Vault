/**
 * Container component: RunHistory
 *
 * Vista de historial completo de devoluciones.
 * Muestra una tabla paginada con búsqueda, filtro de mes y exportación CSV.
 *
 * Responsabilidades:
 *   - Manejar la paginación (página actual, tamaño de página)
 *   - Manejar la búsqueda libre y el filtro de mes
 *   - Llamar al API para cargar los datos de la tabla
 *   - Manejar la descarga del CSV
 *   - Navegar a Transaction Details al hacer clic en una fila
 *   - Navegar de regreso a Summary
 */
import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReturnsApiService } from '../../core/services/returns-api.service';
import { ReturnItem } from '../../shared/models/return.model';
import { RunHistoryFilter } from '../../shared/models/api-response.model';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { MonthSelectorComponent } from '../../shared/components/month-selector/month-selector.component';
import { ReturnsTableComponent } from './components/returns-table/returns-table.component';

@Component({
  selector: 'app-run-history',
  standalone: true,
  imports: [PageHeaderComponent, MonthSelectorComponent, ReturnsTableComponent],
  templateUrl: './run-history.component.html',
  styleUrl: './run-history.component.scss'
})
export class RunHistoryComponent implements OnInit {
  private api    = inject(ReturnsApiService);
  private router = inject(Router);

  // ── Estado ────────────────────────────────────────────────────────────────

  returns    = signal<ReturnItem[]>([]);
  total      = signal(0);
  isLoading  = signal(false);
  error      = signal<string | null>(null);

  /** Filtros activos — se envían al API en cada consulta */
  filter = signal<RunHistoryFilter>({
    page: 1,
    pageSize: 10,
    month: '',
    search: ''
  });

  // ── Ciclo de vida ─────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadReturns();
  }

  // ── Eventos del usuario ───────────────────────────────────────────────────

  /** Navega de regreso a la vista Summary */
  goBack(): void {
    this.router.navigate(['/']);
  }

  /** Navega al detalle de una transacción */
  goToDetail(userId: string): void {
    this.router.navigate(['/run-history', userId]);
  }

  /** Actualiza el filtro de mes y recarga desde la página 1 */
  onMonthChange(month: string): void {
    this.filter.update(f => ({ ...f, month, page: 1 }));
    this.loadReturns();
  }

  /** Actualiza el texto de búsqueda y recarga desde la página 1 */
  onSearchChange(search: string): void {
    this.filter.update(f => ({ ...f, search, page: 1 }));
    this.loadReturns();
  }

  /** Cambia la página actual */
  onPageChange(page: number): void {
    this.filter.update(f => ({ ...f, page }));
    this.loadReturns();
  }

  /** Cambia el tamaño de página y vuelve a la página 1 */
  onPageSizeChange(pageSize: number): void {
    this.filter.update(f => ({ ...f, pageSize, page: 1 }));
    this.loadReturns();
  }

  /** Descarga la tabla actual como CSV */
  onExportCsv(): void {
    const { month, search } = this.filter();
    this.api.exportCsv({ month, search }).subscribe({
      next: (blob) => {
        // Crea un enlace temporal para forzar la descarga del archivo
        const url  = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href     = url;
        link.download = `glendale-returns-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => this.error.set(err.message)
    });
  }

  // ── Carga de datos ─────────────────────────────────────────────────────────

  private loadReturns(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.api.getReturns(this.filter()).subscribe({
      next: (response) => {
        this.returns.set(response.data);
        this.total.set(response.total);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      }
    });
  }
}

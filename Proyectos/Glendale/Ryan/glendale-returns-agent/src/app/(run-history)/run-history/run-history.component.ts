/**
 * Container: RunHistoryComponent
 *
 * Vista de historial de devoluciones — tabla paginada con búsqueda y filtros.
 *
 * Funcionalidades:
 *   - Tabla con 10 columnas definidas en el PDD
 *   - Búsqueda libre por texto (userId, clientName, etc.)
 *   - Filtro de mes (YYYY-MM)
 *   - Paginación numérica (10 registros por página)
 *   - Exportar a CSV
 *   - Navegar al detalle de una devolución
 *
 * El estado de paginación y filtros vive en signals para que
 * los componentes presentacionales sean completamente tontos (sin lógica).
 */
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ReturnsApiService } from '../../core/services/returns-api.service';
import { ReturnItem } from '../../shared/models/return.model';
import { RunHistoryFilter } from '../../shared/models/api-response.model';

import { ReturnsTableComponent } from './components/returns-table/returns-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { MonthSelectorComponent } from '../../shared/components/month-selector/month-selector.component';

@Component({
  selector: 'app-run-history',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    MonthSelectorComponent,
    ReturnsTableComponent
  ],
  templateUrl: './run-history.component.html',
  styleUrl: './run-history.component.scss'
})
export class RunHistoryComponent implements OnInit {
  private api    = inject(ReturnsApiService);
  private router = inject(Router);

  // ── Estado de carga ────────────────────────────────────────────────────────

  isLoading = signal(false);

  // ── Datos ──────────────────────────────────────────────────────────────────

  returns    = signal<ReturnItem[]>([]);
  totalItems = signal(0);

  // ── Filtros y paginación ───────────────────────────────────────────────────

  /** Texto de búsqueda libre */
  search = signal('');

  /** Mes seleccionado en formato YYYY-MM */
  selectedMonth = signal<string | undefined>(undefined);

  /** Página actual (base 1) */
  currentPage = signal(1);

  /** Número de registros por página (permite cambiar desde el dropdown) */
  pageSize = 10;

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadData();
  }

  // ── Carga de datos ─────────────────────────────────────────────────────────

  /**
   * Construye el filtro con el estado actual y llama al API.
   * Se reutiliza cada vez que cambia cualquier parámetro de búsqueda.
   */
  loadData(): void {
    this.isLoading.set(true);

    const filter: RunHistoryFilter = {
      page:     this.currentPage(),
      pageSize: this.pageSize,
      search:   this.search() || undefined,
      month:    this.selectedMonth()
    };

    this.api.getReturns(filter).subscribe({
      next: (response) => {
        this.returns.set(response.data);
        this.totalItems.set(response.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  /** Responde al cambio de texto en el campo de búsqueda */
  onSearchChange(value: string): void {
    this.search.set(value);
    this.currentPage.set(1); // Volver a página 1 al buscar
    this.loadData();
  }

  /** Responde al cambio de mes en el MonthSelector */
  onMonthChange(month: string | undefined): void {
    this.selectedMonth.set(month);
    this.currentPage.set(1);
    this.loadData();
  }

  /** Responde al cambio de página en la paginación */
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  /** Exporta la tabla actual (con los filtros activos) a CSV */
  onExportCsv(): void {
    this.api.exportCsv({
      search: this.search() || undefined,
      month:  this.selectedMonth()
    }).subscribe(blob => {
      // Crear enlace temporal para disparar la descarga del archivo
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `returns-${this.selectedMonth() ?? 'all'}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  /** Cambia el número de items por página */
  onPageSizeChange(value: string): void {
    this.pageSize = Number(value);
    this.currentPage.set(1);
    this.loadData();
  }

  /** Regresa a la vista Summary */
  onBack(): void {
    this.router.navigate(['/']);
  }

  /** Navega al detalle de la devolución seleccionada en la tabla */
  onRowClick(id: string): void {
    this.router.navigate(['/run-history', id]);
  }
}

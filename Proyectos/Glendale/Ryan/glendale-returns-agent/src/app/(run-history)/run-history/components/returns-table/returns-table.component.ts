/**
 * Presentational: ReturnsTableComponent
 *
 * Tabla paginada de devoluciones con 10 columnas según el PDD.
 * No hace llamadas al API — recibe todos los datos como inputs.
 *
 * Columnas:
 *   User ID, First Name, Last Name, Order No, Return Date,
 *   Status, Return Type, Email, Address, Comments
 *
 * Emite pageChange cuando el usuario cambia de página,
 * y rowClick cuando hace click en una fila.
 */
import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItem } from '../../../../shared/models/return.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-returns-table',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './returns-table.component.html',
  styleUrl: './returns-table.component.scss'
})
export class ReturnsTableComponent {
  returns     = input<ReturnItem[]>([]);
  isLoading   = input<boolean>(false);
  currentPage = input<number>(1);
  pageSize    = input<number>(10);
  totalItems  = input<number>(0);

  /** Emite el número de página seleccionada */
  pageChange = output<number>();

  /** Emite el userId de la fila clickeada */
  rowClick = output<string>();

  /** Total de páginas calculado a partir de totalItems y pageSize */
  totalPages = computed(() =>
    Math.ceil(this.totalItems() / this.pageSize()) || 1
  );

  /** Array de números de página para el paginador */
  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  onPageClick(page: number): void {
    if (page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  onRowClick(id: string): void {
    this.rowClick.emit(id);
  }
}

/**
 * Presentational component: ReturnsTable
 *
 * Tabla paginada de devoluciones con las 10 columnas definidas en el PDD.
 * Columnas (en orden según diseño):
 *   1. User ID       6. Return For
 *   2. User Name     7. Return Type
 *   3. No Order      8. Email Address
 *   4. Return Date   9. Address
 *   5. Status       10. Comments
 *
 * Al hacer clic en una fila emite el userId para navegar al detalle.
 * El componente maneja la paginación local y emite los cambios al container.
 */
import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItem } from '../../../../shared/models/return.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { ReturnTypePipe } from '../../../../shared/pipes/return-type.pipe';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-returns-table',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, ReturnTypePipe, EmptyStateComponent],
  templateUrl: './returns-table.component.html',
  styleUrl: './returns-table.component.scss'
})
export class ReturnsTableComponent {

  /** Registros de la página actual */
  returns     = input.required<ReturnItem[]>();
  /** Total de registros en el servidor (para calcular páginas) */
  total       = input.required<number>();
  currentPage = input<number>(1);
  pageSize    = input<number>(10);
  isLoading   = input<boolean>(false);

  /** Emite el userId al hacer clic en una fila */
  rowClick      = output<string>();
  /** Emite la nueva página cuando el usuario cambia de página */
  pageChange    = output<number>();
  /** Emite el nuevo tamaño de página */
  pageSizeChange = output<number>();

  /** Opciones de tamaño de página disponibles en el selector */
  readonly pageSizeOptions = [10, 25, 50, 100];

  /** Calcula el total de páginas */
  totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));

  /** Genera el arreglo de páginas para la paginación numérica */
  pages = computed(() => {
    const total = this.totalPages();
    // Muestra máximo 5 páginas centradas en la actual
    const current = this.currentPage();
    const start = Math.max(1, current - 2);
    const end   = Math.min(total, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  /** Nombre completo del cliente */
  getFullName(item: ReturnItem): string {
    return `${item.firstName} ${item.lastName}`;
  }
}

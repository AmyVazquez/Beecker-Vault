/**
 * Presentational: ActiveTransactionsComponent
 *
 * Lista de devoluciones activas en tiempo real (Pending, Needs Attention, Approved).
 * Al hacer click en una fila emite el userId para que el container navegue al detalle.
 */
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItem, ReturnStatus } from '../../../../shared/models/return.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-active-transactions',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './active-transactions.component.html',
  styleUrl: './active-transactions.component.scss'
})
export class ActiveTransactionsComponent {
  returns   = input<ReturnItem[]>([]);
  isLoading = input<boolean>(false);

  /** Emite el userId cuando el usuario hace click en una fila */
  transactionClick = output<string>();

  onRowClick(id: string): void {
    this.transactionClick.emit(id);
  }

  /**
   * Devuelve el porcentaje de progreso (0-100) según el status de la devolución.
   * 🔌 Ajustar valores cuando se defina la lógica de progreso real en el backend.
   */
  progressFromStatus(status: ReturnStatus): number {
    const map: Partial<Record<ReturnStatus, number>> = {
      [ReturnStatus.PendingMissingInfo]:  15,
      [ReturnStatus.PendingCompleteInfo]: 35,
      [ReturnStatus.NeedsAttention]:      60,
      [ReturnStatus.Approved]:            85,
    };
    return map[status] ?? 0;
  }
}

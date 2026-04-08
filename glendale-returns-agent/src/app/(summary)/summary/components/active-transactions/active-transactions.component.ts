/**
 * Presentational component: ActiveTransactions
 *
 * Lista las devoluciones actualmente en proceso (Pending, Needs Attention, Approved).
 * Cada ítem muestra: ID, nombre del cliente, tipo de devolución, badge de etapa y progreso.
 * Al hacer clic en "→", navega al detalle de la transacción.
 * El botón "Mostrar más" redirige a Run History para ver todas las devoluciones.
 *
 * Este componente NO llama al API — los datos los provee el container SummaryComponent.
 */
import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItem, ReturnStatus } from '../../../../shared/models/return.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { ReturnTypePipe } from '../../../../shared/pipes/return-type.pipe';

@Component({
  selector: 'app-active-transactions',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, ReturnTypePipe],
  templateUrl: './active-transactions.component.html',
  styleUrl: './active-transactions.component.scss'
})
export class ActiveTransactionsComponent {

  /** Lista de devoluciones activas (máx. 5 en la vista Summary) */
  returns    = input.required<ReturnItem[]>();
  isLoading  = input<boolean>(false);

  /** Emite el userId cuando el usuario hace clic en "→" para ver el detalle */
  viewDetail = output<string>();

  /** Emite cuando el usuario hace clic en "Mostrar más" para ir a Run History */
  viewAll    = output<void>();

  /** Muestra solo los primeros 5 registros en la vista Summary */
  visibleReturns = computed(() => this.returns().slice(0, 5));

  /**
   * Calcula el porcentaje de progreso según el estado de la devolución.
   * Se usa para la barra de progreso de cada ítem.
   */
  getProgress(status: ReturnStatus | number): number {
    switch (status) {
      case ReturnStatus.PendingMissingInfo:
      case 0: return 15;
      case ReturnStatus.PendingCompleteInfo:
      case 1: return 35;
      case ReturnStatus.NeedsAttention:
      case 2: return 60;
      case ReturnStatus.Approved:
      case 3: return 85;
      default: return 0;
    }
  }

  /** Nombre completo del cliente para mostrar en la lista */
  getFullName(item: ReturnItem): string {
    return `${item.firstName} ${item.lastName}`;
  }
}

/**
 * Componente compartido: StatusBadge
 *
 * Muestra el estado de una devolución como un badge coloreado.
 * Se usa en Run History (columna Status) y en el header de Transaction Details.
 *
 * Los colores están definidos en el PDD:
 *   - Naranja (#B8511D): Pending – Missing Info
 *   - Morado  (#803FE0): Pending – Complete Info
 *   - Rojo    (#BC2A2A): Needs Attention / Rejected
 *   - Verde   (#217E25): Approved
 *
 * Uso: <app-status-badge [status]="return.status" />
 */
import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReturnStatus } from '../../models/return.model';
import { ReturnStatusPipe } from '../../pipes/return-status.pipe';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [NgClass, ReturnStatusPipe],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {

  /** Estado de la devolución — acepta el enum, número (de la BD) o string 'rejected' */
  status = input.required<ReturnStatus | number | string>();

  /**
   * Calcula la clase CSS correspondiente al estado.
   * Las clases están definidas en el archivo SCSS del componente.
   */
  get cssClass(): string {
    switch (this.status()) {
      case ReturnStatus.PendingMissingInfo:
      case 0:           return 'badge--pending-missing';
      case ReturnStatus.PendingCompleteInfo:
      case 1:           return 'badge--pending-complete';
      case ReturnStatus.NeedsAttention:
      case 2:           return 'badge--needs-attention';
      case ReturnStatus.Approved:
      case 3:           return 'badge--approved';
      case ReturnStatus.Rejected:
      case 'rejected':  return 'badge--rejected';
      default:          return '';
    }
  }
}

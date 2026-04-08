/**
 * Presentational component: EmailCommunications
 *
 * Bandeja de correos enviados al cliente relacionados a esta devolución.
 * Los ítems están colapsados por defecto y se pueden expandir para ver el cuerpo.
 * Se muestran del más reciente al más antiguo.
 */
import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailRecord } from '../../../../shared/models/email.model';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-email-communications',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  templateUrl: './email-communications.component.html',
  styleUrl: './email-communications.component.scss'
})
export class EmailCommunicationsComponent {

  emails     = input.required<EmailRecord[]>();
  isLoading  = input<boolean>(false);

  /** Controla qué email está expandido — guarda el id del email expandido */
  expandedId = signal<string | null>(null);

  /** Alterna la expansión de un email */
  toggle(id: string): void {
    this.expandedId.update(current => current === id ? null : id);
  }

  /** Determina la clase CSS del badge según el tipo de evento */
  getBadgeClass(eventType: string): string {
    switch (eventType) {
      case 'Approved':        return 'badge--approved';
      case 'Needs Attention': return 'badge--needs-attention';
      case 'Rejected':        return 'badge--rejected';
      case 'Shipping label':  return 'badge--shipping';
      default:                return '';
    }
  }
}

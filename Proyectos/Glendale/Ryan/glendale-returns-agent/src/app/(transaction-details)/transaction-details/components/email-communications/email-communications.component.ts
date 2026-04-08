/**
 * Presentational: EmailCommunicationsComponent
 *
 * Bandeja de correos enviados por el agente relacionados a una devolución.
 * Los correos se muestran colapsados; al hacer click se expande el cuerpo.
 * Solo un correo puede estar expandido a la vez.
 *
 * Badges de tipo (colores según PDD):
 *   - Approved       → verde
 *   - Needs Attention → rojo
 *   - Rejected       → rojo
 *   - Shipping label → azul
 */
import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailRecord, EmailEventType } from '../../../../shared/models/email.model';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-email-communications',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  templateUrl: './email-communications.component.html',
  styleUrl: './email-communications.component.scss'
})
export class EmailCommunicationsComponent {
  emails    = input<EmailRecord[]>([]);
  isLoading = input<boolean>(false);

  /** ID del correo actualmente expandido (null = ninguno) */
  expandedId = signal<string | null>(null);

  /** Alterna la expansión de un correo */
  toggle(id: string): void {
    this.expandedId.update(current => current === id ? null : id);
  }

  /** Devuelve la clase CSS del badge según el tipo de evento */
  getBadgeClass(type: EmailEventType): string {
    const map: Record<EmailEventType, string> = {
      'Approved':        'email-badge--approved',
      'Needs Attention': 'email-badge--needs-attention',
      'Rejected':        'email-badge--rejected',
      'Shipping label':  'email-badge--shipping'
    };
    return map[type] ?? '';
  }
}

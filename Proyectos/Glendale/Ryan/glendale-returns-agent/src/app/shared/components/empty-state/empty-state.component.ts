/**
 * Componente compartido: EmptyState
 *
 * Muestra un mensaje cuando una sección no tiene datos que mostrar.
 * Se usa en Return Photos ("No photos attached to this return.")
 * y en cualquier lista que pueda estar vacía.
 *
 * Uso:
 *   <app-empty-state message="No photos attached to this return." />
 */
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <!-- Mensaje configurable via input — si no se pasa, usa el texto por defecto -->
      <p class="empty-state__message">{{ message() }}</p>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;

      &__message {
        color: #999;
        font-size: 0.875rem;
        margin: 0;
        text-align: center;
      }
    }
  `]
})
export class EmptyStateComponent {

  /** Texto a mostrar en el estado vacío */
  message = input<string>('No data available.');
}

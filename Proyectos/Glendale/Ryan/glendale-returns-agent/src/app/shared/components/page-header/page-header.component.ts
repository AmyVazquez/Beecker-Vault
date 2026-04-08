/**
 * Componente compartido: PageHeader
 *
 * Header superior que se reutiliza en las 3 vistas del dashboard:
 *   - Summary: muestra avatar + nombre del agente "Ryan" + botón "Run History"
 *   - Run History: muestra botón "← Back to agent Ryan"
 *   - Transaction Details: muestra botón "← Back to run history"
 *
 * Se controla mediante inputs qué elementos mostrar en cada vista.
 *
 * Uso en Summary:
 *   <app-page-header (runHistoryClick)="goToRunHistory()" />
 *
 * Uso en Run History:
 *   <app-page-header [showBackButton]="true" backLabel="Back to agent Ryan" (backClick)="goBack()" />
 */
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {

  /** Nombre del agente (visible en la vista Summary) */
  agentName = input<string>('Ryan');

  /** Subtítulo del agente debajo del nombre */
  subtitle = input<string>('Returns Automation');

  /** Muestra el botón "Run History" — activo en Summary, oculto en las demás vistas */
  showRunHistory = input<boolean>(true);

  /** Muestra el botón "Select Month" — activo en Summary y Run History */
  showMonthSelector = input<boolean>(true);

  /** Muestra el botón de regreso "←" en lugar del avatar del agente */
  showBackButton = input<boolean>(false);

  /** Texto del botón de regreso (ej: "Back to agent Ryan", "Back to run history") */
  backLabel = input<string>('Back');

  /** Emite cuando el usuario hace clic en "Run History" */
  runHistoryClick = output<void>();

  /** Emite cuando el usuario hace clic en el botón de regreso */
  backClick = output<void>();
}

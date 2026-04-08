/**
 * Presentational component: ProcessFlow
 *
 * Timeline horizontal con las 3 etapas del proceso de devoluciones.
 * Muestra cuántas devoluciones hay en cada etapa con un contador.
 *
 * Etapas (según PDD — 08 Vistas de la Plataforma):
 *   1. Return in queue    → status: Pending
 *   2. Return in validation → status: Needs Attention
 *   3. Approved & In execution → status: Approved
 */
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessStageCount } from '../../../../shared/models/summary.model';

@Component({
  selector: 'app-process-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-flow.component.html',
  styleUrl: './process-flow.component.scss'
})
export class ProcessFlowComponent {

  /** Conteo por etapa provisto por el container Summary */
  stageCounts = input.required<ProcessStageCount>();

  /** Configuración de las 3 etapas con sus textos y conteos */
  stages = computed(() => [
    {
      title: 'Return in queue',
      description: `${this.stageCounts().inQueue} returns pending`,
      icon: '📥',
      count: this.stageCounts().inQueue
    },
    {
      title: 'Return in validation',
      description: `${this.stageCounts().inValidation} returns under review`,
      icon: '🔍',
      count: this.stageCounts().inValidation
    },
    {
      title: 'Approved & In execution',
      description: `${this.stageCounts().approvedInExecution} returns in process`,
      icon: '⚙️',
      count: this.stageCounts().approvedInExecution
    }
  ]);
}

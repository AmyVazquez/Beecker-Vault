/**
 * Presentational: ProcessFlowComponent
 *
 * Timeline horizontal de 3 etapas del proceso de devolución.
 * Muestra el conteo de transacciones en cada etapa en tiempo real.
 *
 * Etapas:
 *   1. Return in Queue         → status: Pending
 *   2. In Validation           → status: Needs Attention
 *   3. Approved & In Execution → status: Approved
 */
import { Component, input } from '@angular/core';
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
  counts    = input<ProcessStageCount | null>(null);
  isLoading = input<boolean>(false);
}

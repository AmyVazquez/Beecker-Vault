/**
 * Presentational component: ProcessingTimeline
 *
 * Timeline horizontal con las 3 etapas del proceso y sus flags de estado.
 * Muestra en cuál etapa se encuentra actualmente la devolución.
 *
 * Etapas y flags según el PDD (08 - Vistas de la Plataforma → Transaction Details):
 *   Etapa 1 — Return in Queue (Pending)
 *   Etapa 2 — Return in Validation (Needs Attention)
 *   Etapa 3 — Return Approved & In Execution (Approved)
 */
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItemDetail, ReturnStatus, ReturnType } from '../../../../shared/models/return.model';

/** Representa un flag de estado dentro de una etapa del timeline */
interface TimelineFlag {
  text: string;     // Texto descriptivo del flag
  isActive: boolean; // Si este flag es el estado actual de la devolución
}

/** Representa una etapa del timeline */
interface TimelineStage {
  title: string;
  titleEs: string;
  flags: TimelineFlag[];
  isCompleted: boolean; // Si la devolución ya pasó por esta etapa
  isCurrent: boolean;   // Si la devolución está actualmente en esta etapa
}

@Component({
  selector: 'app-processing-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processing-timeline.component.html',
  styleUrl: './processing-timeline.component.scss'
})
export class ProcessingTimelineComponent {

  returnData = input.required<ReturnItemDetail>();

  /**
   * Genera las 3 etapas con sus flags según el estado actual de la devolución.
   * La lógica sigue exactamente lo definido en el PDD sección Processing Timeline.
   */
  stages = computed<TimelineStage[]>(() => {
    const status = this.returnData().status;
    const type   = this.returnData().returnType;

    // Determina si aplica etiqueta UPS según el tipo de devolución
    const requiresUpsLabel = [
      ReturnType.DamagedGoods,
      ReturnType.ManufacturerDefect,
      ReturnType.WrongItem
    ].includes(type);

    return [
      {
        title: 'Return in queue',
        titleEs: 'Devolución en bandeja',
        isCurrent: status === ReturnStatus.PendingMissingInfo || status === ReturnStatus.PendingCompleteInfo,
        isCompleted: [ReturnStatus.NeedsAttention, ReturnStatus.Approved, ReturnStatus.Rejected].includes(status as ReturnStatus),
        flags: [
          {
            text: 'New return with incomplete information',
            isActive: status === ReturnStatus.PendingMissingInfo
          },
          {
            text: 'New return with complete information, awaiting daily flow',
            isActive: status === ReturnStatus.PendingCompleteInfo
          }
        ]
      },
      {
        title: 'Return in validation',
        titleEs: 'Devolución en validación',
        isCurrent: status === ReturnStatus.NeedsAttention,
        isCompleted: [ReturnStatus.Approved, ReturnStatus.Rejected].includes(status as ReturnStatus),
        flags: [
          { text: 'Amount validation in progress', isActive: false },
          { text: 'Pending human review — notification raised to the Glendale team', isActive: status === ReturnStatus.NeedsAttention },
          { text: 'Awaiting additional information from the client — follow-up email sent', isActive: false },
          { text: 'Return validated', isActive: status === ReturnStatus.Rejected }
        ]
      },
      {
        title: 'Return approved & in execution',
        titleEs: 'Aprobada y en ejecución',
        isCurrent: status === ReturnStatus.Approved,
        isCompleted: false,
        flags: [
          { text: 'Generate UPS shipping label', isActive: requiresUpsLabel && status === ReturnStatus.Approved },
          { text: 'Enter return into ERP/MOM', isActive: status === ReturnStatus.Approved },
          { text: 'Email sent to client', isActive: status === ReturnStatus.Approved },
          { text: 'Return resolved', isActive: false }
        ]
      }
    ];
  });
}

/**
 * Presentational: ProcessingTimelineComponent
 *
 * Timeline vertical de 3 etapas del proceso de una devolución específica.
 * Muestra el progreso real de la devolución y los flags especiales por etapa.
 *
 * Etapas según PDD:
 *   1. Return in Queue     → flags: Pending Missing Info, Pending Complete Info
 *   2. In Validation       → flags: Needs Attention (cliente debe actuar)
 *   3. Approved & Executed → flags: Approved (incluye UPS label si aplica)
 *
 * La etapa activa se determina por el campo `status` de la devolución.
 */
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItemDetail, ReturnStatus, ReturnType } from '../../../../shared/models/return.model';

@Component({
  selector: 'app-processing-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processing-timeline.component.html',
  styleUrl: './processing-timeline.component.scss'
})
export class ProcessingTimelineComponent {
  returnData = input.required<ReturnItemDetail>();

  /** Acceso a los enums en el template */
  readonly ReturnStatus = ReturnStatus;
  readonly ReturnType   = ReturnType;

  /** Etapa activa: 1 = Queue, 2 = Validation, 3 = Approved/Rejected */
  activeStage = computed((): number => {
    const status = this.returnData().status;
    if (status === ReturnStatus.PendingMissingInfo || status === ReturnStatus.PendingCompleteInfo) return 1;
    if (status === ReturnStatus.NeedsAttention) return 2;
    return 3; // Approved o Rejected — ya terminó el proceso
  });

  /** Indica si este tipo de devolución genera etiqueta UPS */
  hasUpsLabel = computed((): boolean => {
    const type = this.returnData().returnType;
    return type === ReturnType.DamagedGoods
        || type === ReturnType.ManufacturerDefect
        || type === ReturnType.WrongItem;
  });
}

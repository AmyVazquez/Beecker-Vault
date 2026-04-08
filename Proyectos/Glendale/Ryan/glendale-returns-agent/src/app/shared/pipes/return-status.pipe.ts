/**
 * Pipe: ReturnStatus → texto legible en pantalla.
 *
 * Convierte el valor numérico del campo `status` de la BD
 * al texto que se muestra en los badges de la UI.
 *
 * Uso en template: {{ return.status | returnStatus }}
 * Resultado: "Pending – Missing Info", "Approved", etc.
 *
 * Si se agregan nuevos estados en la BD, actualizar este pipe
 * y también el enum ReturnStatus en return.model.ts.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { ReturnStatus } from '../models/return.model';

@Pipe({
  name: 'returnStatus',
  standalone: true
})
export class ReturnStatusPipe implements PipeTransform {

  transform(value: ReturnStatus | number | string): string {
    switch (value) {
      case ReturnStatus.PendingMissingInfo:
      case 0:
        return 'Pending – Missing Info';

      case ReturnStatus.PendingCompleteInfo:
      case 1:
        return 'Pending – Complete Info';

      case ReturnStatus.NeedsAttention:
      case 2:
        return 'Needs Attention';

      case ReturnStatus.Approved:
      case 3:
        return 'Approved';

      case ReturnStatus.Rejected:
      case 'rejected':
        return 'Rejected';

      default:
        return 'Unknown';
    }
  }
}

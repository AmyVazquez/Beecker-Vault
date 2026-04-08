/**
 * Pipe: ReturnType → texto legible en pantalla.
 *
 * Convierte el valor del campo `return_type` de la BD
 * al label que se muestra en la UI (Run History, Transaction Details, Donut Chart).
 *
 * Uso en template: {{ return.returnType | returnType }}
 * Resultado: "Damaged Goods", "Refund", etc.
 *
 * En este caso el valor del enum ya es el texto legible,
 * pero el pipe existe para mantener consistencia y facilitar
 * cambios futuros de nomenclatura sin tocar los templates.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { ReturnType } from '../models/return.model';

@Pipe({
  name: 'returnType',
  standalone: true
})
export class ReturnTypePipe implements PipeTransform {

  transform(value: ReturnType | string): string {
    switch (value) {
      case ReturnType.DamagedGoods:       return 'Damaged Goods';
      case ReturnType.ManufacturerDefect: return 'Manufacturer Defect';
      case ReturnType.WrongItem:          return 'Wrong Item';
      case ReturnType.Refund:             return 'Refund';
      case ReturnType.MissingItem:        return 'Missing Item';
      default:
        // Si llega un valor desconocido, lo mostramos tal cual
        return value as string;
    }
  }
}

/**
 * Presentational component: TransactionFields
 *
 * Muestra los campos principales de una devolución en formato grid de lectura.
 * Incluye también la sub-sección "Items" con los artículos de tbl_item_list.
 *
 * Nota: el campo `status` no aparece aquí — se muestra en el header de la vista.
 */
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItemDetail } from '../../../../shared/models/return.model';
import { ReturnTypePipe } from '../../../../shared/pipes/return-type.pipe';

@Component({
  selector: 'app-transaction-fields',
  standalone: true,
  imports: [CommonModule, ReturnTypePipe],
  templateUrl: './transaction-fields.component.html',
  styleUrl: './transaction-fields.component.scss'
})
export class TransactionFieldsComponent {
  data = input.required<ReturnItemDetail>();

  get fullName(): string {
    return `${this.data().firstName} ${this.data().lastName}`;
  }
}

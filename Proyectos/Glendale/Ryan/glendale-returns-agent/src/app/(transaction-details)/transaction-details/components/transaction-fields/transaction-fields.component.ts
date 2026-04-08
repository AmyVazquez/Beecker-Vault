/**
 * Presentational: TransactionFieldsComponent
 *
 * Muestra todos los campos de una devolución en un grid de 2 columnas,
 * seguido de la tabla de ítems (tbl_item_list).
 *
 * No hace llamadas al API — recibe returnData como input.
 */
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnItemDetail } from '../../../../shared/models/return.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-transaction-fields',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './transaction-fields.component.html',
  styleUrl: './transaction-fields.component.scss'
})
export class TransactionFieldsComponent {
  returnData = input.required<ReturnItemDetail>();
}

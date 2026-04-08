/**
 * Presentational: ReturnPhotosComponent
 *
 * Tabla de fotos adjuntas enviadas por el cliente.
 * Permite seleccionar y descargar archivos individuales o en conjunto.
 *
 * Solo aplica para: Damaged Goods, Manufacturer Defect y Wrong Item.
 * Si no hay fotos, muestra el mensaje: "No photos attached to this return."
 */
import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnPhoto } from '../../../../shared/models/photo.model';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-return-photos',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  templateUrl: './return-photos.component.html',
  styleUrl: './return-photos.component.scss'
})
export class ReturnPhotosComponent {
  photos    = input.required<ReturnPhoto[]>();
  isLoading = input<boolean>(false);

  /** IDs de las fotos seleccionadas para descarga */
  selectedIds = signal<Set<string>>(new Set());

  /** Verifica si hay alguna foto seleccionada */
  hasSelection = computed(() => this.selectedIds().size > 0);

  /** Alterna la selección de una foto */
  toggleSelection(id: string): void {
    this.selectedIds.update(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /** Descarga las fotos seleccionadas (o todas si no hay selección) */
  downloadSelected(): void {
    const toDownload = this.hasSelection()
      ? this.photos().filter(p => this.selectedIds().has(p.id))
      : this.photos();

    // Abre cada foto en una pestaña nueva para forzar la descarga
    toDownload.forEach(photo => {
      const link     = document.createElement('a');
      link.href      = photo.url;
      link.download  = photo.documentName;
      link.click();
    });
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }
}

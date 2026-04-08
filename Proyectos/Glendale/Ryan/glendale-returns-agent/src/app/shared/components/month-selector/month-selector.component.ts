/**
 * Componente compartido: MonthSelector
 *
 * Dropdown para filtrar el dashboard por mes.
 * Se usa en Summary y Run History (ambas vistas tienen el botón "Select Month").
 *
 * El componente es "dumb" — no llama al API directamente.
 * Emite el mes seleccionado y el componente padre es responsable de recargar los datos.
 *
 * Uso:
 *   <app-month-selector
 *     [selectedMonth]="currentMonth()"
 *     (monthChange)="onMonthChange($event)"
 *   />
 *
 * Para agregar nuevos meses al dropdown, actualizar el arreglo `months` en este componente.
 */
import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-month-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-selector.component.html',
  styleUrl: './month-selector.component.scss'
})
export class MonthSelectorComponent {

  /** Mes actualmente seleccionado — formato YYYY-MM o vacío para "All time" */
  selectedMonth = input<string>('');

  /** Emite el nuevo mes cuando el usuario selecciona una opción */
  monthChange = output<string>();

  /** Controla si el dropdown está abierto o cerrado */
  isOpen = signal(false);

  /**
   * Opciones disponibles en el dropdown.
   * Actualizar manualmente cuando se necesiten cubrir nuevos meses.
   * La opción vacía ('') significa "todos los registros sin filtro de mes".
   */
  readonly months = [
    { value: '',        label: 'Select month' },
    { value: '2026-04', label: 'April 2026' },
    { value: '2026-03', label: 'March 2026' },
    { value: '2026-02', label: 'February 2026' },
    { value: '2026-01', label: 'January 2026' },
  ];

  /** Texto que se muestra en el botón según la selección actual */
  get selectedLabel(): string {
    return this.months.find(m => m.value === this.selectedMonth())?.label ?? 'Select Month';
  }

  /** Selecciona un mes, emite el evento y cierra el dropdown */
  select(value: string): void {
    this.monthChange.emit(value);
    this.isOpen.set(false);
  }

  /** Abre o cierra el dropdown */
  toggle(): void {
    this.isOpen.update(v => !v);
  }
}

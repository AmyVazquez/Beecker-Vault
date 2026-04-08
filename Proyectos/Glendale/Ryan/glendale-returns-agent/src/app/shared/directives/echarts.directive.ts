/**
 * Directiva EchartsDirective
 *
 * Wrapper mínimo de Apache ECharts para Angular standalone.
 * Inicializa la instancia de ECharts sobre el elemento host,
 * actualiza las opciones con setOption() cuando el input cambia
 * y responde al resize del contenedor via ResizeObserver.
 *
 * Uso:
 *   <div [appEcharts]="chartOptions()" class="chart-container"></div>
 */
import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  input,
} from '@angular/core';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

@Directive({
  selector: '[appEcharts]',
  standalone: true,
})
export class EchartsDirective implements AfterViewInit, OnDestroy {
  /** Opciones de ECharts a renderizar */
  appEcharts = input<EChartsOption>({});

  private el = inject(ElementRef<HTMLElement>);
  private chart?: echarts.ECharts;
  private resizeObserver?: ResizeObserver;

  constructor() {
    // Re-renderiza cada vez que cambien las opciones.
    // Durante la construcción `this.chart` aún es undefined; el no-op es intencional.
    effect(() => {
      const opts = this.appEcharts();
      this.chart?.setOption(opts, { notMerge: true });
    });
  }

  ngAfterViewInit(): void {
    this.chart = echarts.init(this.el.nativeElement);
    this.chart.setOption(this.appEcharts());

    // Redimensiona la gráfica cuando el contenedor cambia de tamaño
    this.resizeObserver = new ResizeObserver(() => this.chart?.resize());
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.chart?.dispose();
  }
}

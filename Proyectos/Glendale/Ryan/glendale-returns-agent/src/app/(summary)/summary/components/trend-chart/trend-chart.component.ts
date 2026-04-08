/**
 * Presentational: TrendChartComponent
 *
 * Gráfica de líneas con Apache ECharts.
 * 3 series: Received (azul), Processed (gris), Approved (morado).
 *
 * 🔌 Para conectar datos reales: el input `data()` acepta TrendPoint[].
 *    Reemplaza los datos dummy en SummaryComponent.
 */
import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { EChartsOption } from 'echarts';

import { TrendPoint } from '../../../../shared/models/summary.model';
import { EchartsDirective } from '../../../../shared/directives/echarts.directive';

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  imports: [CommonModule, EchartsDirective],
  templateUrl: './trend-chart.component.html',
  styleUrl: './trend-chart.component.scss',
})
export class TrendChartComponent {
  data      = input<TrendPoint[]>([]);
  isLoading = input<boolean>(false);

  /** Opciones ECharts derivadas de los datos */
  chartOptions = computed((): EChartsOption => {
    const d = this.data();
    return {
      color: ['#3b82f6', '#6b7280', '#7654c8'],
      grid: { top: 16, right: 16, bottom: 28, left: 48 },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#ffffff',
        borderColor: '#edeef6',
        borderWidth: 1,
        textStyle: { color: '#595959', fontSize: 12 },
        axisPointer: { lineStyle: { color: '#edeef6' } },
      },
      legend: { show: false }, // usamos la leyenda HTML personalizada
      xAxis: {
        type: 'category',
        data: d.map(p => p.date),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#b0b0b0', fontSize: 10 },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#f0f0f0', type: 'solid' } },
        axisLabel: { color: '#b0b0b0', fontSize: 10 },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          name: 'Received',
          type: 'line',
          smooth: false,
          data: d.map(p => p.received),
          symbolSize: 8,
          symbol: 'circle',
          lineStyle: { width: 2.5 },
        },
        {
          name: 'Processed',
          type: 'line',
          smooth: false,
          data: d.map(p => p.processed),
          symbolSize: 7,
          symbol: 'circle',
          lineStyle: { width: 2 },
        },
        {
          name: 'Approved',
          type: 'line',
          smooth: false,
          data: d.map(p => p.approved),
          symbolSize: 7,
          symbol: 'circle',
          lineStyle: { width: 2 },
        },
      ],
    };
  });
}

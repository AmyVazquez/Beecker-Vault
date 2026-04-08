/**
 * Presentational: DonutChartComponent
 *
 * Gráfica de dona con Apache ECharts.
 * Muestra la distribución por tipo de devolución con leyenda bordeada.
 *
 * 🔌 Para conectar datos reales: el input `data()` acepta ReturnTypeCount[].
 *    Reemplaza los datos dummy en SummaryComponent.
 */
import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { EChartsOption } from 'echarts';

import { ReturnTypeCount } from '../../../../shared/models/summary.model';
import { EchartsDirective } from '../../../../shared/directives/echarts.directive';

/* Paleta de colores para los segmentos (misma que antes) */
const PALETTE = ['#7654c8', '#3b82f6', '#e07c3a', '#2e9e44', '#d94f4f'];

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule, EchartsDirective],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
})
export class DonutChartComponent {
  data      = input<ReturnTypeCount[]>([]);
  isLoading = input<boolean>(false);

  total = computed(() => this.data().reduce((s, d) => s + d.count, 0));

  /** Opciones ECharts derivadas de los datos */
  chartOptions = computed((): EChartsOption => {
    const items  = this.data().filter(d => d.count > 0);
    const t      = this.total();

    return {
      color: PALETTE,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: '#ffffff',
        borderColor: '#edeef6',
        borderWidth: 1,
        textStyle: { color: '#595959', fontSize: 12 },
      },
      // Texto central del donut (total)
      title: {
        text: String(t),
        subtext: 'Total',
        left: 'center',
        top: '35%',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#595959',
          lineHeight: 28,
        },
        subtextStyle: {
          fontSize: 10,
          color: '#8c8c8c',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['42%', '68%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            scale: true,
            scaleSize: 4,
          },
          data: items.map((item, i) => ({
            value: item.count,
            name:  item.type,
            itemStyle: { color: PALETTE[i % PALETTE.length] },
          })),
        },
      ],
    };
  });

  getColor(index: number): string {
    return PALETTE[index % PALETTE.length];
  }

  pct(count: number): number {
    const t = this.total();
    return t > 0 ? Math.round((count / t) * 100) : 0;
  }
}

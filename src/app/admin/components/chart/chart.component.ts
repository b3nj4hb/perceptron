import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../table/table.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  public chartOptions: Partial<ChartOptions>;
  @Input({ required: true }) math!: number;
  @Input({ required: true }) ct!: number;

  ngOnInit(): void {
    // Inicializar el gráfico con datos vacíos o iniciales
    // this.chartOptions = {
    //   series: [{ data: [] }],
    //   chart: { type: 'bar', height: 350 },
    //   plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    //   dataLabels: { enabled: false },
    //   xaxis: { categories: [] }
    // };
    this.updateChart()
  }

  getPerformanceLabel(score: number): string {
    if (score === 1) return 'Muy Bajo';
    if (score === 2) return 'Bajo';
    if (score === 3) return 'Promedio';
    if (score === 4) return 'Bueno';
    if (score === 5) return 'Muy Bueno';
    return '';
  }

  // updateChart(student: any) {
  updateChart() {
    this.chartOptions = {
      series: [{
        // data: [student.performance.math, student.performance.ct]
        data: [this.math, this.ct]
      }],
      chart: {
        type: 'bar',
        height: 150,
        width: 400
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Math', 'CT'],
        labels: {
          formatter: (value: string) => {
            const numValue = Number(value);
            return isNaN(numValue) ? value : this.getPerformanceLabel(numValue);
          }
        },
        min:0,
        max:5
      }
    };
  }

}

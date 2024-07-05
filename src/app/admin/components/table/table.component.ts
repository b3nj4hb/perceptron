import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexPlotOptions
} from 'ng-apexcharts';
import { ChartComponent } from '../chart/chart.component';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	plotOptions: ApexPlotOptions;
	dataLabels: any;
};

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [CommonModule, NgApexchartsModule, ChartComponent],
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	students: any;
	public chartOptions: Partial<ChartOptions>;

	constructor(private StudentService: StudentService) { }

	ngOnInit(): void {
		this.listStudent();
		// Inicializar el gráfico con datos vacíos o iniciales
		this.chartOptions = {
			series: [{ data: [] }],
			chart: { type: 'bar', height: 350 },
			plotOptions: { bar: { borderRadius: 4, horizontal: true } },
			dataLabels: { enabled: false },
			xaxis: { categories: [] }
		};
	}

	loadStudentChart(id: number) {
		this.StudentService.getStudentId(id).subscribe(student => {
			this.updateChart(student);
		});
	}

	listStudent() {
		this.StudentService.getStudent().subscribe(data => {
			this.students = data;
		});
	}

	getPerformanceLabel(score: number): string {
		if (score === 1) return 'Muy Bajo';
		if (score === 2) return 'Bajo';
		if (score === 3) return 'Promedio';
		if (score === 4) return 'Bueno';
		if (score === 5) return 'Muy Bueno';
		return '';
	}

	updateChart(student: any) {
		this.chartOptions = {
			series: [{
				data: [student.performance.math, student.performance.ct]
			}],
			chart: {
				type: 'bar',
				height: 350
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
				}
			}
		};
	}
}

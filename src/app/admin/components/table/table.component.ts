import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
	students: any;
	constructor(private StudentService: StudentService) { }
	public chart: Chart;

	ngOnInit(): void {
		this.listStudent()
		this.loadStudentChart(1)
	}

	loadStudentChart(id: number) {
		this.StudentService.getStudentId(id).subscribe(student => {
			this.showChart(student)
		});
	}

	listStudent() {
		this.StudentService.getStudent().subscribe(data => {
			this.students = data;
			// console.log(data)
			console.log(this.students[0])
			// console.log(this.students[0]['id'])
		})
	}

	showChart(student: any) {
		const data = {
			datasets: [{
				data: [student.performance.math, student.performance.ct],
				label: 'Competencias'
			}],
			labels: ['Math', 'CT']
		};

		this.chart = new Chart("chart", {
			data,
			type: 'bar',
			options: {
				indexAxis: 'y',
				scales: {
					x: {
						min: 1,
						max: 5
					}
				}
			}
		})
	}

}

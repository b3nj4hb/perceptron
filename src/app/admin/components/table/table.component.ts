import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { ChartComponent } from '../chart/chart.component';
import { initFlowbite } from 'flowbite';
import { Student } from '../../classes/student';

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
  imports: [CommonModule, NgApexchartsModule, ChartComponent, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  students: Student[] = [];

  filteredStudents: Student[] = [];
  filter = '';
  filterSection = '';
  filterGrade = '';
  expandedRows: { [key: number]: boolean } = {};
  sections: string[] = [];
  grades: number[] = [];

  public chartOptions: Partial<ChartOptions>;

  constructor(private StudentService: StudentService) {}

  ngOnInit(): void {
    this.listStudent();
    // Inicializar el gráfico con datos vacíos o iniciales
    this.chartOptions = {
      series: [{ data: [] }],
      chart: { type: 'bar', height: 350 },
      plotOptions: { bar: { borderRadius: 4, horizontal: true } },
      dataLabels: { enabled: false },
      xaxis: { categories: [] },
    };
  }

  loadStudentChart(id: number) {
    this.StudentService.getStudentId(id).subscribe((student) => {
      this.updateChart(student);
    });
  }

  listStudent() {
    this.StudentService.getStudent().subscribe((data) => {
      this.students = data;
      this.applyFilters();
      this.buildGradeAndSectionArray();
    });
    setTimeout(() => {
      initFlowbite();
    }, 500);
  }

  getPerformanceLabel(score: number): string {
    if (score === 1) return 'Muy Bajo';
    if (score === 2) return 'Bajo';
    if (score === 3) return 'Promedio';
    if (score === 4) return 'Bueno';
    if (score === 5) return 'Muy Bueno';
    return '';
  }

  updateChart(student: Student) {
    this.chartOptions = {
      series: [
        {
          data: [student.performance.math, student.performance.ct],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Math', 'CT'],
        labels: {
          formatter: (value: string) => {
            const numValue = Number(value);
            return isNaN(numValue) ? value : this.getPerformanceLabel(numValue);
          },
        },
      },
    };
  }

  toggleRow(index: number) {
    this.expandedRows[index] = !this.expandedRows[index];
  }

  applyFilters(): void {
    this.filteredStudents = this.students.filter((student) => {
      return (
        (!this.filter ||
          student.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          student.lastName.toLowerCase().includes(this.filter.toLowerCase()) ||
          student.code.toString().includes(this.filter.toLowerCase())) &&
        (!this.filterSection || student.section === this.filterSection) &&
        (!this.filterGrade || student.grade === parseInt(this.filterGrade))
      );
    });
  }

  buildGradeAndSectionArray() {
    const sectionsSet = new Set<string>();
    const gradesSet = new Set<number>();

    this.students.forEach((student) => {
      sectionsSet.add(student.section);
      gradesSet.add(student.grade);
    });
    this.sections = Array.from(sectionsSet).sort(); // Ordenar secciones alfabéticamente
    this.grades = Array.from(gradesSet).sort((a, b) => a - b); // Ordenar grados numéricamente
    console.log(this.grades);
  }
}

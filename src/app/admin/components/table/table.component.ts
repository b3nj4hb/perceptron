import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { Student } from '../../classes/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  students: Student[] = [];

  filteredStudents: Student[] = [];
  filter = '';
  filterSection = '';
  filterGrade = '';
  sections: string[] = [];
  grades: number[] = [];

  constructor(private StudentService: StudentService) {}
  public chart: Chart;

  ngOnInit(): void {
    this.listStudent();
    this.showChart();
  }
  listStudent() {
    this.StudentService.getStudent().subscribe((data) => {
      this.students = data;
      // console.log(data)
      console.log(this.students[0]);
      this.applyFilters();
      this.buildGradeAndSectionArray();
      // console.log(this.students[0]['id'])
    });
  }
  showChart() {
    const data = {
      datasets: [
        {
          data: [2, 4],
          label: 'Compentencias',
        },
      ],
      labels: ['Math', 'Science'],
    };
    this.chart = new Chart('chart', {
      data,
      type: 'bar',
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            min: 1,
            max: 5,
          },
        },
      },
    });
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

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
    this.showChart()
  }
  listStudent() {
    this.StudentService.getStudent().subscribe(data => {
      this.students = data;
      // console.log(data)
      console.log(this.students[0])
      // console.log(this.students[0]['id'])
    })
  }
  showChart() {
    const data = {
      datasets: [{
        data: [2, 4],
        label: 'Compentencias'
      }],
      labels: ['Math', 'Science']
    }
    this.chart = new Chart("chart", {
      data,
      type: 'bar',
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            min: 1,
            max: 5,
          }
        }
      }
    })
  }

}

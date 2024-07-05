import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';

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
  ngOnInit(): void {
    this.listStudent()
  }
  listStudent() {
    this.StudentService.getStudent().subscribe(data => {
      this.students = data;
      // console.log(data)
      console.log(this.students[0])
      // console.log(this.students[0]['id'])
    })
  }
}

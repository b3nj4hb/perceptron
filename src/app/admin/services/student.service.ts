import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../classes/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  HttpOptions = {
    Headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private urlEndPoint: string =
    'https://66874e2b0bc7155dc0174111.mockapi.io/api/listStudents/student';

  constructor(private http: HttpClient, private router: Router) {}
  getStudent() {
    return this.http.get<Student[]>(this.urlEndPoint);
  }
}

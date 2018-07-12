import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Employee} from '../../models/employee.model';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees');
  }

  addEmployee(newEmployee): Observable<Employee[]> {
    return this.http.post<Employee[]>('http://localhost:3000/employees', newEmployee);
  }

  deleteEmployee(employeeId) {
    return this.http.delete(`http://localhost:3000/employees/${employeeId}`);
  }

}

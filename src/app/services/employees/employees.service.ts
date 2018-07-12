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
    newEmployee = {
      "name": "Valerie Liberty",
      "dob": "1988/03/02",
      "country": "Australia",
      "username": "Val",
      "hireDate": "2018/03/02",
      "status": false,
      "area": "services",
      "jobTitle": 3,
      "tipRate": 0.4
    }
    return this.http.post<Employee[]>('http://localhost:3000/employees', newEmployee);
  }

}

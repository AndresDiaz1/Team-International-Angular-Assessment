import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../services/employees.service';
import {Employee} from '../../models/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees: Employee[];

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeesService.getEmployees().subscribe(employees => {
      this.employees = employees;
      console.log('los empleados', this.employees);
    }, err => {
      console.log('Can not get employees', err);
    });
  }

}

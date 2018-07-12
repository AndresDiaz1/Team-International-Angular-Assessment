import { Component, OnInit } from '@angular/core';
import {Employee} from '../../models/employee.model';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {EmployeesService} from '../../services/employees/employees.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees: Employee[];

  constructor(private store: Store<fromStore.EmployeesState>, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.store.dispatch(new fromStore.LoadEmployees);
    this.getEmployees();
  }

  getEmployees() {
    this.store.select(fromStore.getAllEmployees).subscribe(employees => {
      this.employees = employees;
    });
  }

  handleDeleteEmployee(employeeId) {
    this.employeesService.deleteEmployee(employeeId).subscribe(res => {
      this.loadEmployees();
    }, err => {
      console.log('There was an error deleteting employee', err);
    });
  }

}

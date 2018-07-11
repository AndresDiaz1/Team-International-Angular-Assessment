import { Component, OnInit } from '@angular/core';
import {Employee} from '../../models/employee.model';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {LoadEmployees} from '../../store/actions/employees.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees: Employee[];

  constructor(private store: Store<fromStore.EmployeesState>) { }

  ngOnInit() {
    this.getEmployees();
    this.store.dispatch(new fromStore.LoadEmployees);
  }

  getEmployees() {
    this.store.select(fromStore.getAllEmployees).subscribe(employees => {
      this.employees = employees;
    });
  }

}

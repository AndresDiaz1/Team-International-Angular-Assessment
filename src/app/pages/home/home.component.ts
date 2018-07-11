import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../services/employees.service';
import {Employee} from '../../models/employee.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromStore from '../../store';

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
  }

  getEmployees() {
    this.store.select(fromStore.getAllEmployees).subscribe(state => {
      console.log('este es el state', state);
    });
    // this.employeesService.getEmployees().subscribe(employees => {
    //   this.employees = employees['employees'];
    // }, err => {
    //   console.log('Can not get employees', err);
    // });
  }

}

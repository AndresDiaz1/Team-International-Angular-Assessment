import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {Employee} from '../../models/employee.model';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  isViewMode: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromStore.EmployeesState>) { }

  ngOnInit() {
    this.getEmployeesData();
    this.getQueryParams();
  }

  getEmployeesData() {
    this.store.select(fromStore.getAllEmployees).subscribe(employees => {
      this.getEmployeeId(employees);
    });
  }

  getEmployeeId(employees) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined ) {
        const employeeId = +params['id'];
        this.getSelectedEmployeeData(employees, employeeId);
      }
    });
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.isViewMode = params.viewmode;
      }
    }, err => {
      console.log('There was an error loading params', err)
    });
  }

  getSelectedEmployeeData(employees, employeeId) {
    const selectedEmployee = employees.find( employee => employee.id === employeeId);
    console.log('el empleado selccioando', selectedEmployee);
  }


}

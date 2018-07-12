import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import {Employee} from '../../models/employee.model';


@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  isViewMode: boolean = false;
  selectedEmployee: Employee;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromStore.EmployeesState>) { }

  ngOnInit() {
    this.getEmployeesData();
    this.getQueryParams();
  }

  getEmployeesData() {
    this.store.select(fromStore.getAllEmployees).subscribe(employees => {
      console.log('los empleados', employees)
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
    this.selectedEmployee = selectedEmployee;
  }

  handleGoBack() {
    this.router.navigate(['/', 'home']);
  }
}

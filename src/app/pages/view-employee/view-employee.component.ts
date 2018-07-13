import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import {Employee} from '../../models/employee.model';
import {EmployeesService} from '../../services/employees/employees.service';


@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  isViewMode: boolean = false;
  selectedEmployee: Employee;
  employeeExists = true;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromStore.EmployeesState>, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadEmployees);
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
    if (selectedEmployee) {
      this.selectedEmployee = selectedEmployee;
      this.employeeExists = true;
    } else {
      this.employeeExists = false;
    }

  }

  handlePressedSave(employee) {
    this.employeesService.updateEmployee(employee, this.selectedEmployee.id).subscribe(res => {
      this.router.navigate(['/', 'home']);
    }, err => {
      console.log('error updating employee', err);
    });
  }

  handleGoBack() {
    this.router.navigate(['/', 'home']);
  }
}

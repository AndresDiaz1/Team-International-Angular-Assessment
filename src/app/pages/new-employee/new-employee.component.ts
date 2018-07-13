import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../services/employees/employees.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  formIsDirty: boolean = false;
  constructor(private employeesService: EmployeesService, private router: Router) { }

  ngOnInit() {
  }

  saveNewEmployee(employee) {
    this.employeesService.addEmployee(employee).subscribe(res => {
      this.router.navigate(['/', 'home']);
    }, err => {
      console.log('hubo error', err);
    });
  }

  handleGoBack(isDirty: boolean) {
    this.formIsDirty = isDirty;
    this.router.navigate(['/', 'home']);
  }

  canDeactivate() {
    if (this.formIsDirty) {
      return window.confirm('Are you sure want to leave?');
    }
    return true;
  }

}

import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../services/employees/employees.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
  }

  saveNewEmployee(employee) {
    this.employeesService.addEmployee(employee).subscribe(res => {
      console.log('agrego', res);
    }, err => {
      console.log('hubo error', err);
    });
  }

}

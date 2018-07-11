import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../models/employee.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {CalculateAgeService} from '../../miscellaneous/calculate-age.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit,  OnChanges {

  tbDataSource;
  displayedColumns: string[] = ['name', 'age'];
  @ViewChild(MatSort) sort: MatSort;
  @Input() employeesList: Employee[];

  constructor(private calculateAgeService: CalculateAgeService) { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.employeesList) {
      this.createTable();
    }
  }

  createTable() {
    console.log('lo que llega', this.employeesList)
    this.tbDataSource = new MatTableDataSource(this.employeesList['employees']);
    this.tbDataSource.sort = this.sort;
  }

  setAge(dateOfBirth): Number {
    return this.calculateAgeService.calculateAge(dateOfBirth);
  }
}

import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../models/employee.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CalculateAgeService} from '../../miscellaneous/calculate-age.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit,  OnChanges {

  tbDataSource;
  displayedColumns: string[] = ['name', 'age', 'username', 'hireDate', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() employeesList: Employee[];

  constructor(private calculateAgeService: CalculateAgeService) { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.employeesList) {
      const tableData = this.adjustTableData();
      this.createTable(tableData);
    }
  }

  adjustTableData(): any[] {
    const tableData = this.employeesList.map((employee) => {
      return {...employee, age: this.setAge(employee.dob)};
    });
    return tableData;
  }

  createTable(tableData) {
    this.tbDataSource = new MatTableDataSource(tableData);
    this.tbDataSource.sort = this.sort;
    this.tbDataSource.paginator = this.paginator;
    setTimeout(() => {
      this.applyFilter('');
    });
  }

  setAge(dateOfBirth): Number {
    return this.calculateAgeService.calculateAge(dateOfBirth);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tbDataSource.filter = filterValue;
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Employee} from '../../models/employee.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CalculateAgeService} from '../../miscellaneous/calculate-age/calculate-age.service';

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
  @Output() editEmployeeOnClick = new EventEmitter();
  @Output() viewEmployeeOnClick = new EventEmitter();
  @Output() deleteEmployeeOnClick = new EventEmitter();

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

  editEployee(employeeId) {
    this.editEmployeeOnClick.emit(employeeId);
  }

  viewEmployee(employeeId) {
    this.viewEmployeeOnClick.emit(employeeId);
  }

  deleteEmployee(employeeId) {
    this.deleteEmployeeOnClick.emit(employeeId);
  }
}

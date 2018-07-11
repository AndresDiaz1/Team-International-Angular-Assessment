import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesListComponent } from './employees-list.component';
import {MaterialModule} from '../../material/material.module';
import {CalculateAgeService} from '../../miscellaneous/calculate-age.service';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesListComponent ],
      imports: [MaterialModule],
      providers: [CalculateAgeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setAge call calculateAge of CalculateAgeService', () => {
    expect(component.setAge('1978/03/21')).toEqual(40);
  });

  it('should adjustTableData method add Age field to employees data', () => {
    component.employeesList = [
        {
          'id': 1,
          'name': 'Giacomo Guilizoni',
          'dob': '1978/03/21',
          'country': 'Italy',
          'username': 'Peldi',
          'hireDate': '2017/10/01',
          'status': false,
          'area': 'services',
          'jobTitle': 1,
          'tipRate': 0
        }
      ];

    expect(component.adjustTableData()).toEqual([{
      'id': 1,
      'name': 'Giacomo Guilizoni',
      'dob': '1978/03/21',
      'country': 'Italy',
      'username': 'Peldi',
      'hireDate': '2017/10/01',
      'status': false,
      'area': 'services',
      'jobTitle': 1,
      'tipRate': 0,
      'age': 40
    }]);
  });

});

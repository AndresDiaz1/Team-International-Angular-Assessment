import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { ViewEmployeeComponent } from './view-employee.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {JobTitleComponent} from '../../components/job-title/job-title.component';
import {Store} from '@ngrx/store';
import {EmployeesService} from '../../services/employees/employees.service';
import {CountryService} from '../../services/country/country.service';
import {DatesConverterService} from '../../miscellaneous/dates-converter/dates-converter.service';
import {CalculateAgeService} from '../../miscellaneous/calculate-age/calculate-age.service';
import {MockComponent} from 'ng2-mock-component';
import {MockCountryService, MockEmployeesService, MockStore} from '../../../mocks/mocks';
import {Router} from '@angular/router';



describe('ViewEmployeeComponent', () => {
  let component: ViewEmployeeComponent;
  let fixture: ComponentFixture<ViewEmployeeComponent>;
  let injector: TestBed;
  let store: MockStore;
  let employeesService: MockEmployeesService;
  let router: Router;
  const stubEmploye = {
    'id': 1,
    'name': 'Valerie Liberty',
    'dob': '1988/03/02',
    'country': 'Australia',
    'username': 'Val',
    'hireDate': '2018/03/02',
    'status': true,
    'area': 'Services',
    'jobTitle': 'Dining room manager',
    'tipRate': 0.4
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MaterialModule],
      declarations: [
        ViewEmployeeComponent,
        JobTitleComponent,
        MockComponent({selector: 'app-employee-form', inputs: ['isViewing', 'selectedEmployeeData']})
      ],
      providers: [
        {provide: Store, useClass: MockStore},
        {provide: EmployeesService, useClass: MockEmployeesService},
        {provide: CountryService, useClass: MockCountryService},
        DatesConverterService,
        CalculateAgeService
      ]
    })
      .compileComponents();
    injector = getTestBed();
    store = injector.get(Store);
    employeesService = injector.get(EmployeesService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getEmployeesData call store', () => {
    spyOn(store, 'select').and.callThrough();
    component.getEmployeesData();
    expect(store.select).toHaveBeenCalled();
  });

  it('should getSelectedEmployeeData set the selected employee and set true in employee exits ', () => {
    component.getSelectedEmployeeData([stubEmploye], 1);
    expect(component.selectedEmployee.name).toEqual('Valerie Liberty');
    expect(component.employeeExists).toEqual(true);
  });

  it('should getSelectedEmployeeData set false in employee exits if employee is not finded', () => {
    component.getSelectedEmployeeData([stubEmploye], 2);
    expect(component.selectedEmployee).toEqual(undefined);
    expect(component.employeeExists).toEqual(false);
  });

  it('should handlePressedSave call updateEmployee from EmployeesService', () => {
    spyOn(employeesService, 'updateEmployee').and.callThrough();
    component.selectedEmployee = stubEmploye;
    component.handlePressedSave([]);
    expect(employeesService.updateEmployee).toHaveBeenCalled();
  });

  it('should handleGoBack call navigate from router', () => {
    spyOn(router, 'navigate').and.returnValue('/home');
    component.handleGoBack();
    expect(router.navigate).toHaveBeenCalled();
  });
});

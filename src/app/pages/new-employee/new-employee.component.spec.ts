import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { NewEmployeeComponent } from './new-employee.component';
import {EmployeeFormComponent} from '../../components/employee-form/employee-form.component';
import {MaterialModule} from '../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {JobTitleComponent} from '../../components/job-title/job-title.component';
import {EmployeesService} from '../../services/employees/employees.service';
import {Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {RouterTestingModule} from '@angular/router/testing';
import {CountryService} from '../../services/country/country.service';
import {DatesConverterService} from '../../miscellaneous/dates-converter/dates-converter.service';
import {CalculateAgeService} from '../../miscellaneous/calculate-age/calculate-age.service';
import {MockComponent} from 'ng2-mock-component';
import {MockEmployeesService} from '../../../mocks/mocks';
import {Router} from '@angular/router';

class MockCountryService {
  getCountries() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify([{
          'id': 1,
          'name': 'Germany'
        }])}))
    );
  }
}

describe('NewEmployeeComponent', () => {
  let component: NewEmployeeComponent;
  let fixture: ComponentFixture<NewEmployeeComponent>;
  let injector: TestBed;
  let employeesService: MockEmployeesService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, RouterTestingModule, RouterTestingModule],
      declarations: [
        NewEmployeeComponent,
        JobTitleComponent,
        MockComponent({ selector: 'app-employee-form', inputs: ['isViewing', 'selectedEmployeeData'] })
      ],
      providers: [
        {provide: EmployeesService, useClass: MockEmployeesService},
        {provide: CountryService, useClass: MockCountryService},
        DatesConverterService,
        CalculateAgeService
        ]
    })
    .compileComponents();
    injector = getTestBed();
    employeesService = injector.get(EmployeesService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should saveNewEmployee call addEmployee from EmployeeService', () => {
    spyOn(employeesService, 'addEmployee').and.callThrough();
    component.saveNewEmployee([]);
    expect(employeesService.addEmployee).toHaveBeenCalled();
  });

  it('should handleGoBack call route navigate', () => {
    spyOn(router, 'navigate').and.returnValue('/home');
    component.handleGoBack(false);
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should canDeactivate return true if form is not dirty', () => {
    component.formIsDirty = false;
    expect(component.canDeactivate()).toEqual(true);
  });

  it('should canDeactivate return true if form is dirty and user accepts leave page', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.formIsDirty = true;
    expect(component.canDeactivate()).toEqual(true);
  });

  it('should canDeactivate return false if form is dirty and user does not accept leave page', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.formIsDirty = true;
    expect(component.canDeactivate()).toEqual(false);
  });
});

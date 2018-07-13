import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeComponent } from './view-employee.component';
import {EmployeeFormComponent} from '../../components/employee-form/employee-form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {JobTitleComponent} from '../../components/job-title/job-title.component';
import {Store} from '@ngrx/store';
import {Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {EmployeesService} from '../../services/employees/employees.service';
import {CountryService} from '../../services/country/country.service';
import {DatesConverterService} from '../../miscellaneous/dates-converter/dates-converter.service';
import {CalculateAgeService} from '../../miscellaneous/calculate-age/calculate-age.service';
import {MockComponent} from 'ng2-mock-component';

class MockStore {
  select() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify({})}))
    );
  }

  dispatch() {
    return false;
  }
}

class MockEmployeesService {
  getEmployees() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify([{
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
        }])}))
    );
  }
}

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

describe('ViewEmployeeComponent', () => {
  let component: ViewEmployeeComponent;
  let fixture: ComponentFixture<ViewEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MaterialModule],
      declarations: [
        ViewEmployeeComponent,
        JobTitleComponent,
        MockComponent({ selector: 'app-employee-form', inputs: ['isViewing', 'selectedEmployeeData'] })
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

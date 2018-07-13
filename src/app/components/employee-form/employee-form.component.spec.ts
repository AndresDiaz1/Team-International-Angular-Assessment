import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {AppRoutingModule} from '../../app.routing';
import {HomeComponent} from '../../pages/home/home.component';
import {EmployeesListComponent} from '../employees-list/employees-list.component';
import {Observable} from 'rxjs/Observable';
import {Response, ResponseOptions} from '@angular/http';
import {CountryService} from '../../services/country/country.service';
import {MockComponent} from 'ng2-mock-component';
import {NewEmployeeComponent} from '../../pages/new-employee/new-employee.component';
import {ViewEmployeeComponent} from '../../pages/view-employee/view-employee.component';
import {JobTitleComponent} from '../job-title/job-title.component';
import {DatesConverterService} from '../../miscellaneous/dates-converter/dates-converter.service';
import {CalculateAgeService} from '../../miscellaneous/calculate-age/calculate-age.service';

class MockCountryService {
  getCountries() {
    return {
      subscribe: () => [{name: 'Affganistan'}]
    };
  }
}

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let injector: TestBed;
  let countryService: MockCountryService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeFormComponent,
        HomeComponent,
        NewEmployeeComponent,
        ViewEmployeeComponent,
        JobTitleComponent,
        EmployeesListComponent
      ],
      imports: [ReactiveFormsModule, MaterialModule, AppRoutingModule],
      providers: [
        {provide: CountryService, useClass: MockCountryService},
        DatesConverterService,
        CalculateAgeService
      ]
    })
    .compileComponents();
    injector = getTestBed();
    countryService = injector.get(CountryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    component.countries = [{name: 'Affganistan'}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCountries should call getCountries from CountryService', () => {
    spyOn(countryService, 'getCountries').and.callThrough();
    component.getCountries();
    expect(countryService.getCountries).toHaveBeenCalled();
  });
});

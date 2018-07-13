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

fdescribe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let injector: TestBed;
  let countryService: MockCountryService;
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

  it('should fill form fills the form with selectedEmployeeData', () => {
    component.selectedEmployeeData = stubEmploye;
    component.fillForm();
    expect(component.form.controls['name'].value).toEqual(stubEmploye.name);
  });

  it('should disableFields disable form fills', () => {
    component.disableFields();
    expect(component.form.controls['name'].disabled).toEqual(true);
  });

  it('should isFieldValid return false if field is valid, and has pressed SaveEmployee', () => {
    component.form.controls['name'].setValue('Pepe');
    component.hasPressedSaveEmployee = true;
    expect(component.isFieldValid('name')).toEqual(false);
  });

  it('should isFieldValid return true if field is invalid, and has pressed SaveEmployee', () => {
    component.hasPressedSaveEmployee = true;
    expect(component.isFieldValid('name')).toEqual(true);
  });

  it('should isFieldValid return false if field is invalid, and has pressed SaveEmployee is false', () => {
    component.hasPressedSaveEmployee = false;
    expect(component.isFieldValid('name')).toEqual(false);
  });

  it('should isFieldValid return false if field is valid, and has pressed SaveEmployee is false', () => {
    component.form.controls['name'].setValue('Pepe');
    component.hasPressedSaveEmployee = false;
    expect(component.isFieldValid('name')).toEqual(false);
  });

  it('should changeArea set current area equal to form area', () => {
    component.form.controls['area'].setValue('Kitchen');
    component.changeArea();
    expect(component.currentArea).toEqual('Kitchen');
  });

  it('should handleJobTitleChange set jobTitle form field equal to passed parameter ', () => {
    component.handleJobTitleChange('Waitres');
    expect( component.form.controls['jobTitle'].value).toEqual('Waitres');
  });

});

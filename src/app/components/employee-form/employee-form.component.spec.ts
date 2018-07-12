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

class MockCountryService {
  getCountries() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify([{
          name: 'Afganistan'
        }])}))
    );
  }
}

xdescribe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let injector: TestBed;
  let countryService: MockCountryService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeFormComponent,
        HomeComponent,
        EmployeesListComponent,
      ],
      imports: [ReactiveFormsModule, MaterialModule, AppRoutingModule],
      providers: [{provide: CountryService, useClass: MockCountryService}]
    })
    .compileComponents();
    injector = getTestBed();
    countryService = injector.get(CountryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    component.countries = {name: 'Affganistan'};
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

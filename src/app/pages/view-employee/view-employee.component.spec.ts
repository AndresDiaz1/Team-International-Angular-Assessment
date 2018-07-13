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



describe('ViewEmployeeComponent', () => {
  let component: ViewEmployeeComponent;
  let fixture: ComponentFixture<ViewEmployeeComponent>;
  let injector: TestBed;
  let store: MockStore;


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
    injector = getTestBed();
    store = injector.get(Store);
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
});

import {async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import {EmployeesService} from '../../services/employees/employees.service';
import {Observable} from 'rxjs/Observable';
import {Response, ResponseOptions} from '@angular/http';
import 'rxjs/add/observable/of';
import {MaterialModule} from '../../material/material.module';
import {CalculateAgeService} from '../../miscellaneous/calculate-age/calculate-age.service';
import { MockComponent } from 'ng2-mock-component';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {MockEmployeesService, MockStore} from '../../../mocks/mocks';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector: TestBed;
  let employeesService: MockEmployeesService;
  let store: MockStore;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [
        HomeComponent,
        MockComponent({ selector: 'app-employees-list', inputs: ['employeesList'] }),
        MockComponent({selector: 'app-view-employee'}),
      ],
      providers: [
        {provide: EmployeesService, useClass: MockEmployeesService},
        CalculateAgeService,
        {provide: Store, useClass: MockStore},
      ]
    })
    .compileComponents();
    injector = getTestBed();
    employeesService = injector.get(EmployeesService);
    store = injector.get(Store);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getEmployees should call store', () => {
    spyOn(store, 'select').and.callThrough();
    component.getEmployees();
    expect(store.select).toHaveBeenCalled();
  });

  it('should handleEditEmployee redirect to some User', () => {
    spyOn(router, 'navigate').and.returnValue('/someUser/1');
    component.handleEditEmployee(1);
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should handleViewEmployee redirect to some User', () => {
    spyOn(router, 'navigate').and.returnValue('/someUser/2');
    component.handleEditEmployee(2);
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should handleDeleteEmployee call employee service delete employee', () => {
    spyOn(employeesService, 'deleteEmployee').and.callThrough();
    component.handleDeleteEmployee(2);
    expect(employeesService.deleteEmployee).toHaveBeenCalled();
  });

});

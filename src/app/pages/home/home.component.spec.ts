import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import {EmployeesService} from '../../services/employees.service';
import {Observable} from 'rxjs/Observable';
import {Response, ResponseOptions} from '@angular/http';
import 'rxjs/add/observable/of';
import {EmployeesListComponent} from '../../components/employees-list/employees-list.component';
import {MaterialModule} from '../../material/material.module';
import {CalculateAgeService} from '../../miscellaneous/calculate-age.service';
import { MockComponent } from 'ng2-mock-component';
import {StateObservable, Store} from '@ngrx/store';


class MockEmployeesService {
  getEmployees() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify({})}))
    );
  }
}

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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector: TestBed;
  let employeesService: MockEmployeesService;
  let store: MockStore

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [
        HomeComponent,
        MockComponent({ selector: 'app-employees-list', inputs: ['employeesList'] })
      ],
      providers: [
        {provide: EmployeesService, useClass: MockEmployeesService},
        CalculateAgeService,
        {provide: Store, useClass: MockStore}
      ]
    })
    .compileComponents();
    injector = getTestBed();
    employeesService = injector.get(EmployeesService);
    store = injector.get(Store);
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
});

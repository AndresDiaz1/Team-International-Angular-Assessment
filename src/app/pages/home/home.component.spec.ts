import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import {EmployeesService} from '../../services/employees.service';
import {Observable} from 'rxjs/Observable';
import {Response, ResponseOptions} from '@angular/http';
import 'rxjs/add/observable/of';
import {EmployeesListComponent} from '../../components/employees-list/employees-list.component';


class MockEmployeesService {
  getEmployees() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify({})}))
    );
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector: TestBed;
  let employeesService: MockEmployeesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HomeComponent, EmployeesListComponent ],
      providers: [{provide: EmployeesService, useClass: MockEmployeesService}]
    })
    .compileComponents();
    injector = getTestBed();
    employeesService = injector.get(EmployeesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getEmployees should call getEmployees from EmployeesService', () => {
    spyOn(employeesService, 'getEmployees').and.callThrough();
    component.getEmployees();
    expect(employeesService.getEmployees).toHaveBeenCalled();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import {EmployeesService} from '../../services/employees.service';
import {Observable} from 'rxjs/Observable';
import {Response, ResponseOptions} from '@angular/http';
import 'rxjs/add/observable/of';


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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HomeComponent ],
      providers: [{provide: EmployeesService, useClass: MockEmployeesService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesListComponent } from './employees-list.component';
import {MaterialModule} from '../../material/material.module';
import {CalculateAgeService} from '../../miscellaneous/calculate-age.service';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesListComponent ],
      imports: [MaterialModule],
      providers: [CalculateAgeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

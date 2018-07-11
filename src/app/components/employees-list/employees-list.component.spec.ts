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

  it('should setAge call calculateAge of CalculateAgeService', () => {
    expect(component.setAge('1978/03/21')).toEqual(40);
  });

});

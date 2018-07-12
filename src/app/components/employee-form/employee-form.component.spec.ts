import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {AppRoutingModule} from '../../app.routing';
import {HomeComponent} from '../../pages/home/home.component';
import {EmployeesListComponent} from '../employees-list/employees-list.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent, HomeComponent, EmployeesListComponent ],
      imports: [ReactiveFormsModule, MaterialModule, AppRoutingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

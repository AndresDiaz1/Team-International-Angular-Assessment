import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleComponent } from './job-title.component';
import {MaterialModule} from '../../material/material.module';

describe('JobTitleComponent', () => {
  let component: JobTitleComponent;
  let fixture: ComponentFixture<JobTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ JobTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set servicesJobTitles if current area is Services', () => {
    component.currentArea = 'Services';
    component.setDropDownOptions();
    expect(component.dropDownOptions).toEqual(component.servicesJobTitles);
  });

  it('should set servicesJobTitles if current area is Services', () => {
    component.currentArea = 'Kitchen';
    component.setDropDownOptions();
    expect(component.dropDownOptions).toEqual(component.kitchenJobTitles);
  });

});

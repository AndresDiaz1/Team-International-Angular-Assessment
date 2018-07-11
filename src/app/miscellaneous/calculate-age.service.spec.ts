import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { CalculateAgeService } from './calculate-age.service';
import {EmployeesService} from '../services/employees.service';

describe('CalculateAgeService', () => {
  let injector: TestBed;
  let calculateAgeService: CalculateAgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculateAgeService]
    });
    injector = getTestBed();
    calculateAgeService = injector.get(CalculateAgeService);
  });

  it('should be created', inject([CalculateAgeService], (service: CalculateAgeService) => {
    expect(service).toBeTruthy();
  }));

  it('calculateAge should return the age based on a YYYY/MM/DD date', () => {
    expect(calculateAgeService.calculateAge('1980/01/06')).toEqual(38);
  });
});

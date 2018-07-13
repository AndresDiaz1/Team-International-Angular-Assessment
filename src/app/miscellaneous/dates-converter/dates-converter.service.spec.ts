import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { DatesConverterService } from './dates-converter.service';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {CalculateAgeService} from '../calculate-age/calculate-age.service';

describe('DatesConverterService', () => {
  let injector: TestBed;
  let datesConverterService: DatesConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatesConverterService]
    });
    injector = getTestBed();
    datesConverterService = injector.get(DatesConverterService);
  });

  it('should be created', inject([DatesConverterService], (service: DatesConverterService) => {
    expect(service).toBeTruthy();
  }));

  it('should formatDate return a formatted date with yyyy/mm/dd', () => {
    const formattedDate = datesConverterService.formatDate( new Date('Fri Jul 13 2018 14:31:42 GMT-0500 (hora estándar de Colombia)'));
    expect(formattedDate).toEqual('2018/7/13');
  });
});

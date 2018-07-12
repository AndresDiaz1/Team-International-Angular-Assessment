import { TestBed, inject } from '@angular/core/testing';

import { DatesConverterService } from './dates-converter.service';

describe('DatesConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatesConverterService]
    });
  });

  it('should be created', inject([DatesConverterService], (service: DatesConverterService) => {
    expect(service).toBeTruthy();
  }));
});

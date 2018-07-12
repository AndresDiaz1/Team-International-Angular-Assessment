import { TestBed, inject } from '@angular/core/testing';

import { CandeactivateguardService } from './candeactivateguard.service';

describe('CandeactivateguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandeactivateguardService]
    });
  });

  it('should be created', inject([CandeactivateguardService], (service: CandeactivateguardService) => {
    expect(service).toBeTruthy();
  }));
});

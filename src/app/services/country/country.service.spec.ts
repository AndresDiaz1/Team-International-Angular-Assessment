import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { CountryService } from './country.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CountryService', () => {
  let injector: TestBed;
  let countryService: CountryService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });
    injector = getTestBed();
    countryService = injector.get(CountryService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));

  it('should get countries', () => {
    const dummyCountries = [{
      name: 'Afganistan'
    }];
    countryService.getCountries().subscribe(countries => {
      expect(countries.length).toBe(1);
      expect(countries).toEqual(dummyCountries);
    });
    const req = httpMock.expectOne('https://restcountries.eu/rest/v2/all');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountries);
  });
});

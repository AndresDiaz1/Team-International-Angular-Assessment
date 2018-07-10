import { TestBed, inject } from '@angular/core/testing';
import { EmployeesService } from './employees.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Response, ResponseOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

const employees = [{
  'id': 1,
  'name': 'Giacomo Guilizoni',
  'dob': '1978/03/21',
  'country': 'Italy',
  'username': 'Peldi',
  'hireDate': '2017/10/01',
  'status': false,
  'area': 'services',
  'jobTitle': 1,
  'tipRate': 0
}];

function createResponse(body) {
  return Observable.of(
    new Response(new ResponseOptions({body: JSON.stringify(body)}))
  );
}

class MockHttpCLient {
  get() {
    return createResponse([]);
  }
}

describe('EmployeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeesService,
        {provide: HttpClient, useClass: MockHttpCLient}
      ]
    });
  });

  it('should be created', inject([EmployeesService], (service: EmployeesService) => {
    expect(service).toBeTruthy();
  }));
});

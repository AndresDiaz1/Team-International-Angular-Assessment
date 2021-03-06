import {TestBed, inject, getTestBed} from '@angular/core/testing';
import { EmployeesService } from './employees.service';
import 'rxjs/add/observable/of';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('EmployeesService', () => {
  let injector: TestBed;
  let employeesService: EmployeesService;
  let httpMock: HttpTestingController;
  const dummyEmployees = [{
    'id': 1,
    'name': 'Giacomo Guilizoni',
    'dob': '1978/03/21',
    'country': 'Italy',
    'username': 'Peldi',
    'hireDate': '2017/10/01',
    'status': false,
    'area': 'services',
    'jobTitle': 'Waitress',
    'tipRate': 0
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService]
    });
    injector = getTestBed();
    employeesService = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

  });

  it('should be created', inject([EmployeesService], (service: EmployeesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get employees', () => {
    employeesService.getEmployees().subscribe(employees => {
      expect(employees.length).toBe(1);
      expect(employees).toEqual(dummyEmployees);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmployees);
  });

  it('should post employees', () => {
    employeesService.addEmployee(dummyEmployees).subscribe(employees => {
      expect(employees[0]['id']).toBe(1);
      expect(employees).toEqual(dummyEmployees);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees', 'post to API');
    expect(req.request.method).toBe('POST');
    req.flush(dummyEmployees);
    httpMock.verify();
  });

  it('should put employees', () => {
    employeesService.updateEmployee(dummyEmployees, 1).subscribe(employees => {
      expect(employees[0]['id']).toBe(1);
      expect(employees).toEqual(dummyEmployees);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees/1', 'put to API');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyEmployees);
    httpMock.verify();
  });

  it('should delete employees', () => {
    employeesService.deleteEmployee(1).subscribe(employees => {
      expect(employees[0]['id']).toBe(1);
      expect(employees).toEqual(dummyEmployees);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees/1', 'put to API');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyEmployees);
    httpMock.verify();
  });
});

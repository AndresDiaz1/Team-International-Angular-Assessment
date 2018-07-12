import {TestBed, inject, getTestBed} from '@angular/core/testing';
import { EmployeesService } from './employees.service';
import 'rxjs/add/observable/of';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('EmployeesService', () => {
  let injector: TestBed;
  let employeesService: EmployeesService;
  let httpMock: HttpTestingController;

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
    const dummyEmployees = [{
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
    employeesService.getEmployees().subscribe(employees => {
      expect(employees.length).toBe(1);
      expect(employees).toEqual(dummyEmployees);
    });
    const req = httpMock.expectOne('../../assets/employees.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmployees);
  });
});

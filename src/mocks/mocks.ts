import {Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Employee} from '../app/models/employee.model';

export class MockEmployeesService {

  getEmployee(employee: Employee) {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify([{
          'id': 1,
          'name': 'Valerie Liberty',
          'dob': '1988/03/02',
          'country': 'Australia',
          'username': 'Val',
          'hireDate': '2018/03/02',
          'status': true,
          'area': 'Services',
          'jobTitle': 'Dining room manager',
          'tipRate': 0.4
        }])}))
    );
  }

  addEmployee(employee: Employee) {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify([{ok: 1}])}))
    );
  }

  deleteEmployee(id: number) {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify([{ok: 1}])}))
    );
  }
}

export class MockStore {
  select() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify({})}))
    );
  }

  dispatch() {
    return false;
  }
}

export class MockCountryService {
  getCountries() {
    return Observable.of(
      new Response(new ResponseOptions({body: JSON.stringify([{
          'id': 1,
          'name': 'Germany'
        }])}))
    );
  }
}

export class MockActivatedRoute {
  params = Observable.of(true);
}

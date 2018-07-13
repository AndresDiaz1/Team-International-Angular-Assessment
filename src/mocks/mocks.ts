import {Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Employee} from '../app/models/employee.model';

export class MockEmployeesService {

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

import { Injectable} from '@angular/core';
import { Effect, Actions} from '@ngrx/effects';
import * as employeeActions from '../actions/employees.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import {EmployeesService} from '../../services/employees/employees.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class EmployeesEffects {
  constructor(private actions$: Actions, private employeesService: EmployeesService) {}

  @Effect()
  loadEmployees$ = this.actions$.ofType(employeeActions.LOAD_EMPLOYEES)
    .pipe(switchMap(() => {
        return this.employeesService.getEmployees().pipe(
          map(employees => new employeeActions.LoadEmployeesSucccess(employees)),
          catchError(error => of(new employeeActions.LoadEmployeesFail(error)))
        );
      }));
}

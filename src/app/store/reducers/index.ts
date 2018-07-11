import { ActionReducerMap} from '@ngrx/store';
import * as fromEmployees from './employees.reducer';

export interface EmployeesState {
  employees: fromEmployees.EmployeeState;
}

export const reducers: ActionReducerMap<EmployeesState> = {
  employees: fromEmployees.reducer,
};

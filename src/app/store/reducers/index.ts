import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as fromEmployees from './employees.reducer';

export interface EmployeesState {
  employees: fromEmployees.EmployeeState;
}

export const reducers: ActionReducerMap<EmployeesState> = {
  employees: fromEmployees.reducer,
};

export const  getEmployeesState = (state: EmployeesState) => state.employees;
export const getAllEmployees = createSelector(getEmployeesState, (state: fromEmployees.EmployeeState) => state.data);

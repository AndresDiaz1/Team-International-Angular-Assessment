import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromEmployees from './employees.reducer';

export interface EmployeesState {
  employees: fromEmployees.EmployeeState;
}

export const reducers: ActionReducerMap<EmployeesState> = {
  employees: fromEmployees.reducer,
};

export const  getEmployeesState = (state: EmployeesState) => state.employees;
export const getAllEmployees = createSelector(getEmployeesState, (state: fromEmployees.EmployeeState) => state.data);
export const getEmployeesLoaded = createSelector(getEmployeesState, (state: fromEmployees.EmployeeState) => state.loaded);
export const getEmployeesLoading = createSelector(getEmployeesState, (state: fromEmployees.EmployeeState) => state.loading);

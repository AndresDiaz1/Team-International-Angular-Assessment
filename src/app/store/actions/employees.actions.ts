import { Action } from '@ngrx/store';
import {Employee} from '../../models/employee.model';

export const LOAD_EMPLOYEES = '[Employees] Load Employees';
export const LOAD_EMPLOYEES_FAIL = '[Employees] Load Employees Fail';
export const LOAD_EMPLOYEES_SUCCESS = '[Employees] Load Employees Success';

export class LoadEmployees implements  Action {
  readonly type = LOAD_EMPLOYEES;
}

export class LoadEmployeesFail implements  Action {
  readonly type = LOAD_EMPLOYEES_FAIL;
  constructor(public payload: any) {}
}

export class LoadEmployeesSucccess implements  Action {
  readonly type = LOAD_EMPLOYEES_SUCCESS;
  constructor(public payload: Employee[]) {}
}

export type EmpployeeActions = LoadEmployees | LoadEmployeesFail | LoadEmployeesSucccess;

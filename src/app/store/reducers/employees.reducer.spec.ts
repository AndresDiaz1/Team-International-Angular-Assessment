import * as fromEmployees from './employees.reducer';
import * as fromActions from '../actions/employees.actions';
import {Employee} from '../../models/employee.model';

describe('Employees reducer', () => {
  it('should return the default state if action is undefined', () => {
    const initialState = fromEmployees.initialState;
    const state = fromEmployees.reducer(undefined, {});
    expect(state).toBe(initialState);
  });

  it('should LOAD_EMPLOYEES action return initial state', () => {
    const initialState = fromEmployees.initialState;
    const state = fromEmployees.reducer(initialState, {});
    expect(state.data).toEqual([]);
  });

  it('should LOAD_EMPLOYEES_SUCCESS action return state with employees', () => {
    const initialState = fromEmployees.initialState;
    const payload = {
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
    };
    const state = fromEmployees.reducer(initialState, new fromActions.LoadEmployeesSucccess(payload));
    expect(state.data).toEqual(payload);
  });

  it('should LOAD_EMPLOYEES_FAIL action return same state', () => {
    const initialState = fromEmployees.initialState;
    const state = fromEmployees.reducer(initialState, new fromActions.LoadEmployeesFail('Error'));
    expect(state).toEqual(initialState);
  });
});

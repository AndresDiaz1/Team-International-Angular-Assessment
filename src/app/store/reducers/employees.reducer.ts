import * as fromEmployees from '../actions/employees.actions';
import {Employee} from '../../models/employee.model';

export interface EmployeeState {
  data: Employee[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: EmployeeState = {
  data: [{
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
    }],
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromEmployees.EmpployeeActions): EmployeeState {

  switch (action.type) {
    case fromEmployees.LOAD_EMPLOYEES: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case fromEmployees.LOAD_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false
      };
    }

    case fromEmployees.LOAD_EMPLOYEES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }

  return state;
}

export const getEmployeesLoading = (state: EmployeeState) => state.loading;
export const getEmployeesLoaed = (state: EmployeeState) => state.loaded;
export const getEmployees = (state: EmployeeState) => state.data;


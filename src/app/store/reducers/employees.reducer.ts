import * as fromEmployees from '../actions/employees.actions';
import {Employee} from '../../models/employee.model';

export interface EmployeeState {
  data: Employee[];
}

export const initialState: EmployeeState = {
  data: [],
};

export function reducer(state = initialState, action: fromEmployees.EmpployeeActions): EmployeeState {

  switch (action.type) {
    case fromEmployees.LOAD_EMPLOYEES: {
      return {
        ...state,
      };
    }

    case fromEmployees.LOAD_EMPLOYEES_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data
      };
    }

    case fromEmployees.LOAD_EMPLOYEES_FAIL: {
      return {
        ...state,
      };
    }
  }

  return state;
}

export const getEmployees = (state: EmployeeState) => state.data;


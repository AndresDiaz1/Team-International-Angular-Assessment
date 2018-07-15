import * as fromEmployees from './employees.actions';

describe('Employees actions', () => {
  it('Should create an action', () => {
    const action = new fromEmployees.LoadEmployees();
    expect({...action}).toEqual({type: fromEmployees.LOAD_EMPLOYEES});
  });

  it('Should create an action load employees fail', () => {
    const payload = 'Error';
    const action = new fromEmployees.LoadEmployeesFail(payload);
    expect({...action}).toEqual({type: fromEmployees.LOAD_EMPLOYEES_FAIL, payload});
  });

  it('Should create an action load employees success', () => {
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
    const action = new fromEmployees.LoadEmployeesSucccess(payload);
    expect({...action}).toEqual({type: fromEmployees.LOAD_EMPLOYEES_SUCCESS, payload});
  });
});

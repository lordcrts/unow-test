
import { createReducer, on } from '@ngrx/store';
import {createEmployee, deletedEmployee, getEmployees, startStopLoading, updatedEmployee } from './shared.actions';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(startStopLoading, (state, action) => {
    return {
      ...state,
      loading: action.loading,
    };
  }),
  on(getEmployees, (state, action) => {
    return {
      ...state,
      employees: action.employees,
    };
  }),
  on(createEmployee, (state, { employee }) => ({
    ...state,
    employees: [employee, ...state.employees]
  })),
  on(updatedEmployee, (state, { employee }) => ({
    ...state,
    employees: state.employees.map(emp =>
      emp.id === employee.id ? employee : emp
    )
  })),
  on(deletedEmployee, (state, { id }) => ({
    ...state,
    employees: state.employees.filter(emp => emp.id !== id)
  }))
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}


import { createAction, props } from '@ngrx/store';
import { Employee } from '../../core/models/employee.model';
export const START_STOP_LOADING_ACTION = '[shared state] start / stop loading';
export const STOP_LOADING_ACTION = '[shared state] stop loading';

export const GET_EMPLOYEES_ACTION = '[shared state] get Employees';

export const CREATE_EMPLOYEE_ACTION = '[shared state] create Employee';
export const CREATED_EMPLOYEE_ACTION = '[shared state] created Employee';

export const UPDATE_EMPLOYEE_ACTION = '[shared state] update Employee';
export const UPDATED_EMPLOYEE_ACTION = '[shared state] updated Employee';

export const DELETE_EMPLOYEE_ACTION = '[shared state] delete Employee';
export const DELETED_EMPLOYEE_ACTION = '[shared state] deleted Employee';

export const startStopLoading = createAction(
  START_STOP_LOADING_ACTION,
  props<{ loading: boolean }>()
);

export const setEmployees = createAction(
  GET_EMPLOYEES_ACTION
);

export const getEmployees = createAction(
  GET_EMPLOYEES_ACTION,
  props<{ employees: Employee[] }>()
);

export const createEmployee = createAction(
  CREATE_EMPLOYEE_ACTION,
  props<{ employee: Employee }>()
);

export const createdEmployee = createAction(  
  CREATED_EMPLOYEE_ACTION,
  props<{ employee: Employee }>()
);

export const updateEmployee = createAction(
  UPDATE_EMPLOYEE_ACTION,
  props<{ employee: Employee }>()
);

export const updatedEmployee = createAction(  
  UPDATED_EMPLOYEE_ACTION,
  props<{ employee: Employee }>()
);

export const deleteEmployee = createAction(
  DELETE_EMPLOYEE_ACTION,
  props<{ id: string }>()
);

export const deletedEmployee = createAction(  
  DELETED_EMPLOYEE_ACTION,
  props<{ id: string }>()
);

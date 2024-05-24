
import { createAction, props } from '@ngrx/store';
import { Employee } from '../../core/models/employee.model';
export const START_STOP_LOADING_ACTION = '[shared state] start / stop loading';
export const STOP_LOADING_ACTION = '[shared state] stop loading';

export const GET_EMPLOYEES_ACTION = '[shared state] get Employees';

export const SET_EMPLOYEE_URL_SLUG_ACTION = '[shared state] set Employee url slug Detail';
export const GET_EMPLOYEE_URL_SLUG_ACTION = '[shared state] get Employee url slug Detail';

// export const SET_CARS_BY_BRAND_ACTION = '[shared state] set Cars By Brand';
// export const GET_CARS_BY_BRAND_ACTION = '[shared state] get Cars By Brand';

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

export const setEmployeeDetail = createAction(
  SET_EMPLOYEE_URL_SLUG_ACTION,
  props<{ url_slug:string }>()
);

export const getEmployeeDetail = createAction(
  GET_EMPLOYEE_URL_SLUG_ACTION,
  props<Employee>()
);

// export const setCarsByBrand= createAction(
//   SET_CARS_BY_BRAND_ACTION,
//   props<{ brand:string }>()
// );

// export const getCarsByBrand= createAction(
//   GET_CARS_BY_BRAND_ACTION,
//   props<{ cars: Car[] }>()
// );

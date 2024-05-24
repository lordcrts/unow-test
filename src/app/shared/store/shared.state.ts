import { Employee } from "../../core/models/employee.model";

export interface SharedState {
    loading: boolean;
    employees:Employee[] | any[]
    employeeDetail:Employee | any
  }

  export const initialState: SharedState = {
    loading: false,
    employees: [],
    employeeDetail: null
  };

import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { createEmployee, createdEmployee, deleteEmployee, deletedEmployee, getEmployees,setEmployees, startStopLoading, updateEmployee, updatedEmployee } from './shared.actions';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../../core/models/employee.model';
import { of } from 'rxjs';

@Injectable()
export class SharedEffects {
    constructor(
        private actions$: Actions,
        private employeeService: EmployeeService,
    ) { }


    startLoading$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(startStopLoading),
                tap((action) => {
                    return startStopLoading(action);
                })
            );
        },
        { dispatch: false }
    );

    setEmployees$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(setEmployees),
            exhaustMap((action) => {
                return this.employeeService.getEmployees()
                    .pipe(
                        map((employees: Employee[]) => {
                            return getEmployees({ employees });
                        })
                    );
            })
        );
    });

    createEmployee$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(createEmployee),
          map(action => action.employee),
          switchMap(employee => {
            const newEmployee: Employee = employee;
            return of(createdEmployee({ employee: newEmployee }));
          })
        );
      });

    updateEmployee$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(updateEmployee),
          map(action => {
            const updatedEmployeeV = action.employee;
            return updatedEmployee({ employee: updatedEmployeeV });
          })
        );
      });

      deleteEmployee$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(deleteEmployee),
          map(action => {
            const id = action.id;
            return deletedEmployee({ id });
          })
        );
      });
}

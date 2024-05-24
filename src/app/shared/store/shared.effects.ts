import { exhaustMap, map, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { getEmployees,setEmployees, startStopLoading } from './shared.actions';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../../core/models/employee.model';

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

    // getCarDetailByUrlSlug$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(setCarDetail),
    //         exhaustMap((action) => {
    //             return this.carService.getCarByModel(action.url_slug)
    //                 .pipe(
    //                     map((cars: Car) => {
    //                         return getCarDetail(cars);
    //                     })
    //                 );
    //         })
    //     );
    // });

    // getCarsByBrand$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(setCarsByBrand),
    //         exhaustMap((action) => {
    //             return this.carService.getCarsByBrand(action.brand)
    //                 .pipe(
    //                     map((cars: Car[]) => {
    //                         return getCarsByBrand({ cars });
    //                     })
    //                 );
    //         })
    //     );
    // });
}

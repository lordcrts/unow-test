import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of } from 'rxjs';
import { Employee } from '../../core/models/employee.model';
import { FakeDataCaEmployees } from '../mocks/employees';
import { Position } from '../../core/models/position.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return of(FakeDataCaEmployees.employees)
      .pipe(
        delay(0)
      );
  }

  getPositions(): Observable<Position[]> {
    return this.http.get<any>(`${environment.positionApi}/positions`).pipe(
      map(response => response['positions'])
    );
  }
}
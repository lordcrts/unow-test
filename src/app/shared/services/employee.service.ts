import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of } from 'rxjs';
import { Employee } from '../../core/models/employee.model';
import { FakeDataCaEmployees } from '../mocks/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return of(FakeDataCaEmployees.employees)
      .pipe(
        map(employees => employees.sort(
          (a, b) => a.firstName.localeCompare(b.firstName))
        ),
        delay(1000)
      );
  }

  // getCarsByBrand(brand: string): Observable<Car[]> {
  //   return this.http.get<Car[]>("./assets/cars.json")
  //     .pipe(
  //       map(x => x.filter(
  //         x => x.brand.toLowerCase().includes(brand.toLowerCase()))
  //       ),
  //       map(x => x.sort(
  //         (a, b) => a.brand.localeCompare(b.brand))
  //       )
  //       , delay(1000)
  //     );
  // }

  // getCarByModel(url_slug: string): Observable<Car | any> {
  //   return this.http.get<Car[]>("./assets/cars.json")
  //     .pipe(
  //       map(x => x.find(
  //         x => x.url_slug === url_slug)
  //         ),
  //       delay(1000)
  //     );
  // }
}
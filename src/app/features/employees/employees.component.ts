import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableComponent } from '../../shared/components/table/table.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.state';
import { Observable } from 'rxjs';
import { Employee } from '../../core/models/employee.model';
import { getEmployeesSelector } from '../../shared/store/shared.selector';
import { setEmployees } from '../../shared/store/shared.actions';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableModule, TableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employeesState: Observable<Employee[]> =
    this.store.select(getEmployeesSelector);
  columns: any[] = [];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(setEmployees());
    this.columns = [
      {
        header: 'Firts Name',
        width: '130px',
        field: 'firstName',
        type: 'text',
      },
      {
        header: 'Last Name',
        width: '130px',
        field: 'lastName',
        type: 'text',
      },
      {
        header: 'Position',
        width: '130px',
        field: 'position',
        type: 'text',
      },
      {
        header: 'Birth Day',
        width: '130px',
        field: 'birthDay',
        type: 'text',
      },
    ];
  }
}

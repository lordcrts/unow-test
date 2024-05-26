import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableComponent } from '../../shared/components/table/table.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.state';
import { Observable } from 'rxjs';
import { Employee } from '../../core/models/employee.model';
import { getEmployeesSelector } from '../../shared/store/shared.selector';
import {
  deleteEmployee,
  setEmployees,
} from '../../shared/store/shared.actions';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    TableModule,
    TableComponent,
    DynamicDialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class EmployeesComponent implements OnInit {
  employeesState: Observable<Employee[]> =
    this.store.select(getEmployeesSelector);
  columns: any[] = [];
  ref: DynamicDialogRef | undefined;
  employee!: Employee|null;
  addEmployee =  { action: () => this.openEmployee('add') }
  constructor(
    private store: Store<AppState>,
    public dialogService: DialogService,
    private messageService: MessageService,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(setEmployees());
    this.columns = [
      {
        name: 'Actions',
        width: '85px',
        type: 'dropdown',
        frozen: true,
        actions: {
          items: [
            {
              label: 'Edit',
              icon: 'pi pi-pencil',
              type: 'success',
              tooltip: 'Edit',
              command: (event: any) => {
                this.openEmployee('edit');
              },
            },
            {
              label: 'Delete',
              icon: 'pi pi-trash',
              type: 'warning',
              tooltip: 'Delete',
              command: (event: any) => {
                this.deleteEmploye(event);
              },
            },
          ],
        },
      },
      {
        header: 'Firts Name',
        width: 'auto',
        field: 'firstName',
        type: 'text',
      },
      {
        header: 'Last Name',
        width: 'auto',
        field: 'lastName',
        type: 'text',
      },
      {
        header: 'Position',
        width: 'auto',
        field: 'position',
        type: 'text',
      },
      {
        header: 'Birth Day',
        width: 'auto',
        field: 'birthDay',
        type: 'text',
      },
    ];
  }

  openEmployee(type: string):void {
    if(type ==='add'){
      this.employee = null
    }
    this.ref = this.dialogService.open(DetailEmployeeComponent, {
      header: `${
        type === 'edit'
          ? `Employee: ${this.employee!.firstName}`
          : 'New employee'
      }`,
      modal: true,
      data: {
        ...this.employee,
      },
    });
    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Employee ${data ==='edited' ? 'updated' : 'created'} successfully`,
          key: 'tl',
          life: 3000,
        });
      }
    });
  }
  deleteEmploye(event: Event) {
    this.confirmationService.confirm({
      key: 'confirm',
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete the employee?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.store.dispatch(deleteEmployee({ id: this.employee!.id }));
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee deleted successfully',
          key: 'tl',
          life: 3000,
        });
      },
      reject: () => {},
    });
  }
  dataItem(employee: Employee) {
    this.employee = employee;
  }
}

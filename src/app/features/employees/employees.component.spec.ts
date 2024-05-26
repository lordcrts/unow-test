import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { EmployeesComponent } from './employees.component';
import { SHARED_STATE_NAME } from '../../shared/store/shared.selector';
import { FakeDataCaEmployees } from '../../shared/mocks/employees';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TableComponent } from '../../shared/components/table/table.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../shared/store/app.state';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

const initialState = {
  [SHARED_STATE_NAME]: {
    loading: false,
    employees: FakeDataCaEmployees.employees,
    employeeDetail: null
  }
}
describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        TableModule,
        TableComponent,
        DynamicDialogModule,
        ToastModule,
        ConfirmDialogModule,
        DetailEmployeeComponent,
        CommonModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        DynamicDialogModule,
        ConfirmDialogModule,
        HttpClientModule,
        StoreModule.forRoot(appReducer),
      ],
      providers:[
        provideMockStore({initialState}),
        DialogService,
        MessageService,
        ConfirmationService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should employees defined', () => {
    expect(component.employeesState).toBeTruthy();
  });

  it('should render table', fakeAsync(() => {
    const pTableElement: HTMLElement = fixture.nativeElement.querySelector('p-table');
    expect(pTableElement).toBeTruthy();
    expect(window.getComputedStyle(pTableElement).display).not.toBe('none'); 
    tick(1000)
    fixture.detectChanges();
  }));

  it('should click on add employee', fakeAsync(() => {
    debugger
    const button: HTMLElement = fixture.nativeElement.querySelector('#add-employee');
    // const button = fixture.debugElement.nativeElement.querySelector('p-button');
    const innerElement = button.querySelector('button')!
    expect(button).toBeTruthy();
    expect(window.getComputedStyle(button).display).not.toBe('none'); 
    innerElement.click()
    tick(1000)
    fixture.detectChanges();
  }));
});
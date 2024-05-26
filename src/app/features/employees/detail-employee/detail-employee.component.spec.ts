import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DetailEmployeeComponent } from './detail-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FakeDataCaEmployees } from '../../../shared/mocks/employees';
import { appReducer } from '../../../shared/store/app.state';
import { SHARED_STATE_NAME } from '../../../shared/store/shared.selector';
import { EmployeeService } from '../../../shared/services/employee.service';
import { of } from 'rxjs';
import { FakeDataPositions } from '../../../shared/mocks/positionsts';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const initialState = {
  [SHARED_STATE_NAME]: {
    loading: false,
    employees: FakeDataCaEmployees.employees,
    employeeDetail: null,
  },
};
const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
  'getPositions',
]);
describe('DetailEmployeeComponent', () => {
  let component: DetailEmployeeComponent;
  let fixture: ComponentFixture<DetailEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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
      providers: [
        provideMockStore({ initialState }),
        {provide: EmployeeService, useValue: employeeServiceSpy},
        { provide: DynamicDialogConfig, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} },
        DialogService,
        MessageService,
      ],
    }).compileComponents();
    employeeServiceSpy.getPositions.and.returnValue(of(FakeDataPositions.positions));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should employees defined', () => {
    expect(component.positions).toBeDefined();
  });

  it('should render form', fakeAsync(() => {
    const formElement: HTMLElement =
      fixture.nativeElement.querySelector('form');
    expect(formElement).toBeTruthy();
    expect(window.getComputedStyle(formElement).display).not.toBe('none');
    tick(1000);
    fixture.detectChanges();
  }));
});

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeeService } from '../../../shared/services/employee.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Position } from '../../../core/models/position.model';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../core/models/employee.model';
import { AppState } from '../../../shared/store/app.state';
import { Store } from '@ngrx/store';
import { createEmployee, updateEmployee } from '../../../shared/store/shared.actions';
import { ToastModule } from 'primeng/toast';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-detail-employee',
  standalone: true,
  imports: [ButtonModule, InputTextModule, DropdownModule, CalendarModule, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './detail-employee.component.html',
  styleUrl: './detail-employee.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class DetailEmployeeComponent implements OnInit{
  positions:Position[] = []
  form!:FormGroup
  employee!:Employee
  constructor(public employeeService:EmployeeService, public config: DynamicDialogConfig, public ref: DynamicDialogRef, public fb: FormBuilder, private store: Store<AppState>){
    this.form = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      position:['', Validators.required],
      birthDay:['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.form.reset()
    if (this.config.data){
      this.employee =this.config.data
      this.employeeService.getPositions().subscribe( positions => {
        this.positions = positions
        this.form.patchValue({
          firstName:this.employee.firstName,
          lastName:this.employee.lastName,
          position:this.employee.position,
          birthDay:this.employee.birthDay,
        })
      })
    }
  }

  onSubmit(){
    if(this.form.invalid){
      return
    }
    const formValue = this.form.value
    if(this.employee && this.employee.id){
      formValue.id = this.employee.id
      this.store.dispatch(updateEmployee({employee:formValue}));
      this.ref.close('edited')
    }else{
      formValue.id = uuidv4()
      this.store.dispatch(createEmployee({employee:formValue}));
      this.ref.close('create')
    }
    
  }

  close(){
    this.ref.close()
  }
}

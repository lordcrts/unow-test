import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SkeletonTableComponent } from '../skeleton-table/skeleton-table.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,TableModule, InputTextModule, IconFieldModule, InputIconModule, SkeletonTableComponent, MenuModule, ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class TableComponent implements OnInit{
  
  @Input() data$!: Observable<any[]>;
  @Input() columns: any[] = [];
  @Input() loading: boolean = false;
  @Output() dataItem=new EventEmitter<any>();
  @Input() action!: () => void;
  filteredData :any[] = []
  rowsNumber = 5;

  ngOnInit(): void {
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }  

  sendData(data:any){
    this.dataItem.emit(data)
  }

}

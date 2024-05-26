import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [SkeletonModule, CommonModule, TableModule],
  templateUrl: './skeleton-table.component.html',
  styleUrl: './skeleton-table.component.scss'
})
export class SkeletonTableComponent {
  columns = new Array(5);
  data = new Array(5);
}

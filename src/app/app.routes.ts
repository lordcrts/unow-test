import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () =>
        import('./features/employees/employees.component').then((c) => c.EmployeesComponent),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, 
];

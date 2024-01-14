import { Routes } from '@angular/router';
import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { inject } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { AuthGuard } from './services/authguard.guard';


export const routes: Routes = [
  { path: '', component: EntryPageComponent },
  {
    path: 'list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  }
];

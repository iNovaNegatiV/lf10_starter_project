import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AuthGuard } from './services/authguard.guard';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { QualificationListComponent } from './components/qualification-list/qualification-list.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'qualifications',
    component: QualificationListComponent,
    canActivate:[AuthGuard]
  }
];

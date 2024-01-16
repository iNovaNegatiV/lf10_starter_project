import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AuthGuard } from './services/authguard.guard';


export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  }
];

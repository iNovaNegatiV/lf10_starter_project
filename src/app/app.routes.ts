import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AuthGuard } from './services/authguard.guard';
import {SkillListComponent} from "./components/skill-list/skill-list.component";
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import {SkillDetailsComponent} from "./components/skill-details/skill-details.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'skills',
    component: SkillListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'skills/:id',
    component: SkillDetailsComponent,
    canActivate: [AuthGuard]
  }
];

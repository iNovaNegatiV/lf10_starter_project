import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Injectable({
  'providedIn': 'root'
})
export class AuthGuard {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if(this.employeeService.hasActiveBearer()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

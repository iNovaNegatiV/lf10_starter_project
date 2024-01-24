import { Component } from '@angular/core';
import { Employee } from '../../entitys/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  destroy$ = new Subject();
  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.employeeService.selectedEmployee$
      .pipe(takeUntil(this.destroy$))
      .subscribe((employee) => (this.selectedEmployee = employee));
  }

  ngOnDestroy() {
    this.employeeService.setElectEmployee(null);
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  navigateBack() {
    this.router.navigate(['/employees']);
  }
}

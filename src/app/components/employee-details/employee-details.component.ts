import { Component } from '@angular/core';
import { Employee } from '../../entitys/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Qualification } from '../../entitys/Qualification';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  destroy$ = new Subject();
  selectedEmployee: Employee = new Employee();
  editing = false;
  qualifications: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.employeeService.selectedEmployee$
      .pipe(takeUntil(this.destroy$))
      .subscribe((employee) => {
        if (employee == null) {
          return;
        }

        this.selectedEmployee = employee;

        // Fetch qualifications for the selected employee
        if (employee.id) {
          this.employeeService
            .getEmployeeQualifications(employee.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((qualifications) => {
              this.qualifications = qualifications.qualificationSet || [];
            });
        }
      });
  }

  ngOnDestroy() {
    this.employeeService.setSelectEmployee(null);
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  navigateBack() {
    this.router.navigate(['/employees']);
  }

  toggleEdit() {
    if (this.editing) {
      // Save changes
      this.employeeService
        .updateEmployee(this.selectedEmployee)
        .subscribe((employee) => {
          this.selectedEmployee = employee;
        });
    }
    this.editing = !this.editing;
  }

  getQualificationsetNames(qualificationSet: any[]): string {
    if (!qualificationSet || qualificationSet.length === 0) {
      return 'No qualifications';
    }

    return qualificationSet.map((qualification: Qualification) => qualification.skill).join(', ');
  }

  navigateToEmployeeQualifications() {
    //this.router.navigate([]);
  }
}

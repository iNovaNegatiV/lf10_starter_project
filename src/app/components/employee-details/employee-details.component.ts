import { Component } from '@angular/core';
import { Employee } from '../../entitys/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  skills: any[] = [];

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

        // Fetch skills for the selected employee
        if (employee.id) {
          this.employeeService
            .getEmployeeQualifications(employee.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((qualifications) => {
              this.skills = qualifications.skillSet || [];
            });
        }
      });
    console.log(this.selectedEmployee);
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

  getSkillsetNames(skillset: any[]): string {
    if (!skillset || skillset.length === 0) {
      return 'No skills';
    }

    return skillset.map((skill) => skill.skill).join(', ');
  }

  navigateToEmployeeSkills() {
    this.router.navigate(['/employees', this.selectedEmployee.id, 'skills']);
  }
}

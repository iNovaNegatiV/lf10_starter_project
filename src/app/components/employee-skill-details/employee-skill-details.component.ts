import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../entitys/Employee';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-skill-details',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './employee-skill-details.component.html',
  styleUrl: './employee-skill-details.component.css',
})
export class EmployeeSkillDetailsComponent {
  destroy$ = new Subject();
  @Input() selectedEmployee: Employee = new Employee();
  @Input() editing:boolean = false;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.employeeService.selectedEmployee$.subscribe((employee) => {
      if (employee == null) {
        return;
      }
      this.selectedEmployee = employee;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  navigateBack() {
    this.router.navigate(['/employees', this.selectedEmployee.id]);
  }

  deleteEmployeeQualification(skill?: string) {
    if(skill) {
      this.employeeService
      .deleteEmployeeQualification(skill)
      .subscribe((data) => {
        this.selectedEmployee.skillSet = data.skillSet;
        this.employeeService.setSelectEmployee(this.selectedEmployee);
      });
    }
  }
}

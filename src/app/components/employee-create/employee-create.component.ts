import { Component } from '@angular/core';
import { EmployeeSkillDetailsComponent } from '../employee-skill-details/employee-skill-details.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomQualificationsDropdownComponent } from '../shared/custom-qualifications-dropdown/custom-qualifications-dropdown.component';
import { PostEmployee } from '../../entitys/PostEmployee';
import { Qualification } from '../../entitys/Qualification';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [
    EmployeeSkillDetailsComponent,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    CustomQualificationsDropdownComponent,
  ],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css',
})
export class EmployeeCreateComponent {
  selectedQualifications: string[] = [];
  existingQualifications: Qualification[] = [];
  newEmployee: PostEmployee = new PostEmployee();
  employeeForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    postcode: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
  ) {}

  async ngOnInit() {
    await this.employeeService.setBearer();
    await this.fetchData();
  }

  async fetchData() {
    this.existingQualifications =
      await this.employeeService.getAllQualifications();
  }

  navigateBack() {
    this.router.navigate(['/employees']);
  }

  save() {
    if (this.employeeForm.valid) {
      this.newEmployee = {
        firstName: this.employeeForm.value.firstName || undefined,
        lastName: this.employeeForm.value.lastName || undefined,
        street: this.employeeForm.value.street || undefined,
        postcode: this.employeeForm.value.postcode || undefined,
        city: this.employeeForm.value.city || undefined,
        phone: this.employeeForm.value.phone || undefined,
        skillSet: this.newEmployee.skillSet,
      };
      this.employeeService.createEmployee(this.newEmployee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      let missingFields = Object.keys(this.employeeForm.controls)
        .filter((key) => this.employeeForm.get(key)?.errors?.['required'])
        .join(', ');

      window.alert(`Please fill in the following fields: ${missingFields}`);
    }
  }

  addQualification(qualification: Qualification) {
    if (!this.newEmployee.skillSet) {
      this.newEmployee.skillSet = [];
    }
    this.newEmployee.skillSet.push(qualification.id as number);
    this.selectedQualifications.push(qualification.skill as string);
  }

  async createQualification(skill: string) {
    await this.employeeService.createQualificationByName(skill);
    await this.fetchData();
  }
}

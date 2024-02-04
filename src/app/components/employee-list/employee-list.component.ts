import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../shared/filter/filter.component';
import { Employee } from '../../entitys/Employee';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeEntry } from '../employee-entry/employee-entry.component';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterLink } from "@angular/router";
import { CustomQualificationsDropdownComponent } from '../shared/custom-qualifications-dropdown/custom-qualifications-dropdown.component';
import { Qualification } from '../../entitys/Qualification';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    EmployeeEntry,
    FilterComponent,
    RouterLink,
    CustomQualificationsDropdownComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  private employees: Employee[] = [];
  filtering: boolean = false;
  filterSettings: {name: string, qualifications: string[]} = {name: '', qualifications: []};

  constructor(
    private service: EmployeeService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.service.setBearer();
    await this.fetchData();
  }

  async fetchData() {
    this.employees = await this.service.getAllEmployees();
  }

  activateFilter(): void {
    this.filtering = true;
  }

  deactivateFilter(): void {
    this.filtering = false;
  }

  setFilterSettings(settings: {name: string, qualifications: string[]}): void {
    this.filterSettings = settings;
  }

  public getEmployees(): Employee[] {
    return this.employees.filter((employee: Employee) => {
      let nameFound: boolean = false;
      let qualificationFound: boolean = false;
      const employeeName: string = employee.firstName + " " + employee.lastName;
      if(employeeName.toLowerCase().includes(this.filterSettings.name.toLowerCase())) {
        nameFound = true;
      }

      if(employee.skillSet.filter((qualification: Qualification) => {
        if(qualification.skill && this.filterSettings.qualifications.includes(qualification.skill)) {
          return true;
        }
        return false;
      }).length > 0) {
        qualificationFound = true;
      }

      if(this.filterSettings.name != '' && this.filterSettings.qualifications.length > 0) {
        return nameFound && qualificationFound;
      }

      if(this.filterSettings.name != '') {
        return nameFound;
      }

      if(this.filterSettings.qualifications.length > 0) {
        return qualificationFound;
      }
      return true;
    });
  }

  goToDetails(employee: Employee) {
    this.service.setSelectEmployee(employee);
    this.router.navigate(['/employees', employee.id]);
  }

  deleteEmployeeById(employeeId: number): void {
    this.service.deleteEmployeeById(employeeId);
    this.employees = this.employees.filter((employee: Employee) => {
      if(employee.id == employeeId) {
        return false;
      }
      return true;
    });
  }
}

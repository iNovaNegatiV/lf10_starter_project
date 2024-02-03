import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../shared/filter/filter.component';
import { Observable, of } from 'rxjs';
import { Employee } from '../../entitys/Employee';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeEntry } from '../employee-entry/employee-entry.component';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { CustomSkillsDropdownComponent } from '../shared/custom-skills-dropdown/custom-skills-dropdown.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    EmployeeEntry,
    FilterComponent
    RouterLink,
    CustomSkillsDropdownComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  private employees: Employee[] = [];
  filtering: boolean = false;
  filterSettings: {name: string, skills: string[]} = {name: '', skills: []};

  constructor(
    private service: EmployeeService,
    private router: Router,
  ) {
    this.employees$ = of([]);
  }

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

  setFilterSettings(settings: {name: string, skills: string[]}): void {
    this.filterSettings = settings;
  }

  public getEmployees(): Employee[] {
    return this.employees.filter(employee => {

      // Name check
      const employeeName = employee.firstName + " " + employee.lastName;
      if(this.filterSettings.name != '') {
        if(!employeeName.toLowerCase().includes(this.filterSettings.name.toLowerCase())) {
          return false;
        }
      }

      // Skills check
      if(this.filterSettings.skills.length > 0) {
        const overlappingSkills = employee.skillSet.filter(skillObject => {
          if(skillObject.name && this.filterSettings.skills.includes(skillObject.name)) {
            return true;
          }
          return false;
        });

        if(overlappingSkills.length <= 0) {
          return false;
        }
      }

      // Passed employees
      return true;
    });
  }

  goToDetails(employee: Employee) {
    this.service.setSelectEmployee(employee);
    this.router.navigate(['/employees', employee.id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Employee } from '../../entitys/Employee';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeEntry } from '../employee-entry/employee-entry.component';
import { EmployeeService } from '../../services/employee.service';
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    EmployeeEntry,
    RouterLink
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(
    private service: EmployeeService,
    private router: Router,
  ) {
    this.employees$ = of([]);
  }

  async ngOnInit() {
    await this.service.setBearer();
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.service.getAllEmployees();
  }

  goToDetails(employee: Employee) {
    this.service.setSelectEmployee(employee);
    this.router.navigate(['/employees', employee.id]);
  }
}

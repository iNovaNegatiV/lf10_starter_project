import {  Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {Employee} from "../../entitys/Employee";
import { AxiosService } from '../../services/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeEntry } from '../employee-entry/employee-entry.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, EmployeeEntry],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private service: AxiosService) {
    this.employees$ = of([]);
  }

  async ngOnInit() {
    await this.service.setBearer();
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.service.getAllEmployees();
  }
}

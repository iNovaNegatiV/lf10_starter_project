import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {  EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeListComponent,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    EmployeeService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}

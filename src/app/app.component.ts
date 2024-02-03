import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  EmployeeService } from './services/employee.service';
import { EmployeeServiceHeaderComponent } from './components/shared/employee-service-header/employee-service-header.component';
import { CustomSkillsDropdownComponent } from './components/shared/custom-skills-dropdown/custom-skills-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EmployeeServiceHeaderComponent
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

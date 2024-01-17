import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../entitys/Employee';

@Component({
  selector: 'app-employee-entry',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './employee-entry.component.html',
  styleUrl: './employee-entry.component.css'
})
export class EmployeeEntry {
  @Input() employee?: Employee;
}

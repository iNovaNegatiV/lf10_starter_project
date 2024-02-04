import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../entitys/Employee';

@Component({
  selector: 'app-employee-entry',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './employee-entry.component.html',
  styleUrl: './employee-entry.component.css',
})
export class EmployeeEntry {
  @Input() employee?: Employee;
  @Output() show: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  public showDetails(): void {
    this.show.emit(this.employee);
  }

  public deleteEmployee(): void {
    this.delete.emit(this.employee?.id);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'employee-service-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent],
  templateUrl: './employee-service-header.component.html',
  styleUrl: './employee-service-header.component.css',
})
export class EmployeeServiceHeaderComponent {}

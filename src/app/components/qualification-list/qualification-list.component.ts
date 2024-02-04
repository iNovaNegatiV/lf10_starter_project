import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink} from "@angular/router";
import { Qualification } from '../../entitys/Qualification';
import { EmployeeService } from '../../services/employee.service';
import { CustomQualificationsDropdownComponent } from '../shared/custom-qualifications-dropdown/custom-qualifications-dropdown.component';
import { QualificationEntry } from '../qualification-entry/qualification-entry.component';

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    QualificationEntry,
    CustomQualificationsDropdownComponent
  ],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent implements OnInit {
  qualifications: Qualification[] = [];

  constructor(private service: EmployeeService) {}

  async ngOnInit() {
    await this.service.setBearer();
    await this.fetchData();
  }

  async fetchData() {
    this.qualifications = await this.service.getAllQualifications();
  }
}

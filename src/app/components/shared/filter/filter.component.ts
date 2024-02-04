import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../../services/employee.service';
import { Qualification } from '../../../entitys/Qualification';
import { BackgroundBlurComponent } from '../background-blur/background-blur.component';
import { FormsModule } from '@angular/forms';
import { CustomQualificationsDropdownComponent } from '../custom-qualifications-dropdown/custom-qualifications-dropdown.component';
import { QualificationBubbleComponent } from '../qualification-bubble/qualification-bubble.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    BackgroundBlurComponent,
    QualificationBubbleComponent,
    CustomQualificationsDropdownComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  @Input() active: boolean = false;
  @Input() filterState: {name: string, qualifications: string[]} = {name: '', qualifications: []};
  @Output() filter: EventEmitter<{name: string, qualifications: string[]}> = new EventEmitter();
  @Output() closeFilter: EventEmitter<boolean> = new EventEmitter();

  qualifications: Qualification[] = [];

  constructor(private service: EmployeeService) {
  }

  async ngOnInit(): Promise<void> {
      await this.service.setBearer();
      await this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.qualifications = await this.service.getAllQualifications();
  }

  async createNewQualificationByName(qualification: string): Promise<void> {
    await this.service.createQualificationByName(qualification);
    await this.fetchData();
  }

  addQualification(originalQualification: Qualification): void {
    const foundQualifications: Qualification[] = this.qualifications.filter((qualification: Qualification) => {
      if(qualification.skill == originalQualification.skill) {
        return true;
      }
      return false;
    });

    if(originalQualification.skill && foundQualifications.length > 0 && !this.filterState.qualifications.includes(originalQualification.skill)) {
      this.filterState.qualifications.push(originalQualification.skill);
    }
  }

  removeQualification(qualificationName: string): void {
    if(this.filterState.qualifications.includes(qualificationName)) {
      const index = this.filterState.qualifications.indexOf(qualificationName);
      this.filterState.qualifications.splice(index, 1);
    }
  }

  clearNameFilterState(): void {
    this.filterState.name = "";
  }

  submitFilter(): void {
    this.filter.emit(this.filterState);
    this.close();
  }

  close(): void {
    this.closeFilter.emit(true);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../../services/employee.service';
import { Observable } from 'rxjs';
import { Qualification } from '../../../entitys/Qualification';
import { BackgroundBlurComponent } from '../background-blur/background-blur.component';
import { FormsModule } from '@angular/forms';
import { SkillBubbleComponent } from '../skill-bubble/skill-bubble.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    BackgroundBlurComponent,
    SkillBubbleComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  @Input() active: boolean = false;
  @Input() filterState: {name: string, skills: string[]} = {name: '', skills: []};
  @Output() filter: EventEmitter<{name: string, skills: string[]}> = new EventEmitter();
  @Output() closeFilter: EventEmitter<boolean> = new EventEmitter();

  qualifications?: Observable<Qualification[]>;

  constructor(private service: EmployeeService) {
  }

  async ngOnInit(): Promise<void> {
      await this.service.setBearer();
      this.fetchData();
  }

  fetchData(): void {
    this.qualifications = this.service.getAllQualifications();
  }

  addSkill(skill: string): void {
    if(!this.filterState.skills.includes(skill)) {
      this.filterState.skills.push(skill);
    }
  }

  removeSkill(skill: string): void {
    if(this.filterState.skills.includes(skill)) {
      const index = this.filterState.skills.indexOf(skill);
      this.filterState.skills.splice(index, 1);
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

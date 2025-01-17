import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CustomQualificationsDropdownOptionComponent } from '../custom-qualifications-dropdown-option/custom-qualifications-dropdown-option.component';
import { Qualification } from '../../../entitys/Qualification';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-custom-qualifications-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    CustomQualificationsDropdownOptionComponent,
  ],
  templateUrl: './custom-qualifications-dropdown.component.html',
  styleUrl: './custom-qualifications-dropdown.component.css',
})
export class CustomQualificationsDropdownComponent
  implements OnInit, OnChanges
{
  @Input() public qualificationSet?: null | Qualification[] = [];
  @Output() public picked: EventEmitter<Qualification> =
    new EventEmitter<Qualification>();
  @Output() public create: EventEmitter<string> = new EventEmitter<string>();
  public filteredQualifications: Qualification[] = [];
  public showCount: number = 3;
  public query: string = '';

  constructor(private service: EmployeeService) {}

  async ngOnInit(): Promise<void> {
    await this.service.setBearer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.search({});
  }

  search($event: any): void {
    if (this.qualificationSet) {
      let index = -1;
      this.filteredQualifications = this.qualificationSet.filter(
        (qualification: Qualification) => {
          if (
            qualification.skill
              ?.toLowerCase()
              .startsWith(this.query.toLowerCase()) &&
            this.query != '' &&
            index < this.showCount
          ) {
            index += 1;
            return true;
          }
          return false;
        },
      );
    }
  }

  createQualification(): void {
    this.create.emit(this.query);
  }

  selectQualification(qualification: Qualification): void {
    this.picked.emit(qualification);
    this.query = '';
    this.search({});
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qualification } from '../../../entitys/Qualification';

@Component({
  selector: 'app-custom-qualifications-dropdown-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-qualifications-dropdown-option.component.html',
  styleUrl: './custom-qualifications-dropdown-option.component.css'
})
export class CustomQualificationsDropdownOptionComponent {
  @Input() public qualification?: Qualification = new Qualification(-1, "Qualifikation hinzufügen");
  @Output() public select: EventEmitter<Qualification> = new EventEmitter<Qualification>();

  public selectQualification(): void {
    this.select.emit(this.qualification);
  }
}

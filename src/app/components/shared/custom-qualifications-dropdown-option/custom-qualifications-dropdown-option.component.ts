import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-qualifications-dropdown-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-qualifications-dropdown-option.component.html',
  styleUrl: './custom-qualifications-dropdown-option.component.css'
})
export class CustomQualificationsDropdownOptionComponent {
  @Input() public qualificationName?: string = "";
  @Output() public select: EventEmitter<string> = new EventEmitter<string>();

  public selectQualification(): void {
    this.select.emit(this.qualificationName);
  }
}

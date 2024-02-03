import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-skills-dropdown-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-skills-dropdown-option.component.html',
  styleUrl: './custom-skills-dropdown-option.component.css'
})
export class CustomSkillsDropdownOptionComponent {
  @Input() public skillName?: string = "";
  @Output() public select: EventEmitter<string> = new EventEmitter<string>();

  public selectSkill(): void {
    this.select.emit(this.skillName);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-skill-bubble',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './skill-bubble.component.html',
  styleUrl: './skill-bubble.component.css'
})
export class SkillBubbleComponent {
  @Input() skill: string = "";
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();

  public removeBubble(): void {
    this.remove.emit(this.skill);
  }
}

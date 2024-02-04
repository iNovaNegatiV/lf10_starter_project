import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-qualification-bubble',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './qualification-bubble.component.html',
  styleUrl: './qualification-bubble.component.css'
})
export class QualificationBubbleComponent {
  @Input() qualificationName: string = "";
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();

  public removeBubble(): void {
    this.remove.emit(this.qualificationName);
  }
}

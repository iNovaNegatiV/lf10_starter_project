import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-background-blur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './background-blur.component.html',
  styleUrl: './background-blur.component.css',
})
export class BackgroundBlurComponent {
  @Input() active: boolean = false;
  @Input() layer: number = 0;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  closeBlur(): void {
    this.close.emit(true);
  }
}

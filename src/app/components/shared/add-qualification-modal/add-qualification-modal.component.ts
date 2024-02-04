import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-qualification-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './add-qualification-modal.component.html',
  styleUrl: './add-qualification-modal.component.css'
})
export class AddQualificationModalComponent {
  @Input() public open: boolean = false;
  @Input() public suggestion: string = "";
  @Output() public added: EventEmitter<string> = new EventEmitter<string>();
  @Output() public canceled: EventEmitter<boolean> = new EventEmitter<boolean>();


  public addQualification(): void {
    this.added.emit(this.suggestion);
  }

  public cancelModalProgress(): void {
    this.canceled.emit(true);
  }
}

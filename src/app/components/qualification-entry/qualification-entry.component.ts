import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Qualification } from '../../entitys/Qualification';

@Component({
  selector: 'app-qualification-entry',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './qualification-entry.component.html',
  styleUrl: './qualification-entry.component.css',
})
export class QualificationEntry {
  @Input() qualification?: Qualification;
  @Output() delete: EventEmitter<Qualification> =
    new EventEmitter<Qualification>();
  @Output() edit: EventEmitter<Qualification> =
    new EventEmitter<Qualification>();

  public deleteQualification(): void {
    if (window.confirm('Mitarbeiter wirklich löschen?')) {
      this.delete.emit(this.qualification);
    }
  }

  public startEditing(): void {
    this.edit.emit(this.qualification);
  }
}

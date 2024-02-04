import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Qualification } from '../../entitys/Qualification';

@Component({
  selector: 'app-qualification-entry',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './qualification-entry.component.html',
  styleUrl: './qualification-entry.component.css'
})
export class QualificationEntry {
  @Input() qualification?: Qualification;
}

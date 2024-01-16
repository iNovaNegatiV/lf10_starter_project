import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-text-media',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './text-media.component.html',
  styleUrl: './text-media.component.css'
})
export class TextMediaComponent {
  @Input() headline?: string;
  @Input() text?: string;
  @Input() routeLabel?: string;
  @Input() routeLink?: string;
  @Input() image?: string;
  @Input() reverse: boolean = false;
}

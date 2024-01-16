import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextMediaComponent } from '../shared/text-media/text-media.component';

@Component({
  selector: 'app-entry-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TextMediaComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
}

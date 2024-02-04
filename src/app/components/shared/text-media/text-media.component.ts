import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'text-media-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './text-media.component.html',
  styleUrl: './text-media.component.css',
})
export class TextMediaComponent {
  @Input() headline?: string;
  @Input() text?: string;
  @Input() routeLabel?: string;
  @Input() routeLink?: string;
  @Input() image?: string;
  @Input() reverse: boolean = false;

  public mobile: boolean = false;

  constructor() {
    this.mobile = this.isMobile();
  }

  // Detect window change
  @HostListener('window:resize', ['$evemt'])
  onResize(event: any) {
    this.mobile = this.isMobile();
  }

  private isMobile(): boolean {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return true;
    }
    return false;
  }
}

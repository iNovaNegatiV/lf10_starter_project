import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { BackgroundBlurComponent } from '../background-blur/background-blur.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, BackgroundBlurComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements AfterViewInit {
  private bigMenuElement?: HTMLDivElement;
  private currentRoute?: string;
  public isBlurry: boolean = false;

  constructor(
    private router: Router,
    private keycloak: KeycloakService,
  ) {}

  ngAfterViewInit(): void {
    // Get HTMLElement
    const menu: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.big-menu')
    );
    this.bigMenuElement = menu;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        this.setCurrentRoute();
      }
    });
  }

  openMenu(): void {
    this.bigMenuElement?.classList.add('open');
    this.isBlurry = true;
  }

  closeMenu(): void {
    this.bigMenuElement?.classList.remove('open');
    this.isBlurry = false;
  }

  setCurrentRoute(): void {
    const liElements = document.querySelectorAll('li');
    liElements.forEach((li) => {
      const route = li.getAttribute('route');
      if (route && route == this.currentRoute) {
        li.classList.add('route');
      } else {
        li.classList.remove('route');
      }
    });
  }

  navigateTo(nextRoute: string): void {
    this.router.navigate([nextRoute]);
    this.closeMenu();
  }

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  login(): void {
    this.router.navigate(['/employees']);
  }

  async logout(): Promise<void> {
    await this.keycloak.logout('http://localhost:4200/');
  }
}

import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements AfterViewInit {

  private bigMenuElement?: HTMLDivElement;
  private backgroundBlurElement?: HTMLDivElement;
  private currentRoute?: string;

  constructor(
    private router: Router,
    private keycloak: KeycloakService
  ) {}

  ngAfterViewInit(): void {
    // Get HTMLElement
    const menu: HTMLDivElement = (<HTMLDivElement> document.querySelector('.big-menu'));
    const background: HTMLDivElement = (<HTMLDivElement> document.querySelector('.bg-blur'));
    this.bigMenuElement = menu;
    this.backgroundBlurElement = background;

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        this.setCurrentRoute();
      }
    });
  }

  openMenu(): void {
    this.bigMenuElement?.classList.add('open');
    this.backgroundBlurElement?.classList.add('blur-active');
  }

  closeMenu(): void {
    this.bigMenuElement?.classList.remove('open');
    this.backgroundBlurElement?.classList.remove('blur-active');
  }

  setCurrentRoute(): void {
    const liElements = document.querySelectorAll('li');
    liElements.forEach((li) => {
      const route = li.getAttribute('route');
      if(route && route == this.currentRoute) {
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

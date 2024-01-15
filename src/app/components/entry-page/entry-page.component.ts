import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-entry-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entry-page.component.html',
  styleUrl: './entry-page.component.css'
})
export class EntryPageComponent {
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-entry-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entry-page.component.html',
  styleUrl: './entry-page.component.css'
})
export class EntryPageComponent implements OnInit {

  constructor(private service: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.service.hasActiveBearer()) {
      this.router.navigate(["/list"]);
    }
  }

  async login(): Promise<void> {
    await this.service.setBearer();
    this.router.navigate(["/list"]);
  }

}

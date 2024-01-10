import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDEyNTM2ODAsImlhdCI6MTcwMTI1MDA4MCwianRpIjoiNTRlYzUxMDYtNmE4Ni00ZmM2LWI0OTUtN2ZiZTU3NTU4ZDRjIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5NTQyOWEwMi01M2QyLTRlYTktODZlOS01OGZlOWM5OTQyYTciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInByb2R1Y3Rfb3duZXIiLCJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtc3p1dCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyIn0.QrahvkBMIgBPO86-AVTZYUkMwr-_ObkaHLDmNFH7GhmNcuoQ2ND47TM80W-NdSQ4W6F1Afvi6ctECreu5P2mX8yOLW45P1L9T_AGS54uDrqA1PUH3lyklcGj_r0z_3qAWaDxTIYjcuBugiw8Ha-F69Mx2X1EC5GsqGxcCZKCptfJhOQbnppYkyf137f4S9IiWaCkrZXCDSuvb3lhgnAYlZr9rGjw7RRs0H2ZFBBQWGYKq1w5QmzfYUEKLblnUCmkddTkxA5Oi7lqQe9SBpKc6nN_MiaWvF9j2a2nH-GSLUenh9mzIQV2MVohAnQwBma7AEWe7vJRvdtctO4O5H9NZQ';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}

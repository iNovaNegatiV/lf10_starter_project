import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from '../entitys/Employee';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  authenticationUrl: string = 'http://authproxy.szut.dev';
  baseUrl: string = 'http://localhost:8089/';
  bearer?: string;
  private selectedEmployeeSubject = new BehaviorSubject<Employee | null>(null);
  selectedEmployee$ = this.selectedEmployeeSubject.asObservable();

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService,
  ) {}

  public async setBearer(): Promise<void> {
    this.bearer = await this.keycloak.getToken();
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`),
    });
  }

  setElectEmployee(employee: Employee | null) {
    this.selectedEmployeeSubject.next(employee);
  }
}

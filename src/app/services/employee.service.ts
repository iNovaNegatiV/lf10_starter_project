import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, lastValueFrom } from 'rxjs';
import { Employee } from '../entitys/Employee';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  authenticationUrl: string = "http://authproxy.szut.dev";
  baseUrl: string = "http://localhost:8089/";
  bearer?: string;

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService
    ) {
  }

  public async setBearer(): Promise<void> {
    this.bearer = await this.keycloak.getToken();
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

}

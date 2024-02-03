import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, lastValueFrom } from 'rxjs';
import { Employee } from '../entitys/Employee';
import { KeycloakService } from 'keycloak-angular';
import { Qualification } from '../entitys/Qualification';

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

  public async getAllEmployees(): Promise<Employee[]> {
    return new Promise(resolve => {
      this.http.get<Employee[]>(this.baseUrl + 'employees', {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearer}`)
      }).subscribe((data: Employee[]) => {
        resolve(data);
      });
    });
  }

  public getAllQualifications(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(this.baseUrl + 'qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

}

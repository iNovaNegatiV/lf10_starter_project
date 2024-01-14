import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, lastValueFrom } from 'rxjs';
import { Employee } from '../entitys/Employee';
import { Bearer } from '../entitys/Bearer';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  authenticationUrl: string = "http://authproxy.szut.dev";
  baseUrl: string = "http://localhost:8089/";
  bearer?: Bearer;

  constructor(private http: HttpClient) {
  }

  public async setBearer(): Promise<void> {

    // Check if bearer exists
    if(this.hasActiveBearer()) {
      return;
    }

    let body: URLSearchParams = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'employee-management-service');
    body.set('username', 'user');
    body.set('password', 'test');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    await lastValueFrom(this.http.post<Bearer>(this.authenticationUrl, body.toString(), options)).then((result: Bearer) => {
      result.timestamp = new Date();
      this.bearer = result;
      localStorage.setItem('bearer', JSON.stringify(this.bearer));
    });
  }

  public hasActiveBearer(): boolean {

    const localBearer = localStorage.getItem('bearer');

    // Checks for localStoorage bearer
    if(localBearer) {
      let myBearer: Bearer = JSON.parse(localBearer);
      // Check Bearer
      if(myBearer.timestamp) {
        const currentDate = new Date();
        const previousDate = new Date(myBearer.timestamp);
        const dif = (currentDate.getTime() - previousDate.getTime()) / 1000;
        if(Math.ceil(dif) < Number(myBearer.expires_in)) {
          this.bearer = myBearer;
          console.log("Keep localStorage bearer!");
          return true;
        }
      }
    }
    return false;
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer?.access_token}`)
    });
  }

}

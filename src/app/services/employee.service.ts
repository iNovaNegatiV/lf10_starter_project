import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from '../entitys/Employee';
import { KeycloakService } from 'keycloak-angular';
import { Qualification } from '../entitys/Qualification';
import { PostEmployee } from '../entitys/PostEmployee';

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

  public getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`);
  }

  public async createQualificationByName(
    qualificationName: string,
  ): Promise<{ skill: string }> {
    return new Promise((resolve) => {
      this.http
        .post<{ skill: string }>(
          this.baseUrl + 'qualifications',
          {
            skill: qualificationName,
          },
          {
            headers: this.getHeaders(),
          },
        )
        .subscribe((data: { skill: string }) => {
          resolve(data);
        });
    });
  }

  public async getAllEmployees(): Promise<Employee[]> {
    return new Promise((resolve) => {
      this.http
        .get<Employee[]>(this.baseUrl + 'employees', {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.bearer}`),
        })
        .subscribe((data: Employee[]) => {
          resolve(data);
        });
    });
  }

  public async getAllQualifications(): Promise<Qualification[]> {
    return new Promise((resolve) => {
      this.http
        .get<Qualification[]>(this.baseUrl + 'qualifications', {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.bearer}`),
        })
        .subscribe((data: Qualification[]) => {
          resolve(data);
        });
    });
  }

  public getEmployeeQualifications(id: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'employees/' + id + '/qualifications',
      {
        headers: this.getHeaders(),
      },
    );
  }

  public setSelectEmployee(employee: Employee | null) {
    this.selectedEmployeeSubject.next(employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      this.baseUrl + 'employees/' + employee.id,
      {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        street: employee.street,
        postcode: employee.postcode,
        city: employee.city,
        phone: employee.phone,
        skillSet: this.getSkillIds(employee.skillSet ?? []),
      },
      {
        headers: this.getHeaders(),
      },
    );
  }

  public async updateQualification(qualification: Qualification): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .put<any>(
          this.baseUrl + `qualifications/${qualification.id}`,
          {
            skill: qualification.skill,
          },
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${this.bearer}`),
          },
        )
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }

  public async deleteEmployeeById(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .delete<any>(this.baseUrl + `employees/${id}`, {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.bearer}`),
        })
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }

  public async deleteQualificationById(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .delete<any>(this.baseUrl + `qualifications/${id}`, {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.bearer}`),
        })
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }

  deleteEmployeeQualification(skill: string): Observable<any> {
    return this.http.delete<any>(
      this.baseUrl +
        'employees/' +
        this.selectedEmployeeSubject.value?.id +
        '/qualifications/',
      {
        headers: this.getHeaders(),
        body: {
          skill: skill,
        },
      },
    );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'employees/' + id, {
      headers: this.getHeaders(),
    });
  }

  getSkillIds(skillSet: { id?: number; skill?: string }[]): number[] {
    return skillSet.map((skill: { id?: number; skill?: string }) => {
      if (skill.id) {
        return skill.id;
      }
      return -1;
    });
  }

  public createEmployee(employee: PostEmployee): Observable<Employee> {
    return this.http.post<Employee>(
      this.baseUrl + 'employees',
      {
        firstName: employee.firstName,
        lastName: employee.lastName,
        street: employee.street,
        postcode: employee.postcode,
        city: employee.city,
        phone: employee.phone,
        skillSet: employee.skillSet,
      },
      {
        headers: this.getHeaders(),
      },
    );
  }
}

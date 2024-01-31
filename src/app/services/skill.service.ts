import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import {Skill} from "../entitys/Skill";

@Injectable({
  providedIn: 'root',
})
export class SkillService {

  authenticationUrl: string = "http://authproxy.szut.dev";
  baseUrl: string = "http://localhost:8089/";
  bearer?: string;
  private selectedSkillSubject=new BehaviorSubject<Skill|null>(null);
  selectedSkill$=this.selectedSkillSubject.asObservable();

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService
    ) {
  }

  public async setBearer(): Promise<void> {
    this.bearer = await this.keycloak.getToken();
  }

  public getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.baseUrl + 'qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`);
  }

  updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(
      this.baseUrl + 'qualifications/' + skill.id,
      {
        skill: skill.skill,
      },
      {
        headers: this.getHeaders(),
      },
    );
  }

  setSelectedSkill(skill:Skill|null){
    this.selectedSkillSubject.next(skill);
  }

}

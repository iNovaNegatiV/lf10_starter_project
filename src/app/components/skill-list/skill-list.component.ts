import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable, of} from "rxjs";
import {MatIconModule} from '@angular/material/icon';
import {Skill} from "../../entitys/Skill";
import {SkillService} from "../../services/skill.service";
import {SkillEntry} from "../skill-entry/skill-entry.component";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SkillEntry,
    RouterLink
  ],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.css'
})
export class SkillListComponent implements OnInit {
  skills$: Observable<Skill[]>;

  constructor(private service: SkillService,
              private router: Router) {

    this.skills$ = of([]);
  }

  async ngOnInit() {
    await this.service.setBearer();
    this.fetchData();
  }

  fetchData() {
    this.skills$ = this.service.getAllSkills();
  }

  goToDetails(skill: Skill) {
    this.service.setSelectedSkill(skill);
    this.router.navigate(['/skills', skill.id]);
  }
}

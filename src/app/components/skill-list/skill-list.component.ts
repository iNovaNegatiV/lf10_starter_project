import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
import { MatIconModule } from '@angular/material/icon';
import {Skill} from "../../entitys/Skill";
import {SkillService} from "../../services/skill.service";
import {SkillEntry} from "../skill-entry/skill-entry.component";
import {RouterLink} from "@angular/router";
import { CustomSkillsDropdownComponent } from '../shared/custom-skills-dropdown/custom-skills-dropdown.component';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SkillEntry,
    RouterLink,
    CustomSkillsDropdownComponent
  ],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.css'
})
export class SkillListComponent implements OnInit {
  skills$: Observable<Skill[]>;

  constructor(private service: SkillService) {
    this.skills$ = of([]);
  }

  async ngOnInit() {
    await this.service.setBearer();
    this.fetchData();
  }

  fetchData() {
    this.skills$ = this.service.getAllSkills();
  }
}

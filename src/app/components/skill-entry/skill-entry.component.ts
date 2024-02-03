import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {Skill} from "../../entitys/Skill";

@Component({
  selector: 'app-skill-entry',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './skill-entry.component.html',
  styleUrl: './skill-entry.component.css'
})
export class SkillEntry {
  @Input() skill?: Skill;
}

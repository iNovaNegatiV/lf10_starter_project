import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../entitys/Skill';
import { FormsModule } from '@angular/forms';
import { CustomSkillsDropdownOptionComponent } from '../custom-skills-dropdown-option/custom-skills-dropdown-option.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-skills-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    CustomSkillsDropdownOptionComponent
  ],
  templateUrl: './custom-skills-dropdown.component.html',
  styleUrl: './custom-skills-dropdown.component.css'
})
export class CustomSkillsDropdownComponent {
  @Input() public skillSet?: null | Skill[] = [
    new Skill(0, "Java"),
    new Skill(1, "Springboot")
  ];
  public filteredSkills: Skill[] = [];
  public showCount: number = 3;
  public query: string = "";

  search($event: any): void {
    if(this.skillSet) {
      let index = -1;
      this.filteredSkills = this.skillSet.filter((skill: Skill) => {
        index += 1;
        if(skill.skill?.toLowerCase().includes(this.query.toLowerCase()) && this.query != '' && index < this.showCount) {
          return true;
        }
        return false;
      });
    }
  }

  createSkill(): void {
    console.log("Creating new skill by query: ", this.query);
  }

  selectSkill($event: any): void {
    console.log("Selected Skill:: ", $event);
  }

}

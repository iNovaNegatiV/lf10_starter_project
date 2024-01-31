import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Skill } from "../../entitys/Skill";
import { SkillService } from "../../services/skill.service";

@Component({
  selector: 'app-skill-details',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './skill-details.component.html',
  styleUrl: './skill-details.component.css',
})
export class SkillDetailsComponent {
  destroy$ = new Subject();
  selectedSkill: Skill = new Skill();
  editing = false;

  constructor(
    private skillService: SkillService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.skillService.selectedSkill$
      .pipe(takeUntil(this.destroy$))
      .subscribe((skill) => {
        if (skill == null) {
          return;
        }

        this.selectedSkill = skill;

      })
  }

  ngOnDestroy() {
    this.skillService.setSelectedSkill(null);
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  navigateBack() {
    this.router.navigate(['/skills']);
  }

  toggleEdit() {
    if (this.editing) {
      this.skillService
        .updateSkill(this.selectedSkill)
        .subscribe((skill) => {
          this.selectedSkill = skill;
        });
    }
    this.editing = !this.editing;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink} from "@angular/router";
import { Qualification } from '../../entitys/Qualification';
import { EmployeeService } from '../../services/employee.service';
import { CustomQualificationsDropdownComponent } from '../shared/custom-qualifications-dropdown/custom-qualifications-dropdown.component';
import { QualificationEntry } from '../qualification-entry/qualification-entry.component';
import { AddQualificationModalComponent } from '../shared/add-qualification-modal/add-qualification-modal.component';
import { BackgroundBlurComponent } from '../shared/background-blur/background-blur.component';

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    QualificationEntry,
    AddQualificationModalComponent,
    CustomQualificationsDropdownComponent,
    BackgroundBlurComponent
  ],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent implements OnInit {

  public addQualificationModalActive: boolean = false;
  public qualificationToAdd: string = "";
  public qualifications: Qualification[] = [];

  constructor(private service: EmployeeService) {}

  async ngOnInit() {
    await this.service.setBearer();
    await this.fetchData();
  }

  async fetchData() {
    this.qualifications = await this.service.getAllQualifications();
  }

  public openAddQualificationModal(): void {
    this.addQualificationModalActive = true;
  }

  public closeAddQualificationModal(): void {
    this.addQualificationModalActive = false;
  }

  public setQualificationToAdd(qualification: string): void {
    this.qualificationToAdd = qualification;
  }

  public async addQualification(qualificationName: string): Promise<void> {
    if(qualificationName != '' && qualificationName.trim().length > 0) {
      if(this.qualifications.filter((qualification: Qualification) => qualification.skill == qualificationName).length > 0) {
        alert("Diese Qualifikation existiert bereits!");
      } else {
        await this.service.createQualificationByName(qualificationName);
        await this.fetchData();
        this.closeAddQualificationModal();
      }
    } else {
      alert("Bitte geben Sie eine Qualifikation mit mehr als 0 Zeichen ein!");
    }
  }

  public async deleteQualification(qualification: Qualification): Promise<void> {
    if(qualification.id) {
      await this.service.deleteQualificationById(qualification.id);
      await this.fetchData();
    } else {
      alert("Qualifikation hat keine eigene Id?!");
    }
  }
}

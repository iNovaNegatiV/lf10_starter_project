import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qualification } from '../../../entitys/Qualification';
import { EmployeeService } from '../../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-qualification-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './edit-qualification-modal.component.html',
  styleUrl: './edit-qualification-modal.component.css',
})
export class EditQualificationModalComponent {
  @Input() public qualification: Qualification = new Qualification(
    -1,
    'Not Found!',
  );
  @Input() public open: boolean = false;
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: EmployeeService) {}

  async ngOnInit(): Promise<void> {
    await this.service.setBearer();
  }

  public async updateQualification(): Promise<void> {
    await this.service.updateQualification(this.qualification);
    this.closeModal();
  }

  public closeModal(): void {
    this.close.emit(true);
  }
}

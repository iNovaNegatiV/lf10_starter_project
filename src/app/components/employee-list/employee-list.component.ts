import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
import { Employee } from "../../entitys/Employee";
import { MatIconModule } from '@angular/material/icon';
import { EmployeeEntry } from '../employee-entry/employee-entry.component';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { YesNoPromptComponent } from '../shared/yes-no-prompt/yes-no-prompt.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    EmployeeEntry
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
@Inject('YesNoPromptComponent')
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private service: EmployeeService, public dialog: MatDialog) {
    this.employees$ = of([]);
  }

  async ngOnInit() {
    await this.service.setBearer();
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.service.getAllEmployees();
  }

  openDialog(): void { // Create a method that opens the dialog
    const dialogRef = this.dialog.open(YesNoPromptComponent, {
      data: { question: 'Do you want to delete this employee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

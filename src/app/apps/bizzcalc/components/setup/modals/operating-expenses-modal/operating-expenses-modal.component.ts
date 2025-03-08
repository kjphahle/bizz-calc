import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IHoliday } from 'src/app/apps/bizzcalc/models/days-worked.interface';
import { Expense2 } from 'src/app/apps/bizzcalc/models/Expense';


@Component({
  selector: 'app-operating-expenses-modal',
  templateUrl: './operating-expenses-modal.component.html',
  styleUrls: ['./operating-expenses-modal.component.scss'],
})
export class OperatingExpensesModalComponent implements OnInit{
  @Input() expenses: Expense2[];
  public viewDaysWorked = false;


  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {

  }

  public onEditHoliday(expense: Expense2): void {
    this.activeModal.dismiss({
      mode: 1,
      data: expense
    });
  }

  public onDaysWorkedClicked(): void {
    this.viewDaysWorked = true;
  }

  public onHolidaysClicked(): void {
    this.viewDaysWorked = !this.viewDaysWorked;
  }

  public onRemoveHoliday(expense: Expense2): void {
    this.activeModal.dismiss({
      mode: 0,
      data: expense
    });
  }
}

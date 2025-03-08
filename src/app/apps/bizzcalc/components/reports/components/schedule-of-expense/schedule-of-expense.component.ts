import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-schedule-of-expense',
    templateUrl: './schedule-of-expense.component.html',
    styleUrls: ['./schedule-of-expense.component.scss'],
    standalone: false
})
export class ScheduleOfExpenseComponent {
  @Input() scheduleOfExpenses: {
    item: string;
    value: number;
  }[];

  constructor(public activeModal: NgbActiveModal) {}
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IHoliday } from 'src/app/apps/bizzcalc/models/days-worked.interface';

export interface IDaysWorked {
	holiday: string;
	monthDays: number;
	notWorked: number;
	netDays: number;
}

@Component({
    selector: 'app-holidays-modal',
    templateUrl: './holidays-modal.component.html',
    styleUrls: ['./holidays-modal.component.scss'],
    standalone: false
})
export class HolidaysModalComponent implements OnInit{
  @Input() holidays: IHoliday[];
  public viewDaysWorked = false;
  public daysWorked: IDaysWorked[] = [];

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    this.daysWorked = [
      {
        holiday: "month 1",
	      monthDays: 28,
	      notWorked: 28,
	      netDays: 28
      },
      {
        holiday: "month 2",
	      monthDays: 28,
	      notWorked: 28,
	      netDays: 28
      },
      {
        holiday: "month 3",
	      monthDays: 28,
	      notWorked: 28,
	      netDays: 28
      },
      {
        holiday: "month 4",
	      monthDays: 28,
	      notWorked: 28,
	      netDays: 28
      }

    ]
  }

  public onEditHoliday(holiday: IHoliday): void {
    this.activeModal.dismiss({
      mode: 1,
      data: holiday
    });
  }

  public onDaysWorkedClicked(): void {
    this.viewDaysWorked = true;
  }

  public onHolidaysClicked(): void {
    this.viewDaysWorked = !this.viewDaysWorked;
  }

  public onRemoveHoliday(holiday: IHoliday): void {
    this.activeModal.dismiss({
      mode: 0,
      data: holiday
    });
  }
}

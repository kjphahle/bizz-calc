import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IHoliday } from 'src/app/apps/bizzcalc/models/days-worked.interface';


@Component({
    selector: 'app-operating-expenses-modal',
    templateUrl: './operating-expenses-modal.component.html',
    styleUrls: ['./operating-expenses-modal.component.scss'],
    standalone: false
})
export class OperatingExpensesModalComponent implements OnInit{
  @Input() holidays: IHoliday[];
  public viewDaysWorked = false;


  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {

  }

  public onEditHoliday(employment: IHoliday): void {
    this.activeModal.dismiss({
      mode: 1,
      data: employment
    });
  }

  public onDaysWorkedClicked(): void {
    this.viewDaysWorked = true;
  }

  public onHolidaysClicked(): void {
    this.viewDaysWorked = !this.viewDaysWorked;
  }

  public onRemoveHoliday(employment: IHoliday): void {
    this.activeModal.dismiss({
      mode: 0,
      data: employment
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { accountDetails } from 'src/app/apps/bizzcalc/models/accountDetails';
import { IHoliday } from 'src/app/apps/bizzcalc/models/days-worked.interface';
import { Employee } from 'src/app/apps/bizzcalc/models/Employee';


@Component({
    selector: 'app-funding-calculator-modal',
    templateUrl: './funding-calculator-modal.component.html',
    styleUrls: ['./funding-calculator-modal.component.scss'],
    standalone: false
})
export class FundingCalculatorModalComponent implements OnInit{
  @Input() accountDetails: accountDetails[];
  public viewDaysWorked = false;


  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {

  }

  public onEditHoliday(employment: any): void {
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

  public onRemoveHoliday(employment: Employee): void {
    this.activeModal.dismiss({
      mode: 0,
      data: employment
    });
  }
}

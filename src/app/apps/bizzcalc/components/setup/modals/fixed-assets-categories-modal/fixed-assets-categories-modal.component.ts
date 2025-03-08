import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDepreciationRate } from 'src/app/apps/bizzcalc/models/depreciation-rate.interface';

export interface IDaysWorked {
	holiday: string;
	monthDays: number;
	notWorked: number;
	netDays: number;
}

@Component({
  selector: 'app-fixed-assets-categories-modal',
  templateUrl: './fixed-assets-categories-modal.component.html',
  styleUrls: ['./fixed-assets-categories-modal.component.scss'],
})
export class FixedAssetsCategoriesModalComponent implements OnInit{
  @Input() depreciationRates: IDepreciationRate[];
  public viewDepreciationRates = false;

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {

  }

  public onEditHoliday(depreciationRate: IDepreciationRate): void {
    this.activeModal.dismiss({
      mode: 1,
      data: depreciationRate
    });
  }

  public onDaysWorkedClicked(): void {
    this.viewDepreciationRates = true;
  }

  public onHolidaysClicked(): void {
    this.viewDepreciationRates = !this.viewDepreciationRates;
  }

  public onRemoveHoliday(depreciationRate: IDepreciationRate): void {
    this.activeModal.dismiss({
      mode: 0,
      data: depreciationRate
    });
  }
}

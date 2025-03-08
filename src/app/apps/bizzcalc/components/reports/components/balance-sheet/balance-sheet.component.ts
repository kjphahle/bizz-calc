import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss'],
})
export class BalanceSheetComponent {
  @Input() balanceSheet: {
    item: string;
    value: number;
  }[];
  @Input() financedBy: {
    item: string;
    value: number;
  }[];

  constructor(public activeModal: NgbActiveModal) {}
}

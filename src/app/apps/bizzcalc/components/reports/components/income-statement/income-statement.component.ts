import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BizzCalcService } from 'src/app/apps/bizzcalc/services/bizz-calc.service';

@Component({
    selector: 'app-income-statement',
    templateUrl: './income-statement.component.html',
    styleUrls: ['./income-statement.component.scss'],
    standalone: false
})
export class IncomeStatementComponent implements OnInit {
  @Input() incomeStatement: {
    item: string;
    value: number;
  }[];

  @Input() reportId: number;

  constructor(
    public activeModal: NgbActiveModal,
    private bizzCalcService: BizzCalcService
  ) {}
  ngOnInit(): void {
    this.getIncomeStatementReport();
  }

  public reportData = "";
  private getIncomeStatementReport(): void {
    // const reportId = 9;
    this.bizzCalcService.getBizzCalcReport(this.reportId).subscribe({
      next: (report) => {
        console.log('What aret the rports ************');
        this.reportData = report.Data[0].htmlcode;
      },
      error: (err) => {
        console.log('This is the error section ************');
        console.dir(err);
      },
    });
  }
}

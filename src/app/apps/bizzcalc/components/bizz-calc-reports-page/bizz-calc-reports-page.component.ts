import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BalanceSheetComponent } from '../reports/components/balance-sheet/balance-sheet.component';
import { ScheduleOfExpenseComponent } from '../reports/components/schedule-of-expense/schedule-of-expense.component';
import { IncomeStatementComponent } from '../reports/components/income-statement/income-statement.component';
import { ResultsChartComponent } from '../reports/components/results-chart/results-chart.component';
import { BizzCalcService } from '../../services/bizz-calc.service';

@Component({
  selector: 'app-bizz-calc-reports-page',
  templateUrl: './bizz-calc-reports-page.component.html',
  styleUrls: ['./bizz-calc-reports-page.component.scss'],
})
export class BizzCalcReportsPageComponent {
  modalRef: NgbModalRef;
  public reports: [{
      ID: number,
      ReportName: string
  }]

  constructor(private modalService: NgbModal, private bizzCalcService: BizzCalcService) {
    this.bizzCalcService.getReports().subscribe({next: data => {
      this.reports = data.children;
    },
  error: err => {
    console.log("What **************** -----", err);
  }})
  }

  public goToBalanceSheet(reportId: number): void {
    this.openBalanceSheetModal(reportId);
  }

  public goToScheduleOfExpenses(): void {
    this.openScheduleOfExpensesModal();
  }

  public goResultsChart(): void {
    this.openResultsChartModal();
  }

  public goToIncomeStatement(): void {
    this.openIncomeStatementModal();
  }

  private openBalanceSheetModal(reportId: number): void {
    this.modalRef = this.modalService.open(IncomeStatementComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });
    this.modalRef.componentInstance.reportId = reportId;
  }

  private openScheduleOfExpensesModal(): void {
    this.modalRef = this.modalService.open(ScheduleOfExpenseComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });
    const scheduleOfExpenses = [
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
      {
        item: 'expense',
        value: 2000000,
      },
    ];
    this.modalRef.componentInstance.scheduleOfExpenses = scheduleOfExpenses;
  }

  private openIncomeStatementModal(): void {
    this.modalRef = this.modalService.open(IncomeStatementComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });

    const incomeStatement = [
      {
        item: 'revenue',
        value: 2000000,
      },
      {
        item: 'cost of sales',
        value: 2000000,
      },
      {
        item: 'gross profit',
        value: 2000000,
      },
      {
        item: 'operating expenses',
        value: 2000000,
      },
      {
        item: 'net operating expenses',
        value: 2000000,
      },
    ];
    this.modalRef.componentInstance.incomeStatement = incomeStatement;
  }

  private openResultsChartModal(): void {
    this.modalRef = this.modalService.open(ResultsChartComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });
    // this.modalRef.componentInstance.balanceSheetData = balanceSheetData;
  }
}

import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BalanceSheetComponent } from './components/balance-sheet/balance-sheet.component';
import { ScheduleOfExpenseComponent } from './components/schedule-of-expense/schedule-of-expense.component';
import { ResultsChartComponent } from './components/results-chart/results-chart.component';
import { IncomeStatementComponent } from './components/income-statement/income-statement.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  public goToBalanceSheet(): void {
    this.openBalanceSheetModal();
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

  private openBalanceSheetModal(): void {
    this.modalRef = this.modalService.open(BalanceSheetComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });
    // this.modalRef.componentInstance.balanceSheetData = balanceSheetData;
    const balanceSheet = [
      {
        item: 'fixed assets',
        value: 2000000,
      },
      {
        item: 'inventory',
        value: 2000000,
      },
      {
        item: 'accounts receivable',
        value: 2000000,
      },
      {
        item: 'other assets',
        value: 2000000,
      },
      {
        item: 'current assets',
        value: 2000000,
      },
      {
        item: 'total assets',
        value: 2000000,
      },
      {
        item: 'accounts payable',
        value: 2000000,
      },
      {
        item: 'non interest bearing debt',
        value: 2000000,
      },
      {
        item: 'net operating assets',
        value: 2000000,
      },
    ];

    const financedBy = [
      {
        item: 'retained earnings',
        value: 2000000,
      },
      {
        item: 'bank account',
        value: 2000000,
      },
      {
        item: 'capital employed',
        value: 2000000,
      },
    ];
    this.modalRef.componentInstance.balanceSheet = balanceSheet;
    this.modalRef.componentInstance.financedBy = financedBy;
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

  private openIncomeStatementModal(reportId?: number): void {
    this.modalRef = this.modalService.open(IncomeStatementComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });

    // const incomeStatement = [
    //   {
    //     item: 'revenue',
    //     value: 2000000,
    //   },
    //   {
    //     item: 'cost of sales',
    //     value: 2000000,
    //   },
    //   {
    //     item: 'gross profit',
    //     value: 2000000,
    //   },
    //   {
    //     item: 'operating expenses',
    //     value: 2000000,
    //   },
    //   {
    //     item: 'net operating expenses',
    //     value: 2000000,
    //   },
    // ];
    // this.modalRef.componentInstance.incomeStatement = incomeStatement;
    this.modalRef.componentInstance.reportId = reportId;
  }

  private openResultsChartModal(): void {
    this.modalRef = this.modalService.open(ResultsChartComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });
    // this.modalRef.componentInstance.balanceSheetData = balanceSheetData;
  }
}

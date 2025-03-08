import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bizzcalc-operating-expense',
  templateUrl: './bizzcalc-operating-expense.component.html',
  styleUrls: ['./bizzcalc-operating-expense.component.scss'],
})
export class BizzcalcOperatingExpenseComponent {
  constructor(private router: Router) {}

  public goToBaseAssumptions() {
    this.router.navigate(['/main/bizzcalc/Operating-Expense-base-assumptions']);
  }

  onSaveClicked() {
  }
}

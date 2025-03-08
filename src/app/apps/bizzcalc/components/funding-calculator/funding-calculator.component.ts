import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funding-calculator',
  templateUrl: './funding-calculator.component.html',
  styleUrls: ['./funding-calculator.component.scss']
})
export class FundingCalculatorComponent {
  constructor(private router: Router) {}

  public goToBaseAssumptions() {
    this.router.navigate(['/main/bizzcalc/funding-calculator-base-assumptions']);
  }
}

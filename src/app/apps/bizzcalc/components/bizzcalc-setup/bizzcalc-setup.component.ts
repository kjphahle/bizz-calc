import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bizzcalc-setup',
  templateUrl: './bizzcalc-setup.component.html',
  styleUrls: ['./bizzcalc-setup.component.scss'],
})
export class BizzcalcSetupComponent {
  constructor(private router: Router) {}

  public goToBusinessDetails($event: any) {
    this.router.navigate(['/main/bizzcalc/setup/business-details']);
  }

  public goToDaysWorked($event: any) {
    this.router.navigate(['/main/bizzcalc/setup/days-worked']);
  }

  public goToDepreciationRates($event: any) {
    this.router.navigate(['/main/bizzcalc/setup/assets-depreciation']);
  }
}

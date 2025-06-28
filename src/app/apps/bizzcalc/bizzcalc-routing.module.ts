import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BizzappsComponent } from 'src/app/pages/bizzapps/bizzapps.component';
import { BizzcalcComponent } from './bizzcalc.component';
import { BizzcalcSetupComponent } from './components/bizzcalc-setup/bizzcalc-setup.component';
import { BizzcalcBusinessDetailsComponent } from './components/setup/bizzcalc-business-details/bizzcalc-business-details.component';
import { BizzcalcBusinessDaysWorkedComponent } from './components/setup/bizzcalc-business-days-worked/bizzcalc-business-days-worked.component';
import { BizzcalcBusinessFixedAssetsComponent } from './components/setup/bizzcalc-business-fixed-assets/bizzcalc-business-fixed-assets.component';
import { RevenueCalculatorComponent } from './components/revenue-calculator/revenue-calculator.component';
import { EmploymentComponent } from './components/bizzcalc-employment/employment.component';
import { OperatingExpenseComponent } from './components/operating-expense/bizzcalc-operating-expense.component';
import { FixedAssetsComponent } from './components/fixed-assets/fixed-assets.component';
import { FundingCalculatorComponent } from './components/funding-calculator/funding-calculator.component';
import { ReportsComponent } from './components/reports/reports.component';
import { BizzcalcBaseAssumptionComponent } from './components/employment/bizzcalc-base-assumptions/bizzcalc-base-assumption.component';
import { BizzcalcOperatingExpenseComponent } from './components/bizcalc-operating-expense/bizzcalc-operating-expense.component';
import { BizzcalcRevenueCalculatorComponent } from './components/bizzcalc-revenue-calculator/bizzcalc-revenue-calculator.component';
import { BizzcalcFundingCalculatorComponent } from './components/bizcalc-funding-calculator/bizzcalc-funding-calculator.component';
import { BizzCalcLandingPageComponent } from './components/bizz-calc-landing-page/bizz-calc-landing-page.component';
import { BizzCalcReportsPageComponent } from './components/bizz-calc-reports-page/bizz-calc-reports-page.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';

const routes: Routes = [
  {
    path: '',
    component: BizzCalcLandingPageComponent,
    children: [
      {
        path: '',
        component: WelcomeScreenComponent,
      },
      {
        path: 'revenue-calculator',
        component: RevenueCalculatorComponent,
      },
      {
        path: 'employment',
        component: EmploymentComponent,
      },
      {
        path: 'operating-expense',
        component: OperatingExpenseComponent,
      },
      {
        path: 'fixed-assets',
        component: FixedAssetsComponent,
      },
      {
        path: 'funding-calculator',
        component: BizzcalcFundingCalculatorComponent,
      },
        {
        path: 'reports',
        component: ReportsComponent,
        children: [
          {
            path: '',
            component: BizzCalcReportsPageComponent,
          },
          {
            path: 'income-statement',
            component: BizzcalcBusinessDetailsComponent,
          },
          {
            path: 'balance-sheet',
            component: BizzcalcBusinessDaysWorkedComponent,
          },
          {
            path: 'schedule-of-expenses',
            component: BizzcalcBusinessFixedAssetsComponent,
          },
          {
            path: 'cashflow',
            component: BizzcalcBusinessFixedAssetsComponent,
          },
          {
            path: 'results-chart',
            component: BizzcalcBusinessFixedAssetsComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'setup',
    component: BizzCalcLandingPageComponent,
    children: [
      {
        path: '',
        component: BizzcalcSetupComponent,
      },
      {
        path: 'business-details',
        component: BizzcalcBusinessDetailsComponent,
      },
      {
        path: 'days-worked',
        component: BizzcalcBusinessDaysWorkedComponent,
      },
      {
        path: 'assets-depreciation',
        component: BizzcalcBusinessFixedAssetsComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BizzcalcRoutingModule {}

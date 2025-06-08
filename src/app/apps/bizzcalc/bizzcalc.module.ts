import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BizzcalcRoutingModule } from './bizzcalc-routing.module';
import { BizzcalcComponent } from './bizzcalc.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// Primeng imports
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { BizzCalcIndexComponent } from './components/bizz-calc-index/bizz-calc-index.component';
import { BizzCalcFixedAssetsComponent } from './components/bizz-calc-fixed-assets/bizz-calc-fixed-assets.component';
import { NextPrevButtonComponent } from './components/next-prev-button/next-prev-button.component';
import { BizzcalcFooterComponent } from './components/bizzcalc-footer/bizzcalc-footer.component';
import { BizzcalcSetupComponent } from './components/bizzcalc-setup/bizzcalc-setup.component';
import { BizzcalcBusinessDetailsComponent } from './components/setup/bizzcalc-business-details/bizzcalc-business-details.component';
import { BizzcalcBusinessDaysWorkedComponent } from './components/setup/bizzcalc-business-days-worked/bizzcalc-business-days-worked.component';
import { BizzcalcBusinessFixedAssetsComponent } from './components/setup/bizzcalc-business-fixed-assets/bizzcalc-business-fixed-assets.component';

import { BizzcalcBaseAssumptionComponent } from './components/employment/bizzcalc-base-assumptions/bizzcalc-base-assumption.component';
import { FormsModule } from '@angular/forms';
import { BizzcalcOperatingExpenseComponent } from './components/bizcalc-operating-expense/bizzcalc-operating-expense.component';

import { RevenueCalculatorComponent } from './components/revenue-calculator/revenue-calculator.component';
import { EmploymentComponent } from './components/bizzcalc-employment/employment.component';
import { OperatingExpenseComponent } from './components/operating-expense/bizzcalc-operating-expense.component';
import { FixedAssetsComponent } from './components/fixed-assets/fixed-assets.component';
import { FundingCalculatorComponent } from './components/funding-calculator/funding-calculator.component';
import { ReportsComponent } from './components/reports/reports.component';
import { BizzcalcHeaderComponent } from './components/bizzcalc-header/bizzcalc-header.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HolidaysModalComponent } from './components/setup/modals/holidays-modal/holidays-modal.component';
import { IncomeStatementComponent } from './components/reports/components/income-statement/income-statement.component';
import { BalanceSheetComponent } from './components/reports/components/balance-sheet/balance-sheet.component';
import { ScheduleOfExpenseComponent } from './components/reports/components/schedule-of-expense/schedule-of-expense.component';
import { ResultsChartComponent } from './components/reports/components/results-chart/results-chart.component';
import { BizzcalcRevenueCalculatorComponent } from './components/bizzcalc-revenue-calculator/bizzcalc-revenue-calculator.component';
import { SharedModule } from '../shared/shared/shared.module';
import { BizzcalcFundingCalculatorComponent } from './components/bizcalc-funding-calculator/bizzcalc-funding-calculator.component';
import { BizzbeanButtonGroupComponent } from '../shared/shared/components/button-group/bizzbean-button-group.component';
import { BizzCalcLandingPageComponent } from './components/bizz-calc-landing-page/bizz-calc-landing-page.component';
import { BizzCalcReportsPageComponent } from './components/bizz-calc-reports-page/bizz-calc-reports-page.component';
import { BizzCalcService } from './services/bizz-calc.service';
import { ToastModule } from 'primeng/toast';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ViewHolidaysComponent } from './components/view-holidays/view-holidays.component';
import { BizzbeanCategoryListControlComponent } from '../shared/shared/components/bizzbean-category-list-control/bizzbean-category-list-control.component';
import { FixedAssetsCategoriesModalComponent } from './components/setup/modals/fixed-assets-categories-modal/fixed-assets-categories-modal.component';
import { EmploymentModalComponent } from './components/setup/modals/employment-modal/employment-modal.component';
import { FixedAssetsModalComponent } from './components/setup/modals/fixed-assets-modal/fixed-assets-modal.component';
import { OperatingExpensesModalComponent } from './components/setup/modals/operating-expenses-modal/operating-expenses-modal.component';
import { FundingCalculatorModalComponent } from './components/setup/modals/funding-calculator-modal/funding-calculator-modal.component';

@NgModule({ declarations: [
        BizzcalcComponent,
        BizzCalcIndexComponent,
        BizzCalcFixedAssetsComponent,
        NextPrevButtonComponent,
        BizzcalcFooterComponent,
        BizzcalcSetupComponent,
        BizzcalcBaseAssumptionComponent,
        BizzcalcBusinessDetailsComponent,
        BizzcalcBusinessDaysWorkedComponent,
        BizzcalcBusinessFixedAssetsComponent,
        BizzbeanCategoryListControlComponent,
        BizzbeanButtonGroupComponent,
        RevenueCalculatorComponent,
        EmploymentComponent,
        BizzcalcOperatingExpenseComponent,
        BizzcalcRevenueCalculatorComponent,
        OperatingExpenseComponent,
        OperatingExpensesModalComponent,
        FixedAssetsComponent,
        FundingCalculatorComponent,
        BizzcalcFundingCalculatorComponent,
        ReportsComponent,
        BizzcalcHeaderComponent,
        HolidaysModalComponent,
        IncomeStatementComponent,
        BalanceSheetComponent,
        ScheduleOfExpenseComponent,
        ResultsChartComponent,
        BizzCalcLandingPageComponent,
        BizzCalcReportsPageComponent,
        ViewHolidaysComponent,
        FixedAssetsCategoriesModalComponent,
        FixedAssetsModalComponent,
        EmploymentModalComponent,
        FundingCalculatorModalComponent
    ], imports: [CommonModule,
        ReactiveFormsModule,
        BizzcalcRoutingModule,
        FontAwesomeModule,
        NgbDatepickerModule,
        RadioButtonModule,
        CheckboxModule,
        FormsModule,
        NgbModule,
        SharedModule,
        ToastModule,
        CalendarModule,
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot()], providers: [ConfirmationService, MessageService, BizzCalcService, provideHttpClient(withInterceptorsFromDi())] })
export class BizzcalcModule {}

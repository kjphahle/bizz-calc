import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CanceledPaymentComponent } from './canceled-payment/canceled-payment.component';
import { SummaryComponent } from './summary/summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ThankYouComponent, CanceledPaymentComponent, SummaryComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [SummaryComponent, CanceledPaymentComponent, ThankYouComponent],
})
export class PaymentComponentsModule {}

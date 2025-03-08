import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanceledPaymentComponent } from 'src/app/components/payment-components/canceled-payment/canceled-payment.component';
import { SummaryComponent } from 'src/app/components/payment-components/summary/summary.component';
import { ThankYouComponent } from 'src/app/components/payment-components/thank-you/thank-you.component';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  {
    redirectTo: 'summary',
    pathMatch: 'full',
    path: '',
  },
  {
    path: '',
    component: PaymentComponent,
    children: [
      {
        path: 'summary',
        component: SummaryComponent,
      },
      {
        path: 'thank-you',
        component: ThankYouComponent,
      },
      {
        path: 'failed',
        component: CanceledPaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}

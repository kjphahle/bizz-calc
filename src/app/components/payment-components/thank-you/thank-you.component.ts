import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss'],
    standalone: false
})
export class ThankYouComponent implements OnInit {
  constructor(private router: Router, private paymentService: PaymentService) {}
  backToCourses() {
    this.router.navigateByUrl('/main/bizzclass/courses');
  }

  ngOnInit(): void {
    this.paymentService.updatePayment();
  }
}

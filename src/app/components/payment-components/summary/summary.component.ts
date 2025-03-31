import { Component, OnInit } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    standalone: false
})
export class SummaryComponent implements OnInit {
  faQuestion = faQuestion;

  imageLookUp = {
    244545: 'minified/costrecovery-min.png',
    244546: 'minified/profitoptimizer-min.png',
    244547: 'minified/financialreports-min.png',
    244548: 'minified/businesstools-min.png',
  };

  product = undefined;
  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.product = this.paymentService.getProduct();
  }
}

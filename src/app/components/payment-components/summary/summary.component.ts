import { Component, OnInit } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  faQuestion = faQuestion;

  imageLookUp = {
    244545: '../../../../assets/minified/costrecovery-min.png',
    244546: '../../../../assets/minified/profitoptimizer-min.png',
    244547: '../../../../assets/minified/financialreports-min.png',
    244548: '../../../../assets/minified/businesstools-min.png',
  };

  product = undefined;
  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.product = this.paymentService.getProduct();
  }
}

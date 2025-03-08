import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-canceled-payment',
    templateUrl: './canceled-payment.component.html',
    styleUrls: ['./canceled-payment.component.scss'],
    standalone: false
})
export class CanceledPaymentComponent implements OnInit {
  constructor(private router: Router) {}

  backToCourses() {
    this.router.navigateByUrl('/main/bizzclass/courses');
  }

  ngOnInit(): void {}
}

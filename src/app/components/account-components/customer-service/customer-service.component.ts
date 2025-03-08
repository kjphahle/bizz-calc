import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-service',
    templateUrl: './customer-service.component.html',
    styleUrls: ['./customer-service.component.scss'],
    standalone: false
})
export class CustomerServiceComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}

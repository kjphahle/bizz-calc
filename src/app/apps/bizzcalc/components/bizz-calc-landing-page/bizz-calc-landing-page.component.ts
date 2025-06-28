import { Component,OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-bizz-calc-landing-page',
    templateUrl: './bizz-calc-landing-page.component.html',
    styleUrls: ['./bizz-calc-landing-page.component.scss'],
    standalone: false
})
export class BizzCalcLandingPageComponent implements OnInit {
  public currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = new URL(event.url, window.location.origin).pathname;
        console.log('Updated Route:', this.currentRoute); // Debugging
      }
    });

    this.route.data.subscribe(data => {
    console.dir("hhhhhhhhhhhhhhhhhhhhhhhhh");
    console.dir(data?.title);         // "Dashboard"
    // console.log(data.requiresAuth);  // true
    // alert(data?.title)
  });

    // Initial value on component load
    this.currentRoute = new URL(this.router.url, window.location.origin).pathname;
    console.log('Initial Route:', this.currentRoute);
  }

  public goToBusinessDetails() {
    this.router.navigate(['/main/bizzcalc/business-details']);
  }

  public goToDaysWorked() {
    this.router.navigate(['/main/bizzcalc/days-worked']);
  }

  public goToDepreciationRates() {
    this.router.navigate(['/main/bizzcalc/assets-depreciation']);
  }
}

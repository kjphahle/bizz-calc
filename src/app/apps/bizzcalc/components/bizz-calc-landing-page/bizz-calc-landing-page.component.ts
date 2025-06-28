import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-bizz-calc-landing-page',
  templateUrl: './bizz-calc-landing-page.component.html',
  styleUrls: ['./bizz-calc-landing-page.component.scss'],
  standalone: false,
})
export class BizzCalcLandingPageComponent implements OnInit {
  public currentRoute: string = '';
  public headerTitle = signal('');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = new URL(event.url, window.location.origin).pathname;
        const route = this.setCurrentRouteDetails(this.currentRoute);
        console.log('Updated Route:', this.currentRoute); // Debuggingthis.headerTitle.set("sss");
        this.headerTitle.set('sss ddd');
        this.cdr.markForCheck();
      }
    });

    // Initial value on component load
    this.currentRoute = new URL(
      this.router.url,
      window.location.origin
    ).pathname;
    console.log('Initial Route:', this.currentRoute);
  }

  public setCurrentRouteDetails(currentRoute: string): any {
    let route = {
      title: '',
      previous: '',
      next: '',
    };
    switch (currentRoute) {
      case '/main/bizzcalc/employment':
        route.title = 'employment';
        route.previous = '/main/bizzcalc/revenue-calculator';
        route.next = '/main/bizzcalc/operating-expense';
        break;
      case '/main/bizzcalc/reports':
        route.title = 'report';
        route.previous = '/main/bizzcalc/funding-calculator';
        route.next = '';
        break;
      case '/main/bizzcalc/revenue-calculator':
        route.title = 'revenue calculator';
        route.previous = '/main/bizzcalc/setup';
        route.next = '/main/bizzcalc/employment';
        break;
      case '/main/bizzcalc/operating-expense':
        route.title = 'operating expense';
        route.previous = '/main/bizzcalc/employment';
        route.next = '/main/bizzcalc/fixed-assets';
        break;
      case '/main/bizzcalc/fixed-assets':
        route.title = 'fixed assets';
        route.previous = '/main/bizzcalc/operating-expense';
        route.next = '/main/bizzcalc/funding-calculator';
        break;
      case '/main/bizzcalc/funding-calculator':
        route.title = 'funding calculator';
        route.previous = '/main/bizzcalc/fixed-assets';
        route.next = '/main/bizzcalc/reports';
        break;
      case '/main/bizzcalc/setup':
        route.title = 'setup';
        route.previous = '';
        route.next = '/main/bizzcalc/revenue-calculator';
        break;
      default:
        route.title = '';
        route.previous = '';
        route.next = '';
    }
    return route;
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

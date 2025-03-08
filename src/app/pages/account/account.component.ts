import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  activeRoute: string = 'profile';

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.activeRoute = this.router.url.replace('/main/account/', '');
      }
    });
  }

  changeRoute(route: string) {
    this.activeRoute = route.replace('/main/account/', '');
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {}
}

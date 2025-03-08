import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-bizzclass',
    templateUrl: './bizzclass.component.html',
    styleUrls: ['./bizzclass.component.scss'],
    standalone: false
})
export class BizzclassComponent implements OnInit {
  activeRoute: string = 'summary';
  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.activeRoute = this.router.url.replace('/main/bizzclass/', '');
      }
    });
  }

  changeRoute(route: string) {
    this.activeRoute = route.replace('/main/bizzclass/', '');
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {}
}

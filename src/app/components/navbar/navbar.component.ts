import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faChevronLeft,
  faFile,
  faHeadset,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { BizzclassService } from 'src/app/services/bizzclass.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  activeRoute: string = 'dashboard';
  sideMenuOpen: boolean = false;
  showProfilePopover: boolean = false;
  isOnCoursePlayer: boolean = false;
  faChevronLeft = faChevronLeft;
  username: string;

  faUser = faUser;
  faFile = faFile;
  faHeadset = faHeadset;

  isDropdownOpen =false;

  constructor(
    private router: Router,
    private bizzclassService: BizzclassService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.isOnCoursePlayer = this.router.url.includes('course-player');
      }
      if (ev instanceof NavigationEnd) {
        this.activeRoute = this.router.url.replace('/main/bizzclass/', '');
        this.isDropdownOpen = false;
      }
    });
  }

  openMenu() {
    this.sideMenuOpen = true;
  }
  closeMenu() {
    this.sideMenuOpen = false;
  }

 // changeRoute(route: string) {
   // this.router.navigateByUrl(route);
   // this.activeRoute = route.replace('/main/', '');
   // this.closeMenu();
   // this.bizzclassService.resetAll();
 // }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Optional: Close dropdown when navigating or clicking elsewhere
  changeRoute(route: string) {
    this.activeRoute = route.replace('/main/bizzclass/', '');
    this.router.navigateByUrl(route);
    this.isDropdownOpen = false // Close the dropdown after navigation
  }

  moveToBizzCalcRoute(route: string) {
    this.activeRoute = route.replace('/main/bizzccal/', '');
    this.router.navigateByUrl(route);
    this.isDropdownOpen = false // Close the dropdown after navigation
  }

  toggleProfile() {
    this.showProfilePopover = !this.showProfilePopover;
  }

  logout() {
    this.router.navigateByUrl('/auth/login');
  }

  ngOnInit(): void {
    document.addEventListener('click', (e: any) => {
      if (
        e.target.className != 'navbar-avatar' &&
        e.target.className != 'profile-popover' &&
        e.target.parentElement.className != 'profile-popover'
      ) {
        this.showProfilePopover = false;
      }
    });
    this.activeRoute = this.router.url.replace('/main/', '');
    this.username = sessionStorage.getItem('username');
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/apps/shared/shared/shared.module';

@Component({
  selector: 'app-welcome-screen',
  imports: [SharedModule, RouterModule],
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.scss'
})
export class WelcomeScreenComponent {

  public router = inject(Router);

  onButtonClicked($event: boolean): void {
    this.router.navigateByUrl("/main/bizzcalc/setup");
  }

}

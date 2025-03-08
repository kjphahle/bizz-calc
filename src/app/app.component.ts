import { Component } from '@angular/core';
import { BizzCalcMonitoringService } from './services/bizz-calc-monitoring.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false,
})
export class AppComponent {
  constructor(private bizzCalcMonitoringService: BizzCalcMonitoringService){

  }
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}

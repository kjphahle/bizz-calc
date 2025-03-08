import { ErrorHandler, Injectable } from '@angular/core';
import { BizzCalcMonitoringService } from './bizz-calc-monitoring.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
  constructor(private bizzCalcMonitoringService: BizzCalcMonitoringService) {
    super();
  }

  handleError(error: Error) {
    this.bizzCalcMonitoringService.logException(error); // Manually log exception
  }
}

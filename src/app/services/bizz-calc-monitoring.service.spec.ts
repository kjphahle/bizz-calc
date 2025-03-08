import { TestBed } from '@angular/core/testing';

import { BizzCalcMonitoringService } from './bizz-calc-monitoring.service';

describe('BizzCalcMonitoringService', () => {
  let service: BizzCalcMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BizzCalcMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

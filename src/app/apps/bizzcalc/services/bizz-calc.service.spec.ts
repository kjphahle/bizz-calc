import { TestBed } from '@angular/core/testing';

import { BizzCalcService } from './bizz-calc.service';

describe('BizzCalcService', () => {
  let service: BizzCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BizzCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
